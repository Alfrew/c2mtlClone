const HERO_CTA_EL = document.querySelector(".home-hero-cta");
const HERO_DATE_EL = document.querySelector(".home-hero__date");
const HERO_HIGHLIGHT_EL = document.querySelector(".home-hero-highlight");
const HERO_SQUARE_EL = document.querySelector(".home-hero__square");
const HERO_TITLE_EL = document.querySelector(".home-hero__title");
const HERO_VIDEO_EL = document.querySelector(".home-hero-video");
const HIGHLIGHT_SQUARE_EL = document.querySelector(".home-hero__highlight-square .home-hero__square-inner");
const DATE_ANIM_TEXT_LIST = HERO_DATE_EL.querySelectorAll(".anim-text");
const TITLE_ANIM_TEXT_LIST = HERO_TITLE_EL.querySelectorAll(".anim-text");

setTimeout(() => {
  wordSplitter(TITLE_ANIM_TEXT_LIST, 0.15);
  wordSplitter(DATE_ANIM_TEXT_LIST, 0.0);
}, 1400);
setTimeout(() => {
  HERO_TITLE_EL.classList.add("is-visible");
}, 1500);

if (window.innerWidth < 992) {
  setTimeout(() => {
    HERO_DATE_EL.classList.add("is-visible");
  }, 2000);
} else {
  window.addEventListener("scroll", () => {
    elementIsVisible(HERO_DATE_EL);
  });
}
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
