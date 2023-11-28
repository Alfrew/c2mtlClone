const HEADER_EL = document.querySelector(".header");
const NAV_TOGGLE_EL = document.querySelector(".nav-toggle");
const TICKETS_BTN_ARROW_EL = document.querySelector(".nav-tickets-btn__arrow-wrapper");
const TICKETS_CLOSE_LABEL_EL = document.querySelector(".tickets-toggle__label--close");
const TICKETS_NAV_WRAPPER_EL = document.querySelector(".nav-wrapper--tickets");
const TICKETS_OPEN_LABEL_EL = document.querySelector(".tickets-toggle__label--open");
const TICKETS_TOGGLE_EL = document.querySelector(".tickets-toggle");
let transitionEnd = whichTransitionEvent();

setTimeout(() => {
  HEADER_EL.classList.add("header--visible");
}, 1500);
NAV_TOGGLE_EL.addEventListener("click", toggleNavMenu);
TICKETS_NAV_WRAPPER_EL.addEventListener("mouseenter", arrowEnter);
TICKETS_NAV_WRAPPER_EL.addEventListener("mouseleave", arrowLeave);
TICKETS_TOGGLE_EL.addEventListener("click", toggleTicketMenu);

function arrowEnter() {
  let isArrowHidden = TICKETS_BTN_ARROW_EL.classList.contains("d-none");
  if (isArrowHidden) {
    TICKETS_BTN_ARROW_EL.classList.add("nav-tickets-hover-enter-active");
    setTimeout(() => {
      TICKETS_BTN_ARROW_EL.classList.remove("d-none");
    }, 10);
    setTimeout(() => {
      TICKETS_BTN_ARROW_EL.classList.add("nav-tickets-hover-enter-to");
    }, 20);

    TICKETS_BTN_ARROW_EL.addEventListener(
      transitionEnd,
      () => {
        TICKETS_BTN_ARROW_EL.classList.remove("nav-tickets-hover-enter-active", "nav-tickets-hover-enter-to");
      },
      { once: true }
    );
  }
}

function arrowLeave() {
  let arrowExist = !TICKETS_BTN_ARROW_EL.classList.contains("d-none");
  if (arrowExist) {
    TICKETS_BTN_ARROW_EL.classList.add("nav-tickets-hover-leave-active");
    setTimeout(() => {
      TICKETS_BTN_ARROW_EL.classList.add("nav-tickets-hover-leave-to");
    }, 10);

    TICKETS_BTN_ARROW_EL.addEventListener(
      transitionEnd,
      () => {
        TICKETS_BTN_ARROW_EL.classList.remove("nav-tickets-hover-leave-active", "nav-tickets-hover-leave-to");
        TICKETS_BTN_ARROW_EL.classList.add("d-none");
      },
      { once: true }
    );
  }
}

function closeNavMenu() {
  NAV_TOGGLE_EL.classList.remove("nav-toggle--close");
}

function closeTicketsMenu() {
  TICKETS_TOGGLE_EL.classList.remove("tickets-toggle--close");

  TICKETS_OPEN_LABEL_EL.classList.remove("hidden");
  TICKETS_OPEN_LABEL_EL.classList.add("tickets-toggle-labels-enter-to");
  TICKETS_CLOSE_LABEL_EL.classList.add("tickets-toggle-labels-leave-active", "tickets-toggle-labels-leave-to");
  TICKETS_CLOSE_LABEL_EL.addEventListener(
    transitionEnd,
    () => {
      TICKETS_OPEN_LABEL_EL.classList.remove("tickets-toggle-labels-enter-active", "tickets-toggle-labels-enter-to");
      TICKETS_CLOSE_LABEL_EL.classList.remove("tickets-toggle-labels-leave-active", "tickets-toggle-labels-leave-to");
      TICKETS_CLOSE_LABEL_EL.classList.add("hidden", "tickets-toggle-labels-enter-active");
    },
    { once: true }
  );
}

function openNavMenu() {
  NAV_TOGGLE_EL.classList.add("nav-toggle--close");
}

function openTicketsMenu() {
  TICKETS_TOGGLE_EL.classList.add("tickets-toggle--close");

  TICKETS_CLOSE_LABEL_EL.classList.remove("hidden");
  TICKETS_CLOSE_LABEL_EL.classList.add("tickets-toggle-labels-enter-to");
  TICKETS_OPEN_LABEL_EL.classList.add("tickets-toggle-labels-leave-active", "tickets-toggle-labels-leave-to");
  TICKETS_OPEN_LABEL_EL.addEventListener(
    transitionEnd,
    () => {
      TICKETS_CLOSE_LABEL_EL.classList.remove("tickets-toggle-labels-enter-active", "tickets-toggle-labels-enter-to");
      TICKETS_OPEN_LABEL_EL.classList.remove("tickets-toggle-labels-leave-active", "tickets-toggle-labels-leave-to");
      TICKETS_OPEN_LABEL_EL.classList.add("hidden", "tickets-toggle-labels-enter-active");
    },
    { once: true }
  );
}

function toggleNavMenu() {
  let isNavOpen = NAV_TOGGLE_EL.classList.contains("nav-toggle--close");
  if (isNavOpen) {
    closeNavMenu();
  } else {
    openNavMenu();
    if (TICKETS_TOGGLE_EL.classList.contains("tickets-toggle--close")) {
      closeTicketsMenu();
    }
  }
}

function toggleTicketMenu() {
  let isMenuOpen = TICKETS_TOGGLE_EL.classList.contains("tickets-toggle--close") && TICKETS_OPEN_LABEL_EL.classList.contains("hidden");
  let isMenuClosed = !TICKETS_TOGGLE_EL.classList.contains("tickets-toggle--close") && TICKETS_CLOSE_LABEL_EL.classList.contains("hidden");
  if (isMenuOpen) {
    closeTicketsMenu();
  } else if (isMenuClosed) {
    openTicketsMenu();
    if (NAV_TOGGLE_EL.classList.contains("nav-toggle--close")) {
      closeNavMenu();
    }
  }
}

function whichTransitionEvent() {
  let t;
  let el = document.createElement("fakeEL");
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
