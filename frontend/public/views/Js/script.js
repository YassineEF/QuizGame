//FONCTION


//Fonction Page d'acceuil
function showAcceuil(len,resp) {
    //Cacher le overlay pour le show apres
    $("#overlay_inscription").hide();
    $("#overlay-QuizQuest").hide();
    $("#topQuizQuest").hide();
    $("#container").hide();
    $(".questRep-QuizQuest").hide()
    $(".questRep-QuizQuest").show()
    //Montrer les categories
    for (let i = 0; i < len; i++) {
      $(".categories").append(`<div class="categorie_image" id="${resp.thema[i].id}"><img src="./images/${resp.thema[i].id}.jpg" alt="img Categories">
              <p class="centered">${resp.thema[i].thématique}</p></div>`);
    }
}

//Cacher la page Acceuil et show le overlay
function hideAcceuil() {
  $(".categories").hide();
  $(".titre").hide();
  $("#overlay_inscription").show();
  $("#overlay_inscription").html(
    ` <h2 id="overlay_text">Pour conserver tes scores et comparer avec les autres joueurs, inscris-toi !</h2>`
  );

  //Montrer qu'il peux s'inscrire pendant 4s
  setTimeout(function () {
    $("#overlay_text").hide();
  }, 1000); //4000
}


//Montrer les questions et l'overlay START
function showQuestions() {
  $("#background_img").hide();
  $("#grid_thematique").hide();
  $("#overlay_inscription").hide();
  $(".questRep-QuizQuest").show()
  $("#overlay-QuizQuest").show();
  $("#overlay-QuizQuest").html(`<p id="overlay-start">START</p>`);
  $("#topQuizQuest").show();
}

// Creér le numero de question dans le quiz
function creationQuestionNumber(len){
    for (let i = 1; i < len + 1; i++) {
        if (i <= 9) {
            $("#ul-compteurQuest-QuizQuest").append(
            `<li class="li-numeroQuest-QuizQuest" id="${i}">0${i}</li>`
            );
        } else {
            $("#ul-compteurQuest-QuizQuest").append(
            `<li class="li-numeroQuest-QuizQuest">${i}</li>`
            );
        }
    }
}

// fonction timer- QuizQuest
function timer(scores,mins,secs,numeroQuest){
    const departMinutes = 1
    let temps = departMinutes * 60

    const timerElement = document.getElementById("timeInNumbers-QuizQuest")

    setInterval(() => {
        let minutes = parseInt(temps / 60, 10)
        let secondes = parseInt(temps % 60, 10)


        localStorage.setItem("min", minutes)
        localStorage.setItem("sec", secondes)
        minutes = minutes < 10 ? "0" + minutes : minutes
        secondes = secondes < 10 ? "0" + secondes : secondes

        timerElement.innerText = `${minutes}:${secondes}`
        temps = temps <= 0 ? 0 : temps - 1
        localStorage.setItem("time", temps);
    }, 1000)  //1000
    
}


// Function show tableau de score
function scoreTable(scores, mins,secs,numeroQuest) {
    $("header").show()
    $("#topQuizQuest").hide();
    $(".questRep-QuizQuest").hide();
    $("main").append(`<h1 id="h1-scorePage">DÉCOUVRE TES SCORES <br /> & <br />CEUX DES AUTRES JOUEURS</h1>`);
    if(scores <= 3){
        $("main").append(`<h2 id="h2-scorePage"> T'es nul, apprends à lire et à écrire !</h2>`);
    }else if(scores <= 6){
        $("main").append(`<h2 id="h2-scorePage"> Tu commence à apprendre, maintenant t'as le niveau d'un singe</h2>`);
    } else if(scores <= 8){
        $("main").append(`<h2 id="h2-scorePage">Vous aussi suivez Grafikart?</h2>`);
    } else{
        $("main").append(`<h2 id="h2-scorePage">BRAVO ! Tu es vraiment doué(e) !</h2>`);
    }        
    $("main").append(` <div id="scoresJoueur-scorePage"><h3 id="rpJustes-scorePage">Tu as obtenu <span id="scoreSurDix-scorePage"> ${scores} </span> / ${numeroQuest} en <span id="tempsQuiz-scorePage"> ${mins} </span>min<span id="tempsQuiz-scorePage"> ${secs}</span> sec </h3></div>`);
    $("main").append(`<div class="buttons-scorePage"><a id="buttonRejoue-scorePage" href="#">REJOUE</a><br />
    <a class="buttonChoisis-scorePage" href="#">CHOISIS UN AUTRE QUIZ</a><br /><a class="buttonChoisis-scorePage" href="#">CHOISIS UNE AUTRE THÉMATIQUE</a></div>`);  
}

