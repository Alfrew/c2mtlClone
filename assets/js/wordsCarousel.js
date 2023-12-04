const CAROUSEL_ITEM_LIST = document.querySelectorAll(".words-carousel__item");
const CAROUSEL_WORD_LIST = document.querySelectorAll(".words-carousel__item .text-splitter");
const WORDS_CAROUSEL_EL = document.querySelector(".words-carousel");
let letterList = [];

// itemStyling();
setTimeout(splitCarouselText, 500);
// window.addEventListener("scroll", animateText);
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

function animateText() {
  let wcTop = WORDS_CAROUSEL_EL.getBoundingClientRect().top;
  let wcHeight = WORDS_CAROUSEL_EL.getBoundingClientRect().height;
  let L = letterList.length;
  if (wcTop < 0 && -wcTop < wcHeight / 4) {
    let translate = scale(-wcTop, 0, wcHeight / 2 / L, 100, 0);
    let rotate = scale(-wcTop, 0, wcHeight / 2 / L, -90, 0);
    let opacity = scale(-wcTop, 0, wcHeight / 2 / L, 0, 1);
    for (i = 0; i < L; i++) {
      let newopacity = opacity - i * 0.15;
      let newtranslate = translate + i * 25;
      let newrotate = rotate - i * 13.5;
      letterList[i].style.opacity = newopacity > 1 ? 1 : newopacity;
      letterList[i].style.transform = `translate(0px, ${newtranslate < 0 ? 0 : newtranslate}px) rotateX(${newrotate > 0 ? 0 : newrotate}deg)`;
    }
  } else if (-wcTop > wcHeight / 4) {
    let translate = scale(-wcTop, 800, wcHeight / (L / 2), 0, -100);
    let rotate = scale(-wcTop, 800, wcHeight / (L / 2), 0, 90);
    let opacity = scale(-wcTop, 800, wcHeight / (L / 2), 1, 0);
    for (i = 0; i < L; i++) {
      let newtranslate = translate + i * 25;
      let newopacity = opacity + i * 0.25;
      let newrotate = rotate - i * 22.5;
      letterList[i].style.opacity = newopacity;
      letterList[i].style.transform = `translate(0px, ${newtranslate > 0 ? 0 : newtranslate}px) rotateX(${newrotate < 0 ? 0 : newrotate}deg)`;
    }
  }
}

// Ho il dubbio che potrebbe non essere giusto usare il top e l'height per guidare le animazioni, questo siccome l'ultima parola tende a non comparire
// Dividendo l'height per 2 sembra migliorare l'animazione di uscita delle lettere (saltando completamente quella di entrata)
// Si necessita anche un buffer in uscita affinchè l'animazione finale finisca prima che l'elemento successivo al contenitore compaia
function animateWords(wordArray, containerTop, containerHeight) {
  let Lw = wordArray.length;
  let buffer = 100 * Lw; // Usato per evitare che l'animazione parti non appena la parte superiore dell'elemento contenitore tocchi il bordo della finestra superiore
  // Ciclo sul numero di parole presenti nell'array
  for (let iW = 0; iW < wordArray.length; iW++) {
    // Selezione degli elementi lettera presenti nella parola
    let letterArray = wordArray[iW].querySelectorAll(".words-carousel__item-words");
    let Ll = letterArray.length;
    let starting = buffer + iW * (containerHeight / Lw); // Punto di partenza, equivale all'altezza totale diviso il numero di parole, moltiplicato per l'indice dell'attuale parola, ed infine sommato al buffer
    let halfway = (iW + 1) * (containerHeight / Lw); // Punto di metà animazione o fine entrata, equivale all'altezza totale diviso il numero di parole, moltiplicato per l'indice dell'attuale parola+1
    // let end = ; // Stavo valutando di aggiungere un punto di chiusura
    let duration = 200 * Lw; // Letter buffer, usato per fare in modo che tutte le lettere abbiano il tempo di terminare l'animazione, siccome di lettera in lettera viene scalato il valore per una costante

    // Animazione di entrata della parola
    if (-containerTop > starting && -containerTop < halfway) {
      let translate = scale(-containerTop, starting, halfway - duration, 100, 0);
      let rotate = scale(-containerTop, starting, halfway - duration, -90, 0);
      let opacity = scale(-containerTop, starting, halfway - duration, 0, 1);
      for (let iL = 0; iL < Ll; iL++) {
        let newopacity = opacity - iL * 0.15; // Il nuovo valore viene scalato della costante moltiplicata per l'indice dell'attuale lettera
        let newtranslate = translate + iL * 25; // Il nuovo valore viene scalato della costante moltiplicata per l'indice dell'attuale lettera
        let newrotate = rotate - iL * 13.5; // Il nuovo valore viene scalato della costante moltiplicata per l'indice dell'attuale lettera
        letterArray[iL].style.opacity = newopacity > 1 ? 1 : newopacity;
        letterArray[iL].style.transform = `translate(0px, ${newtranslate < 0 ? 0 : newtranslate}px) rotateX(${newrotate > 0 ? 0 : newrotate}deg)`;
      }
    }
    // Animazione di uscita della parola
    else if (-containerTop > starting && -containerTop > halfway /*&& -containerTop<end*/) {
      let translate = scale(-containerTop, halfway, halfway + duration, 0, -100);
      let rotate = scale(-containerTop, halfway, halfway + duration, 0, 90);
      let opacity = scale(-containerTop, halfway, halfway + duration, 1, 0);
      for (let iL = 0; iL < Ll; iL++) {
        let newtranslate = translate + iL * 25; // Il nuovo valore viene scalato della costante moltiplicata per l'indice dell'attuale lettera
        let newopacity = opacity + iL * 0.25; // Il nuovo valore viene scalato della costante moltiplicata per l'indice dell'attuale lettera
        let newrotate = rotate - iL * 22.5; // Il nuovo valore viene scalato della costante moltiplicata per l'indice dell'attuale lettera
        letterArray[iL].style.opacity = newopacity;
        letterArray[iL].style.transform = `translate(0px, ${newtranslate > 0 ? 0 : newtranslate}px) rotateX(${newrotate < 0 ? 0 : newrotate}deg)`;
      }
    }
  }

  //   if (containerTop < 0 && -containerTop < containerHeight / 4) {
  //     let translate = scale(-containerTop, 0, containerHeight / 2 / L, 100, 0);
  //     let rotate = scale(-containerTop, 0, containerHeight / 2 / L, -90, 0);
  //     let opacity = scale(-containerTop, 0, containerHeight / 2 / L, 0, 1);
  //     for (i = 0; i < L; i++) {
  //       let newopacity = opacity - i * 0.15;
  //       let newtranslate = translate + i * 25;
  //       let newrotate = rotate - i * 13.5;
  //       letterList[i].style.opacity = newopacity > 1 ? 1 : newopacity;
  //       letterList[i].style.transform = `translate(0px, ${newtranslate < 0 ? 0 : newtranslate}px) rotateX(${newrotate > 0 ? 0 : newrotate}deg)`;
  //     }
  //   } else if (-containerTop > containerHeight / 4) {
  //     let translate = scale(-containerTop, containerHeight / 4, containerHeight / (L / 2), 0, -100);
  //     let rotate = scale(-containerTop, containerHeight / 4, containerHeight / (L / 2), 0, 90);
  //     let opacity = scale(-containerTop, containerHeight / 4, containerHeight / (L / 2), 1, 0);
  //     for (i = 0; i < L; i++) {
  //       let newtranslate = translate + i * 25;
  //       let newopacity = opacity + i * 0.25;
  //       let newrotate = rotate - i * 22.5;
  //       letterList[i].style.opacity = newopacity;
  //       letterList[i].style.transform = `translate(0px, ${newtranslate > 0 ? 0 : newtranslate}px) rotateX(${newrotate < 0 ? 0 : newrotate}deg)`;
  //     }
  //   }
  // }
}

