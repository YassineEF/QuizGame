//FONCTION
function HeaderPrincipale(){
    let user = Cookies.get('token')
    if (user) {

        $(".menu-nav").html(` <li class="menu-nav_item">
        <a href="#" class="menu-nav_link" id="dropdown"> QUIZ </a>
        <ul class="sousmenu-nav hidden">
        <li class="liSousmenu-nav" id="1"><a href="#" class="sousmenu-nav_link">Culture Générale</a></li>
        <li class="liSousmenu-nav" id="2"><a href="#" class="sousmenu-nav_link">Arts</a></li>
        <li class="liSousmenu-nav" id="3"><a href="#" class="sousmenu-nav_link">Sciences</a></li>
        <li class="liSousmenu-nav" id="4"><a href="#" class="sousmenu-nav_link">Sports</a></li>
        <li class="liSousmenu-nav" id="5"><a href="#" class="sousmenu-nav_link">Géographie</a></li>
        <li class="liSousmenu-nav" id="6"><a href="#" class="sousmenu-nav_link">Histoire</a></li>
        </ul>
      </li>
        <li class="menu-nav_item">
          <a href="#" id="profile" class="menu-nav_link"> PROFILE </a>
        </li>
        <li class="menu-nav_item">
          <a href="#" id="logout" class="menu-nav_link"> SE DECONNECTER</a>
        </li>`)

    }else{
         $(".menu-nav").html(` <li class="menu-nav_item">
         <a href="#" class="menu-nav_link" id="dropdown"> QUIZ </a>
         <ul class="sousmenu-nav hidden">
            <li class="liSousmenu-nav" id="1"><a href="#" class="sousmenu-nav_link">Culture Générale</a></li>
            <li class="liSousmenu-nav" id="2"><a href="#" class="sousmenu-nav_link">Arts</a></li>
            <li class="liSousmenu-nav" id="3"><a href="#" class="sousmenu-nav_link">Sciences</a></li>
            <li class="liSousmenu-nav" id="4"><a href="#" class="sousmenu-nav_link">Sports</a></li>
            <li class="liSousmenu-nav" id="5"><a href="#" class="sousmenu-nav_link">Géographie</a></li>
            <li class="liSousmenu-nav" id="6"><a href="#" class="sousmenu-nav_link">Histoire</a></li>
         </ul>
       </li>
        <li class="menu-nav_item">
          <a href="#" id="inscrire" class="menu-nav_link"> S'INSCRIRE </a>
        </li>
        <li class="menu-nav_item">
          <a href="#" id="connect" class="menu-nav_link"> SE CONNECTER </a>
        </li>`)
    }
   
}

let dropdown = document.getElementById("dropdown");
let sousMenuNav = document.querySelector(".sousmenu-nav");
$(document).on("click", "#dropdown",function () {
          if ($(".sousmenu-nav").hasClass("hidden") === true) {
            
            $(".sousmenu-nav").removeClass("hidden")
            $(".sousmenu-nav").removeClass("visible")
          } else {
            $(".sousmenu-nav").addClass("hidden")
        }
        false
    })

//Fonction Page d'acceuil
function showAcceuil(len,resp) {
    //Cacher le overlay pour le show apres
    $("#overlay_inscription").hide();
    $("#overlay-QuizQuest").hide();
    $("#topQuizQuest").hide();
    $("#container").hide();
    $(".questRep-QuizQuest").hide()
    $("#pagePerso").hide()
    $("#table-scorePage").hide()
    $("#creationQuiz").hide()
    $("#creationQuiz").hide()
    // $(".questRep-QuizQuest").show()
    //Montrer les categories
    for (let i = 0; i < len; i++) {
      $(".categories").append(`<div class="categorie_image" id="${resp.thema[i].id}"><img src="./images/${resp.thema[i].id}.jpg" alt="img Categories">
              <p class="centered">${resp.thema[i].thématique}</p></div>`);
    }

}

// 