function ShowInscription() {
    $("#container").show();
    $(".categories").hide();
    $(".titre").hide();
    $(".questRep-QuizQuest").hide()
    $("#titre_thematique").hide()
    $("#grid_thematique").hide()
    $("#h1-scorePage").hide()
    $("#h2-scorePage").hide()
    $("#scoresJoueur-scorePage").hide()
    $(".buttons-scorePage").hide()
}

// Page acceuil et Category
$(document).ready(function () {
  $.ajax({
    url: "http://127.0.0.1:3000",
    type: "GET",
    contentType: "application/json",
    dataType: "json",
    success: function (res) {
      let length = res.thema.length;
      showAcceuil(length,res)
    },
  });
});

// Page quiz par thématiques
$(document).ready(function () {
  $(document).on("click", ".categorie_image", function (e) {
    e.preventDefault();
    let idCategory = $(this).attr("id");
    $.ajax({
      url: "http://127.0.0.1:3000/CategoryQuiz:CategoryID",
      type: "GET",
      contentType: "application/json",
      dataType: "json",
      data: { CategoryID: idCategory },
      success: function (res) {
        let length = res.quiz.length;
        //chacher le catgeory et thématiques et show le overlay
        hideAcceuil();
        //montrer la photode la category
        $("#titre_thematique").append(
          ` <div id="background_img"> <img src="./images/${res.cat.id}.jpg" alt="img Categories"> <p class="centered">${res.cat.thématique}</p></div>`
        );
        //Montrer le liste de quiz
        for (let i = 0; i < length; i++) {
          $("#grid_thematique").append(` 
                        <div class="quiz_div" id="${res.quiz[i].id}"> 
                            <p class="centered_Quiz">${res.quiz[i].name}</p>
                             <img src="./images/symbole.png" alt= ? />
                        </div>`);
        }
      },
    });
  });
});




