let db = require("../config/db");

module.exports.displayThématique = function (req, res) {
  db.query("SELECT id, thématique FROM thématiques ", function (err, rows) {
    if (err) {
      res.json({ msg: "error" });
    } else {
      res.json({ msg: "success", thema: rows });
    }
  });
};

module.exports.displayQuiz = function (req, res) {
  let CategoryID = req.query.CategoryID;
  db.query(
    "SELECT id, thématique FROM thématiques WHERE id = ?",
    [CategoryID],
    function (err, cat) {
      if (err) {
        res.json({ msg: "error" });
      } else {
        db.query(
          "SELECT quiz.id, quiz.name, quiz.id_admin, quiz.id_thématique FROM quiz WHERE id_thématique = ?",
          [CategoryID],
          function (err, rows) {
            if (err) {
              res.json({ msg: "error" });
            } else {
              res.json({ msg: "success", quiz: rows, cat: cat[0] });
            }
          }
        );
      }
    }
  );
};

module.exports.displayQuestions = function (req, res) {
  let idQuiz = req.query.idQuiz;
  db.query(
    "SELECT id, question, id_quiz FROM questions  WHERE id_quiz = ?",
    [idQuiz],
    function (err, rows) {
        if (err) {
            res.json({ msg: "error" });
        } else {
      const quests = rows;
      let l = [];
      for (i in quests) {
        l.push(quests[i].id);
      }
      
      db.query(
        "SELECT id, reponse, boolean, id_question FROM reponses WHERE id_question IN (?)",
        [l],
        function (err, reps) {
          if (err) {
            res.json({ msg: "error" });
            console.log(msg);
          } else {
            res.json({ msg: "success",  quests,  reps });
          }
        }
      );
    }
    }
  );
};
