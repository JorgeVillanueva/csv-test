const path = require("path")
//const { v4: uuidv4 } = require("uuid")

const uploadFile = (files) => {
    const validExt = ["csv", "xlsx"]
    return new Promise((resolve, reject) => {
        const { file } = files
        const splitName = file.name.split(".")
        const ext = splitName[splitName.length - 1]
    
        // Validar extensiones        
        if (!validExt.includes(ext)) {
            return reject(`The extension ${ext} is not supported, ${validExt}`)
        }
    
        const tempName = `carga-masiva`
        const uploadPath = path.join(__dirname, '..//uploads/', tempName)
    
        file.mv(uploadPath, err => {
            if (err) {
                return res.status(500).json({ err });
            }
            
            resolve(uploadPath);
        });
    })

}

module.exports = {
    uploadFile
}