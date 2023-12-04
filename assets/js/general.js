const IMG_LIST = document.querySelectorAll("img");
const VIDEO_LIST = document.querySelectorAll("video");
const PARALLAX_ASSET_LIST = document.querySelectorAll(".parallax-asset");

IMG_LIST.forEach((img) => {
  img.addEventListener("load", img.classList.add("base-image__img--loaded"));
});
VIDEO_LIST.forEach((video) => {
  video.addEventListener("load", video.parentElement.classList.add("base-video--loaded"));
});
setTimeout(() => {
  PARALLAX_ASSET_LIST.forEach((el) => {
    el.classList.add("is-visible");
  });
}, 1500);

function elementIsVisible(element) {
  const triggerBottom = (window.innerHeight / 5) * 4;

  const boxTop = element.getBoundingClientRect().top;

  if (boxTop < triggerBottom) {
    element.classList.add("is-visible");
    window.removeEventListener("scroll", () => {
      elementIsVisible(element);
    });
  }
}

function textSplitter(el, delay) {
  el.forEach((line) => {
    let word = line.querySelector(".text-splitter");
    let charArray = word.textContent.split("");
    word.innerHTML = "";
    charArray.forEach((char) => {
      let charEl = document.createElement("div");
      charEl.classList.add("anim-char");
      charEl.style.transitionDelay = `${delay}s`;
      charEl.style.display = "inline-block";
      charEl.textContent = char;
      word.appendChild(charEl);
      delay += 0.04;
    });
    word.classList.add("text-splitter--splitted");
    delay -= 0.05;
  });
}
