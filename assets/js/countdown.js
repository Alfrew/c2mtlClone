const EVENT_DATE = new Date("May 21, 2024 00:00:00").getTime();
const COUNTDOWN_MODAL_EL = document.querySelector(".modal-countdown");
const COUNTDOWN_MODAL_BTN_EL = document.querySelector(".modal-countdown__btn");
const COUNTDOWN_MODAL_UNIT_LIST = COUNTDOWN_MODAL_EL.querySelectorAll(".countdown__unit");
const COUNTDOWN_FOOTER_EL = document.querySelector(".footer-countdown");
const COUNTDOWN_FOOTER_UNIT_LIST = COUNTDOWN_FOOTER_EL.querySelectorAll(".countdown__unit");

let countdownInterval = setInterval(() => {
  countdown(COUNTDOWN_MODAL_UNIT_LIST);
  countdown(COUNTDOWN_FOOTER_UNIT_LIST);
}, 1000);

COUNTDOWN_MODAL_BTN_EL.addEventListener("click", removeModal);
setTimeout(() => {
  COUNTDOWN_MODAL_EL.classList.add("modal-countdown--visible");
}, 1500);

function countdown(list) {
  let now = new Date().getTime();

  let distance = EVENT_DATE - now;

  let values = [
    `${Math.floor(distance / (1000 * 60 * 60 * 24))}`,
    `${Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))}`,
    `${Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))}`,
    `${Math.floor((distance % (1000 * 60)) / 1000)}`,
  ];

  for (let i = 0; i < list.length; i++) {
    list[i].textContent = values[i].length == 1 ? `0${values[i]}` : values[i];
  }

  if (distance < 0) {
    clearInterval(countdownInterval);
    document.querySelectorAll(".countdown").forEach((countdownEl) => {
      countdownEl.innerHTML = "EXPIRED";
    });
  }
}

function removeModal() {
  MODAL_EL.classList.remove("modal-countdown--visible");
}
