let router = require("express").Router()
let controllers = require("../controllers/user.controllers")

router.post("/Inscription", controllers.InscriptionUser );
router.post("/Connection", controllers.ConnectionUser );
router.post("/InsertScore", controllers.ScoreUser );
router.post("/ScoreScreen", controllers.ScoreScreen );
router.post("/creationQuiz", controllers.creationQuiz);
router.post("/QuizUser", controllers.quizUser);
router.post("/Supprimer", controllers.SupprimerQuiz);
router.post("/ModifierQuiz", controllers.ModifierQuiz)
router.post("/UpdateQuiz", controllers.UpdateQuiz)
// router.get("/CheckToken", controllers.CheckToken );








module.exports = router