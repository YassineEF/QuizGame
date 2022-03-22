let db  = require("../config/db")

module.exports.displayThématique = function (req, res) {
    db.query("SELECT id, thématique FROM thématiques ", function (err, rows) {
        if (err) {
            res.json({ msg: "error" });
            
        } else {
            res.json({ msg: "success", thema: rows });
        }
    });  
}


module.exports.displayQuiz =  function  (req,res) {
    let CategoryID = req.query.CategoryID;
     db.query("SELECT id, thématique FROM thématiques WHERE id = ?", [CategoryID],function  (err, cat){
        if(err){
            res.json({ msg: "error" });
        } else {
            db.query("SELECT quiz.id, quiz.name, quiz.id_admin, quiz.id_thématique FROM quiz WHERE id_thématique = ?", [CategoryID], function (err, rows) {
               if(err){
                   res.json({ msg: "error" });
                   
               } else {
                   res.json({ msg: "success", quiz: rows, cat:cat[0] });
               }
               
           })
        }
    })
}

