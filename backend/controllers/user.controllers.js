let db = require("../config/db");
let bcrypt = require("bcryptjs")
let jwt = require("jsonwebtoken");

require('dotenv').config()



module.exports.InscriptionUser = async function  (req, res) {
    console.log(req.body);
    let Username = req.body.Username;
    let Email = req.body.Email
    let Password = req.body.Password
    let pwd =   await bcrypt.hash(Password,  await  bcrypt.genSaltSync(8))
    
    db.query("SELECT username, email FROM admin WHERE username = (?) OR email = (?) ", [Username, Email] ,function(err,result){
        if(result.length === 0){
            db.query(
                "INSERT INTO `admin` (`username`, `email`, `password`, `status`) VALUES (?, ?, ?, 0)",
                [Username, Email, pwd],
                function (err, rows) {
                  if (err) {
                    res.json({ msg: err });
                  } else {
                    res.json({ msg: "success", user: rows, });
                  }
                }
              );
        }else if(err){
            res.json({ msg: err })
        }else{
            res.status(401).send('Compte existant')
        }
    })
};


module.exports.ConnectionUser =  function  (req, res) {
  let Username = req.body.Username;
  let Password = req.body.Password
  db.query("SELECT id, username, email, password FROM admin WHERE username = (?)", [Username], async function (err, rows) {
    
    // Check if user exist
    if(rows.length === 0){
      res.status(401).send('Username  incorrect')
    }else{
      // check if passwords match
      let pwd = await bcrypt.compare(Password, rows[0].password)
      if(pwd){
        if (err) {
          res.json({ msg: "error" });
        } else {
           function score(idUser){
            let scoreUser =  db.query('SELECT s.id, s.score, s.timer, DATE_FORMAT( date, "%d-%m-%Y") AS date , s.id_admin, s.id_quiz, q.name FROM score s JOIN quiz q ON s.id_quiz = q.id  WHERE s.id_admin = ?',[idUser], function (err, scores){
              if (err) {
                res.json({ msg: "error" });
                console.log(err);
              } else {
                let accessToken = jwt.sign( {rows}, process.env.JWT_SECRET);
                res.cookie('token', accessToken  )
                
                res.json({ msg: "success",  user: rows, token:accessToken,  scores });
              }
            })
            return scoreUser
          } 
          score(rows[0].id)
        }
      }else{
        res.status(401).send('Username or password are incorrect')
      }
    }
    
  });
};



module.exports.ScoreUser = async function  (req, res) {
  let idUser = req.body.idUser;
  let idQuiz = req.body.quizId
  let timer = req.body.temps

  let score = req.body.score
  
  console.log(score);
  
  db.query("INSERT INTO score (score, timer, date, id_admin, id_quiz) VALUES (?,?, now(), ?, ?)", [score, timer, idUser, idQuiz] ,function(err,result){
      if(err){
        res.json({ msg: err })
        console.log(err);
      }else{
        res.json({ msg: "success, inserted score", result });
      }                                           
  })
};

module.exports.ScoreScreen = async function  (req, res) {
  let idQuiz = req.body.quizId

  db.query("SELECT  s.score, s.timer, s.id_admin , s.id_quiz, a.username  FROM score s JOIN admin a ON s.id_admin = a.id WHERE s.id_quiz = (?) ORDER BY s.score DESC LIMIT 5", [idQuiz] ,function(err,result){
      if(err){
        res.json({ msg: err })
        console.log(err);
      }else{
        res.json({ msg: "score recovered successfully", result });
      }
  })
};



