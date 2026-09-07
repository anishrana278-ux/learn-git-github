document.addEventListener("DOMContentLoaded", () => {
  
  // ==========================================
  // 1. SECURITY MEASURES
  // ==========================================

  // Anti-Clickjacking: Ensure page isn't framed on untrusted sites
  if (window.top !== window.self) {
    window.top.location = window.self.location;
  }

  // Safe DOM Manipulation function (Prevents XSS Injection)
  function renderSafeContent(targetElement, rawInput) {
    // Uses DOMPurify to sanitize HTML strings
    const cleanHTML = DOMPurify.sanitize(rawInput);
    targetElement.innerHTML = cleanHTML;
  }

  // Handle Form Submission securely
  const form = document.getElementById("reservation-form");
  const responseDiv = document.getElementById("form-response");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const nameInput = document.getElementById("name").value.trim();
      const emailInput = document.getElementById("email").value.trim();

      // Basic Input Sanitization / Validation
      if (!nameInput || !emailInput) {
        renderSafeContent(responseDiv, "<span style='color:red;'>Please fill all fields properly.</span>");
        return;
      }

      // Render sanitized response safely
      const userMessage = `Thank you, <strong>${nameInput}</strong>! Your table request has been received.`;
      renderSafeContent(responseDiv, userMessage);

      form.reset();
    });
  }

  // ==========================================
  // 2. GSAP ANIMATIONS
  // ==========================================

  gsap.registerPlugin(ScrollTrigger);

  // Navbar Slide Down Animation
  gsap.from(".navbar", {
    y: -100,
    opacity: 0,
    duration: 1,
    ease: "power2.out"
  });

  // Hero Section Staggered Fade Up
  gsap.from(".anim-hero", {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out",
    delay: 0.3
  });

  // Scroll Triggered Fade-ins for Headings and Paragraphs
  gsap.utils.toArray(".anim-scroll").forEach((element) => {
    gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none none"
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    });
  });

  // Staggered Cards Reveal on Scroll
  gsap.from(".anim-card", {
    scrollTrigger: {
      trigger: ".menu-grid",
      start: "top 80%"
    },
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: "power2.out"
  });
});