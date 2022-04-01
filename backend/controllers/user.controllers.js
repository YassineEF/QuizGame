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
            let scoreUser =  db.query('SELECT id, score, timer, DATE_FORMAT( date, "%d-%m-%Y") , id_admin, id_quiz FROM score WHERE id_admin = ?',[idUser], function (err, scores){
              if (err) {
                res.json({ msg: "error" });
                console.log(err);
              } else {
                let accessToken = jwt.sign( {rows}, process.env.JWT_SECRET);
                res.cookie('token', accessToken  )
                // res.json({ msg: "success, user found and logged", user: rows, token:accessToken});
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





// let accessToken = jwt.sign( {rows}, process.env.JWT_SECRET);
//           // res.cookie('token', accessToken, { httpOnly: true, secure: true, SameSite: 'strict' , expires: new Date(Number(new Date()) + 30*60*1000) });
//           res.cookie('token', accessToken  )
//           res.json({ msg: "success, user found and logged", user: rows, token:accessToken});








// module.exports.CheckToken = verifyToken, function (req, res) {
 
//   res.send(req.user)
// }























// function authenticateToken(req,res,next) {
  
//   // const authHeader = req.headers.authorization
//   const token = req.headers                                                  //'Bearer 1oL0mKpN45FTR16gIu99Dz on fait comme ça pour recuperer l'index 1 notre cle 
//   // const token = req.headers['authorization']
//   console.log(token);
//   if (!token) {
//     return res.sendStatus(401)
//   }
  
//   jwt.verify(token, process.env.JWT_SECRET, (err, user) =>{
//     if(err) {
//       console.log("lolollo");
//       return res.sendStatus(401)
//     }
//       req.user = user;
//       next()
//   })
// }

// module.exports.CheckToken = authenticateToken, function (req, res) {
 
//   res.send(req.user)
// }

// // module.exports.CheckToken = (req, res, next) => {
// //   const token = req.cookies.jwt;
// //   if (token) {
// //     jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
// //       if (err) {
// //         res.locals.user = null;
// //         res.cookie("jwt", "", { maxAge: 1 });
// //         next();
// //       } else {
// //         let user = await userModel.findOne({
// //           where: { id_user: decodedToken.id_user },
// //         });
// //         console.log("hello");
// //         res.locals.user = user.id_user;
// //         console.log(user);
// //         next();
// //       }
// //     });
// //   } else {
// //     res.locals.user = null;
// //     next();
// //   }
// // };