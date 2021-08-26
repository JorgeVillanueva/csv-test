/* const csv = require('csvtojson')
const Appearances = require("../models/appearances")
const Users = require("../models/users")

const insertToDB = csvPath => {
    console.time("insertarDatos")
    csv()
    .fromFile(csvPath)
    .then(jsonObj => {
        Appearances.insertMany(jsonObj)
        .then(() => {
            console.log("Datos insertados")
            console.timeEnd("insertarDatos")
        })
        .catch(error => {
            console.log(error)
        })
    })
} */

const { promisify } = require("util")
const exec = promisify(require("child_process").exec)
const insertWithCommand = async (collectionName, csvPath) => {
    try {
        console.time("insert")
        // Drop de la tabla
        //const res = await exec(`mongoimport --uri "${process.env.MONGODB_CNN}" --collection ${collectionName} --drop --type csv --headerline --file ${csvPath}`)

        // Upsert de la tabla -- modificar upsertFields acorde al csv
        await exec(`mongoimport --uri "${process.env.MONGODB_CNN}" --mode upsert --upsertFields nombre,apellido --ignoreBlanks --collection ${collectionName} --type csv --headerline --file ${csvPath}`)
        console.timeEnd("insert")
        //console.log(res)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    //insertToDB,
    insertWithCommand
}