let express = require("express")
let cors = require("cors")
let app = express()
let categoryRouter  = require("./routes/category.routes")

//Middelwares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


//ROUTE CATEGORY
app.use("/",categoryRouter)
app.use("/CategoryQuiz:CategoryID", categoryRouter)




app.listen(3000)

module.exports = app