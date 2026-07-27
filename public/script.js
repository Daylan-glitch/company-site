/* ==========================================================================
   Medbase Business LLC — Interactive Enhancements
   Premium Animations: custom cursor, magnetic buttons, ripple effect,
   gradient mesh, floating orbs, scroll-based reveals, text split, counters
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // ========== SCROLL PROGRESS BAR ==========
  const progressBar = document.createElement("div");
  progressBar.className = "scroll-progress";
  document.body.prepend(progressBar);

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + "%";
  });

  // ========== SCROLL REVEAL (Intersection Observer) ==========
  const revealElements = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-flip, .reveal-blur, .section-reveal, .stagger-children, .char-reveal",
  );

  const observerOptions = {
    threshold: 0.08,
    rootMargin: "0px 0px -20px 0px",
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach((el) => revealObserver.observe(el));

  // ========== TEXT CHARACTER REVEAL ==========
  document.querySelectorAll(".char-reveal").forEach((el) => {
    const text = el.textContent.trim();
    el.textContent = "";
    [...text].forEach((char) => {
      const span = document.createElement("span");
      span.className = "char";
      if (char === " ") {
        span.innerHTML = "&nbsp;";
      } else {
        span.textContent = char;
      }
      el.appendChild(span);
    });
  });

  // ========== COUNTER-UP ANIMATION ==========
  const counterEls = document.querySelectorAll(".counter-up");
  const counterOptions = { threshold: 0.3, rootMargin: "0px" };
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = el.getAttribute("data-target")
          ? parseFloat(el.getAttribute("data-target"))
          : parseFloat(el.querySelector(".num")?.textContent || "0");
        const suffix = el.getAttribute("data-suffix") || "";
        const prefix = el.getAttribute("data-prefix") || "";
        const duration = parseInt(el.getAttribute("data-duration")) || 2000;
        let startTime = null;

        function animateCounter(timestamp) {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          const current = ease * target;
          const display =
            target % 1 === 0 ? Math.floor(current) : current.toFixed(1);
          if (el.classList.contains("num")) {
            el.textContent = prefix + display + suffix;
          } else {
            const numEl = el.querySelector(".num");
            if (numEl) numEl.textContent = prefix + display + suffix;
          }
          if (progress < 1) {
            requestAnimationFrame(animateCounter);
          } else {
            if (el.classList.contains("num")) {
              el.textContent = prefix + target + suffix;
            } else {
              const numEl = el.querySelector(".num");
              if (numEl) numEl.textContent = prefix + target + suffix;
            }
          }
        }
        requestAnimationFrame(animateCounter);
        counterObserver.unobserve(el);
      }
    });
  }, counterOptions);

  counterEls.forEach((el) => counterObserver.observe(el));

  // ========== BACK TO TOP BUTTON ==========
  const backToTop = document.createElement("button");
  backToTop.className = "back-to-top";
  backToTop.setAttribute("aria-label", "Back to top");
  backToTop.innerHTML = "↑";
  document.body.appendChild(backToTop);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ========== HEADER HIDE/SHOW ON SCROLL ==========
  const header = document.querySelector(".site-header");
  let lastScrollY = 0;

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 200) {
      header.classList.add("header-hidden");
    } else {
      header.classList.remove("header-hidden");
    }
    lastScrollY = currentScrollY;
  });

  // ========== 3D TILT ON CARDS ==========
  const tiltCards = document.querySelectorAll(".tilt-card");

  tiltCards.forEach((card) => {
    const inner = card.querySelector(".card");
    if (!inner) return;

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      inner.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener("mouseleave", () => {
      inner.style.transform =
        "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)";
    });
  });

  // ========== BUTTON MOUSE FOLLOW GLOW ==========
  const buttons = document.querySelectorAll(".btn");

  buttons.forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      btn.style.setProperty("--mx", x + "%");
      btn.style.setProperty("--my", y + "%");
    });
  });

  // ========== MAGNETIC BUTTON EFFECT ==========
  const magneticBtns = document.querySelectorAll(".btn");

  magneticBtns.forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const strength = 6;
      btn.style.transform = `translate(${x / (rect.width / strength)}px, ${y / (rect.height / strength)}px)`;
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translate(0, 0)";
    });
  });

  // ========== RIPPLE CLICK EFFECT ==========
  const rippleContainer = document.createElement("div");
  rippleContainer.className = "ripple-container";
  document.body.appendChild(rippleContainer);

  document.addEventListener("click", (e) => {
    const ripple = document.createElement("div");
    ripple.className = "ripple";
    ripple.style.left = e.clientX + "px";
    ripple.style.top = e.clientY + "px";
    rippleContainer.appendChild(ripple);
    setTimeout(() => ripple.remove(), 800);
  });

  // ========== CUSTOM CURSOR ==========
  if (window.innerWidth > 768) {
    const cursorDot = document.createElement("div");
    cursorDot.className = "cursor-dot";
    document.body.appendChild(cursorDot);

    const cursorRing = document.createElement("div");
    cursorRing.className = "cursor-ring";
    document.body.appendChild(cursorRing);

    // Trailing particles
    const trailCount = 8;
    const trails = [];
    for (let i = 0; i < trailCount; i++) {
      const trail = document.createElement("div");
      trail.className = "cursor-trail";
      trail.style.opacity = 0.3 - i * 0.03;
      trail.style.width = 4 - i * 0.3 + "px";
      trail.style.height = 4 - i * 0.3 + "px";
      trail.style.transition = `opacity 0.5s ease, transform ${0.05 + i * 0.02}s linear`;
      document.body.appendChild(trail);
      trails.push({ el: trail, x: 0, y: 0 });
    }

    let mouseX = 0,
      mouseY = 0;
    let ringX = 0,
      ringY = 0;

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = mouseX + "px";
      cursorDot.style.top = mouseY + "px";
    });

    // Smooth follow for ring
    function animateCursorRing() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      cursorRing.style.left = ringX + "px";
      cursorRing.style.top = ringY + "px";
      requestAnimationFrame(animateCursorRing);
    }
    animateCursorRing();

    // Trail follow
    let trailFrame = 0;
    function animateTrails() {
      trails[0].x += (mouseX - trails[0].x) * 0.4;
      trails[0].y += (mouseY - trails[0].y) * 0.4;
      trails[0].el.style.left = trails[0].x + "px";
      trails[0].el.style.top = trails[0].y + "px";
      for (let i = 1; i < trails.length; i++) {
        trails[i].x += (trails[i - 1].x - trails[i].x) * 0.35;
        trails[i].y += (trails[i - 1].y - trails[i].y) * 0.35;
        trails[i].el.style.left = trails[i].x + "px";
        trails[i].el.style.top = trails[i].y + "px";
      }
      trailFrame = requestAnimationFrame(animateTrails);
    }
    animateTrails();

    // Hover effects on interactive elements
    const hoverTargets = document.querySelectorAll(
      "a, button, .btn, .card, .industry-box, input, textarea, select",
    );
    hoverTargets.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursorRing.classList.add("hovering");
        cursorDot.style.width = "12px";
        cursorDot.style.height = "12px";
      });
      el.addEventListener("mouseleave", () => {
        cursorRing.classList.remove("hovering");
        cursorDot.style.width = "8px";
        cursorDot.style.height = "8px";
      });
    });

    document.addEventListener("mousedown", () => {
      cursorRing.classList.add("clicking");
    });
    document.addEventListener("mouseup", () => {
      cursorRing.classList.remove("clicking");
    });
  }

  // ========== HERO 3D PARTICLE WAVE (Canvas) ==========
  const heroCanvas = document.getElementById("hero-canvas");
  if (heroCanvas) {
    const ctx = heroCanvas.getContext("2d");
    let particles3d = [];
    let mouse3d = { x: 0, y: 0 };
    let time3d = 0;

    function resizeHeroCanvas() {
      const hero = heroCanvas.parentElement;
      heroCanvas.width = hero.offsetWidth;
      heroCanvas.height = hero.offsetHeight;
    }

    resizeHeroCanvas();
    window.addEventListener("resize", resizeHeroCanvas);

    heroCanvas.parentElement.addEventListener("mousemove", (e) => {
      const rect = heroCanvas.parentElement.getBoundingClientRect();
      mouse3d.x = (e.clientX - rect.left) / rect.width;
      mouse3d.y = (e.clientY - rect.top) / rect.height;
    });

    class Particle3D {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * heroCanvas.width;
        this.y = Math.random() * heroCanvas.height;
        this.z = Math.random() * 300;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.speedZ = (Math.random() - 0.5) * 0.3;
        this.baseOpacity = Math.random() * 0.5 + 0.2;
        this.hue = Math.random() * 40 + 160; // cyan to teal range
      }

      update() {
        this.x += this.speedX + (mouse3d.x - 0.5) * 0.2;
        this.y += this.speedY + (mouse3d.y - 0.5) * 0.2;
        this.z += this.speedZ;

        if (this.x < 0 || this.x > heroCanvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > heroCanvas.height) this.speedY *= -1;
        if (this.z < 0 || this.z > 300) this.speedZ *= -1;

        // Wave effect
        this.y += Math.sin(time3d * 0.001 + this.x * 0.01) * 0.3;
      }

      draw() {
        const scale = 1 - this.z / 400;
        const x = this.x;
        const y = this.y;
        const size = this.size * scale;
        const opacity = this.baseOpacity * scale;

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 80%, 65%, ${opacity})`;
        ctx.fill();

        // Glow
        if (size > 1.5) {
          ctx.beginPath();
          ctx.arc(x, y, size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${this.hue}, 80%, 65%, ${opacity * 0.1})`;
          ctx.fill();
        }
      }
    }

    function initParticles3d() {
      const count = Math.min(
        Math.floor((heroCanvas.width * heroCanvas.height) / 6000),
        100,
      );
      particles3d = [];
      for (let i = 0; i < count; i++) {
        particles3d.push(new Particle3D());
      }
    }

    function drawConnections3d() {
      for (let i = 0; i < particles3d.length; i++) {
        for (let j = i + 1; j < particles3d.length; j++) {
          const dx = particles3d[i].x - particles3d[j].x;
          const dy = particles3d[i].y - particles3d[j].y;
          const dz = particles3d[i].z - particles3d[j].z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles3d[i].x, particles3d[i].y);
            ctx.lineTo(particles3d[j].x, particles3d[j].y);
            const opacity = 0.08 * (1 - dist / 120);
            ctx.strokeStyle = `rgba(79, 209, 197, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    function animateParticles3d(timestamp) {
      time3d = timestamp;
      ctx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
      particles3d.forEach((p) => {
        p.update();
        p.draw();
      });
      drawConnections3d();
      requestAnimationFrame(animateParticles3d);
    }

    initParticles3d();
    animateParticles3d();

    let resizeTimeout3d;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout3d);
      resizeTimeout3d = setTimeout(() => {
        resizeHeroCanvas();
        initParticles3d();
      }, 300);
    });
  }

  // ========== HERO LIVE CLOCK (SVG) ==========
  const heroClock = document.getElementById("hero-clock");
  if (heroClock) {
    function updateClock() {
      const now = new Date();
      const time = now.toTimeString().split(" ")[0];
      heroClock.textContent = time + " UTC";
    }
    updateClock();
    setInterval(updateClock, 1000);
  }

  // ========== HERO GRID MOUSE REVEAL ==========
  const heroGrid = document.querySelector(".hero-grid-bg");
  if (heroGrid) {
    const heroEl = heroGrid.closest(".hero");
    if (heroEl) {
      heroEl.addEventListener("mousemove", (e) => {
        const rect = heroEl.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        heroGrid.style.setProperty("--mouse-x", x + "%");
        heroGrid.style.setProperty("--mouse-y", y + "%");
      });
    }
  }

  // ========== GRADIENT MESH BACKGROUND ==========
  const meshContainer = document.createElement("div");
  meshContainer.className = "gradient-mesh";
  for (let i = 0; i < 3; i++) {
    const blob = document.createElement("div");
    blob.className = "gradient-mesh-blob";
    meshContainer.appendChild(blob);
  }
  document.body.prepend(meshContainer);

  // Animate gradient mesh blobs
  function animateMeshBlobs() {
    const blobs = document.querySelectorAll(".gradient-mesh-blob");
    blobs.forEach((blob, i) => {
      const startX = parseFloat(blob.style.left) || 0;
      const startY = parseFloat(blob.style.top) || 0;
      const amplitude = 40 + i * 20;
      const speed = 0.0003 + i * 0.0001;
      const phase = i * Math.PI * 0.6;
      let time = i * 1000;

      function moveBlob() {
        time += 16;
        const x = Math.sin(time * speed + phase) * amplitude;
        const y = Math.cos(time * speed * 0.7 + phase * 0.8) * amplitude;
        blob.style.transform = `translate(${x}px, ${y}px)`;
        blob.style.opacity = 0.6 + Math.sin(time * 0.0005 + i) * 0.3;
        requestAnimationFrame(moveBlob);
      }
      moveBlob();
    });
  }
  animateMeshBlobs();

  // ========== FLOATING ORBS ==========
  for (let i = 0; i < 3; i++) {
    const orb = document.createElement("div");
    orb.className = "floating-orb";
    document.body.appendChild(orb);
  }

  function animateFloatingOrbs() {
    const orbs = document.querySelectorAll(".floating-orb");
    orbs.forEach((orb, i) => {
      const baseX = parseFloat(orb.style.left) || 0;
      const baseY = parseFloat(orb.style.top) || 0;
      const amplitude = 20 + i * 10;
      const speed = 0.0002 + i * 0.00005;
      const phase = i * Math.PI * 0.5;
      let time = i * 2000;

      function moveOrb() {
        time += 16;
        const x = Math.sin(time * speed + phase) * amplitude;
        const y = Math.cos(time * speed * 0.6 + phase * 0.7) * amplitude * 0.6;
        const scale = 1 + Math.sin(time * 0.0003 + i * 2) * 0.15;
        orb.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
        orb.style.opacity = 0.1 + Math.sin(time * 0.0004 + i) * 0.05;
        requestAnimationFrame(moveOrb);
      }
      moveOrb();
    });
  }
  animateFloatingOrbs();

  // ========== PARALLAX ON SCROLL ==========
  const parallaxLayers = document.querySelectorAll(".parallax-layer");
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    parallaxLayers.forEach((layer) => {
      const speed = parseFloat(layer.getAttribute("data-speed")) || 0.1;
      const y = scrollY * speed;
      layer.style.transform = `translateY(${y}px)`;
    });
  });

  // ========== MOBILE NAV TOGGLE ==========
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", !expanded);
      navLinks.style.display =
        navLinks.style.display === "flex" ? "none" : "flex";
      navLinks.style.flexDirection = "column";
      navLinks.style.position = "absolute";
      navLinks.style.top = "100%";
      navLinks.style.left = "0";
      navLinks.style.right = "0";
      navLinks.style.background = "rgba(11, 31, 58, 0.96)";
      navLinks.style.backdropFilter = "blur(12px)";
      navLinks.style.padding = "20px 24px";
      navLinks.style.gap = "16px";
      navLinks.style.borderBottom = "1px solid rgba(255,255,255,0.12)";
    });
  }

  // ========== CONTACT FORM ==========
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData.entries());

      try {
        // Simulate sending — replace with actual endpoint
        await new Promise((resolve) => setTimeout(resolve, 1200));

        formStatus.textContent =
          "✓ Message sent! We'll get back to you within 1 business day.";
        formStatus.hidden = false;
        formStatus.style.color = "#4fd1c5";
        contactForm.reset();
      } catch (err) {
        formStatus.textContent =
          "✗ Something went wrong. Please email us directly at john@medbasesolutions.com.";
        formStatus.hidden = false;
        formStatus.style.color = "#e74c3c";
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }
});
