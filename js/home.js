(function () {
(function () {
const textes =
  "¡Hola! Me llamo Sebastian y este es mi portafolio. Aquí van a poder conocer más sobre mí­. En la barra superior se encuentran diferentes opciones, selecciona cualquiera de las que quieras conocer.";
const texten =
  "Hi! My name is Sebastian, and this is my portfolio. Here you can learn more about me. The top menu bar has several options; just click on whichever one you'd like to explore.";
const typingSpeed = 45;
let currentLang = localStorage.getItem("language") || "en";
let text = currentLang === "es" ? textes : texten;
let i = 0;
let typingTimeoutId = null;
let isComplete = false;
const editor = document.querySelector(".editor");

function renderText(content, withCursor) {
  if (!editor) return;
  editor.innerHTML =
    '<span class="type-line">' +
    content +
    (withCursor ? '<span class="cursor"></span>' : "") +
    "</span>";
}

function type() {
  if (isComplete) return;
  if (i <= text.length) {
    renderText(text.substring(0, i), true);
    i++;
    typingTimeoutId = setTimeout(type, typingSpeed);
  }
}

function startTyping(lang) {
  currentLang = lang || currentLang;
  text = currentLang === "es" ? textes : texten;
  isComplete = false;
  i = 0;
  if (typingTimeoutId) clearTimeout(typingTimeoutId);
  if (editor) type();
}

function revealAll() {
  if (isComplete) return;
  isComplete = true;
  i = text.length;
  if (typingTimeoutId) clearTimeout(typingTimeoutId);
  renderText(text, false);
}

if (editor) {
  startTyping(currentLang);
  editor.addEventListener("click", revealAll);
  document.addEventListener("click", revealAll);
  document.addEventListener("keydown", (event) => {
    if (event.code === "Space" || event.key === " ") {
      event.preventDefault();
      revealAll();
    }
  });
}
window.addEventListener("languagechange", (event) => {
  const nextLang = event.detail && event.detail.lang;
  startTyping(nextLang);
});
})();
})();
