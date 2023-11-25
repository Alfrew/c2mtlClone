const EN_ELEMENT = document.getElementById("english");
const FR_ELEMENT = document.getElementById("french");

// Call updateContent() on page load
window.addEventListener("DOMContentLoaded", async () => {
  const userPreferredLanguage = localStorage.getItem("language") || "en";
  const langData = await fetchLanguageData(userPreferredLanguage);
  hideLanguages(userPreferredLanguage);
  updateContent(langData);
  updateAriaLabel(langData);
  updateAriaLabel(langData);
});

// Function to update content based on selected language
function updateContent(langData) {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    element.textContent = langData[key];
  });
}

// Function to update aria label based on selected language
function updateAriaLabel(langData) {
  document.querySelectorAll("[data-btni18n]").forEach((element) => {
    console.log(element);
    const key = element.getAttribute("data-btni18n");
    element.ariaLabel = langData[key];
  });
}

// Function to set the language preference
function setLanguagePreference(lang) {
  localStorage.setItem("language", lang);
  location.reload();
}

// Function to fetch language data
async function fetchLanguageData(lang) {
  const response = await fetch(`assets/i18n/${lang}.json`);
  return response.json();
}

// Function to change language
async function changeLanguage(lang) {
  await setLanguagePreference(lang);

  const langData = await fetchLanguageData(lang);
  updateContent(langData);
  updateAriaLabel(langData);
}

function hideLanguages(language) {
  switch (language) {
    case "en":
      EN_ELEMENT.classList.add("hidden");
      FR_ELEMENT.classList.remove("hidden");
      break;
    case "fr":
      FR_ELEMENT.classList.add("hidden");
      EN_ELEMENT.classList.remove("hidden");
      break;
  }
}
