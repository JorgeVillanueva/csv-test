const { response } = require("express")

const Users = require("../models/users")

const usersGet = async (req, res = response) => {    
    const { limit = 5, from = 0 } = req.query
    const query = { state: true }

    const [ total, users ] = await Promise.all([
        Users.countDocuments(query),
        Users.find(query)
        .skip(Number(from))
        .limit(Number(limit))
    ])

    res.json({
        total,
        users
    })
}

const usersPost = async (req, res = response) => {
    const user = new Users(req.body)
    
    // Guardar en BD
    await user.save()

    res.json({
        user
    })
}

module.exports = {
    usersGet,
    usersPost
}