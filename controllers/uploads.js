const { response } = require("express")
const path = require("path")
const fs = require("fs")
const csvSplitStream = require("csv-split-stream")
const { uploadFile } = require("../helpers/upload-file")
const { insertWithCommand } = require("../helpers/insert-to-db")

const fileUpload = async (req, res = response) => {
    try {
        const LINE_LIMIT = 5000
        const { uploadPath, tempName } = await uploadFile(req.files)
        console.log("The file was uploaded successfully.")
        csvSplitStream.split(
            fs.createReadStream(uploadPath),
            {
                lineLimit: LINE_LIMIT
            },
            index => fs.createWriteStream(path.join(__dirname, `..//public/file-uploads/${tempName}-${index}.csv`))
        )
        .then(() => {
            for (let idx = 0; idx < 10; idx++) {                
                insertWithCommand("users", path.join(__dirname, `..//public/file-uploads/${tempName}-${idx}.csv`), idx + 1)      
            }
        }).catch(csvSplitError => {
            console.log("csvSplitStream failed!", csvSplitError)
        })
        res.json({ uploadPath })
    } catch (msg) {
        res.status(400).json({ msg })
    }
}

module.exports = {
    fileUpload
}