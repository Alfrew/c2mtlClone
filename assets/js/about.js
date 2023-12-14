const ABOUT_LEFT_EL = document.querySelector(".home-carousel-images");
const ABOUT_NAV_EL = document.querySelector(".home-carousel-nav");
const ABOUT_NEXT_BTN = document.querySelector(".home-carousel__btn--next");
const ABOUT_PREV_BTN = document.querySelector(".home-carousel__btn--prev");
const ABOUT_FIGS_EL = document.querySelector(".home-carousel__figs");
// LISTS
const ABOUT_COPYS_LIST = document.querySelectorAll(".home-carousel-copy");
const ABOUT_IMAGES_LIST = document.querySelectorAll(".home-carousel-images");
const ABOUT_TITLES_LIST = document.querySelectorAll(".home-carousel-title");
const ABOUT_ANIM_TEXT_LIST = ABOUT_TITLES_LIST[0].querySelectorAll(".anim-text");
const ABOUT_FIGS_LIST = ABOUT_LEFT_EL.querySelectorAll(".home-carousel-fig");
const ABOUT_NAV_BTN_LIST = ABOUT_NAV_EL.querySelectorAll(".home-carousel-nav__item-btn");
const ABOUT_SMALL_FIGS_LIST = ABOUT_FIGS_EL.querySelectorAll(".home-carousel-fig");

let aboutIndex = 0;
ABOUT_COPYS_LIST[aboutIndex].classList.add("home-carousel-copy--active");
ABOUT_NAV_BTN_LIST[aboutIndex].classList.add("home-carousel-nav__item-btn--active");
ABOUT_TITLES_LIST[aboutIndex].classList.add("home-carousel-title--in");

ABOUT_NEXT_BTN.addEventListener("click", () => {
  if (aboutIndex === ABOUT_TITLES_LIST.length - 1) {
    aboutIndex = 0;
  } else {
    aboutIndex++;
  }
  changeAboutSlide(aboutIndex);
});
ABOUT_PREV_BTN.addEventListener("click", () => {
  if (aboutIndex === 0) {
    aboutIndex = ABOUT_TITLES_LIST.length - 1;
  } else {
    aboutIndex--;
  }
  changeAboutSlide(aboutIndex);
});
window.addEventListener("scroll", () => {
  elementIsVisible(ABOUT_NAV_EL);
  elementIsVisible(ABOUT_TITLES_LIST[0]);
  if (window.innerWidth > 991) {
    parallaxAbout(ABOUT_FIGS_EL, 200, -300);
  }
});
ABOUT_IMAGES_LIST.forEach((el) => {
  window.addEventListener("scroll", () => {
    elementIsVisible(el);
  });
});
setTimeout(() => {
  textSplitter(ABOUT_ANIM_TEXT_LIST, 0.0);
}, 1400);
ABOUT_NAV_BTN_LIST.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    aboutIndex = index;
    changeAboutSlide(index);
  });
});

function changeAboutSlide(i) {
  ABOUT_COPYS_LIST.forEach((el) => {
    el.classList.remove("home-carousel-copy--active");
  });
  ABOUT_NAV_BTN_LIST.forEach((el) => {
    el.classList.remove("home-carousel-nav__item-btn--active");
  });
  ABOUT_TITLES_LIST.forEach((el) => {
    el.classList.remove("home-carousel-title--in");
  });
  ABOUT_COPYS_LIST[i].classList.add("home-carousel-copy--active");
  ABOUT_NAV_BTN_LIST[i].classList.add("home-carousel-nav__item-btn--active");
  ABOUT_TITLES_LIST[i].classList.add("home-carousel-title--in");

  // todo: add scroll to top container
  // todo: change image animation
}

function parallaxAbout(element, start, end) {
  let container = document.querySelector("#about");
  let windowHeight = window.innerHeight;
  let elTop = container.getBoundingClientRect().top;
  let elHeight = container.getBoundingClientRect().height;
  let translateY = scale(elTop, windowHeight, -elHeight, start, end);
  if (elTop > windowHeight) {
    translateY = start;
  }
  if (elTop < -elHeight) {
    translateY = end;
  }
  element.style.transform = `translateY(${translateY}px)`;
}
