

const jsMenu = document.querySelector(".burger__btn");
const nav = document.querySelector(".burger__menu");

jsMenu.onclick = function () {
  this.classList.toggle("burger__opened");
  this.classList.contains("burger__opened");
  nav.classList.toggle("burger__menu--active");
};