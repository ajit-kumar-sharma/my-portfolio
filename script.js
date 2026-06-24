document.addEventListener("DOMContentLoaded", () => {
  // =========================================================================
  // Theme Toggle Logic
  // =========================================================================
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  // Check user preferences in local storage or defaults to dark
  const currentTheme = localStorage.getItem("theme") || "dark";
  if (currentTheme === "light") {
    body.classList.remove("dark-theme");
    body.classList.add("light-theme");
  } else {
    body.classList.remove("light-theme");
    body.classList.add("dark-theme");
  }

  themeToggle.addEventListener("click", () => {
    if (body.classList.contains("dark-theme")) {
      body.classList.remove("dark-theme");
      body.classList.add("light-theme");
      localStorage.setItem("theme", "light");
    } else {
      body.classList.remove("light-theme");
      body.classList.add("dark-theme");
      localStorage.setItem("theme", "dark");
    }
    // Update canvas particle colors on theme toggle
    initCanvasColors();
  });

  // =========================================================================
  // Mobile Hamburger Toggle Menu
  // =========================================================================
  const mobileToggle = document.getElementById("mobile-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  mobileToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    navMenu.classList.toggle("open");
    const isOpen = navMenu.classList.contains("open");
    mobileToggle.querySelector("i").className = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
  });

  // Close menu when clicking navigation link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      mobileToggle.querySelector("i").className = "fa-solid fa-bars";
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (navMenu.classList.contains("open") && !navMenu.contains(e.target) && e.target !== mobileToggle) {
      navMenu.classList.remove("open");
      mobileToggle.querySelector("i").className = "fa-solid fa-bars";
    }
  });

  // =========================================================================
  // Shrinking Navbar and Active States on Scroll
  // =========================================================================
  const navbar = document.getElementById("navbar");
  const sections = document.querySelectorAll("section");

  const handleScroll = () => {
    // Shrink navbar logic
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Active state highlighting on scroll
    let currentActiveId = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120; // offset for sticky nav
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentActiveId = section.getAttribute("id");
      }
    });

    if (currentActiveId) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentActiveId}`) {
          link.classList.add("active");
        }
      });
    }
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll(); // Trigger initially

  // =========================================================================
  // Typewriter Animation (Hero section)
  // =========================================================================
  const roles = ["Software Developer", "Full Stack Developer", "MCA Student"];
  const typingElement = document.getElementById("typing-text");
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  const type = () => {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50; // Deleting is faster
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 1500; // Pause at full word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 500; // Pause before typing next word
    }

    setTimeout(type, typingSpeed);
  };

  // Launch typing effect
  type();

  // =========================================================================
  // HTML5 Particle Canvas Background Simulation
  // =========================================================================
  const canvas = document.getElementById("particle-canvas");
  const ctx = canvas.getContext("2d");

  let particlesArray = [];
  let particleColor = "";
  let lineColor = "";

  // Set particle styling variables dynamically depending on theme colors
  const initCanvasColors = () => {
    const style = getComputedStyle(body);
    const accentColor = style.getPropertyValue("--color-accent").trim();
    
    // We parse the accentColor or construct RGB equivalents
    // By default, electric blue (#4f8ef7) or darker light theme (#2b6cb0)
    if (body.classList.contains("light-theme")) {
      particleColor = "rgba(43, 108, 176, 0.15)";
      lineColor = "rgba(43, 108, 176, 0.05)";
    } else {
      particleColor = "rgba(79, 142, 247, 0.2)";
      lineColor = "rgba(79, 142, 247, 0.06)";
    }
  };

  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
  };

  class Particle {
    constructor(x, y, directionX, directionY, size) {
      this.x = x;
      this.y = y;
      this.directionX = directionX;
      this.directionY = directionY;
      this.size = size;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
      ctx.fillStyle = particleColor;
      ctx.fill();
    }

    update() {
      // Bounce off borders
      if (this.x > canvas.width || this.x < 0) {
        this.directionX = -this.directionX;
      }
      if (this.y > canvas.height || this.y < 0) {
        this.directionY = -this.directionY;
      }

      this.x += this.directionX;
      this.y += this.directionY;
      this.draw();
    }
  }

  const initParticles = () => {
    particlesArray = [];
    // Adjust density based on screen size
    const numberOfParticles = Math.min(Math.floor((canvas.width * canvas.height) / 14000), 100);
    
    for (let i = 0; i < numberOfParticles; i++) {
      const size = Math.random() * 2 + 1;
      const x = Math.random() * (canvas.width - size * 2) + size;
      const y = Math.random() * (canvas.height - size * 2) + size;
      const directionX = Math.random() * 0.4 - 0.2;
      const directionY = Math.random() * 0.4 - 0.2;
      particlesArray.push(new Particle(x, y, directionX, directionY, size));
    }
  };

  const connectParticles = () => {
    const maxDistance = 150;
    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a; b < particlesArray.length; b++) {
        const distSq = (particlesArray[a].x - particlesArray[b].x) ** 2 + 
                       (particlesArray[a].y - particlesArray[b].y) ** 2;
        if (distSq < maxDistance ** 2) {
          const alpha = 1 - (Math.sqrt(distSq) / maxDistance);
          ctx.strokeStyle = lineColor.replace(/[^,]+(?=\))/, alpha * (body.classList.contains("light-theme") ? 0.08 : 0.12));
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
          ctx.stroke();
        }
      }
    }
  };

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach((p) => p.update());
    connectParticles();
    requestAnimationFrame(animate);
  };

  // Initialize canvas background elements
  initCanvasColors();
  resizeCanvas();
  animate();
  window.addEventListener("resize", resizeCanvas);

  // =========================================================================
  // Scroll Reveal Observer (Fade-In On Scroll)
  // =========================================================================
  const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        
        // If technical skills section becomes visible, animate progress bars
        if (entry.target.id === "skills") {
          entry.target.classList.add("active");
        }
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const scrollRevealElements = document.querySelectorAll(".scroll-reveal");
  scrollRevealElements.forEach((el) => revealObserver.observe(el));

  // =========================================================================
  // Contact Form Validation & Submission Handling
  // =========================================================================
  const form = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");
  const formStatusText = document.getElementById("form-status-text");
  const submitBtn = document.getElementById("form-submit-btn");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateField = (field, errorId, validationFn) => {
    const parent = field.parentElement;
    const isValid = validationFn(field.value.trim());
    if (isValid) {
      parent.classList.remove("invalid");
    } else {
      parent.classList.add("invalid");
    }
    return isValid;
  };

  // Add inputs listener to clear validations dynamically on change
  form.querySelectorAll("input, textarea").forEach((field) => {
    field.addEventListener("input", () => {
      field.parentElement.classList.remove("invalid");
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Fields to validate
    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");
    const messageField = document.getElementById("message");

    const isNameValid = validateField(nameField, "name-error", (val) => val.length > 0);
    const isEmailValid = validateField(emailField, "email-error", (val) => emailRegex.test(val));
    const isMsgValid = validateField(messageField, "message-error", (val) => val.length > 0);

    if (isNameValid && isEmailValid && isMsgValid) {
      // Simulate form submission API call
      submitBtn.disabled = true;
      submitBtn.querySelector(".btn-text").textContent = "Sending...";
      const submitIcon = submitBtn.querySelector("i");
      submitIcon.className = "fa-solid fa-spinner fa-spin";

      setTimeout(() => {
        // Successful simulation
        submitBtn.disabled = false;
        submitBtn.querySelector(".btn-text").textContent = "Send Message";
        submitIcon.className = "fa-solid fa-paper-plane";

        formStatus.className = "form-status-alert success";
        formStatusText.textContent = "Thank you! Your message was sent successfully.";
        formStatus.classList.remove("hidden");

        // Clear input values
        form.reset();

        // Clear success notification after 5 seconds
        setTimeout(() => {
          formStatus.classList.add("hidden");
        }, 5000);
      }, 1500);
    } else {
      // Form fields error feedback alert
      formStatus.className = "form-status-alert error";
      formStatusText.textContent = "Please resolve the marked errors in the fields above.";
      formStatus.classList.remove("hidden");

      setTimeout(() => {
        formStatus.classList.add("hidden");
      }, 5000);
    }
  });

  // Dynamic live-demo placeholder links alert to prevent page reload
  document.querySelectorAll(".live-demo-link, .btn-card-live").forEach((link) => {
    link.addEventListener("click", (e) => {
      if (link.getAttribute("href") === "#") {
        e.preventDefault();
        alert("This is a live demo placeholder link. In a production environment, this would navigate to the hosting URL.");
      }
    });
  });
});
