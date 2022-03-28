let router = require("express").Router()
let controllers = require("../controllers/user.controllers")

router.post("/", controllers.InscriptionUser );

module.exports = router