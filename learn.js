
document.addEventListener("DOMContentLoaded", function () {

    // 1. Footer year
    document.querySelectorAll(".year").forEach(function (element) {
        element.textContent = new Date().getFullYear();
    });

    // 2. Mobile navigation
    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector("nav");

    if (menuToggle && nav) {
        menuToggle.addEventListener("click", function () {
            nav.classList.toggle("active");
        });
    }

    // 3. Hero image slider
    const heroSlides = document.querySelectorAll(".hero-slider .slide");
    let heroIndex = 0;

    if (heroSlides.length > 0) {
        function showHeroSlide(index) {
            heroSlides.forEach((slide, i) => {
                slide.classList.toggle("active", i === index);
            });
        }

        setInterval(() => {
            heroIndex = (heroIndex + 1) % heroSlides.length;
            showHeroSlide(heroIndex);
        }, 4000);
    }

    // 4. STEAM image slider
    const steamSlides = document.querySelectorAll(".steam_image .slide");
    let steamIndex = 0;

    if (steamSlides.length > 0) {
        function showSteamSlide(index) {
            steamSlides.forEach((slide, i) => {
                slide.classList.toggle("active", i === index);
            });
        }

        setInterval(() => {
            steamIndex = (steamIndex + 1) % steamSlides.length;
            showSteamSlide(steamIndex);
        }, 3500);
    }

    // 5. Gallery sliders
    document.querySelectorAll(".gallery-box-slider").forEach(function (slider) {
        const slides = slider.querySelectorAll(".slide");
        let index = 0;

        if (slides.length > 1) {
            slides.forEach((slide, i) => {
                slide.classList.toggle("active", i === 0);
            });

            setInterval(() => {
                slides[index].classList.remove("active");
                index = (index + 1) % slides.length;
                slides[index].classList.add("active");
            }, 3000);
        }
    });

    // 6. Gallery lightbox
    const lightbox = document.querySelector(".lightbox");
    const lightboxImage = document.querySelector(".lightbox img");
    const closeLightbox = document.querySelector(".lightbox .close");

    if (lightbox && lightboxImage) {
        document.querySelectorAll(".gallery img").forEach(function (img) {
            img.addEventListener("click", function () {
                lightboxImage.src = img.src;
                lightbox.classList.add("active");
            });
        });

        if (closeLightbox) {
            closeLightbox.addEventListener("click", function () {
                lightbox.classList.remove("active");
            });
        }

        lightbox.addEventListener("click", function (event) {
            if (event.target === lightbox) {
                lightbox.classList.remove("active");
            }
        });
    }

    // 7. Back to top button
    const backToTop = document.querySelector("#backToTop");

    if (backToTop) {
        window.addEventListener("scroll", function () {
            backToTop.style.display = window.scrollY > 300 ? "block" : "none";
        });

        backToTop.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // 8. Contact form (demo only)
    const contactForm = document.querySelector("#contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();
            alert("Thank you! Your message has been received.");
            contactForm.reset();
        });
    }

});
