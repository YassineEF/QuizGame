const menuButton = document.querySelector('.menu-btn');
const hamburger = document.querySelector('.menu-btn_burger');
const nav = document.querySelector('.nav');
const menuNav = document.querySelector('.menu-nav');
const navItems = document.querySelectorAll('.menu-nav_item');

const signUpButton = document.getElementById('signUpGhost');
const signInButton = document.getElementById('signInGhost');
const container = document.getElementById('container');


let showMenu = false;

//Listener on burger click
menuButton.addEventListener('click', toggleMenu);


//fonction qu'ouvre le burger
function toggleMenu(){
    if(!showMenu){
        hamburger.classList.add('open');
        nav.classList.add('open');
        menuNav.classList.add('open');
        navItems.forEach(item => item.classList.add('open')); 
        
        showMenu = true;
    }else{
        hamburger.classList.remove('open');
        nav.classList.remove('open');
        menuNav.classList.remove('open');
        navItems.forEach(item => item.classList.remove('open')); 

        showMenu = false;
    }
}

// animation du titre h1 page d'accueil

var textWrapper = document.querySelector(".bienvenue");
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g,"<span class='letter'>$&</span>");
anime
  .timeline({ loop: true })
  .add({
    targets: ".bienvenue .letter",
    opacity: [0, 1],
    easing: "easeInOutQuad",
    duration: 2250,
    delay: (el, i) => 150 * (i + 1),
  })
  .add({
    targets: ".bienvenue",
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    // delay: 100000,
    delay: 100,
});

// animation page des scores - titre h1
anime
  .timeline({ loop: true })
  .add({
    targets: "#h1-scorePage .decouvre",
    scale: [14, 1],
    opacity: [0, 1],
    easing: "easeOutCirc",
    duration: 1200,
    delay: (el, i) => 800 * i,
  })
  .add({
    targets: "#h1-scorePage",
    opacity: 0,
    duration: 5000,
    easing: "easeOutExpo",
    delay: 1000000,
  });


// Switch panel button
// signUpButton.addEventListener('click', () => {
// 	container.classList.add("right-panel-active");
// });

// signInButton.addEventListener('click', () => {
// 	container.classList.remove("right-panel-active");
// });


// let dropdown = document.getElementById("dropdown");
// let sousMenuNav = document.querySelector(".sousmenu-nav");
// dropdown.addEventListener("click", function () {
//           if (sousMenuNav.classList.contains("hidden") === true) {
//             sousMenuNav.classList.remove("hidden");
//             sousMenuNav.classList.remove("visible");
//           } else {
//             sousMenuNav.classList.add("hidden");
//           }
//         },
//         false
//       );