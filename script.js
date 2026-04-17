const body = document.body;
const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav a");
const yearTarget = document.querySelector("#current-year");
const revealItems = document.querySelectorAll(".reveal");

function updateHeaderOnScroll() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 16);
}

function closeMenu() {
  if (!body || !navToggle || !siteNav) return;
  body.classList.remove("menu-open");
  navToggle.setAttribute("aria-expanded", "false");
}

function toggleMenu() {
  if (!body || !navToggle || !siteNav) return;
  const isOpen = body.classList.toggle("menu-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
}

if (navToggle) {
  navToggle.addEventListener("click", toggleMenu);
}

navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 980) {
    closeMenu();
  }
});

window.addEventListener("scroll", updateHeaderOnScroll, { passive: true });
updateHeaderOnScroll();

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -40px 0px",
    },
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
