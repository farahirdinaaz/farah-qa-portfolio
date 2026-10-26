const SITE_CONFIG = {
  name: "Farah Irdina",
  cvHref: "https://drive.google.com/file/d/1o-vOu_G05d0oi1UEuhJMvrzQcdzFVR4P/view?usp=drive_link",
  sections: [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "project", label: "Project" },
    { id: "education", label: "Education" },
    { id: "certification", label: "Certification" },
    { id: "contact", label: "Contact" }
  ]
};

function renderHeader() {
  const navLinks = SITE_CONFIG.sections
    .map(s => `<a href="#${s.id}" data-section="${s.id}">${s.label}</a>`)
    .join("\n      ");

  return `
    <div class="nav-inner">
      <a class="nav-name" href="#top">${SITE_CONFIG.name}</a>
      <button class="menu-btn" id="menu-btn" aria-expanded="false" aria-controls="nav-links">Menu</button>
      <nav class="links" id="nav-links">
        ${navLinks}
        <a href="${SITE_CONFIG.cvHref}" class="cv-btn">Download CV</a>
      </nav>
    </div>
  `;
}

function renderFooter() {
  return `© 2026 ${SITE_CONFIG.name} · Built with care, tested with intent`;
}

function setupScrollSpy() {
  const links = document.querySelectorAll("#nav-links a[data-section]");
  if (!links.length) return;

  const linkBySection = {};
  links.forEach(a => (linkBySection[a.dataset.section] = a));

  const sections = SITE_CONFIG.sections
    .map(s => document.getElementById(s.id))
    .filter(Boolean);
  if (!sections.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          links.forEach(a => a.removeAttribute("aria-current"));
          const link = linkBySection[entry.target.id];
          if (link) link.setAttribute("aria-current", "page");
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );

  sections.forEach(sec => observer.observe(sec));
}

function mountSiteChrome() {
  const headerMount = document.getElementById("site-header");
  const footerMount = document.getElementById("site-footer");
  const githubMount = document.getElementById("github-link");

  if (headerMount) headerMount.innerHTML = renderHeader();
  if (footerMount) footerMount.innerHTML = renderFooter();
  if (githubMount) githubMount.setAttribute("href", SITE_CONFIG.githubHref);

  const menuBtn = document.getElementById("menu-btn");
  const navLinks = document.getElementById("nav-links");
  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    navLinks.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  setupScrollSpy();
}

document.addEventListener("DOMContentLoaded", mountSiteChrome);
