const { Schema, model } = require("mongoose")

const AppearancesSchema = Schema({
    yearID: String,
    teamID: String,
    igID: String,
    playerID: String,
    G_all: String,
    GS: String,
    G_batting: String,
    G_defense: String,
    G_p: String,
    G_c: String,
    G_1b: String,
    G_2b: String,
    G_3b: String,
    G_ss: String,
    G_lf: String,
    G_cf: String,
    G_rf: String,
    G_of: String,
    G_dh: String,
    G_ph: String,
    G_pr: String,
    state: Boolean
})

module.exports = model("Appearances", AppearancesSchema)