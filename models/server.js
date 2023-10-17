const express = require('express');
const cors = require('cors');
const { dbConection } = require('../database/config');
const { defaultAdmin } = require('../controllers/user');
const { defaultMovie } = require('../controllers/movie');

class Server {

    constructor() {
        //Configuración inicial
        this.app = express();
        this.port = process.env.PORT;

         this.paths = {
             ticket: '/api/ticket',
             movie: '/api/movie',
             hall: '/api/hall',
             seat: '/api/seat',
             user: '/api/user',
             auth: '/api/auth',
         }

        //Conectar a base de datos
        this.conectionDB();

        // Middlewares
        this.middlewares();

        //Rutas de mi app
        this.routes();

        // defaultMovie();

        defaultAdmin();
    }

    //Función de conexión
    async conectionDB() {
   
        await dbConection();
    }

    //Un middleware es una función que se ejecuta antes de las rutas
    middlewares() {

        // CORS
        this.app.use(cors());

        // Lectura y parseo del Body
        this.app.use(express.json());

        //Directorio publico
        this.app.use(express.static('public'));

    }


     routes() {
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.ticket, require('../routes/ticket'));
        this.app.use(this.paths.movie, require('../routes/movie'));
        this.app.use(this.paths.hall, require('../routes/hall'));
        this.app.use(this.paths.user, require('../routes/user'));
    }


    listen() {
        this.app.listen(this.port, () => {
            console.log('Server run in port: ', this.port);
        })
    }


}


//Importamos la clase Server
module.exports = Server;
