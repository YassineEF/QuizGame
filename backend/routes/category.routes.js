let router = require("express").Router()
let controllers = require("../controllers/category.controllers")

router.get("/", controllers.displayThématique);
router.get("/CategoryQuiz:CategoryID", controllers.displayQuiz);
router.get("/QuizQuestion:idQuiz", controllers.displayQuestions);





module.exports = router
