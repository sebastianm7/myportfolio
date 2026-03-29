const typingSpeed = 45;

const contactTranslations = {
  es: {
    contactq: "¿Quieres contactarte conmigo? Por estos medios puedes:",
    email: "Correo📧: juansemartinezm99@gmail.com",
  },
  en: {
    contactq:
      "Would you like to contact me? You can do so through the following channels:",
    email: "Email📧: juansemartinezm99@gmail.com",
  },
};

const blocks = Array.from(document.querySelectorAll(".editor .p1")).map((block) => {
  const title = block.querySelector("h1");
  const paragraphs = Array.from(block.querySelectorAll("p")).map((paragraph) => ({
    node: paragraph,
    text: "",
    html: paragraph.innerHTML,
    index: 0,
  }));

  return {
    block,
    title,
    paragraphs,
    titleText: "",
    titleIndex: 0,
    paragraphCursorIndex: 0,
    timeoutId: null,
    isComplete: false,
  };
});

let currentLang = localStorage.getItem("language") || "en";

function normalizeText(text) {
  return text.replace(/\s+/g, " ").trim();
}

function getTranslatedText(node, lang) {
  if (!node) return "";
  if (node.classList.contains("contactq")) {
    return contactTranslations[lang].contactq;
  }
  if (node.classList.contains("email")) {
    return contactTranslations[lang].email;
  }
  return normalizeText(node.textContent);
}

function applyLanguage(lang) {
  currentLang = contactTranslations[lang] ? lang : "en";

  blocks.forEach((item) => {
    item.titleText = getTranslatedText(item.title, currentLang);

    item.paragraphs.forEach((paragraph) => {
      paragraph.text = getTranslatedText(paragraph.node, currentLang);
      if (
        paragraph.node.classList.contains("contactq") ||
        paragraph.node.classList.contains("email")
      ) {
        paragraph.html = paragraph.text;
      } else {
        paragraph.html = paragraph.node.innerHTML;
      }
    });
  });
}

function initializeContent() {
  blocks.forEach((item) => {
    if (item.title) {
      item.title.textContent = "";
    }

    item.paragraphs.forEach((paragraph) => {
      paragraph.node.textContent = "";
    });
  });
}

function renderBlock(item, activeParagraphIndex, activeOnParagraph) {
  const titleContent = item.titleText.substring(0, item.titleIndex);
  const titleCursor =
    !activeOnParagraph && !item.isComplete && item.titleIndex > 0;

  if (item.title) {
    item.title.innerHTML =
      '<span class="type-line">' +
      titleContent +
      (titleCursor ? '<span class="cursor"></span>' : "") +
      "</span>";
  }

  item.paragraphs.forEach((paragraph, index) => {
    if (item.isComplete) {
      paragraph.node.innerHTML = paragraph.html;
      return;
    }

    const paragraphContent = paragraph.text.substring(0, paragraph.index);
    const paragraphCursor =
      activeOnParagraph &&
      index === activeParagraphIndex &&
      !item.isComplete &&
      paragraph.index > 0;

    paragraph.node.innerHTML =
      '<span class="type-line">' +
      paragraphContent +
      (paragraphCursor ? '<span class="cursor"></span>' : "") +
      "</span>";
  });
}

function typeBlock(item) {
  if (item.isComplete) return;

  if (item.titleIndex <= item.titleText.length) {
    renderBlock(item, -1, false);
    item.titleIndex += 1;
    item.timeoutId = setTimeout(() => typeBlock(item), typingSpeed);
    return;
  }

  const currentParagraph = item.paragraphs[item.paragraphCursorIndex];
  if (currentParagraph) {
    if (currentParagraph.index <= currentParagraph.text.length) {
      renderBlock(item, item.paragraphCursorIndex, true);
      currentParagraph.index += 1;
      item.timeoutId = setTimeout(() => typeBlock(item), typingSpeed);
      return;
    }

    item.paragraphCursorIndex += 1;
    item.timeoutId = setTimeout(() => typeBlock(item), typingSpeed);
    return;
  }

  item.isComplete = true;
  renderBlock(item, -1, false);
}

function resetTypingState() {
  blocks.forEach((item) => {
    if (item.timeoutId) {
      clearTimeout(item.timeoutId);
      item.timeoutId = null;
    }

    item.titleIndex = 0;
    item.paragraphCursorIndex = 0;
    item.isComplete = false;

    item.paragraphs.forEach((paragraph) => {
      paragraph.index = 0;
    });
  });
}

function startTyping(lang) {
  applyLanguage(lang || currentLang);
  resetTypingState();
  initializeContent();
  blocks.forEach((item) => typeBlock(item));
}

function revealAll() {
  blocks.forEach((item) => {
    if (item.timeoutId) clearTimeout(item.timeoutId);
    item.isComplete = true;
    item.titleIndex = item.titleText.length;
    item.paragraphs.forEach((paragraph) => {
      paragraph.index = paragraph.text.length;
    });
    renderBlock(item, -1, false);
  });
}

startTyping(currentLang);

const editor = document.querySelector(".editor");
if (editor) {
  editor.addEventListener("click", revealAll);
}

document.addEventListener("click", revealAll);
document.addEventListener("keydown", (event) => {
  if (
    event.code === "Space" ||
    event.key === " " ||
    event.code === "Enter" ||
    event.key === "Enter"
  ) {
    event.preventDefault();
    revealAll();
  }
});

document.addEventListener("touchstart", revealAll);

window.addEventListener("languagechange", (event) => {
  const nextLang = event.detail && event.detail.lang;
  startTyping(nextLang);
});
