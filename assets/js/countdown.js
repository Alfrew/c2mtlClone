const COUNTDOWN_UNIT_LIST = document.querySelectorAll(".countdown__unit");
const EVENT_DATE = new Date("May 21, 2024 00:00:00").getTime();
const MODAL_EL = document.querySelector(".modal-countdown");
const MODAL_BTN_EL = document.querySelector(".modal-countdown__btn");

let interval = setInterval(countdown, 1000);

MODAL_BTN_EL.addEventListener("click", removeModal);
setTimeout(() => {
  MODAL_EL.classList.add("modal-countdown--visible");
}, 1500);

function countdown() {
  let now = new Date().getTime();

  let distance = EVENT_DATE - now;

  let values = [
    Math.floor(distance / (1000 * 60 * 60 * 24)),
    Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    Math.floor((distance % (1000 * 60)) / 1000),
  ];

  for (let i = 0; i < COUNTDOWN_UNIT_LIST.length; i++) {
    COUNTDOWN_UNIT_LIST[i].textContent = values[i];
  }

  if (distance < 0) {
    clearInterval(interval);
    document.querySelector(".countdown").innerHTML = "EXPIRED";
  }
}

function removeModal() {
  MODAL_EL.classList.remove("modal-countdown--visible");
}
