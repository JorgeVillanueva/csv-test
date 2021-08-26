const { response } = require("express")

const Appearances = require("../models/appearances")

const appearancesGet = async (req, res = response) => {    
    const { limit = 5, from = 0 } = req.query

    const [ total, appearances ] = await Promise.all([
        Appearances.countDocuments({}),
        Appearances.find({})
        .skip(Number(from))
        .limit(Number(limit))
    ])

    res.json({
        total,
        appearances
    })
}

const appearancesPost = async (req, res = response) => {
    const appearance = new Appearances(req.body)
    
    // Guardar en BD
    await appearance.save()

    res.json({
        appearance
    })
}

module.exports = {
    appearancesGet,
    appearancesPost
}