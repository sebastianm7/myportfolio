function applyTheme(theme) {
  const isDark = theme === "dark";
  const addClass = isDark ? "dark-mode" : "light-mode";
  const removeClass = isDark ? "light-mode" : "dark-mode";

  const allElements = document.querySelectorAll("*");
  allElements.forEach((el) => {
    el.classList.remove(removeClass);
    el.classList.add(addClass);
  });

  // Ensure root elements get the class even if the page is sparse.
  document.documentElement.classList.remove(removeClass);
  document.documentElement.classList.add(addClass);
  if (document.body) {
    document.body.classList.remove(removeClass);
    document.body.classList.add(addClass);
  }

  localStorage.setItem("theme", theme);
}

function setLightMode() {
  applyTheme("light");
}

function setDarkMode() {
  applyTheme("dark");
}

const savedTheme = localStorage.getItem("theme");
applyTheme(savedTheme === "dark" ? "dark" : "light");

function setupThemeMenu() {
  const switchers = document.querySelectorAll(".theme-switcher");
  if (!switchers.length) return;

  function closeAll() {
    switchers.forEach((switcher) => {
      switcher.classList.remove("open");
      const toggle = switcher.querySelector(".theme-toggle");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
    });
  }

  switchers.forEach((switcher) => {
    const toggle = switcher.querySelector(".theme-toggle");
    const menu = switcher.querySelector(".theme-menu");
    if (!toggle || !menu) return;

    toggle.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      closeAll();
      const isOpen = switcher.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    menu.addEventListener("click", (event) => {
      event.stopPropagation();

      const button = event.target.closest("button");
      if (!button) return;

      switcher.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", closeAll);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAll();
    }
  });
}

setupThemeMenu();

