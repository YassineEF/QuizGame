let db = require("../config/db");
let bcrypt = require("bcrypt")

module.exports.InscriptionUser = async function  (req, res) {
    
    let Username = req.body.Username;
    let Email = req.body.Email
    let Password = req.body.Password
    let pwd =   await bcrypt.hash(Password,  await  bcrypt.genSaltSync(8))
   db.query(
    "INSERT INTO `admin` (`username`, `email`, `password`, `status`) VALUES (?, ?, ?, 1)",
    [Username, Email, pwd],
    function (err, rows) {
      if (err) {
        res.json({ msg: err });
      } else {
        res.json({ msg: "success", user: rows, });
      }
    }
  );
};
