const FEAT_SPEAKER_ITEM_LIST = document.querySelectorAll(".speaker-item");
const FEAT_SPEAKER_PREV_BTN = document.querySelector(".featured-speakers__btn--prev");
const FEAT_SPEAKER_NEXT_BTN = document.querySelector(".featured-speakers__btn--next");
let speakerIndex = 0;

changeSpeakerSlide();

FEAT_SPEAKER_NEXT_BTN.addEventListener("click", () => {
  changeSpeakerSlide("next");
});
FEAT_SPEAKER_PREV_BTN.addEventListener("click", () => {
  changeSpeakerSlide("prev");
});

FEAT_SPEAKER_ITEM_LIST.forEach((el) => {
  window.addEventListener("scroll", () => {
    elementIsVisible(el);
  });
});
window.addEventListener("scroll", () => {
  if (window.innerWidth > 991) {
    parallaxSpeaker(FEAT_SPEAKER_ITEM_LIST[0], 0, -35);
    parallaxSpeaker(FEAT_SPEAKER_ITEM_LIST[1], -30, 0);
  }
});

function changeSpeakerSlide(direction) {
  if (direction === "next") {
    speakerIndex++;
  } else if (direction === "prev") {
    speakerIndex--;
  }
  FEAT_SPEAKER_ITEM_LIST.forEach((el) => {
    el.style.transform = `translateX(-${speakerIndex * 100}%)`;
    setTimeout(() => {
      elementIsVisible(el);
    }, 100);
  });

  if (speakerIndex == 0) {
    FEAT_SPEAKER_PREV_BTN.classList.add("featured-speakers__btn--hidden");
  } else if (speakerIndex === FEAT_SPEAKER_ITEM_LIST.length - 1) {
    FEAT_SPEAKER_NEXT_BTN.classList.add("featured-speakers__btn--hidden");
  } else {
    FEAT_SPEAKER_PREV_BTN.classList.remove("featured-speakers__btn--hidden");
    FEAT_SPEAKER_NEXT_BTN.classList.remove("featured-speakers__btn--hidden");
  }
}

function parallaxSpeaker(element, start, end) {
  let child = element.querySelector(".speaker-item__wrapper");
  let windowHeight = window.innerHeight;
  let elTop = element.getBoundingClientRect().top;
  let elHeight = element.getBoundingClientRect().height;
  let translateY = scale(elTop, windowHeight, -elHeight, start, end);
  if (elTop > windowHeight) {
    translateY = start;
  }
  if (elTop < -elHeight) {
    translateY = end;
  }
  child.style.transform = `translateY(${translateY}%)`;
}
