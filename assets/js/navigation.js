const FOOTER_TICKETS_BTN_EL = document.querySelector(".footer-tickets-btn");
const HEADER_EL = document.querySelector(".header");
const HERO_TICKETS_TOGGLE_EL = document.querySelector(".home-hero-cta__btn");
const NAV_EL = document.querySelector(".nav");
const NAV_TOGGLE_EL = document.querySelector(".nav-toggle");
const NAV_WRAP_ALT_EL = document.querySelector(".nav-wrapper--alt");
const TICKETS_BTN_ARROW_EL = document.querySelector(".nav-tickets-btn__arrow-wrapper");
const TICKETS_BTN_EL = document.querySelector(".nav-tickets-btn");
const TICKETS_CLOSE_LABEL_EL = document.querySelector(".tickets-toggle__label--close");
const TICKETS_NAV_EL = document.querySelector(".tickets-nav");
const TICKETS_NAV_ITEMS = document.querySelectorAll(".tickets-nav__item");
const TICKETS_NAV_WRAPPER_EL = document.querySelector(".nav-wrapper--tickets");
const TICKETS_OPEN_LABEL_EL = document.querySelector(".tickets-toggle__label--open");
const TICKETS_TOGGLE_EL = document.querySelector(".tickets-toggle");
let transitionEnd = whichTransitionEvent();

setTimeout(() => {
  HEADER_EL.classList.add("header--visible");
}, 1500);
FOOTER_TICKETS_BTN_EL.addEventListener("click", toggleTicketMenu);
HERO_TICKETS_TOGGLE_EL.addEventListener("click", toggleTicketMenu);
NAV_TOGGLE_EL.addEventListener("click", toggleNavMenu);
TICKETS_BTN_EL.addEventListener("click", toggleTicketMenu);
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

  NAV_EL.classList.add("nav-leave-active");
  setTimeout(() => {
    NAV_EL.classList.add("nav-leave-to");
  }, 10);
  NAV_WRAP_ALT_EL.addEventListener(
    transitionEnd,
    () => {
      NAV_EL.classList.remove("nav-leave-active", "nav-leave-to", "nav--open");
      NAV_EL.classList.add("d-none");
    },
    { once: true }
  );
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

  TICKETS_NAV_EL.classList.add("nav-leave-active");
  setTimeout(() => {
    TICKETS_NAV_EL.classList.add("nav-leave-to");
  }, 10);
  TICKETS_NAV_ITEMS[1].addEventListener(
    transitionEnd,
    () => {
      TICKETS_NAV_EL.classList.remove("nav-leave-active", "nav-leave-to", "nav--open");
      TICKETS_NAV_EL.classList.add("d-none");
    },
    { once: true }
  );
}

function openNavMenu() {
  let isTicketsNavOpen =
    TICKETS_TOGGLE_EL.classList.contains("tickets-toggle--close") && TICKETS_OPEN_LABEL_EL.classList.contains("hidden") && TICKETS_NAV_EL.classList.contains("nav--open");
  NAV_TOGGLE_EL.classList.add("nav-toggle--close");

  NAV_EL.classList.add("nav-enter-active");
  setTimeout(() => {
    NAV_EL.classList.remove("d-none");
  }, 20);
  setTimeout(
    () => {
      NAV_EL.classList.add("nav-enter-to", "nav--open");
    },
    isTicketsNavOpen ? 800 : 40
  );
  NAV_WRAP_ALT_EL.addEventListener(
    transitionEnd,
    () => {
      NAV_EL.classList.remove("nav-enter-active", "nav-enter-to");
    },
    { once: true }
  );
}

function openTicketsMenu() {
  let isNavOpen = NAV_TOGGLE_EL.classList.contains("nav-toggle--close") && NAV_EL.classList.contains("nav--open");
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

  TICKETS_NAV_EL.classList.add("nav-enter-active");
  setTimeout(() => {
    TICKETS_NAV_EL.classList.remove("d-none");
  }, 20);
  setTimeout(
    () => {
      TICKETS_NAV_EL.classList.add("nav-enter-to", "nav--open");
    },
    isNavOpen ? 800 : 40
  );
  TICKETS_NAV_ITEMS[1].addEventListener(
    transitionEnd,
    () => {
      TICKETS_NAV_EL.classList.remove("nav-enter-active", "nav-enter-to");
    },
    { once: true }
  );
}

function toggleNavMenu() {
  let isNavOpen = NAV_TOGGLE_EL.classList.contains("nav-toggle--close") && NAV_EL.classList.contains("nav--open");
  if (isNavOpen) {
    closeNavMenu();
  } else {
    openNavMenu();
    if (TICKETS_TOGGLE_EL.classList.contains("tickets-toggle--close")) {
      closeTicketsMenu();
    }
  }
  setTimeout(bodyHasModal, 850);
}

function toggleTicketMenu() {
  let isMenuOpen =
    TICKETS_TOGGLE_EL.classList.contains("tickets-toggle--close") && TICKETS_OPEN_LABEL_EL.classList.contains("hidden") && TICKETS_NAV_EL.classList.contains("nav--open");
  let isMenuClosed =
    !TICKETS_TOGGLE_EL.classList.contains("tickets-toggle--close") && TICKETS_CLOSE_LABEL_EL.classList.contains("hidden") && TICKETS_NAV_EL.classList.contains("d-none");
  if (isMenuOpen) {
    closeTicketsMenu();
  } else if (isMenuClosed) {
    openTicketsMenu();
    if (NAV_TOGGLE_EL.classList.contains("nav-toggle--close")) {
      closeNavMenu();
    }
  }
  setTimeout(bodyHasModal, 850);
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

function bodyHasModal() {
  let isMenuOpen =
    TICKETS_TOGGLE_EL.classList.contains("tickets-toggle--close") && TICKETS_OPEN_LABEL_EL.classList.contains("hidden") && TICKETS_NAV_EL.classList.contains("nav--open");
  let isNavOpen = NAV_TOGGLE_EL.classList.contains("nav-toggle--close") && NAV_EL.classList.contains("nav--open");
  let isModalOpen = document.querySelector(".speaker-modal");

  console.log(isMenuOpen, isModalOpen, isNavOpen);

  if (isMenuOpen || isNavOpen || !!isModalOpen) {
    document.body.classList.add("modal-open");
  } else {
    document.body.classList.remove("modal-open");
  }
}
