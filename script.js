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

// Hero video: some phones block videos from playing by themselves (for example
// an iPhone in Low Power Mode). Then hide the video so the still image behind it
// shows, instead of a big play button.
const heroVideo = document.querySelector(".hero-video");
if (heroVideo) {
  const hideVideo = () => heroVideo.classList.add("is-blocked");
  heroVideo.muted = true;
  const attempt = heroVideo.play();
  if (attempt && typeof attempt.catch === "function") attempt.catch(hideVideo);
  // Safety net: if it still hasn't started after a few seconds, show the still instead
  setTimeout(() => { if (heroVideo.paused) hideVideo(); }, 4000);
  heroVideo.addEventListener("playing", () => heroVideo.classList.remove("is-blocked"));
}
