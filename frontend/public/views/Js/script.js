//  console.log(res.thema[0].thématique);
//             // $.each(res.thema, function(key,value){
//                 $.map(res.thema, function(val, index){
                    
//                      $(".centered").append(val.thématique);    
//                 })
//             // })
        
// Page acceuil et Category
$(document).ready(function(){
    $.ajax({
        url: "http://127.0.0.1:3000",
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function(res){
            $('#overlay_inscription').hide()
            let length = res.thema.length
            //Montrer les categories
            for(let i = 0; i < length; i++){
                $(".categories").append(`<div class="categorie_image" id="${res.thema[i].id}">
                <img src="./images/${res.thema[i].id}.jpg" alt="img Categories">
                <p class="centered">${res.thema[i].thématique}</p></div>`)
            }
            
        }   
    })
})




// Page quiz par thématiques
$(document).ready(function(){
    $(document).on("click", ".categorie_image", function (e) {
        e.preventDefault();
        let idCategory  = $(this).attr("id")
        $.ajax({
            url: "http://127.0.0.1:3000/CategoryQuiz:CategoryID",
            type: "GET",
            contentType: "application/json",
            dataType: "json", 
            data: {"CategoryID": idCategory},
            success: function (res) {
                let  length = res.quiz.length
                //chacher le catgeory et thématiques
                $(".categories").hide()
                $(".titre").hide()
                // show le overlay 
                $('#overlay_inscription').show()
                //montrer que le jouer peux se inscrire                
                setTimeout(function(){ 
                    $('overlay_text').hide()
                },4000);

                //montrer la photode la category
                $('#titre_thematique').append(` <div id="background_img"> <img src="./images/${res.cat.id}.jpg" alt="img Categories"> <p class="centered">${res.cat.thématique}</p></div>`)
                //Montrer le liste de quiz
                for(let i = 0; i < length; i++){
                    $('#grid_thematique').append(` 
                        <div class="quiz_div" id="${res.quiz[i].id}"> 
                            <p class="centered_Quiz">${res.quiz[i].name}</p>
                             <img src="./images/symbole.png" alt= ? />
                        </div>`
                    )    
                }
            }
        })
    })
})



{/* <div class="quiz_div" id="${res.quiz[i].id}"> 
<p class="centered_Quiz">${res.quiz[i].name}</p>
 <img src="./images/symbole.png" alt= ? />
</div>` */}




