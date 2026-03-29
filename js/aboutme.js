(function () {
(function () {
const textes =
  "Mi nombre completo es Juan Sebastian Martinez Medina, soy colombiano, Ingeniero de Sistemas, desarrollador full-stack, bilingüe. Obtuve mi título de ingeniero en la Universidad Francisco de Paula Santander (UFPS). Soy desarrollador de software con sólidos conocimientos en los lenguajes de programación Java, Javascript y Python. También tengo muy buenos conocimientos y habilidades en: Desarrollo Web (Front-end y Back-end) y manejo de frameworks (React.js, Angular.js, Vue.js, Node.js, Bootstrap, Tailwind CSS), Desarrollo de Aplicaciones Web, Desarrollo de Aplicaciones Móviles, Gestión y manejo de Bases de Datos, Software Testing, Networking, Ciberseguridad y más. Como ya mencioné al inicio, soy bilingüe, tengo nivel C1 del idioma inglés certificado por la empresa Education First, además cuento con un conocimiento básico-intermedio del idioma fránces.";
const texten =
  "My full name is Juan Sebastian Martinez Medina. I am Colombian, a systems engineer, a full-stack developer, and bilingual. I earned my engineering degree from the Francisco de Paula Santander University (UFPS). I am a software developer with strong expertise in the programming languages Java, JavaScript, and Python. I also have strong knowledge and skills in: Web Development (Front-end and Back-end) and working with frameworks (React.js, Angular.js, Vue.js, Node.js, Bootstrap, Tailwind CSS), Web Application Development, Mobile Application Development, Database Management, Software Testing, Networking, Cybersecurity, and more. As I mentioned at the beginning, I am bilingual; I have a C1 level of English certified by Education First, and I also have a basic-intermediate knowledge of French.";
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
