const path = require("path")
const { v4: uuidv4 } = require("uuid")

const uploadFile = (files) => {
    const validExt = ["csv", "json"]
    return new Promise((resolve, reject) => {
        const { file } = files
        const splitName = file.name.split(".")
        const ext = splitName[splitName.length - 1]
        
        if (!validExt.includes(ext)) {
            return reject(`The extension ${ext} is not supported, ${validExt}`)
        }
    
        const tempName = `${uuidv4()}.${ext}`
        const uploadPath = path.join(__dirname, '..//public/file-uploads/', tempName)
    
        file.mv(uploadPath, err => {
            if (err) {
                return res.status(500).json({ err });
            }
            resolve({uploadPath, tempName});
        });
    })

}

module.exports = {
    uploadFile
}