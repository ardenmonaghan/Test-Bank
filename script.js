"use strict";

// Modal JS
const modalXEl = document.querySelector(".modal-close");
const modal = document.querySelector(".modal");
const modalBackground = document.querySelector(".modal-background");
const heroSignUp = document.querySelector(".hero--sign");

// console.log(modalXEl, modal, modalBackground, heroSignUp);

function toggleHidden(e) {
  modal.classList.toggle("hidden");
  modalBackground.classList.toggle("hidden");
}

function toggleEscape(e) {
  // console.log(e.key);
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    modal.classList.add("hidden");
    modalBackground.classList.add("hidden");
  }
}
modalXEl.addEventListener("click", toggleHidden);
heroSignUp.addEventListener("click", toggleHidden);
modalBackground.addEventListener("click", toggleHidden);
document.addEventListener("keydown", toggleEscape);

// App JS

const AppMain = document.querySelector(".app");

// document.addEventListener("keydown", function (event) {
//   console.log(event.key);

//   if (event.key === "q") {
//     AppMain.classList.remove("hidden");
//     // AppMain.style.opacity = 100;
//   }
// });

// document.addEventListener("keydown", function (event) {
//   console.log(event.key);

//   if (event.key === "f") {
//     AppMain.style.opacity = 100;
//   }
// });
