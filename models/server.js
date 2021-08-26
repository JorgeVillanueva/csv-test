const express = require("express")
const fileUpload = require("express-fileupload")
const cors = require("cors")
const { dbConnection } = require("../database/config")

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.paths = {
            appearances:    "/api/appearances",
            uploads:        "/api/uploads",
            users:          "/api/users"
        }        

        // Conectar a base de datos
        this.conectarDB()

        // Middlewares
        this.middlewares()
        
        // Rutas de mi aplicación
        this.routes()
    }

    async conectarDB() {
        await dbConnection()
    }

    middlewares() {
        // Cors
        this.app.use(cors())

        // Lectura y parseo del body
        this.app.use(express.json())

        // Directorio público
        this.app.use(express.static("public"))

        // Fileupload - Carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes() {
        this.app.use(this.paths.appearances, require("../routes/appearances"))
        this.app.use(this.paths.uploads, require("../routes/uploads"))
        this.app.use(this.paths.users, require("../routes/users"))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en el puerto", this.port)
        })
    }
}

module.exports = Server