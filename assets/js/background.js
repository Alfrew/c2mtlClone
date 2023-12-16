const BG_EL = document.querySelector(".background");
BG_WRAPPER_LIST = BG_EL.querySelectorAll(".background__wrapper");

setTimeout(() => {
  BG_WRAPPER_LIST[0].classList.add("background__wrapper--visible");
  BG_WRAPPER_LIST[1].classList.add("background__wrapper--visible");
}, 10);
