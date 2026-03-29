const translations = {
  en: {
    aboutme: "About me",
    projects: "Projects",
    certifications: "Certifications",
    contact: "Contact info",
    contacttitle: "Contact info",
    lightmode: "Light mode☀️",
    mywebsite: "My Portfolio",
    home: "Home page",
    aboutmeTitle: "About me",
    projectstitle: "Projects",
    certificationstitle: "Certifications",
    darkmode: "Dark mode🌙",
    aboutmedes:
      "My full name is Juan Sebastian Martinez Medina. I am Colombian, a systems engineer, a developer, and bilingual. I earned my engineering degree from the Francisco de Paula Santander University (UFPS). I am a software developer with strong expertise in the programming languages Java, JavaScript, and Python. I also have strong knowledge and skills in: Web Development (Front-end and Back-end) and working with frameworks (React.js, Angular.js, Vue.js, Node.js, Bootstrap, Tailwind CSS), Web Application Development, Mobile Application Development, Database Management, Software Testing, Networking, Cybersecurity, and more. As I mentioned at the beginning, I am bilingual; I have a C1 level of English certified by Education First, and I also have basic to intermediate knowledge of French.",
    zismo: "A device built using Arduino and various sensors. This device is mounted on a bicycle, and if it detects an accident involving the rider, it sends an alert to a smartphone app. Repository link",
  },
  es: {
    aboutme: "Acerca de mi",
    projects: "Proyectos",
    certifications: "Certificados",
    contact: "Contacto",
    lightmode: "Modo claro☀️",
    darkmode: "Modo oscuro🌙",
    mywebsite: "Mi Portafolio",
    home: "Inicio",
    aboutmeTitle: "Acerca de mi",
    projectstitle: "Proyectos",
    certificationstitle: "Certificados",
    contacttitle: "Contacto",
    aboutmedes:
      "Mi nombre completo es Juan Sebastian Martinez Medina, soy colombiano, Ingeniero de Sistemas, desarrollador, bilingüe. Obtuve mi título de ingeniero en la Universidad Francisco de Paula Santander (UFPS). Soy desarrollador de software con sólidos conocimientos en los lenguajes de programación Java, Javascript y Python. También tengo muy buenos conocimientos y habilidades en: Desarrollo Web (Front-end y Back-end) y manejo de frameworks (React.js, Angular.js, Vue.js, Node.js, Bootstrap, Tailwind CSS), Desarrollo de Aplicaciones Web, Desarrollo de Aplicaciones Móviles, Gestión y manejo de Bases de Datos, Software Testing, Networking, Ciberseguridad y más. Como ya mencioné al inicio, soy bilingüe, tengo nivel C1 del idioma inglés certificado por la empresa Education First, además cuento con conocimiento básico-intermedio del idioma fránces.",
    zismo: "Dispositivo hecho usando Arduino y diferentes sensores. Este dispositivo va en una bicicleta y si detecta un algún accidente que le ocurra al usuario, este va a mandar una alerta a una app desarrollada para smartphone. Link del repositorio.",
  },
};

const translationTargets = {
  title: "title",
  aboutme: "aboutme",
  projects: "projects",
  certifications: "certifications",
  contact: "contact",
  light: "lightmode",
  dark: "darkmode",
  mywebsite: "mywebsite",
  home: "home",
  aboutmeTitle: "aboutmeTitle",
  projectstitle: "projectstitle",
  certificationstitle: "certificationstitle",
  contacttitle: "contacttitle",
  aboutmedes: "aboutmedes",
  zismo: "zismo",
};

function changeLanguage(lang) {
  localStorage.setItem("language", lang);

  Object.keys(translationTargets).forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const key = translationTargets[id];
    el.textContent = translations[lang][key];
  });

  window.dispatchEvent(
    new CustomEvent("languagechange", { detail: { lang } }),
  );
}

const savedLanguage = localStorage.getItem("language") || "en";
changeLanguage(savedLanguage);