//Cacher la page Acceuil et show le overlay
function hideAcceuil() {
  $(".categories").hide();
  $(".titre").hide();
  $("#overlay_inscription").show();
  $("#overlay_inscription").html(
    ` <h2 id="overlay_text">Pour conserver tes scores et comparer avec les autres joueurs, inscris-toi !</h2>`
  );
  $("#table-scorePage").hide()
  //Montrer qu'il peux s'inscrire pendant 4s
  setTimeout(function () {
    $("#overlay_text").hide();
  }, 4000); //4000
  $("#creationQuiz").hide()
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
  $("#table-scorePage").hide()
  $("#creationQuiz").hide()
}

// Creér le numero de question dans le quiz
function creationQuestionNumber(len){
    $("#ul-compteurQuest-QuizQuest").empty().show()
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



 

let time= 0
function timer(scores, mins, secs, numeroQuest) {
  const departMinutes = 3;
  let temps = departMinutes * 60;

  const timerElement = document.getElementById("timeInNumbers-QuizQuest");

  time = setInterval(() => {
    let minutes = 0;
    let secondes = 0;
    minutes = parseInt(temps / 60, 10);
    secondes = parseInt(temps % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    secondes = secondes < 10 ? "0" + secondes : secondes;

    timerElement.innerText = `${minutes}:${secondes}`;
    temps = temps <= 0 ? 0 : temps - 1;
    localStorage.setItem("temps", temps);
    if (temps == 0 && secondes == 0) {
      clearInterval(time);
      counterQuest = 0;
      let score = 0;
      score = localStorage.getItem("score");
      let numeroQuest = localStorage.getItem("numeroQuest");

      scoreTable(score, temps, numeroQuest);
      // scoreTable(score,minutes,secondes,numeroQuest)
      $("#bravoDomm-QuizQuest").empty();
    }
  }, 1000); //1000
 //function stopTimer() {
   //clearInterval(time);
}



// Function show tableau de score
function scoreTable(response, scores, temp, numeroQuest) {
  // function scoreTable(scores, mins,secs,numeroQuest) {
  $("header").show();
  $("#topQuizQuest").hide();
  $(".questRep-QuizQuest").hide();
  $("#creationQuiz").hide()
  $("#score").empty();
  $("#score").append(
    `<h1 id="h1-scorePage">DÉCOUVRE TES SCORES <br /> & <br />CEUX DES AUTRES JOUEURS</h1>`
  );
  if (scores <= 3) {
    $("#score").append(
      `<h2 id="h2-scorePage"> Ne baisse jamais les bras ! Recommence !  </h2>`
    );
  } else if (scores <= 6) {
    $("#score").append(
      `<h2 id="h2-scorePage"> Bravo ! Je suis sûre que tu peux encore augmenter ton score ! </h2>`
    );
  } else if (scores <= 8) {
    $("#score").append(`<h2 id="h2-scorePage">Félicitations !!! </h2>`);
  } else {
    $("#score").append(
      `<h2 id="h2-scorePage">BRAVO ! Tu es vraiment doué(e) ! </h2>`
    );
  }
  $("#score").append(
    ` <div id="scoresJoueur-scorePage"><h3 id="rpJustes-scorePage">Tu as obtenu <span id="scoreSurDix-scorePage"> ${scores} </span> / ${numeroQuest} en <span id="tempsQuiz-scorePage"> ${180 - temp}</span> sec </h3></div>`
  );
 
  $("#score").append(`<div class="buttons-scorePage">
    <a class="buttonChoisisQ-scorePage" href="#">CHOISIS UN AUTRE QUIZ</a><br/><a class="buttonChoisis-scorePage" href="#">CHOISIS UNE AUTRE THÉMATIQUE</a></div>`);
    $("#table-scorePage").show()
    for(let i = 0; i < response.result.length; i++){
        $("#table-scoreP").append(`<tr class="tr-oddRow-scorePage">
            <th class="oddRow-scorePage">${response.result[i].username}</th>
            <th class="oddRow-scorePage">${response.result[i].score}</th>
            <th class="oddRow-scorePage">${response.result[i].timer}</th>
        </tr>`)
        }
} 
  

function ShowInscription() {
    $("#container").show();
    $("#sign-up-container").show();
    $("#sign-in-container").hide();
    $(".categories").hide();
    $(".titre").hide();
    $(".questRep-QuizQuest").hide()
    $("#titre_thematique").hide()
    $("#grid_thematique").hide()
    $("#h1-scorePage").hide()
    $("#h2-scorePage").hide()
    $("#scoresJoueur-scorePage").hide()
    $(".buttons-scorePage").hide()
    $("#creationQuiz").hide()
}

function ShowConnection() {
    $("#container").show();
    $("#sign-in-container").show();
    $("#sign-up-container").hide();
    $(".categories").hide();
    $(".titre").hide();
    $(".questRep-QuizQuest").hide()
    $("#titre_thematique").hide()
    $("#grid_thematique").hide()
    $("#h1-scorePage").hide()
    $("#h2-scorePage").hide()
    $("#scoresJoueur-scorePage").hide()
    $(".buttons-scorePage").hide()
    $("#creationQuiz").hide()
}

function PagePerso(response){
    $("#titrePagePerso").append(`<h1 id="bonjourPagePerso">Bonjour <span id="spanBonjourPagePerso">${response.user[0].username}</span> ! </h1>
    <h1 id="bienvenuePagePerso">Bienvenue sur ton espace perso QuiZo !</h1>`)
    if(response.scores.length === 0){
        alert("Premiere connection, commence à jouer pour voir tes scores")
    }else{
        for (let i = 0; i < response.scores.length; i++) {   
            $("#table-profile").append(`<tr class="tr-oddRow-pagePerso">
            <th class="oddRow-pagePerso">${response.scores[i].date}</th>
            <th class="oddRow-pagePerso">${response.scores[i].name}</th>
            <th class="oddRow-pagePerso">${response.scores[i].score}</th>
            <th class="oddRow-pagePerso">${response.scores[i].timer}secs</th>
            </tr>`) 
        }
    }
}

function ShowProfile() {
    $("#container").hide();
    $("#sign-in-container").hide();
    $("#sign-up-container").hide();
    $(".categories").hide();
    $(".titre").hide();
    $(".questRep-QuizQuest").hide()
    $("#titre_thematique").hide()
    $("#grid_thematique").hide()
    $("#h1-scorePage").hide()
    $("#h2-scorePage").hide()
    $("#scoresJoueur-scorePage").hide()
    $(".buttons-scorePage").hide()
    $("#table-scorePage").hide()
    $("#pagePerso").show()
    $("#creationQuiz").hide()
}

function ShowCreationQuiz(response, len){
    $("#container").hide();
    $("#sign-in-container").hide();
    $("#sign-up-container").hide();
    $(".categories").hide();
    $(".titre").hide();
    $(".questRep-QuizQuest").hide()
    $("#titre_thematique").hide()
    $("#grid_thematique").hide()
    $("#h1-scorePage").hide()
    $("#h2-scorePage").hide()
    $("#scoresJoueur-scorePage").hide()
    $(".buttons-scorePage").hide()
    $("#table-scorePage").hide()
    $("#pagePerso").hide()
    $("#creationQuiz").show()
    $("#question_reponses").empty()
    for (let i = 0; i < 10; i++) {
        $("#question_reponses").append(`<input type="text" name="question" class="questionCreation" id="${i}" value="" placeholder="Question ${i + 1}" /><br>
        
        <input type="text" name="rep_incorrecte" class="rep_incorrecte" id="${i}" data-true="1" placeholder="Ecrire içi la reponse correcte" />
        <br>
        
        
        <input type="text" name="rep_incorrecte" class="rep_incorrecte"  id="${i}" data-true="0" placeholder="A renseigner" />
        <br>
        
        
        <input type="text" name="rep_incorrecte" class="rep_incorrecte" id="${i}" data-true="0" placeholder="A renseigner" />
        <br>
        
        
        <input type="text" name="rep_incorrecte" class="rep_incorrecte"  id="${i}" data-true="0" placeholder="A renseigner" />
        <br><br><br>`)
    }for (let z = 0; z < len; z++) {
        $("#menu_thematique").append(`<option value="${response.thema[z].id}">${response.thema[z].thématique}</option>`)
        
    }
}

// Page acceuil et Category
$(document).ready(function () {
    HeaderPrincipale()
    $.ajax({
        url: "http://127.0.0.1:3000",
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (res) {
            let length = res.thema.length;
            showAcceuil(length,res)
            $("#pagePerso").hide()
        },
    });
});

$("#logo").on("click", function (e) {
    HeaderPrincipale()
    $(".categories").show();
    $(".titre").show();
    $(".questRep-QuizQuest").hide()
    $("#titre_thematique").hide()
    $("#grid_thematique").hide()
    $("#h1-scorePage").hide()
    $("#h2-scorePage").hide()
    $("#scoresJoueur-scorePage").hide()
    $(".buttons-scorePage").hide()
    $("#container").hide();
    $("#sign-up-container").hide();
    $("#pagePerso").hide()
    $("#creationQuiz").hide()
})


$(document).on("click", ".buttonChoisis-scorePage, .buttonChoisis-pagePerso", function(e){
    e.preventDefault()
    HeaderPrincipale()
    $("#background_img").show()
    $(".categories").show();
    $(".titre").show();
    $("#h1-scorePage").hide()
    $("#h2-scorePage").hide()
    $("#scoresJoueur-scorePage").hide()
    $(".buttons-scorePage").hide()
    $(".questRep-QuizQuest").hide();
    $("#pagePerso").hide()
    $("#creationQuiz").hide()
    localStorage.clear();
    let counterQuest = 0;
})
// Page quiz par thématiques
$(document).ready(function () {
  $(document).on("click", ".categorie_image, .liSousmenu-nav", function (e) {
    e.preventDefault();
    HeaderPrincipale()
    $("#background_img").show()
    $("#container").hide();
    $("#sign-up-container").hide();
    $("#sign-in-container").hide();
    $("#pagePerso").hide()
    $("#creationQuiz").hide()
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
        $("#background_img").show()
        //montrer la photode la category
        $("#titre_thematique").html(
          ` <div id="background_img"> <img src="./images/${res.cat.id}.jpg" alt="img Categories"> <p class="centered">${res.cat.thématique}</p></div>`
        );
        $("#grid_thematique").empty().show()
        //Montrer le liste de quiz
        for (let i = 0; i < length; i++) {
          $("#grid_thematique").append(` 
                        <div class="quiz_div" id="${res.quiz[i].id}"> 
                            <p class="centered_Quiz">${res.quiz[i].name}</p>
                             <img src="./images/symbole.png" alt= ? />
                        </div>`);
        }
        let counterQuest = 0;
      },
    });
  });
});


