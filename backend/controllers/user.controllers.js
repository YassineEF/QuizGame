let db = require("../config/db");
let bcrypt = require("bcryptjs")
let jwt = require("jsonwebtoken");
require('dotenv').config()

// console.log(process.env.JWT_SECRET)


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


module.exports.ConnectionUser = async function  (req, res) {
  let Username = req.body.Username;
  let Password = req.body.Password
  
  
  db.query("SELECT id, username, email, password FROM admin WHERE username = (?)", [Username], async function (err, rows) {
    
    if(rows.length === 0){
      res.status(401).send('Username or password are incorrect')
    }else{
      let pwd = await bcrypt.compare(Password, rows[0].password)
      if(pwd){
        if (err) {
          res.json({ msg: "error" });
        } else {
          res.json({ msg: "success, user found and logged", user: rows });
          // console.log(rows);
          let accessToken = jwt.sign( {rows}, process.env.JWT_SECRET, {expiresIn: '1800s'});
          res.send({accessToken})
        }
      }else{
        res.status(401).send('Username or password are incorrect')
      }
    }
    
  });
};