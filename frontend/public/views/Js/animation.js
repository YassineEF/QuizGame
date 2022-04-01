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