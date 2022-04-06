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



module.exports.creationQuiz = function(req, res, next){
  let nameQuiz = req.body.NameQuiz
  let idAdmin = req.body.idUser
  let idThema = req.body.idCate
  let questionReps = req.body.questReps

  db.query("INSERT INTO quiz (name, id_admin, id_thématique) VALUES (?, ?, ?) ", [nameQuiz,idAdmin, idThema], function(err,result){
    if(err){
      
      console.log(err);
    }else{
      let idQuiz = result.insertId;   
      for(let i = 0; i < questionReps.length; i++){
        db.query("INSERT INTO questions (question, id_quiz) VALUES(?,?) ", [questionReps[i][0], idQuiz], function(error, questions){
          if(error){
            console.log(error );
          }else{
            let idQuestion = questions.insertId
            for(let j = 0; j < questionReps[i][1].length ; j++){
              if(questionReps[i][1][j] === questionReps[i][1][0]){
                   db.query("INSERT INTO reponses (reponse, boolean ,id_question) VALUES(?, 1 ,?) ", [questionReps[i][1][j], idQuestion], function(errors, firstResponses){
                     if(errors){
                       console.log(errors);
                     }
                   })
                  }else{
                 db.query("INSERT INTO reponses (reponse, boolean ,id_question) VALUES(?, 0 ,?) ", [questionReps[i][1][j], idQuestion], function(errore, responses ){
                   if(errore){
                     // res.json({msg : errore})
                     console.log(errore );
                   }else{
                    //  res.json({ msg: "Quiz inserted successfully" ,responses});
                    // console.log(responses);
                    // console.log(questions);
                    res.status(200)
                   }
 
                 })
               }
            }
          }
        })
      } 
    }
  })

}




















