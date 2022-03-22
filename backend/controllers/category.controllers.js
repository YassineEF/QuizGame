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


module.exports.displayQuiz = function (req,res) {
    let CategoryID = req.query.CategoryID;
    db.query("SELECT id, name, photo, id_admin, id_thématique FROM quiz WHERE id_thématique = ?", [CategoryID],function (err, rows){
        if(err){
            res.json({ msg: "error" });
            
        } else {
            res.json({ msg: "success", quiz: rows });
        }
    })
}