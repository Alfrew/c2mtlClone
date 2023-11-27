const HEADER_ELEMENT = document.querySelector(".header");
const NAV_TOGGLE_ELEMENT = document.querySelector(".nav-toggle");
const TICKETS_TOGGLE_ELEMENT = document.querySelector(".tickets-toggle");
const TICKETS_OPEN_LABEL_ELEMENT = document.querySelector(".tickets-toggle__label--open");
const TICKETS_CLOSE_LABEL_ELEMENT = document.querySelector(".tickets-toggle__label--close");
let transitionEnd = whichTransitionEvent();

setTimeout(() => {
  HEADER_ELEMENT.classList.add("header--visible");
}, 1500);
NAV_TOGGLE_ELEMENT.addEventListener("click", toggleNavMenu);
TICKETS_TOGGLE_ELEMENT.addEventListener("click", toggleTicketMenu);

function toggleNavMenu() {
  let isNavOpen = NAV_TOGGLE_ELEMENT.classList.contains("nav-toggle--close");
  if (isNavOpen) {
    closeNavMenu();
  } else {
    openNavMenu();
    if (TICKETS_TOGGLE_ELEMENT.classList.contains("tickets-toggle--close")) {
      closeTicketsMenu();
    }
  }
}

function toggleTicketMenu() {
  let isMenuOpen = TICKETS_TOGGLE_ELEMENT.classList.contains("tickets-toggle--close") && TICKETS_OPEN_LABEL_ELEMENT.classList.contains("hidden");
  let isMenuClosed = !TICKETS_TOGGLE_ELEMENT.classList.contains("tickets-toggle--close") && TICKETS_CLOSE_LABEL_ELEMENT.classList.contains("hidden");
  if (isMenuOpen) {
    closeTicketsMenu();
  } else if (isMenuClosed) {
    openTicketsMenu();
    if (NAV_TOGGLE_ELEMENT.classList.contains("nav-toggle--close")) {
      closeNavMenu();
    }
  }
}

function closeNavMenu() {
  NAV_TOGGLE_ELEMENT.classList.remove("nav-toggle--close");
}
function openNavMenu() {
  NAV_TOGGLE_ELEMENT.classList.add("nav-toggle--close");
}

function closeTicketsMenu() {
  TICKETS_TOGGLE_ELEMENT.classList.remove("tickets-toggle--close");

  TICKETS_OPEN_LABEL_ELEMENT.classList.remove("hidden");
  TICKETS_OPEN_LABEL_ELEMENT.classList.add("tickets-toggle-labels-enter-to");
  TICKETS_CLOSE_LABEL_ELEMENT.classList.add("tickets-toggle-labels-leave-active", "tickets-toggle-labels-leave-to");
  TICKETS_CLOSE_LABEL_ELEMENT.addEventListener(
    transitionEnd,
    () => {
      TICKETS_OPEN_LABEL_ELEMENT.classList.remove("tickets-toggle-labels-enter-active", "tickets-toggle-labels-enter-to");
      TICKETS_CLOSE_LABEL_ELEMENT.classList.remove("tickets-toggle-labels-leave-active", "tickets-toggle-labels-leave-to");
      TICKETS_CLOSE_LABEL_ELEMENT.classList.add("hidden", "tickets-toggle-labels-enter-active");
    },
    { once: true }
  );
}
function openTicketsMenu() {
  TICKETS_TOGGLE_ELEMENT.classList.add("tickets-toggle--close");

  TICKETS_CLOSE_LABEL_ELEMENT.classList.remove("hidden");
  TICKETS_CLOSE_LABEL_ELEMENT.classList.add("tickets-toggle-labels-enter-to");
  TICKETS_OPEN_LABEL_ELEMENT.classList.add("tickets-toggle-labels-leave-active", "tickets-toggle-labels-leave-to");
  TICKETS_OPEN_LABEL_ELEMENT.addEventListener(
    transitionEnd,
    () => {
      TICKETS_CLOSE_LABEL_ELEMENT.classList.remove("tickets-toggle-labels-enter-active", "tickets-toggle-labels-enter-to");
      TICKETS_OPEN_LABEL_ELEMENT.classList.remove("tickets-toggle-labels-leave-active", "tickets-toggle-labels-leave-to");
      TICKETS_OPEN_LABEL_ELEMENT.classList.add("hidden", "tickets-toggle-labels-enter-active");
    },
    { once: true }
  );
}

function whichTransitionEvent() {
  let t;
  let el = document.createElement("fakeelement");
  let transitions = {
    transition: "transitionend",
    OTransition: "oTransitionEnd",
    MozTransition: "transitionend",
    WebkitTransition: "webkitTransitionEnd",
  };

  for (t in transitions) {
    if (el.style[t] !== undefined) {
      return transitions[t];
    }
  }
}
