const { response } = require("express");
const { uploadFile } = require("../helpers/upload-file");
const { insertToDB, insertWithCommand } = require("../helpers/insert-to-db")

const fileUpload = async (req, res = response) => {
    try {
        // Subir el archivo a la carpeta uploads
        const csvPath = await uploadFile(req.files)
        
        /* insertToDB(csvPath) */
        // nombre de la colección, path del archivo CSV
        insertWithCommand("appearances", csvPath)
        res.json({ csvPath })
    } catch (msg) {
        res.status(400).json({ msg })
    }
}

module.exports = {
    fileUpload
}