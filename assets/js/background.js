const BG_EL = document.querySelector(".background");
BG_WRAPPER_LIST = BG_EL.querySelectorAll(".background__wrapper");
LOGO_EL = document.querySelector(".logo-c2mtl");

setTimeout(() => {
  BG_WRAPPER_LIST[0].classList.add("background__wrapper--visible");
  BG_WRAPPER_LIST[1].classList.add("background__wrapper--visible");
  LOGO_EL.classList.add("logo-c2mtl--visible");
}, 10);
setTimeout(() => {
  LOGO_EL.classList.add("logo-c2mtl--bubble-animate");
}, 3000);

window.addEventListener("scroll", () => {
  animateBg();
  animateBgWrapper(BG_WRAPPER_LIST[2], 0, 900, 0, 100);
  if (window.innerWidth > 991) {
    animateBgWrapper(BG_WRAPPER_LIST[0], 1300, 1800, 0, 100);
  } else {
    animateBgWrapper(BG_WRAPPER_LIST[0], 0, 300, 0, 100);
  }
});

function animateBg() {
  let elHeight = window.document.querySelector(".content-wrapper").getBoundingClientRect().height;
  let aboutTop = window.document.querySelector("#about").getBoundingClientRect().top;
  let translateX = scale(window.scrollY, 0, elHeight / 6, 140, 0);
  let scaleDim = scale(window.scrollY, 0, elHeight / 6, 3.5, 1);
  if (translateX <= 0) {
    translateX = 0;
    scaleDim = 1;
  }
  if (aboutTop < 0) {
    translateX = 140;
    scaleDim = 3.5;
  }
  LOGO_EL.style.transform = `translate(${translateX}%, 0%) scale(${scaleDim})`;
}

function animateBgWrapper(element, startScrollY, endScrollY, start, end) {
  let translateY = scale(window.scrollY, startScrollY, endScrollY, start, end);
  if (translateY >= end) {
    translateY = end;
  }
  if (window.scrollY < startScrollY) {
    translateY = start;
  }
  element.style.transform = `translateY(-${translateY}%)`;
}
