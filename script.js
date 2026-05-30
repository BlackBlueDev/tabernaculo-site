const body = document.body;
const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav a");
const revealItems = document.querySelectorAll(".reveal");
const yearTarget = document.querySelector("#current-year");
const accordions = document.querySelectorAll(".accordion");
const aboutDetails = document.querySelector(".about-details");

let lastScrollY = window.scrollY;

function closeMenu() {
  if (!body || !menuToggle) return;
  body.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
}

function toggleMenu() {
  if (!body || !menuToggle) return;
  const isOpen = body.classList.toggle("menu-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));

  if (isOpen && header) {
    header.classList.remove("is-hidden");
  }
}

function updateHeaderState() {
  if (!header) return;

  const currentScrollY = window.scrollY;
  const isMenuOpen = body?.classList.contains("menu-open");
  const scrollingDown = currentScrollY > lastScrollY + 8;
  const scrollingUp = currentScrollY < lastScrollY - 8;

  header.classList.toggle("is-scrolled", currentScrollY > 10);

  if (isMenuOpen) {
    header.classList.remove("is-hidden");
    lastScrollY = currentScrollY;
    return;
  }

  if (currentScrollY <= 20) {
    header.classList.remove("is-hidden");
    lastScrollY = currentScrollY;
    return;
  }

  if (scrollingDown && currentScrollY > 140) {
    header.classList.add("is-hidden");
  } else if (scrollingUp) {
    header.classList.remove("is-hidden");
  }

  lastScrollY = currentScrollY;
}

if (menuToggle) {
  menuToggle.addEventListener("click", toggleMenu);
}

navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("click", (event) => {
  if (!body?.classList.contains("menu-open")) return;
  if (!header?.contains(event.target)) {
    closeMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth >= 960) {
    closeMenu();
  }
});

window.addEventListener("scroll", updateHeaderState, { passive: true });
updateHeaderState();

accordions.forEach((accordion) => {
  accordion.addEventListener("toggle", () => {
    if (!accordion.open) return;

    accordions.forEach((otherAccordion) => {
      if (otherAccordion !== accordion) {
        otherAccordion.open = false;
      }
    });
  });
});

if (aboutDetails) {
  aboutDetails.addEventListener("toggle", () => {
    if (aboutDetails.open) return;

    accordions.forEach((accordion) => {
      accordion.open = false;
    });
  });
}

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
      threshold: 0.14,
      rootMargin: "0px 0px -20px 0px",
    },
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
