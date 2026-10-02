/* ==========================================================
   GAUTAM KUMAR - MULTIPAGE INTERACTIVITY SCRIPT
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // --- 1. Typewriter Animation (for pages that have #typewriter) ---
    const typewriterElement = document.getElementById("typewriter");
    if (typewriterElement) {
        const words = [
            "Frontend Web Developer",
            "JavaScript Specialist",
            "Responsive Web Designer",
            "Tailwind CSS Builder",
            "Creative Video Editor"
        ];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typeSpeed = 100;
        const deleteSpeed = 50;
        const delayBetweenWords = 1800;

        function typeEffect() {
            if (!typewriterElement) return;

            const currentWord = words[wordIndex];

            if (isDeleting) {
                typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let speed = isDeleting ? deleteSpeed : typeSpeed;

            if (!isDeleting && charIndex === currentWord.length) {
                speed = delayBetweenWords;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                speed = 400;
            }

            setTimeout(typeEffect, speed);
        }

        typeEffect();
    }

    // --- 2. Mobile Menu Navigation ---
    const mobileToggle = document.getElementById("mobile-toggle");
    const navbar = document.getElementById("navbar");
    const navLinks = document.querySelectorAll(".nav-link");

    if (mobileToggle && navbar) {
        mobileToggle.addEventListener("click", () => {
            navbar.classList.toggle("active");
            const icon = mobileToggle.querySelector("i");
            if (icon) {
                icon.classList.toggle("fa-bars");
                icon.classList.toggle("fa-times");
            }
        });

        // Close menu on link click
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                navbar.classList.remove("active");
                const icon = mobileToggle.querySelector("i");
                if (icon) {
                    icon.classList.add("fa-bars");
                    icon.classList.remove("fa-times");
                }
            });
        });
    }

    // --- 3. Sticky Header on Scroll ---
    const header = document.getElementById("header");
    window.addEventListener("scroll", () => {
        if (header) {
            if (window.scrollY > 40) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        }
    });

    // --- 4. Copy Email to Clipboard ---
    const copyEmailBtn = document.getElementById("copy-email-btn");
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener("click", () => {
            const email = "gautam1523@gmail.com";
            navigator.clipboard.writeText(email).then(() => {
                const icon = copyEmailBtn.querySelector("i");
                if (icon) {
                    icon.classList.remove("far", "fa-copy");
                    icon.classList.add("fas", "fa-check");
                    copyEmailBtn.style.color = "#10b981";

                    setTimeout(() => {
                        icon.classList.remove("fas", "fa-check");
                        icon.classList.add("far", "fa-copy");
                        copyEmailBtn.style.color = "";
                    }, 2200);
                }
            }).catch(err => {
                console.error("Failed to copy email: ", err);
            });
        });
    }

    // --- 5. Contact Form Submission Handler ---
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    if (contactForm && formStatus) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const subject = document.getElementById("subject").value.trim();
            const message = document.getElementById("message").value.trim();

            if (!name || !email || !subject || !message) {
                formStatus.className = "form-status error";
                formStatus.textContent = "Please fill out all fields before submitting.";
                return;
            }

            const submitBtn = document.getElementById("submit-btn");
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
            }

            setTimeout(() => {
                formStatus.className = "form-status success";
                formStatus.innerHTML = `Thank you, <strong>${name}</strong>! Your message has been prepared. <br><small>Opening email client to send to gautam1523@gmail.com...</small>`;

                const mailtoUrl = `mailto:gautam1523@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Hi Gautam,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
                window.location.href = mailtoUrl;

                contactForm.reset();

                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<span>Send Message</span> <i class="fas fa-paper-plane"></i>';
                }

                setTimeout(() => {
                    formStatus.style.display = "none";
                }, 6000);
            }, 800);
        });
    }

    // --- 6. Back to Top Button Smooth Scroll ---
    const backToTopBtns = document.querySelectorAll(".back-to-top");
    backToTopBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    });
});