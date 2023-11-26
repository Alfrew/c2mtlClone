const HEADER_ELEMENT = document.querySelector(".header");
const NAV_TOGGLE_ELEMENT = document.querySelector(".nav-toggle");

setTimeout(() => {
  HEADER_ELEMENT.classList.add("header--visible");
}, 1500);

NAV_TOGGLE_ELEMENT.addEventListener("click", () => {
  NAV_TOGGLE_ELEMENT.classList.contains("nav-toggle--close")
    ? NAV_TOGGLE_ELEMENT.classList.remove("nav-toggle--close")
    : NAV_TOGGLE_ELEMENT.classList.add("nav-toggle--close");
});