$(document).on("click", ".buttonChoisisQ-scorePage", function(e){
    e.preventDefault()
    HeaderPrincipale()
    $("#pagePerso").hide()
    $("#background_img").show();
    $("#grid_thematique").show();
        $("#h1-scorePage").empty()
        $("#h2-scorePage").empty()
        $("#scoresJoueur-scorePage").hide()
        $(".buttons-scorePage").hide()
        $(".questRep-QuizQuest").hide();
        localStorage.clear();
        let counterQuest = 0;
})



//Lancement du jeu
$(document).ready(function () {
  $(document).on("click", ".quiz_div", function (e) {
    e.preventDefault();
    HeaderPrincipale()
    $("#pagePerso").hide()
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
            let counterQuest = null
            counterQuest = 0;
            // let counterQuest = 0;
            
            // Counter Questions
            let numeroQuestion = results.length;
             localStorage.setItem("numeroQuest", numeroQuestion)
            creationQuestionNumber(numeroQuestion)

            // onclick START overlay
            async function StartGame(){
                let go = await $(document).on("click", "#overlay-start",  function () {
                    $("header").hide()
                    clearInterval(time)
                    timer()
                    if (counterQuest !== numeroQuestion) {
                        //HIDE start button and show question and answers  
                        $("#overlay-QuizQuest").hide();
                        //Show thématique and name of quiz   
                        $(".thematText-QuizQuest").html(res.quests[0].thématique);
                        $(".quizName-QuizQuest").html(res.quests[0].name);
                        //Show the first question  

                        $(".quest").html(`<div class="question-QuizQuest">${results[counterQuest][0]}</div>`);
                        //show the first 4 answers
                        $(".gridContainer-QuizQuest").empty().show()
                        for (let i = 1; i < results[1].length; i++) {
                                $(".gridContainer-QuizQuest").append(    
                                `<div class="grid-itemQq" id="${results[counterQuest][i][1]}">${results[counterQuest][i][0]}</div>`
                                );
                        }
                        counterQuest++;
                    }
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
                   
                    let li = document.querySelectorAll(".li-numeroQuest-QuizQuest");
                    li[counterQuest - 1].style.background = "green";
                } 
                else {
                    $("#bravoDomm-QuizQuest").html(`<p class="dommage-QuizQuest">DOMMAGE !</p>`);
                    $(".grid-itemQq").css("pointer-events", "none");   
                    let li = document.querySelectorAll(".li-numeroQuest-QuizQuest");
                    li[counterQuest - 1].style.background = "orange";
                }
                localStorage.setItem("score", points);
                setTimeout(() => {
                    if (counterQuest !== numeroQuestion) {
                        $("#bravoDomm-QuizQuest").empty();
                        $(".quest").html(`<div class="question-QuizQuest">${results[counterQuest][0]}</div>`);
                        $(".gridContainer-QuizQuest").empty().show()
                        for (let i = 1; i < results[1].length; i++) {
                            $(".gridContainer-QuizQuest").append(`<div class="grid-itemQq" id="${results[counterQuest][i][1]}">${results[counterQuest][i][0]}</div>`);
                        }
                        counterQuest++;
                    }
                }, 1000); //2000
                // Get the item in the local storage
                let score = localStorage.getItem("score");
                let temps = localStorage.getItem("temps")
                let timer = 180 - temps
                if (counterQuest === numeroQuestion) {
                    let user = Cookies.get('token')
                    if(user){
                        let idUser = sessionStorage.getItem('idUser');
                        console.log(score);
                        $.ajax({
                            url: "http://127.0.0.1:3000/InsertScore",
                            type: "POST",
                            data: JSON.stringify({
                                "score": score, 
                                "quizId": quizzID, 
                                "temps": timer,
                                "idUser" :  idUser
                            }),
                            contentType: 'application/json',
                            processData: false,
                            dataType: "json",
                            success: function (res) {

                            },
                            error: function(datas) {
                                console.log(datas);
                            } 
                          
                        })
                    }
                    $.ajax({
                        url: "http://127.0.0.1:3000/ScoreScreen",
                        type: "POST",
                        data: JSON.stringify({
                            "quizId": quizzID
                        }),
                        contentType: 'application/json',
                        processData: false,
                        dataType: "json",
                        success: function (res) {
                            setTimeout(() => {
                            clearInterval(time)
                            scoreTable(res,score,temps,numeroQuestion)
                            $("#bravoDomm-QuizQuest").empty()
                            $(document).off("click", ".grid-itemQq");
                            counterQuest = 0
                            points = 0
                            localStorage.clear();
                        }, 2000);
                        },
                        error: function(datas) {
                            alert(datas.responseText);
                        } 
                      
                    })
                    
                    
                }
            });
        },
        });
        return callIdQuiz
    }
    quizGame(quizzID)
  });
});

