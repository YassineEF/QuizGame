let db = require("../config/db");
let bcrypt = require("bcrypt")

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
