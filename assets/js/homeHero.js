const HERO_CTA_EL = document.querySelector(".home-hero-cta");
const HERO_DATE_EL = document.querySelector(".home-hero__date");
const HERO_HIGHLIGHT_EL = document.querySelector(".home-hero-highlight");
const HERO_SQUARE_EL = document.querySelector(".home-hero__square");
const HERO_TITLE_EL = document.querySelector(".home-hero__title");
const HERO_VIDEO_EL = document.querySelector(".home-hero-video");
const HIGHLIGHT_SQUARE_EL = document.querySelector(".home-hero__highlight-square .home-hero__square-inner");

setTimeout(() => {
  HERO_DATE_EL.classList.add("is-visible");
  HERO_TITLE_EL.classList.add("is-visible");
}, 1500);
window.addEventListener("scroll", animationScroll);

function animationScroll() {
  translateElement(HERO_SQUARE_EL, 0, -90, "%");
  if (window.innerWidth > 992) {
    translateElement(HERO_CTA_EL, 50, 0, "%");
    translateElement(HERO_HIGHLIGHT_EL, -50, 100, "px");
    translateElement(HIGHLIGHT_SQUARE_EL, 0, 20, "%");
    translateElement(HERO_VIDEO_EL, -50, 100, "px");
  }
}

function translateElement(element, start, finish, unit) {
  let translate = scale(window.scrollY, 0, 2700, start, finish);
  element.style.transform = `translateY(${translate}${unit})`;
}

// https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};
