const CAROUSEL_ITEM_LIST = document.querySelectorAll(".words-carousel__item");
const CAROUSEL_WORD_LIST = document.querySelectorAll(".words-carousel__item .text-splitter");
const WORDS_CAROUSEL_EL = document.querySelector(".words-carousel");
let letterList = [];

setTimeout(splitCarouselText, 500);
window.addEventListener("scroll", () => {
  animateWords(CAROUSEL_WORD_LIST, WORDS_CAROUSEL_EL.getBoundingClientRect().top, WORDS_CAROUSEL_EL.getBoundingClientRect().height);
});

function splitCarouselText() {
  CAROUSEL_WORD_LIST.forEach((word) => {
    let charArray = word.textContent.split("");
    word.innerHTML = "";
    charArray.forEach((char) => {
      let charEl = document.createElement("div");
      charEl.classList.add("words-carousel__item-words");
      charEl.style.opacity = 0; //1 -> 0
      charEl.style.transform = "translate(0px, 100px) rotateX(-90deg)"; //"translate(0px, 0px) rotateX(0deg)" -> "translate(0px, 0px) rotateX(90deg)"
      charEl.textContent = char;
      word.appendChild(charEl);
      letterList.push(charEl);
    });
    word.classList.add("text-splitter--splitted");
  });
}

/**
 * Used to animate the carousel of words while scrolling inside the container
 * @param {Element[]} wordArray the list of div elements
 * @param {number} containerTop the top position of the word carousel container element
 * @param {number} containerHeight the height of the word carousel container element
 */
function animateWords(wordArray, containerTop, containerHeight) {
  let wL = wordArray.length; // word array length
  let buffer = 100 * wL; // ending buffer, used to finish the last animation before the container scroll out of view
  let animationHeight = containerHeight - buffer * 2; // the animation useful height

  for (let iW = 0; iW < wL; iW++) {
    let letterArray = wordArray[iW].querySelectorAll(".words-carousel__item-words"); // the letter element list of the current word
    let lL = letterArray.length; // letter array length
    let totDuration = animationHeight / wL; // total duration of the single animation, is calculated by dividing the animation useful height by the number of words
    let starting = iW * totDuration; // starting point of the current animation, is calculated by multiplicating the duration by the current word index
    let halfway = starting + totDuration / 2; // halfway point of the current animation
    let ending = halfway + totDuration / 2; // ending point of the current animation
    let letterBuffer = animationHeight * 0.015 * lL; // letter animation buffer, used to allow all the letter to finish the animation

    // before the starting point
    if (-containerTop < starting) {
      wordArray[iW].style.transform = `translateY(150px) rotateX(-45deg)`;
      letterArray.forEach((letter) => {
        letter.style.opacity = 0;
        letter.style.transform = `translateY(100px) rotateX(-90deg)`;
      });
    }
    // after the ending point
    else if (-containerTop > ending) {
      wordArray[iW].style.transform = `translateY(-150px) rotateX(45deg)`;
      letterArray.forEach((letter) => {
        letter.style.opacity = 0;
        letter.style.transform = `translateY(-100px) rotateX(90deg)`;
      });
    }
    // the first half of the animation
    else if (-containerTop > starting && -containerTop < halfway) {
      let translateWord = scale(-containerTop, starting, halfway, 150, 0);
      let rotateWord = scale(-containerTop, starting, halfway, -45, 0);
      wordArray[iW].style.transform = `translateY(${translateWord}px) rotateX(${rotateWord}deg)`;
      let translate = scale(-containerTop, starting, halfway - letterBuffer, 100, 0);
      let rotate = scale(-containerTop, starting, halfway - letterBuffer, -90, 0);
      let opacity = scale(-containerTop, starting, halfway - letterBuffer, 0, 1);
      for (let iL = 0; iL < lL; iL++) {
        let newopacity = opacity - iL * 0.15; // the new value delayed by the letter array index multiplicated by the costant value
        let newtranslate = translate + iL * 25; // the new value delayed by the letter array index multiplicated by the costant value
        let newrotate = rotate - iL * 13.5; // the new value delayed by the letter array index multiplicated by the costant value
        letterArray[iL].style.opacity = newopacity > 1 ? 1 : newopacity;
        letterArray[iL].style.transform = `translateY(${newtranslate < 0 ? 0 : newtranslate}px) rotateX(${newrotate > 0 ? 0 : newrotate}deg)`;
      }
    }
    // the second half of the animation
    else if (-containerTop > halfway && -containerTop < ending) {
      let translateWord = scale(-containerTop, halfway, ending, 0, -150);
      let rotateWord = scale(-containerTop, halfway, ending, 0, 45);
      wordArray[iW].style.transform = `translateY(${translateWord}px) rotateX(${rotateWord}deg)`;
      let rotate = scale(-containerTop, halfway, ending - letterBuffer, 0, 90);
      let opacity = scale(-containerTop, halfway, ending - letterBuffer, 1, 0);
      for (let iL = 0; iL < lL; iL++) {
        let newopacity = opacity + iL * 0.25; // the new value delayed by the letter array index multiplicated by the costant value
        let newrotate = rotate - iL * 22.5; // the new value delayed by the letter array index multiplicated by the costant value
        letterArray[iL].style.opacity = newopacity;
        letterArray[iL].style.transform = `translateY(0px) rotateX(${newrotate < 0 ? 0 : newrotate}deg)`;
      }
    }
  }
}
