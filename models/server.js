const express = require("express")
const fileUpload = require("express-fileupload")
const cors = require("cors")
const { dbConnection } = require("../database/config")

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.paths = {
            uploads: "/api/uploads"
        }        

        // Conectar a base de datos
        this.connectDB()

        // Middlewares
        this.middlewares()
        
        // Rutas de mi aplicación
        this.routes()
    }

    async connectDB() {
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
        this.app.use(this.paths.uploads, require("../routes/uploads"))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`🚀 Server running on port ${this.port}.`)
        })
    }
}

module.exports = Server