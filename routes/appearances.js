const { Router } = require("express") 

const { appearancesGet, appearancesPost } = require("../controllers/appearances")

const router = Router()

router.get("/", appearancesGet)

router.post("/", appearancesPost)

module.exports = router