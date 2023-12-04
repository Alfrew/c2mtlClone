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
  splitHeroText(TITLE_ANIM_TEXT_LIST, 0.15);
  splitHeroText(DATE_ANIM_TEXT_LIST, 0.0);
}, 1400);
setTimeout(() => {
  HERO_TITLE_EL.classList.add("is-visible");
}, 1500);

if (window.innerWidth < 992) {
  setTimeout(() => {
    HERO_DATE_EL.classList.add("is-visible");
  }, 2000);
} else {
  window.addEventListener("scroll", checkDateElement);
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

function checkDateElement() {
  const triggerBottom = (window.innerHeight / 5) * 4;

  const boxTop = HERO_DATE_EL.getBoundingClientRect().top;

  if (boxTop < triggerBottom) {
    HERO_DATE_EL.classList.add("is-visible");
    window.removeEventListener("scroll", checkDateElement);
  }
}

function splitHeroText(el, delay) {
  el.forEach((line) => {
    let word = line.querySelector(".text-splitter");
    let charArray = word.textContent.split("");
    word.innerHTML = "";
    charArray.forEach((char) => {
      let charEl = document.createElement("div");
      charEl.classList.add("anim-char");
      charEl.style.transitionDelay = `${delay}s`;
      charEl.style.display = "inline-block";
      charEl.textContent = char;
      word.appendChild(charEl);
      delay += 0.04;
    });
    word.classList.add("text-splitter--splitted");
    delay -= 0.05;
  });
}

function translateElement(element, start, finish, unit) {
  let translate = scale(window.scrollY, 0, 2700, start, finish);
  element.style.transform = `translateY(${translate}${unit})`;
}

// https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};
