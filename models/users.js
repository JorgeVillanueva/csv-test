const { Schema, model } = require("mongoose")

const UsersSchema = Schema({
    nombre: String,
    apellido: String,
    edad: String,
    state: Boolean
})

module.exports = model("Users", UsersSchema)