// function itemStyling() {
//   CAROUSEL_ITEM_LIST[0].style.transform = "translate(-50%, -50%) translate3d(0.5px, 148.992px, 148.492px) rotateX(-45deg)"; //translate3d(-210px, -147.992px, -148.492px) rotateX(135deg)
//   CAROUSEL_ITEM_LIST[1].style.transform = "translate(-50%, -50%) translate(0.5px, 210.5px) rotateX(-90deg)"; //translate(0.5px, -209.5px) rotateX(90deg)
//   CAROUSEL_ITEM_LIST[2].style.transform = "translate(-50%, -50%) translate3d(0.5px, 148.992px, -148.492px) rotateX(-135deg)"; //translate3d(0.5px, -147.992px, 148.492px) rotateX(45deg)
// }

// function animate() {
//   if (window.scrollY > 2600 && window.scrollY < 5350) {
//     let rotateItem0 = scale(window.scrollY, 2600, 5350, -45, 135);
//     let rotateItem1 = scale(window.scrollY, 2600, 5350, -90, 90);
//     let rotateItem2 = scale(window.scrollY, 2600, 5350, -135, 45);
//     let translateYItem0 = scale(window.scrollY, 2600, 5350, 148.992, -147.992);
//     let translateZItem0 = scale(window.scrollY, 2600, 5350, 148.492, -148.492);
//     // let translateYItem1 = scale(window.scrollY, 2600, 5350, 210.5, -209.5);
//     // let translateZItem2 = scale(window.scrollY, 2600, 5350, -148.492, 148.492);
//     CAROUSEL_ITEM_LIST[0].style.transform = `translate(-50%, -50%) translate3d(0.5px, ${translateYItem0}px, ${translateZItem0}px) rotateX(${rotateItem0}deg)`;

//     // CAROUSEL_ITEM_LIST[1].style.transform = `translate(-50%, -50%) translate(0.5px, 0px) rotateX(${rotateItem1}deg)`;
//     // CAROUSEL_ITEM_LIST[2].style.transform = `translate(-50%, -50%) translate3d(0.5px, 0px, 0px) rotateX(${rotateItem2}deg)`;
//   }
//   if (window.scrollY > 2600 && window.scrollY < 5350) {
//   }
// }

// function animateWordList() {
//   let carouselItemWordList = CAROUSEL_WORD_LIST[0].querySelectorAll(".words-carousel__item-words");

//   if (window.scrollY >= 2600 && window.scrollY <= 3950) {
//     for (let i = 0; i < carouselItemWordList.length; ) {
//       let translateY = scale(window.scrollY, 2600, 3950, 100, 0);
//       let rotateX1 = scale(window.scrollY, 2600, 3950, -90, 0);
//       let opacity1 = scale(window.scrollY, 2600, 3950, 0, 1);
//       carouselItemWordList[i].style.opacity = opacity1;
//       carouselItemWordList[i].style.transform = `translate(0px, ${translateY}px) rotateX(${rotateX1}deg)`;
//       // if (carouselItemWordList[0].style.opacity >= 0.15) {
//       //   console.log(window.scrollY);
//       // }
//     }
//   }
// }

//startScroll 2600?
// transform: translate(-50%, -50%) translate3d(0px, 63.6396px, 63.6396px) rotateX(-45deg);;
// transform: translate(0px, 100px) rotateX(-90deg);
// transform: translate(0px, 100px) rotateX(-90deg);

//endScroll 5370?
