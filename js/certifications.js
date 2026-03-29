const typingSpeed = 45;
const blocks = Array.from(
  document.querySelectorAll(".editor .c1, .editor .c2, .editor .c3, .editor .c4")
).map((block) => {
  const title = block.querySelector("h1");
  const items = Array.from(block.querySelectorAll("li")).map((li) => {
    const link = li.querySelector("a");

    return {
      li,
      text: (link ? link.textContent : li.textContent).trim(),
      originalHTML: li.innerHTML,
      linkAttrs: link
        ? {
            href: link.getAttribute("href") || "",
            target: link.getAttribute("target"),
            rel: link.getAttribute("rel"),
          }
        : null,
    };
  });

  return {
    block,
    title,
    items,
    titleText: title ? title.textContent.trim() : "",
    itemsText: items.map((item) => item.text),
    titleIndex: 0,
    currentItem: 0,
    itemChar: 0,
    timeoutId: null,
    isComplete: false,
  };
});

function renderBlock(item) {
  const titleContent = item.titleText.substring(0, item.titleIndex);
  const titleCursor = !item.isComplete && item.titleIndex <= item.titleText.length;

  if (item.title) {
    item.title.innerHTML =
      '<span class="type-line">' +
      titleContent +
      (titleCursor ? '<span class="cursor"></span>' : "") +
      "</span>";
  }

  item.items.forEach((entry, index) => {
    const fullText = item.itemsText[index] || "";

    if (item.isComplete || index < item.currentItem) {
      entry.li.innerHTML = entry.originalHTML;
      return;
    }

    if (index > item.currentItem) {
      entry.li.textContent = "";
      return;
    }

    const partial = fullText.substring(0, item.itemChar);

    if (entry.linkAttrs) {
      const target = entry.linkAttrs.target
        ? ` target="${entry.linkAttrs.target}"`
        : "";
      const rel = entry.linkAttrs.rel ? ` rel="${entry.linkAttrs.rel}"` : "";

      entry.li.innerHTML =
        `<a href="${entry.linkAttrs.href}"${target}${rel}>` +
        '<span class="type-line">' +
        partial +
        '<span class="cursor"></span>' +
        "</span></a>";
      return;
    }

    entry.li.innerHTML =
      '<span class="type-line">' +
      partial +
      '<span class="cursor"></span>' +
      "</span>";
  });
}

function typeBlock(item) {
  if (item.isComplete) return;

  if (item.titleIndex <= item.titleText.length) {
    renderBlock(item);
    item.titleIndex += 1;
    item.timeoutId = setTimeout(() => typeBlock(item), typingSpeed);
    return;
  }

  if (item.currentItem < item.itemsText.length) {
    const currentText = item.itemsText[item.currentItem] || "";

    if (item.itemChar <= currentText.length) {
      renderBlock(item);
      item.itemChar += 1;
      item.timeoutId = setTimeout(() => typeBlock(item), typingSpeed);
      return;
    }

    item.currentItem += 1;
    item.itemChar = 0;
    item.timeoutId = setTimeout(() => typeBlock(item), typingSpeed);
    return;
  }

  item.isComplete = true;
  renderBlock(item);
}

function startTyping() {
  blocks.forEach((item) => typeBlock(item));
}

function revealAll() {
  blocks.forEach((item) => {
    if (item.timeoutId) clearTimeout(item.timeoutId);
    item.isComplete = true;
    item.titleIndex = item.titleText.length;
    item.currentItem = item.itemsText.length;
    item.itemChar = 0;
    renderBlock(item);
  });
}

startTyping();

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
