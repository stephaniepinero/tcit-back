const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

const { sequelize } = require('./settings/db/connection');
const { Post } = require('./models/post');

app.use(cors());
app.use(express.json());

app.get('/posts', async (req, res) => {
    try {
      const posts = await Post.findAll({ })
      return res.json({ posts });
    } catch (error) {
      console.log('Error', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.post('/posts', async (req, res) => {
    try {
        console.log(req.body)
        const {name, description } = req.body;
  
        if (!name || !description) {
            return res.status(400).json({ message: 'Bad request, name or description not found' });
        }
        const post = await Post.create({
            name,
            description
        });
        return res.status(201).json({ post });
    } catch (error) {
      console.log('Error', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.delete('/posts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findByPk(id)

        await Post.destroy({
            where: {
                id
            },
        });
        return res.status(200).json({ post });
    } catch (error) {
        console.log('Error', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
  });


  sequelize
  .authenticate()
  .then(() => {
    console.log('Connection success');
    return sequelize.sync();
  })
  .then(() => {
    console.log('Sync models');
    app.listen(port, () => {
      console.log(`Server listen on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Connection fail', error);
  });