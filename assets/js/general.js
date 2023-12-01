const IMG_LIST = document.querySelectorAll("img");
const VIDEO_LIST = document.querySelectorAll("video");

IMG_LIST.forEach((img) => {
  img.addEventListener("load", img.classList.add("base-image__img--loaded"));
});
VIDEO_LIST.forEach((video) => {
  video.addEventListener("load", video.parentElement.classList.add("base-video--loaded"));
});
