const { Schema, model } = require("mongoose")

const UsersSchema = Schema({
    Usuario: String,
    Puesto: String,
    Sucursal: String,
    Regional: String,
    Subdirector: String,
    Director: String,
    Perfil: String
})

module.exports = model("Users", UsersSchema)