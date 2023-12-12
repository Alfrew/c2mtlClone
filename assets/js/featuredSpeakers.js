const FEAT_SPEAKER_ITEM_LIST = document.querySelectorAll(".speaker-item");
const FEAT_SPEAKER_SECTION_EL = document.querySelector(".featured-speakers");
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
FEAT_SPEAKER_ITEM_LIST[0].addEventListener("click", () => {
  openModal("1");
});
FEAT_SPEAKER_ITEM_LIST[1].addEventListener("click", () => {
  openModal("2");
});
FEAT_SPEAKER_ITEM_LIST[2].addEventListener("click", () => {
  openModal("3");
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

function openModal(index) {
  let modal = document.createElement("div");
  modal.classList.add("speaker-modal");
  let bios = "";
  let socials = "";
  let color = "";
  switch (index) {
    case "1":
      bios = '<p data-i18n="speakerModal__bio1s1"></p><p data-i18n="speakerModal__bio2s1"></p>';
      socials =
        '<li class="speaker-hero__socials-item p2 ttu"><a class="speaker-hero__socials-item-link" href="https://twitter.com/tonyhawk" target="_blank" rel="noreferrer noopener" data-i18n="speakerModal__twitter"></a></li><li class="speaker-hero__socials-item p2 ttu"><a class="speaker-hero__socials-item-link" href="https://www.instagram.com/tonyhawk/" target="_blank" rel="noreferrer noopener" data-i18n="speakerModal__instagram"></a></li>';
      color = "orange";
      break;
    case "2":
      bios = '<p data-i18n="speakerModal__bio1s2"></p><p data-i18n="speakerModal__bio2s2"></p><p data-i18n="speakerModal__bio3s2"></p>';
      socials =
        '<li class="speaker-hero__socials-item p2 ttu"><a class="speaker-hero__socials-item-link" href="https://www.instagram.com/laurawasserofficial/" target="_blank" rel="noreferrer noopener" data-i18n="speakerModal__instagram"></a></li>';
      color = "pink";
      break;
    case "3":
      bios =
        '<p data-i18n="speakerModal__bio1s3"></p><p data-i18n="speakerModal__bio2s3"></p><p data-i18n="speakerModal__bio3s3"></p><p data-i18n="speakerModal__bio4s3"></p>';
      socials =
        '<li class="speaker-hero__socials-item p2 ttu"><a class="speaker-hero__socials-item-link" href="https://www.linkedin.com/in/yoshuabengio?originalSubdomain=ca" target="_blank" rel="noreferrer noopener" data-i18n="speakerModal__linkedin"></a></li>';
      color = "purple";
      break;
  }
  modal.innerHTML = `
  <div class="modal-wrapper">
            <div class="modal-wrapper__bg"></div>
            <button class="modal-back-btn p">
              <span class="modal-back-btn__label" data-i18n="speakerModal__back-btn"></span>
              <div class="modal-back-btn__icon-wrapper">
                <div class="line"></div>
                <div class="line"></div>
              </div>
            </button>
            <div class="modal-wrapper__col">
              <div class="modal-wrapper__image">
                <div class="modal-image">
                  <figure class="modal-image__fig gradient-overlay gradient-overlay--${color}">
                    <picture class="base-image base-image--fit">
                      <img class="base-image__img--fade base-image__img--loaded" src="assets/img/1920x2160_____${index}.webp" alt="C2MTL">
                    </picture>
                  </figure>
                </div>
              </div>
              <div class="modal-wrapper__content">
                <div class="speaker-hero">
                  <h1 class="speaker-hero__title h2 ttu" data-i18n="speakerModal__title${index}"></h1>
                  <h2 class="speaker-hero__subtitle p" data-i18n="speakerModal__subtitle${index}"></h2>
                  <div class="speaker-hero__bio p">
                    ${bios}
                  </div>
                  <ul class="speaker-hero__socials">
                    ${socials}
                  </ul>
                </div>
              </div>
            </div>
          </div>
  `;
  FEAT_SPEAKER_SECTION_EL.appendChild(modal);
  bodyHasModal();
  modal.querySelector(".modal-wrapper__content").addEventListener(
    transitionEnd,
    () => {
      modal.querySelector(".modal-back-btn").addEventListener("click", () => {
        modal.classList.add("modal-page-leave-active");
        setTimeout(() => {
          modal.classList.add("modal-page-leave-to");
        }, 10);
        modal.querySelector(".modal-wrapper__content").addEventListener(
          transitionEnd,
          () => {
            modal.remove();
            bodyHasModal();
          },
          { once: true }
        );
      });
    },
    { once: true }
  );
  updateContent(langData);
  setTimeout(() => {
    modal.querySelector(".modal-wrapper").classList.add("modal-wrapper--visible");
    modal.querySelector(".modal-image").classList.add("is-visible");
  }, 150);
}