// Inscription
$(document).ready(function () {
    $(document).on("click","#inscrire,  #inscriptionAcc",function (e) {
        e.preventDefault();
        ShowInscription();
        $("#pagePerso").hide()
    } )
})

$(document).ready(function (){
    $("#inscription").on("click", function(e){
        e.preventDefault();
        $("#pagePerso").hide()
        localStorage.clear()
        let username =  $("#pseudo").val()
        let email = $("#email").val()
        let password = $("#password").val()
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
                    alert("Now you have an account")
                    $("#sign-in-container").show();
                    $("#sign-up-container").hide();
                    
                },
                error: function(datas) {
                    alert(datas.responseText);
                } 
              
            })
        }
    })
    
})


// Connection
$(document).ready(function () {
    $(document).on("click", "#connect, #dejaCompte_signUpContainer" ,function (e) {
        e.preventDefault();
        ShowConnection();
        $("#pagePerso").hide()
    })
})


$(document).ready(function (){
    $("#connection").on("click", function(e){
        e.preventDefault();
        $("#pagePerso").hide()
        localStorage.clear()

        let username =  $("#pseudoConn").val()
        let password = $("#passwordConn").val()
            $.ajax({
                type: "POST",
                url: "http://127.0.0.1:3000/Connection",
                data: JSON.stringify({
                    "Username": username, 
                    "Password": password 
                }),
                contentType: 'application/json',
                processData: false,
                dataType: "json",
                success: function (res) {
                    let idUser = res.user[0].id;
                    sessionStorage.setItem('idUser', idUser)
                    Cookies.set('token', res.token);
                    HeaderPrincipale()
                    PagePerso(res)
                    $("#container").hide()
                    $("#pagePerso").show()
                    // location.reload()
                },
                error: function(datas) {
                    alert(datas.responseText);
                } 
              
            })
    })
    
})

