// Phone menu, and highlighting the menu link for the section on screen.

const menuButton = document.querySelector(".menu-button");
const nav = document.getElementById("nav");
const header = document.querySelector(".site-header");
const hero = document.querySelector(".hero");

// Homepage: the header is see-through over the hero video at the very top, and
// fades to solid as soon as you start scrolling or open the phone menu.
function updateHeader() {
  if (!header || !hero || !document.body.classList.contains("has-hero")) return;
  const scrolled = window.scrollY > 4;
  const menuOpen = nav && nav.classList.contains("is-open");
  header.classList.toggle("is-solid", scrolled || menuOpen);
}
window.addEventListener("scroll", updateHeader, { passive: true });
window.addEventListener("resize", updateHeader);
updateHeader();

if (menuButton && nav) {
  const setOpen = (open) => {
    nav.classList.toggle("is-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.textContent = open ? "Close" : "Menu";
    updateHeader();
  };
  menuButton.addEventListener("click", () => setOpen(!nav.classList.contains("is-open")));
  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) setOpen(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });
}

const links = nav ? [...nav.querySelectorAll('a[href^="#"]')] : [];
const sections = links.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);

// The current section is the last one whose top has passed a line 40% down the screen.
function highlightCurrentSection() {
  const line = window.innerHeight * 0.4;
  let current = null;
  sections.forEach((section) => {
    if (section.getBoundingClientRect().top <= line) current = section;
  });
  links.forEach((link) => {
    if (current && link.getAttribute("href") === "#" + current.id) link.setAttribute("aria-current", "true");
    else link.removeAttribute("aria-current");
  });
}

if (sections.length) {
  let queued = false;
  window.addEventListener("scroll", () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; highlightCurrentSection(); });
  }, { passive: true });
  window.addEventListener("load", highlightCurrentSection);
  highlightCurrentSection();
}
