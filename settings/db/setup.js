//const { Sequelize } = require('sequelize');

const { Client } = require('pg');
require('dotenv').config()

const {createInitialSchemas} = require ("./migrations/schemas")
//import createInitialSchemas from "./migrations/schemas.js"

const DB_NAME = process.env.DB_NAME || 'tcit';
const DB_USER = process.env.DB_USER || 'postgres';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PASSWORD = process.env.DB_PASSWORD || 'root';

async function setupDatabase() {

    const isDev = process.env.NODE_ENV === 'development';

    if (!isDev) return console.log('in production environment - skipping database creation.');

    /*const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
        host: DB_HOST,
        dialect: 'postgres'
    });

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        const schemas = await sequelize.showAllSchemas()
        console.log(schemas)
       
    } catch (error) {
        console.error('Unable to connect to the database:', error);

    }

    sequelize.close()*/
    const client = new Client({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        port: 5432,
    });
    
    await client.connect();
    
    const res = await client.query(`SELECT datname FROM pg_catalog.pg_database WHERE datname = '${DB_NAME}'`);
    
    if (res.rowCount === 0) {
        console.log(`${DB_NAME} database not found, creating it.`);
        await client.query(`CREATE DATABASE "${DB_NAME}";`);
        console.log(`created database ${DB_NAME}.`);

        createInitialSchemas()
    } else {
        console.log(`${DB_NAME} database already exists.`);
    }
    
    await client.end();
}

setupDatabase();