// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn")
const nav = document.getElementById("nav")

if (mobileMenuBtn && nav) {
  mobileMenuBtn.addEventListener("click", () => {
    nav.classList.toggle("active")
    mobileMenuBtn.classList.toggle("active")

    // Prevent body scroll when menu is open
    if (nav.classList.contains("active")) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  })

  // Close menu when clicking on nav links
  const navLinks = nav.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("active")
      mobileMenuBtn.classList.remove("active")
      document.body.style.overflow = "auto"
    })
  })

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      nav.classList.remove("active")
      mobileMenuBtn.classList.remove("active")
      document.body.style.overflow = "auto"
    }
  })
}

// Header Scroll Effect
const header = document.getElementById("header")

if (header) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })
}

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const headerHeight = header ? header.offsetHeight : 0
      const targetPosition = target.offsetTop - headerHeight - 20

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  })
})

// Form Handling
const contactForm = document.getElementById("contactForm")

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault()

    // Get form data
    const formData = new FormData(this)
    const data = Object.fromEntries(formData)

    // Basic validation
    if (!data.firstName || !data.lastName || !data.email || !data.phone) {
      alert("Please fill in all required fields.")
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      alert("Please enter a valid email address.")
      return
    }

    // Phone validation (basic)
    const phoneRegex = /^[\d\s\-+()]+$/
    if (!phoneRegex.test(data.phone)) {
      alert("Please enter a valid phone number.")
      return
    }

    // Simulate form submission
    const submitBtn = this.querySelector('button[type="submit"]')
    const originalText = submitBtn.innerHTML

    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'
    submitBtn.disabled = true

    // Simulate API call
    setTimeout(() => {
      alert("Thank you for your message! I will get back to you within 24 hours.")
      this.reset()
      submitBtn.innerHTML = originalText
      submitBtn.disabled = false
    }, 2000)
  })
}

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe elements for animation
document.querySelectorAll(".service-card, .feature-card, .contact-method").forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(30px)"
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(el)
})

// Add loading animation to buttons
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    // Don't add loading to form submit buttons (handled separately)
    if (this.type === "submit") return

    // Don't add loading to external links
    if (this.href && (this.href.startsWith("tel:") || this.href.startsWith("mailto:"))) return

    // Add ripple effect
    const ripple = document.createElement("span")
    ripple.classList.add("ripple")
    this.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)
  })
})

// Add ripple effect styles
const style = document.createElement("style")
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`
document.head.appendChild(style)

// Preloader (if needed)
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})

// Add parallax effect to floating shapes
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const shapes = document.querySelectorAll(".floating-shape")

  shapes.forEach((shape, index) => {
    const speed = 0.5 + index * 0.1
    shape.style.transform = `translateY(${scrolled * speed}px)`
  })
})

// Add hover effects to cards
document.querySelectorAll(".service-card, .feature-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-8px) scale(1.02)"
  })

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)"
  })
})

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Add fade-in animation to page
  document.body.style.opacity = "0"
  document.body.style.transition = "opacity 0.5s ease"

  setTimeout(() => {
    document.body.style.opacity = "1"
  }, 100)

  // Initialize any other components here
  console.log("Harmeet Sandhu Insurance Website Loaded Successfully")
})
