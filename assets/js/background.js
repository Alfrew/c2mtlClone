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
  animateBgWrapper(BG_WRAPPER_LIST[2], 0, 900, 0, 100);
  if (window.innerWidth > 991) {
    animateBgLogo(55, 2);
    animateBgWrapper(BG_WRAPPER_LIST[0], 1300, 1800, 0, 100);
  } else {
    animateBgLogo(140, 3.5);
    animateBgWrapper(BG_WRAPPER_LIST[0], 0, 300, 0, 100);
  }

  if (scrollY >= 1200) {
    BG_WRAPPER_LIST[2].style.opacity = 0;
  } else {
    BG_WRAPPER_LIST[2].style.opacity = 1;
  }
});

function animateBgLogo(maxTranslate, maxScale) {
  let elHeight = window.document.querySelector(".content-wrapper").getBoundingClientRect().height;
  let aboutTop = window.document.querySelector("#about").getBoundingClientRect().top;
  let translateX = scale(window.scrollY, 0, elHeight / 6, maxTranslate, 0);
  let scaleDim = scale(window.scrollY, 0, elHeight / 6, maxScale, 1);
  if (translateX <= 0) {
    translateX = 0;
    scaleDim = 1;
  }
  if (aboutTop < 0) {
    translateX = maxTranslate;
    scaleDim = maxScale;
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
