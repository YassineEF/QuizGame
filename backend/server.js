let express = require("express");
let cors = require("cors");
let app = express();
let categoryRouter = require("./routes/category.routes");
let userRouter = require("./routes/user.routes");
let {chekAuto} = require("./middleware/auth");
let cookieParser = require('cookie-parser')


//Middelwares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())


//ROUTE CATEGORY
app.use("/", categoryRouter);
app.use("/CategoryQuiz:CategoryID", categoryRouter);
app.use("/QuizQuestion:idQuiz", categoryRouter);

//ROUTE USER
// app.use("/", userRouter);
app.use("/"  , chekAuto ,userRouter );






app.listen(3000);

module.exports = app;
