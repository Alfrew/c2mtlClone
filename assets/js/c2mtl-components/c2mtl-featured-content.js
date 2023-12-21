const FEAT_CONTENT_ITEM_LIST = document.querySelectorAll(".featured-content__item ");

FEAT_CONTENT_ITEM_LIST.forEach((el) => {
  window.addEventListener("scroll", () => {
    elementIsVisible(el);
  });
});