$(document).ready(function(){
    $(document).on("click",  "#profile", function(e){
        e.preventDefault();
        ShowProfile()

    })
})


$(document).ready(function(){
    $("#buttonCreeQuiz-pagePerso").on("click", function(e){
        e.preventDefault();
        
        $.ajax({
            url: "http://127.0.0.1:3000",
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                let length = res.thema.length;
                ShowCreationQuiz(res, length)
            },
        });
    });
})




$(document).ready(function(){
    $("#sendQuiz").on("click", function(e){
        e.preventDefault();
        let themaId  = $("#menu_thematique").val()
        let empty = true
        if(!$("#nomQuiz").val()){
            alert('Inserer tout le champ')

        }else{ 
            
            
            $('.questionCreation').each(function() {
                if ($(this).val() == "") {
                alert('Inserer tout le champ')
                return false;
                }else{
                    $('.rep_incorrecte').each(function() {
                        if ($(this).val() == "") {
                        alert('Inserer tout le champ')
                        return false;
                        }else{
                            empty = false
                        }
                        
                    
                    });
                }
            })
        }
        if (empty === false) {
            let questReps = []
            $(".questionCreation").each(function (index){
                questReps.push([])
                questReps[index].push($(this).val())
                questReps[index].push([])
                for(let i = index*4; i < (index*4)+4; i++){
                    questReps[index][1].push($(".rep_incorrecte").eq(i).val())
                }
            })
            let idUtilisateur = sessionStorage.getItem('idUser')
            let nomQuizz = $("#nomQuiz").val() 

            $.ajax({
                type: "POST",
                url: "http://127.0.0.1:3000/creationQuiz",
                data: JSON.stringify({
                    "NameQuiz": nomQuizz, 
                    "idUser": idUtilisateur,
                    "idCate": themaId,
                    "questReps": questReps
                }),
                contentType: 'application/json',
                processData: false,
                dataType: "json",
                success: function (res) {
                    console.log(res);
                },
                error: function(datas) {
                    alert(datas.responseText);
                } 
                        
            })  
        }
  
    });
})













        // let idQuizQuest = []

        // $(".questionCreation").each(function (){
        //     idQuizQuest.push(this.id)
        // })
        
        // console.log(idQuizQuest);
        // let idQuizReps = []

        // $(".rep_incorrecte").each(function (){
        //     idQuizReps.push(this.id)
        // })
        


// let user = Cookies.get('token')
                    // if (user) {
                    //     console.log("1");
                    // }