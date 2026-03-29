const typingSpeed = 45;

const projectTranslations = {
  es: {
    pageTitle: "Algunos de los proyectos en los que he participado:",
    blocks: [
      {
        title: "Zismo",
        html: `Dispositivo hecho usando Arduino y diferentes sensores. Este dispositivo va en una bicicleta y si detecta un algún accidente que le ocurra al usuario, este va a mandar una alerta a una app desarrollada para smartphone. <a href="https://github.com/GuillermoGU24/Zismo">Repo link.</a>`,
      },
      {
        title: "ProcenterApp",
        html: `Software web hecho para una empresa de venta de automóviles. El usuario que ingrese podra acceder a diferentes opciones según su rol (Admin, Empleado o CLiente). <a href="https://github.com/joferrer/ProcenterApp">Repo link.</a>`,
      },
      {
        title: "PlantProtector",
        html: `Dispositivo hecho usando Arduino junto con diferentes sensores y una pequeña bomba de agua. Este tiene la finalidad de detectar el nivel de humedad de una planta y regarla automáticamente. <a href="https://github.com/sebastianm7/plantprotector">Repo link.</a>`,
      },
      {
        title: "Celeus Group Platform Testing",
        html: `Realización de pruebas de calidad del software usado por la empresa Celeus Group para la gestión de empleados, clientes y productos. Estas tuvieron la finalidad de encontrar bugs y errores en el código del software para realizar su respectiva correción. No puedo compartir los resultados del testing debido a un tema de confidecialidad.`,
      },
    ],
  },
  en: {
    pageTitle: "Some of the projects I've worked on:",
    blocks: [
      {
        title: "Zismo",
        html: `A device built using an Arduino and various sensors. This device is mounted on a bicycle, and if it detects that the rider has been in an accident, it sends an alert to a smartphone app. <a href="https://github.com/GuillermoGU24/Zismo">Repo link.</a>`,
      },
      {
        title: "ProcenterApp",
        html: `Web-based software designed for a car dealership. Users who log in will have access to different options depending on their role (Admin, Employee, or Customer). <a href="https://github.com/joferrer/ProcenterApp">Repo link.</a>`,
      },
      {
        title: "PlantProtector",
        html: `A device built using an Arduino, various sensors, and a small water pump. Its purpose is to detect a plant's moisture level and water it automatically. <a href="https://github.com/sebastianm7/plantprotector">Repo link.</a>`,
      },
      {
        title: "Celeus Group Platform Testing",
        html: `I conducted quality testing on the software used by the Celeus Group to manage employees, customers, and products. The purpose of these tests was to identify bugs and errors in the software code so they could be corrected. I am unable to share the test results due to confidentiality concerns.`,
      },
    ],
  },
};

const pageTitle = document.querySelector(".title");
const blockNodes = Array.from(
  document.querySelectorAll(".editor .p1, .editor .p2, .editor .p3, .editor .p4")
);

const blocks = blockNodes.map((block) => {
  const title = block.querySelector("h1");
  const paragraph = block.querySelector("p");

  return {
    block,
    title,
    paragraph,
    titleText: "",
    titleIndex: 0,
    paragraphHtml: "",
    paragraphText: "",
    paragraphIndex: 0,
    timeoutId: null,
    isComplete: false,
  };
});

let currentLang = localStorage.getItem("language") || "en";
let pageTitleText = "";
let pageTitleIndex = 0;
let pageTitleTimeoutId = null;
let pageTitleComplete = false;

function stripHtml(html) {
  const temp = document.createElement("div");
  temp.innerHTML = html;
  return temp.textContent.replace(/\s+/g, " ").trim();
}

function resetTypingState() {
  pageTitleIndex = 0;
  pageTitleComplete = false;
  if (pageTitleTimeoutId) {
    clearTimeout(pageTitleTimeoutId);
    pageTitleTimeoutId = null;
  }

  blocks.forEach((item) => {
    if (item.timeoutId) {
      clearTimeout(item.timeoutId);
      item.timeoutId = null;
    }
    item.titleIndex = 0;
    item.paragraphIndex = 0;
    item.isComplete = false;
  });
}

