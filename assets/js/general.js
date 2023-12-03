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
