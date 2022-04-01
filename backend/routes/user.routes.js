let router = require("express").Router()
let controllers = require("../controllers/user.controllers")

router.post("/Inscription", controllers.InscriptionUser );
router.post("/Connection", controllers.ConnectionUser );
// router.get("/CheckToken", controllers.CheckToken );








module.exports = router