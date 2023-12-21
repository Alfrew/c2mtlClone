const STATS_ITEM_LIST = document.querySelectorAll(".home-stats-item");
const STATS_ITEM_TITLE_LIST = document.querySelectorAll(".home-stats-item__title");

setTimeout(() => {
  STATS_ITEM_TITLE_LIST.forEach((el) => {
    let animTextList = el.querySelectorAll(".anim-text");
    textSplitter(animTextList, 0.0);
  });
}, 1400);

STATS_ITEM_LIST.forEach((el) => {
  window.addEventListener("scroll", () => {
    elementIsVisible(el);
  });
});
