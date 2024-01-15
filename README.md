## Pre requisitos
 - Tener instalado npm 
 - Tener instalado postgresql

## Levantamiento

- Instalar las librerias necesarias

```
npm install
```

### Database 

- Crear un archivo ```.env``` que contenga las variables para la conexión con la base de datos

```
DB_NAME="<db_name>"
DB_USER="<db_user>"
DB_HOST="<db_host>"
DB_PASSWORD="<db_password>"
NODE_ENV="development"

```

- Correr el siguiente comando el cual creará la base de datos con la tabla a utilizar para los posts

```
npm run prestart
```

### API

- Para levantar el API en localhost:3000 correr el siguiente comando

```
node index.js
```

- Se disponen de 3 URLS:

```
    GET: http://localhost:3000/posts
    POST: http://localhost:3000/posts
        body: 
            {
                "name": "Nombre",
                "description": "Descripcion"
            }
    DELETE: http://localhost:3000/posts/:id
```