//Lancement du jeu
$(document).ready(function () {
  $(document).on("click", ".quiz_div", function (e) {
    e.preventDefault();
    let quizzID = $(this).attr("id");
    async function quizGame(quizID){

        let callIdQuiz = await  $.ajax({
        url: "http://127.0.0.1:3000/QuizQuestion:idQuiz",
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        data: { idQuiz: quizID },
        success: function (res) {
            showQuestions();
            // put questions and answers in variables
            let { quests, reps } = res;
            let idQuest = [];
            // put in a emlpty array the id of the questions
            for (i in quests) {
                idQuest.push(quests[i].id_quest);
            }
            let results = [];
            //put questions, answers and boolean in a array
            for (j in idQuest) {
                results.push([quests[j].question]);
                for (k in reps) {
                    if (reps[k].id_question === idQuest[j]) {
                        results[j].push([reps[k].reponse, reps[k].boolean]);
                    }
                }
            }
            //variable to count the questions
            let counterQuest = 0;
            
            // Counter Questions
            let numeroQuestion = results.length;
            creationQuestionNumber(numeroQuestion)

            // onclick START overlay
            async function StartGame(){
                let go = await $(document).on("click", "#overlay-start",  function () {
                    $("header").hide()
                    // let score = localStorage.getItem("score");
                    // let min = localStorage.getItem("min")
                    // let sec = localStorage.getItem("sec")
                    timer()
                    
                        //HIDE start button and show question and answers  
                        $("#overlay-QuizQuest").hide();
                        //Show thématique and name of quiz   
                        $(".thematText-QuizQuest").append(res.quests[0].thématique);
                        $(".quizName-QuizQuest").append(res.quests[0].name);
                        //Show the first question   
                        $(".quest").append(`<div class="question-QuizQuest">${results[counterQuest][0]}</div>`);
                        //show the first 4 answers
                        for (let i = 1; i < results[1].length; i++) {
                                $(".gridContainer-QuizQuest").append(    
                                `<div class="grid-itemQq" id="${results[counterQuest][i][1]}">${results[counterQuest][i][0]}</div>`
                                );
                        }
                    counterQuest++;
                    });
                return go
            }
            StartGame()
            //variable to count the points
            let points = 0;
            $(document).on("click", ".grid-itemQq", function () {
                let valeurRep = $(this).attr("id");
                if (valeurRep === "1") {
                    $("#bravoDomm-QuizQuest").html(`<p class="bravo-QuizQuest">BRAVO !</p>`);
                    $(".grid-itemQq").css("pointer-events", "none");
                    points += 1;   
                } 
                else {
                    $("#bravoDomm-QuizQuest").html(`<p class="dommage-QuizQuest">DOMMAGE !</p>`);
                    $(".grid-itemQq").css("pointer-events", "none");     
                }
                localStorage.setItem("score", points);
                setTimeout(() => {
                    $("#bravoDomm-QuizQuest").html("");
                    $(".quest").html(`<div class="question-QuizQuest">${results[counterQuest][0]}</div>`);
                    $(".gridContainer-QuizQuest").html("");
                    for (let i = 1; i < results[1].length; i++) {
                        $(".gridContainer-QuizQuest").append(`<div class="grid-itemQq" id="${results[counterQuest][i][1]}">${results[counterQuest][i][0]}</div>`);
                    }
                    counterQuest++;
                }, 2000);
                // Get the item in the local storage
                let score = localStorage.getItem("score");
                let min = localStorage.getItem("min")
                let sec = localStorage.getItem("sec")
                if (counterQuest === numeroQuestion) {
                    setTimeout(() => {
                        scoreTable(score,min,sec,numeroQuestion)
                    }, 2000);
                }
                localStorage.clear();
            });
        },
        });
        return callIdQuiz
    }
    quizGame(quizzID)
  });
});


$(document).ready(function () {
    $("#inscrire").on("click", function (e) {
        e.preventDefault();
        ShowInscription();
    } )
})

$(document).ready(function (){
    $("#inscription").on("click", function(e){
        e.preventDefault();
        localStorage.clear()

        let    username =  $("#pseudo").val()
        let    email = $("#email").val()
        let  password = $("#password").val()
        let verifPassword = $("#verifPassword").val()
        // regexUsername
        let emailPattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i
        let usernamePattern = /^[a-zA-Z0-9_-]{5,15}$/;
        if(!usernamePattern.test(username) ){
            alert("Username Format incorrect, minimum 5 charcters and no symbols")
        }else if(!emailPattern.test(email)){
            alert("Email format invalid")
        }else if(password.length < 8){
            alert("Password length min 8 characters")
        }else if( password !== verifPassword){
            alert("Password not matching")
        }else{
            $.ajax({
                url: "http://127.0.0.1:3000/Inscription",
                type: "POST",
                data: JSON.stringify({
                    "Username": username, 
                    "Email": email, 
                    "Password": password 
                }),
                contentType: 'application/json',
                processData: false,
                dataType: "json",
                success: function (res) {
                    console.log(res);
                    
                },
                error: function(datas) {
                    console.log(datas.responseText);
                } 
              
            })
        }
    })
    
})