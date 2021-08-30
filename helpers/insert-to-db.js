const fs = require("fs")
const { promisify } = require("util")
const exec = promisify(require("child_process").exec)
const insertWithCommand = async (collectionName, csvPath, fileIndex) => {
    try {
        console.time(`insert file ${fileIndex}`)
        console.log(`Uploading data from file ${fileIndex}`)
        await exec(`mongoimport --uri "${process.env.MONGODB_CNN}" --mode upsert --upsertFields Usuario --ignoreBlanks --collection ${collectionName} --type csv --headerline --file ${csvPath}`)
        console.timeEnd(`insert file ${fileIndex}`)
        console.log(`File ${fileIndex} uploaded successfully.`)
        fs.unlink(csvPath, err => {
            if (err) throw new Error(err)
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    insertWithCommand
}