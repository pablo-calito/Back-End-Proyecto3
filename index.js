//Importaciones principales
require('dotenv').config();

//Importación de archivos
const Server = require('./models/server');

//Instancia del servidor de arranque
const InitServer = new Server();

//Llamar al método listen que levanta el servidor
InitServer.listen();