//Fonction

//Cacher la page Acceuil et show le overlay
function hideAcceuil() {
  $(".categories").hide();
  $(".titre").hide();
  $("#overlay_inscription").show();
  //Montrer qu'il peux s'inscrire pendant 4s
  setTimeout(function () {
    $("#overlay_text").hide();
  }, 1000); //4000
}


// fonction timer- QuizQuest
function timer(){
    const departMinutes = 1
    let temps = departMinutes * 60
    
    const timerElement = document.getElementById("timeInNumbers-QuizQuest")
    
    setInterval(() => {
      let minutes = parseInt(temps / 60, 10)
      let secondes = parseInt(temps % 60, 10)
    
      minutes = minutes < 10 ? "0" + minutes : minutes
      secondes = secondes < 10 ? "0" + secondes : secondes
    
      timerElement.innerText = `${minutes}:${secondes}`
       temps = temps <= 0 ? 0 : temps - 1
       if(temps === 0){
        //   fonction  fin jeu

       }
       
    }, 1000)
}


// Page acceuil et Category
$(document).ready(function () {
  $.ajax({
    url: "http://127.0.0.1:3000",
    type: "GET",
    contentType: "application/json",
    dataType: "json",
    success: function (res) {
      //Cacher le overlay popur le show apres
      $("#overlay_inscription").hide();
      $("#overlay-QuizQuest").hide();
      $("#topQuizQuest").hide();
      let length = res.thema.length;
      //Montrer les categories
      for (let i = 0; i < length; i++) {
        $(".categories")
          .append(`<div class="categorie_image" id="${res.thema[i].id}">
                <img src="./images/${res.thema[i].id}.jpg" alt="img Categories">
                <p class="centered">${res.thema[i].thématique}</p></div>`);
      }
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
    let quizID = $(this).attr("id");
    $.ajax({
      url: "http://127.0.0.1:3000/QuizQuestion:idQuiz",
      type: "GET",
      contentType: "application/json",
      dataType: "json",
      data: { idQuiz: quizID },
      success: function (res) {
        $("#background_img").hide();
        $("#grid_thematique").hide();
        $("#overlay_inscription").hide();
        $("#overlay-QuizQuest").show();
        $("#topQuizQuest").show();
       
        let {quests, reps} =  res
        let idQuest = []
        for(i in quests){
            idQuest.push(quests[i].id)
        }
        let results = []
        for(j in idQuest){
            results.push([quests[j].question])
            for(k in reps){
                if(reps[k].id_question === idQuest[j]){
                    results[j].push([reps[k].reponse, reps[k].boolean])
                }
            }
        }
        let counterQuest = 0;
        let points = 0;
        let numeroQuestion = results.length ;
        $("#overlay-start").on("click", function () {
                $("#overlay-QuizQuest").hide();
                timer()
                $(".quest").append(`<div class="question-QuizQuest">${results[counterQuest][0]}</div>`);
                for (let i = 1; i < results.length; i++) {  
                    $(".gridContainer-QuizQuest").append(`<div class="grid-itemQq" id="${results[counterQuest][i][1]}">${results[counterQuest][i][0]}</div>`);    
                }      
                counterQuest++
                
            });
            $(document).on("click", ".grid-itemQq", function () {
                let valeurRep = $(this).attr("id")
                if(valeurRep === "1"){
                    $("#bravoDomm-QuizQuest").html(`<p class="bravo-QuizQuest">BRAVO !</p>`)
                    $('.grid-itemQq').css('pointer-events','none');
                    points++
                }else{
                    $("#bravoDomm-QuizQuest").html(`<p class="dommage-QuizQuest">DOMMAGE !</p>`)
                    $('.grid-itemQq').css('pointer-events','none');
                }
                setTimeout(() => {
                    $("#bravoDomm-QuizQuest").html("")
                    $(".quest").html(`<div class="question-QuizQuest">${results[counterQuest][0]}</div>`);
                    $(".gridContainer-QuizQuest").html("");    
                    for (let i = 1; i < results.length; i++) {  
                        $(".gridContainer-QuizQuest").append(`<div class="grid-itemQq" id="${results[counterQuest][i][1]}">${results[counterQuest][i][0]}</div>`);    
                    }      
                    counterQuest++
                }, 2000);
                console.log(points);
                
                if(counterQuest === numeroQuestion){
                    localStorage.setItem("score", points);  
                    let score =  localStorage.getItem("score")
                    console.log(score);
                }
            })

            
      },
    });
  });
});