function applyLanguage(lang) {
  currentLang = projectTranslations[lang] ? lang : "en";
  const content = projectTranslations[currentLang];

  pageTitleText = content.pageTitle;

  blocks.forEach((item, index) => {
    const translatedBlock = content.blocks[index];
    if (!translatedBlock) return;

    item.titleText = translatedBlock.title;
    item.paragraphHtml = translatedBlock.html;
    item.paragraphText = stripHtml(translatedBlock.html);
  });
}

function initializeContent() {
  if (pageTitle) {
    pageTitle.textContent = "";
  }

  blocks.forEach((item) => {
    if (item.title) {
      item.title.textContent = "";
    }

    if (item.paragraph) {
      item.paragraph.textContent = "";
    }
  });
}

function renderPageTitle() {
  if (!pageTitle) return;

  if (pageTitleComplete) {
    pageTitle.textContent = pageTitleText;
    return;
  }

  const titleContent = pageTitleText.substring(0, pageTitleIndex);
  pageTitle.innerHTML =
    '<span class="type-line">' +
    titleContent +
    '<span class="cursor"></span>' +
    "</span>";
}

function renderBlock(item, activeOnParagraph) {
  const titleContent = item.titleText.substring(0, item.titleIndex);
  const titleCursor = !activeOnParagraph && !item.isComplete && item.titleIndex > 0;

  if (item.title) {
    item.title.innerHTML =
      '<span class="type-line">' +
      titleContent +
      (titleCursor ? '<span class="cursor"></span>' : "") +
      "</span>";
  }

  if (!item.paragraph) return;

  if (item.isComplete) {
    item.paragraph.innerHTML = item.paragraphHtml;
    return;
  }

  const paragraphContent = item.paragraphText.substring(0, item.paragraphIndex);
  const paragraphCursor = activeOnParagraph && item.paragraphIndex > 0;

  item.paragraph.innerHTML =
    '<span class="type-line">' +
    paragraphContent +
    (paragraphCursor ? '<span class="cursor"></span>' : "") +
    "</span>";
}

function typePageTitle(onComplete) {
  if (!pageTitle) {
    pageTitleComplete = true;
    if (onComplete) onComplete();
    return;
  }

  if (pageTitleIndex <= pageTitleText.length) {
    renderPageTitle();
    pageTitleIndex += 1;
    pageTitleTimeoutId = setTimeout(() => typePageTitle(onComplete), typingSpeed);
    return;
  }

  pageTitleComplete = true;
  renderPageTitle();
  if (onComplete) onComplete();
}

function typeBlock(item) {
  if (item.isComplete) return;

  if (item.titleIndex <= item.titleText.length) {
    renderBlock(item, false);
    item.titleIndex += 1;
    item.timeoutId = setTimeout(() => typeBlock(item), typingSpeed);
    return;
  }

  if (item.paragraphIndex <= item.paragraphText.length) {
    renderBlock(item, true);
    item.paragraphIndex += 1;
    item.timeoutId = setTimeout(() => typeBlock(item), typingSpeed);
    return;
  }

  item.isComplete = true;
  renderBlock(item, false);
}

function startTyping(lang) {
  applyLanguage(lang || currentLang);
  resetTypingState();
  initializeContent();

  if (!pageTitle) {
    blocks.forEach((item) => {
      renderBlock(item, false);
      typeBlock(item);
    });
    return;
  }

  blocks.forEach((item) => renderBlock(item, false));

  typePageTitle(() => {
    blocks.forEach((item) => typeBlock(item));
  });
}

function revealAll() {
  if (pageTitleTimeoutId) {
    clearTimeout(pageTitleTimeoutId);
    pageTitleTimeoutId = null;
  }

  pageTitleComplete = true;
  pageTitleIndex = pageTitleText.length;
  renderPageTitle();

  blocks.forEach((item) => {
    if (item.timeoutId) {
      clearTimeout(item.timeoutId);
      item.timeoutId = null;
    }

    item.isComplete = true;
    item.titleIndex = item.titleText.length;
    item.paragraphIndex = item.paragraphText.length;
    renderBlock(item, false);
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