module.exports.creationQuiz = async function(req, res, next){
  let nameQuiz = req.body.NameQuiz
  let idAdmin = req.body.idUser
  let idThema = req.body.idCate
  let questionReps = req.body.questReps
  
  db.query("INSERT INTO quiz (name, id_admin, id_thématique) VALUES (?, ?, ?) ", [nameQuiz,idAdmin, idThema], async function(err,result){
    if(err){
      
      console.log(err);
    }else{
      let idQuiz = result.insertId;   
      for(let i = 0; i < questionReps.length; i++){
        db.query("INSERT INTO questions (question, id_quiz) VALUES(?,?) ", [questionReps[i][0], idQuiz], async function(error, questions){
          if(error){
            console.log(error );
          }else{
            
            let idQuestion = questions.insertId
            for(let j = 0; j < questionReps[i][1].length ; j++){
              if(questionReps[i][1][j] === questionReps[i][1][0]){
                   db.query("INSERT INTO reponses (reponse, boolean ,id_question) VALUES(?, 1 ,?) ", [questionReps[i][1][j], idQuestion], async function(errors, firstResponses){
                     if(errors){
                       console.log(errors);
                     } else{
                      //  const firstRep = await Promise.resolve({firstResponses})
                      //  return res.json(firstRep)
                      }
                   })
                  }else{
                 db.query("INSERT INTO reponses (reponse, boolean ,id_question) VALUES(?, 0 ,?) ", [questionReps[i][1][j], idQuestion], async  function(errore, responses ){
                   if(errore){
                     // res.json({msg : errore})
                     console.log(errore );
                   }else{
                    //  res.json({ msg: "Quiz inserted successfully" ,responses});
                    // console.log(responses);
                    // console.log(questions);
                    // const result = await Promise.resolve({responses})
                    // return res.json(result)
                   }
                  
                 })
               }
            }
            // const questionss = await Promise.resolve({questions})
            // return res.json(questionss)

          }
        })
      } 
      const leQuiz = await Promise.resolve({result})
      return res.json(leQuiz)
    }
  })

}



module.exports.quizUser = function (req, res) {
  let idAdmin = req.body.idUser

  db.query("SELECT id, name, id_admin, id_thématique FROM quiz WHERE id_admin = ?",[idAdmin], function(err, rows){
    if (err) {
      throw err
    }else{
      res.json({msg: "Quiz  récupérés avec succès", quizz: rows})
    }
  })
}

module.exports.SupprimerQuiz = function(req, res){
  let idQuiz = req.body.idQuizz

  db.query("DELETE q, qu, r  FROM `quiz` q JOIN questions qu ON q.id = qu.id_quiz JOIN reponses r ON qu.id = r.id_question WHERE q.id = ?", [idQuiz], function(err, deleted){
    if(err){
      throw err
    }else{
      res.json({msg: "Quiz supprimé avec succès", delete:deleted})
    }
  })
}



module.exports.ModifierQuiz  = function(req, res){
  let idQuiz = req.body.idQuizz

  db.query("SELECT id, thématique FROM thématiques ", function (err, tems) {
    if (err) {
      res.json({ msg: "error" });
    } else {
      // res.json({ msg: "success", thema: rows }); 
      db.query(
    "SELECT q.id as id_quest, q.question, q.id_quiz, qu.id as id_quizz, qu.name, qu.id_thématique, t.id as id_them, t.thématique FROM questions q JOIN quiz qu ON q.id_quiz = qu.id JOIN thématiques t ON qu.id_thématique = t.id WHERE id_quiz =  ?",
    [idQuiz],
    function (err, rows) {
        if (err) {
            res.json({ msg: "error" });
        } else {
      const quests = rows;
      let l = [];
      for (i in quests) {
        l.push(quests[i].id_quest);
      }
      async function answers(indexQuest) {
        let rep = await   db.query(
        "SELECT id, reponse, boolean, id_question FROM reponses WHERE id_question IN (?)",
        [indexQuest],
        function (err, reps) {
          if (err) {
            res.json({ msg: "error" });
            console.log(msg);
          } else {
             res.json({ msg: "success",  quests,  reps, tems});
          }

        }
        );
        return rep
      }
      answers(l)
    }
    }
  );
    }
    
  });
  
}


module.exports.UpdateQuiz = function(req,res){
  let idTems = req.body.idCate
  let quizName = req.body.NameQuiz
  let idQuiz = req.body.idQuizz
  let quests = req.body.questions
  let reps = req.body.reponsess


  db.query("UPDATE quiz SET name = ?, id_thématique = ? WHERE id = ?", [quizName, idTems , idQuiz], async function(err,result){
    if(err){
      
      console.log(err);
    }else{
      for(let i = 0; i < quests.length; i++){
        db.query("UPDATE questions SET question = ? WHERE id = ?", [quests[i][0], quests[i][1]], async function(error, questions){
          if(error){
            console.log(error );
          }else{
        
          }
        })
      }
      for(let x = 0; x < reps.length; x++){
        db.query("UPDATE reponses SET reponse = ? WHERE id = ?", [reps[x][0], reps[x][1]], async function(error, reponse){
          if(error){
            console.log(error);
          }else{
        
          }
        })
      } 
      const leQuiz = await Promise.resolve({result})
      return res.json(leQuiz)
    }
  })


}









// DELETE q, qu, r  FROM `quiz` q JOIN questions qu ON q.id = qu.id_quiz JOIN reponses r ON qu.id = r.id_question WHERE q.id = 1
















