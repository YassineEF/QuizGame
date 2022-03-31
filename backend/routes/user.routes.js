let router = require("express").Router()
let controllers = require("../controllers/user.controllers")

router.post("/Inscription", controllers.InscriptionUser );
router.post("/Connection", controllers.ConnectionUser );

module.exports = router