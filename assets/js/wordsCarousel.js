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

function animateWords(wordArray, containerTop, containerHeight) {
  let wL = wordArray.length;
  let buffer = 100 * wL;
  let animationHeight = containerHeight - buffer * 2;

  for (let iW = 0; iW < wL; iW++) {
    let letterArray = wordArray[iW].querySelectorAll(".words-carousel__item-words");
    let lL = letterArray.length;
    let totDuration = animationHeight / wL;
    let starting = iW * totDuration;
    let halfway = starting + totDuration / 2;
    let ending = halfway + totDuration / 2;
    let letterBuffer = animationHeight * 0.015 * lL;

    if (-containerTop < starting) {
      wordArray[iW].style.transform = `translateY(150px) rotateX(-45deg)`;
      letterArray.forEach((letter) => {
        letter.style.opacity = 0;
        letter.style.transform = `translateY(100px) rotateX(-90deg)`;
      });
    } else if (-containerTop > ending) {
      wordArray[iW].style.transform = `translateY(-150px) rotateX(45deg)`;
      letterArray.forEach((letter) => {
        letter.style.opacity = 0;
        letter.style.transform = `translateY(-100px) rotateX(90deg)`;
      });
    } else if (-containerTop > starting && -containerTop < halfway) {
      let translateWord = scale(-containerTop, starting, halfway, 150, 0);
      let rotateWord = scale(-containerTop, starting, halfway, -45, 0);
      wordArray[iW].style.transform = `translateY(${translateWord}px) rotateX(${rotateWord}deg)`;
      let translate = scale(-containerTop, starting, halfway - letterBuffer, 100, 0);
      let rotate = scale(-containerTop, starting, halfway - letterBuffer, -90, 0);
      let opacity = scale(-containerTop, starting, halfway - letterBuffer, 0, 1);
      for (let iL = 0; iL < lL; iL++) {
        let newopacity = opacity - iL * 0.15; // Il nuovo valore viene scalato della costante moltiplicata per l'indice dell'attuale lettera
        let newtranslate = translate + iL * 25; // Il nuovo valore viene scalato della costante moltiplicata per l'indice dell'attuale lettera
        let newrotate = rotate - iL * 13.5; // Il nuovo valore viene scalato della costante moltiplicata per l'indice dell'attuale lettera
        letterArray[iL].style.opacity = newopacity > 1 ? 1 : newopacity;
        letterArray[iL].style.transform = `translateY(${newtranslate < 0 ? 0 : newtranslate}px) rotateX(${newrotate > 0 ? 0 : newrotate}deg)`;
      }
    } else if (-containerTop > halfway && -containerTop < ending) {
      let translateWord = scale(-containerTop, halfway, ending, 0, -150);
      let rotateWord = scale(-containerTop, halfway, ending, 0, 45);
      wordArray[iW].style.transform = `translateY(${translateWord}px) rotateX(${rotateWord}deg)`;
      let translate = scale(-containerTop, halfway, ending - letterBuffer, 0, -100);
      let rotate = scale(-containerTop, halfway, ending - letterBuffer, 0, 90);
      let opacity = scale(-containerTop, halfway, ending - letterBuffer, 1, 0);
      for (let iL = 0; iL < lL; iL++) {
        let newopacity = opacity + iL * 0.25; // Il nuovo valore viene scalato della costante moltiplicata per l'indice dell'attuale lettera
        let newrotate = rotate - iL * 22.5; // Il nuovo valore viene scalato della costante moltiplicata per l'indice dell'attuale lettera
        letterArray[iL].style.opacity = newopacity;
        letterArray[iL].style.transform = `translateY(0px) rotateX(${newrotate < 0 ? 0 : newrotate}deg)`;
      }
    }
  }
}
