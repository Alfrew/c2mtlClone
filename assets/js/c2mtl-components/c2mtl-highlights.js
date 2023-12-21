const HIGHLIGHTS_ITEM_LIST = document.querySelectorAll(".highlights-item");
const HIGHLIGHTS_PREV_BTN = document.querySelector(".highlights__btn--prev");
const HIGHLIGHTS_NEXT_BTN = document.querySelector(".highlights__btn--next");
const HIGHLIGHTS_HEADLINE_EL = document.querySelector(".home-highlights__headline");
const HIGHLIGHTS_ANIM_TEXT_LIST = HIGHLIGHTS_HEADLINE_EL.querySelectorAll(".anim-text");
let highlightIndex = 0;

changeHighlightsSlide();

HIGHLIGHTS_NEXT_BTN.addEventListener("click", () => {
  changeHighlightsSlide("next");
});
HIGHLIGHTS_PREV_BTN.addEventListener("click", () => {
  changeHighlightsSlide("prev");
});

HIGHLIGHTS_ITEM_LIST.forEach((el) => {
  window.addEventListener("scroll", () => {
    elementIsVisible(el);
  });
});
window.addEventListener("scroll", () => {
  elementIsVisible(HIGHLIGHTS_HEADLINE_EL);
});

setTimeout(() => {
  textSplitter(HIGHLIGHTS_ANIM_TEXT_LIST, 0.0);
}, 1400);

function changeHighlightsSlide(direction) {
  if (direction === "next") {
    highlightIndex++;
  } else if (direction === "prev") {
    highlightIndex--;
  }
  HIGHLIGHTS_ITEM_LIST.forEach((el) => {
    el.style.transform = `translateX(-${highlightIndex * 100}%)`;
    setTimeout(() => {
      elementIsVisible(el);
    }, 100);
  });

  if (highlightIndex == 0) {
    HIGHLIGHTS_PREV_BTN.classList.add("highlights__btn--hidden");
  } else if (highlightIndex === HIGHLIGHTS_ITEM_LIST.length - 1) {
    HIGHLIGHTS_NEXT_BTN.classList.add("highlights__btn--hidden");
  } else {
    HIGHLIGHTS_PREV_BTN.classList.remove("highlights__btn--hidden");
    HIGHLIGHTS_NEXT_BTN.classList.remove("highlights__btn--hidden");
  }
}
