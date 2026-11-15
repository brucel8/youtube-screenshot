// YouTube Screenshot - i18n helper for the popup and options pages.
// Strings live in _locales/<lang>/messages.json; elements marked with
// a data-i18n attribute get their text filled in from there.
function t(key, ...subs) {
  return chrome.i18n.getMessage(key, subs.map(String)) || key;
}

(function localizePage() {
  document.documentElement.lang = chrome.i18n.getUILanguage();
  for (const el of document.querySelectorAll("[data-i18n]")) {
    el.textContent = t(el.dataset.i18n);
  }
})();
