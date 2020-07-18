# api-todos-example
Un ejemplo de API REST hecho en NodeJS junto con el framework Express. Implementa el uso de JWT para autenticación y autorización, ORM para las consultas a la base de datos y el uso de Docker
## Instrucciones de instalación
Esta API se desarrolló bajo NodeJS v12.16.2 y NPM v6.14.4. Se recomienda usar base de datos MySQL aunque no deberia tener problemas con otro motor de base de datos siempre  y cuando se instalen las dependencias requeridas. Se incluye un docker-compose por si quiere levantar el servidor, MySQL y Adminer en contenedores
### Dependencias
Este proyecto hace uso de las siguientes dependencias
+ Express v4.17.1
+ Sequelize v5.22.3
+ MySQL v2.18.1
+ MySQL2 v2.1.0
+ JSON Web Token v8.5.1
+ Bcrypt v5.0.0
+ Dotenv v8.2.0
+ CORS v2.8.5

Para desarrollo se incluyen las siguientes dependencias
+ Sequelize-CLI v5.5.1
+ Nodemon v2.0.4
### Instalación
+ Clonar proyecto
+ Copiar .env.example, renombrar a .env y modificar los parametros necesarios, si no quiere modificar la configuración a base de datos solo modifique JWT_SECRET_KEY y JWT_REFRESH_KEY
#### Si va a hacer deploy con docker
+ Ejecute docker-compose up --build
+ Ejecute docer exec -it todos-api sh para entrar al contenedor y ejecute npm run sequelize-scripts
#### Si va a hacer deploy sin docker
+ Edite el archivo .env apuntando a la direccion ip y credenciales de la base de datos.
+ Ejecute npm i
+ Ejecute npm run sequelize-scripts
+ Arranque el servidor con npm start, también puedes levantar el servidor con npm run dev del cual hará uso de nodemon
## Endpoints
+ POST /register: Registra un nuevo usuario
+ POST /login: Autentica un usuario, retorna un token de acceso y un token de refresco (por dejencto el token de acceso dura 15 segundos), el token de refresco queda guardado en un arreglo en memoria
+ POST /token: Genera un nuevo token de acceso usando el token de refresco
+ DELETE /logout: Borra el token de refresco en memoria
+ GET /todos: Retorna todas las tareas del sistema, solo puede ser usado por administrador
+ GET /todos/{id}: Retorna tarea en especifico
+ GET /todos/user/{id}: Retorna todas las tareas del usuario en especifico, solo puede ser usado por el usuario autenticado o por el administrador
+ POST /todos: Crea una nueva tarea, solo puede ser usado por el administrador
+ PUT /todos/{id}: Modifica una tarea en especifico
+ DELETE /todos/{id}: Borra una tarea en especifico
