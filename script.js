// Jozibroc website interactions

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
});

document.querySelectorAll("#navLinks a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

// Reveal sections as they enter the viewport.
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Automatically add the current year.
document.getElementById("year").textContent = new Date().getFullYear();

// Track guide interest in Meta Pixel and personalise WhatsApp messages.
document.querySelectorAll("[data-guide]").forEach(button => {
  button.addEventListener("click", () => {
    const guide = button.dataset.guide;

    if (typeof fbq === "function") {
      fbq("trackCustom", "GuideInterest", { guide_name: guide });
    }

    const contact = document.querySelector("#contact");
    if (contact) {
      const phone = "2348035386550";
      const message = encodeURIComponent(
        `Hello Elizabeth, I'm interested in "${guide}". Please send me the details.`
      );

      const whatsappLinks = contact.querySelectorAll(
        'a[href^="https://wa.me/"]'
      );

      whatsappLinks.forEach(link => {
        link.href = `https://wa.me/${phone}?text=${message}`;
      });
    }
  });
});

// Track WhatsApp clicks as a Lead event.
document.querySelectorAll('a[href^="https://wa.me/"]').forEach(link => {
  link.addEventListener("click", () => {
    if (typeof fbq === "function") {
      fbq("track", "Lead");
    }
  });
});
