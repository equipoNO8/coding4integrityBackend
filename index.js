const cors = require('cors');
const express = require('express');


if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.mainPath = '/api/v1/';
        //middlewares
        this.middlewares();
        //routes
        this.routes();
    }
    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }
    routes() {
        this.app.use(`${this.mainPath}`, require('./routes/denuncias.routes'))
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        })
    }
}

const server = new Server();
server.listen();