//  console.log(res.thema[0].thématique);
//             // $.each(res.thema, function(key,value){
//                 $.map(res.thema, function(val, index){
                    
//                      $(".centered").append(val.thématique);    
//                 })
//             // })
        

$(document).ready(function(){
    $.ajax({
        url: "http://127.0.0.1:3000",
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function(res){
            let length = res.thema.length
            for(let i = 0; i < length; i++){
                $(".categories").append(`<div class="categorie_image" id="${res.thema[i].id}">
                <img src="./images/${res.thema[i].id}.jpg" alt="img Categories">
                <p class="centered">${res.thema[i].thématique}</p></div>`)
            }
            
        }   
    })
})





$(document).ready(function(){
    $(document).on("click", ".categorie_image", function (e) {
        e.preventDefault();
        let idCategory  = $(this).attr("id")
        // console.log(idCategory);
        $.ajax({
            url: "http://127.0.0.1:3000/CategoryQuiz:CategoryID",
            type: "GET",
            contentType: "application/json",
            dataType: "json", 
            data: {"CategoryID": idCategory},
            success: function (res) {
                let  length = res.quiz.length
                $(".categories").hide()
                $(".titre").hide()
                for(let i = 0; i < length; i++){

                    $("#quiz").append(`<p class="centered">${res.quiz[i].name}</p>`)
                }
            }
        })
    })
})






