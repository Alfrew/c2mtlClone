const ABOUT_EL = document.getElementById("about");
const ABOUT_FIGS_EL = document.querySelector(".home-carousel__figs");
const ABOUT_LEFT_EL = document.querySelector(".home-carousel-images");
const ABOUT_NAV_EL = document.querySelector(".home-carousel-nav");
const ABOUT_NEXT_BTN = document.querySelector(".home-carousel__btn--next");
const ABOUT_PREV_BTN = document.querySelector(".home-carousel__btn--prev");
const FOLLOWER = document.querySelector(".cursor-follower");
// LISTS
const ABOUT_COPYS_LIST = document.querySelectorAll(".home-carousel-copy");
const ABOUT_IMAGES_LIST = document.querySelectorAll(".home-carousel-images");
const ABOUT_TITLES_LIST = document.querySelectorAll(".home-carousel-title");
const ABOUT_ANIM_TEXT_LIST = ABOUT_TITLES_LIST[0].querySelectorAll(".anim-text");
const ABOUT_FIGS_LIST = ABOUT_LEFT_EL.querySelectorAll(".home-carousel-fig");
const ABOUT_NAV_BTN_LIST = ABOUT_NAV_EL.querySelectorAll(".home-carousel-nav__item-btn");
const ABOUT_SMALL_FIGS_LIST = ABOUT_FIGS_EL.querySelectorAll(".home-carousel-fig");

let aboutIndex = 0;
ABOUT_FIGS_LIST[aboutIndex].style.transform = "translateY(0)";
ABOUT_SMALL_FIGS_LIST[aboutIndex].style.transform = "translateY(0)";
setTimeout(() => {
  ABOUT_FIGS_LIST[aboutIndex].classList.add("home-carousel-fig--active");
  ABOUT_SMALL_FIGS_LIST[aboutIndex].classList.add("home-carousel-fig--active");
}, 1);
ABOUT_COPYS_LIST[aboutIndex].classList.add("home-carousel-copy--active");
ABOUT_NAV_BTN_LIST[aboutIndex].classList.add("home-carousel-nav__item-btn--active");
ABOUT_TITLES_LIST[aboutIndex].classList.add("home-carousel-title--in");

ABOUT_EL.addEventListener("mouseenter", () => {
  FOLLOWER.classList.add("cursor-follower--visible");
});
ABOUT_EL.addEventListener("mouseleave", () => {
  FOLLOWER.classList.remove("cursor-follower--visible");
});

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

document.body.onpointermove = (position) => {
  FOLLOWER.animate(
    {
      top: `${position.clientY}px`,
      left: `${position.clientX}px`,
    },
    { duration: 3000, fill: "forwards" }
  );
  if (position.clientX >= window.innerWidth / 2) {
    FOLLOWER.classList.remove("cursor-follower--prev");
    FOLLOWER.classList.add("cursor-follower--next");
  } else {
    FOLLOWER.classList.remove("cursor-follower--next");
    FOLLOWER.classList.add("cursor-follower--prev");
  }
};

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

  changeAboutImages(i, ABOUT_SMALL_FIGS_LIST);
  changeAboutImages(i, ABOUT_FIGS_LIST);

  ABOUT_EL.scrollIntoView({ behavior: "smooth" });
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

function changeAboutImages(index, list) {
  let activeFig = list[0].parentElement.querySelector(".home-carousel-fig--active");
  list[index].style.transform = "translateY(-30%)";
  activeFig.style.zIndex = "2";
  setTimeout(() => {
    list[index].classList.add("home-carousel-fig--active");
    list[index].style.transform = "translateY(0%)";
  }, 1);
  activeFig.style.transform = "translateY(100%)";
  activeFig.addEventListener(
    transitionEnd,
    () => {
      activeFig.classList.remove("home-carousel-fig--active");
      activeFig.style.zIndex = "";
    },
    { once: true }
  );
}
