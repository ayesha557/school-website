
// AUTOMATIC IMAGE SLIDER
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

let currentSlide = 0;
let sliderTimer;

function showSlide(index) {
    slides[currentSlide].classList.remove("active");
    dots[currentSlide].classList.remove("active");

    currentSlide = index;

    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
}

function nextSlide() {
    let next = (currentSlide + 1) % slides.length;
    showSlide(next);
}

function startSlider() {
    clearInterval(sliderTimer);
    sliderTimer = setInterval(nextSlide, 4000);
}

dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        showSlide(index);
        startSlider();
    });
});

startSlider();


// MOBILE NAVIGATION
const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

menuToggle.addEventListener("click", () => {
    navbar.classList.toggle("show");

    menuToggle.textContent =
        navbar.classList.contains("show") ? "✕" : "☰";
});

// CLOSE MENU AFTER CLICK
document.querySelectorAll("#navbar a").forEach(link => {
    link.addEventListener("click", () => {
        navbar.classList.remove("show");
        menuToggle.textContent = "☰";
    });
});


// CONTACT FORM DEMO
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", function(event) {
    event.preventDefault();

    formMessage.textContent =
        "Thank you! Your enquiry form is ready, but online sending requires a connected form service.";

    contactForm.reset();
});


// BACK TO TOP
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 350) {
        backToTop.style.display = "block";
    } else {
        backToTop.style.display = "none";
    }
});

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


// CURRENT YEAR
document.getElementById("year").textContent =
    new Date().getFullYear();

/* FIRST GALLERY BOX AUTOMATIC SLIDER */

const gallerySlides = document.querySelectorAll(
    ".gallery-box-slider .gallery-slide"
);

let galleryIndex = 0;

setInterval(() => {

    gallerySlides[galleryIndex].classList.remove("active");

    galleryIndex = (galleryIndex + 1) % gallerySlides.length;

    gallerySlides[galleryIndex].classList.add("active");

}, 3000);

// MULTIPLE INDEPENDENT GALLERY SLIDERS

// ALL SIX GALLERY BOXES AUTOMATIC SLIDERS

document.querySelectorAll(".gallery-box-slider").forEach(slider => {

    const slides = slider.querySelectorAll(".gallery-slide");
    let index = 0;

    setInterval(() => {

        slides[index].classList.remove("active");

        index = (index + 1) % slides.length;

        slides[index].classList.add("active");

    }, 3000);

});

// GALLERY IMAGE LIGHTBOX

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeBtn = document.getElementById("lightboxClose");
const nextBtn = document.getElementById("lightboxNext");
const prevBtn = document.getElementById("lightboxPrev");
const counter = document.getElementById("lightboxCounter");

let galleryImages = [];
let activeImageIndex = 0;

function openLightbox(img) {
    galleryImages = [...document.querySelectorAll(
        ".gallery-box-slider img"
    )];

    activeImageIndex = galleryImages.indexOf(img);

    showLightboxImage();
    lightbox.classList.add("show");
}

function showLightboxImage() {
    lightboxImage.src = galleryImages[activeImageIndex].src;

    counter.textContent =
        `${activeImageIndex + 1} / ${galleryImages.length}`;
}

document.querySelectorAll(".gallery-box-slider img").forEach(img => {
    img.addEventListener("click", () => openLightbox(img));
});

nextBtn.addEventListener("click", () => {
    activeImageIndex =
        (activeImageIndex + 1) % galleryImages.length;
    showLightboxImage();
});

prevBtn.addEventListener("click", () => {
    activeImageIndex =
        (activeImageIndex - 1 + galleryImages.length)
        % galleryImages.length;
    showLightboxImage();
});

function closeLightbox() {
    lightbox.classList.remove("show");
}

closeBtn.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", event => {
    if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", event => {
    if (!lightbox.classList.contains("show")) return;

    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowRight") nextBtn.click();
    if (event.key === "ArrowLeft") prevBtn.click();
});
let index = 0;
let allSlides = document.querySelectorAll('.steam_image .slide');
function showSlide(n) {
  if (n >= allSlides.length) index = 0;
  if (n < 0) index = allSlides.length - 1;
  allSlides.forEach(s => s.classList.remove('active'));
  allSlides[index].classList.add('active');
}
function moveSlide(n) { index += n; showSlide(index); }
setInterval(() => { index++; showSlide(index); }, 4000);

  const heroSlides = document.querySelectorAll('.hero-slider .slide');
  const heroDots = document.querySelectorAll('#sliderDots .dot');
  let heroIndex = 0;

  function showHeroSlide(n) {
    heroSlides.forEach(s => s.classList.remove('active'));
    heroDots.forEach(d => d.classList.remove('active'));
    heroSlides[n].classList.add('active');
    heroDots[n].classList.add('active');
    heroIndex = n;
  }

  // Auto slide har 4 second me
  setInterval(() => {
    let next = (heroIndex + 1) % heroSlides.length;
    showHeroSlide(next);
  }, 4000);

  // Dot pe click se bhi change hoga
  heroDots.forEach((dot, i) => {
    dot.addEventListener('click', () => showHeroSlide(i));
  });




  const aboutModal = document.getElementById('aboutModal');
document.querySelector('a[href="#about"]').addEventListener('click', (e)=>{
  e.preventDefault();
  aboutModal.classList.add('open');
});
aboutModal.querySelector('.close-btn').addEventListener('click', ()=> aboutModal.classList.remove('open'));
aboutModal.addEventListener('click', (e)=>{ if(e.target===aboutModal) aboutModal.classList.remove('open'); });

  const facModal = document.getElementById('facilitiesModal');
  document.getElementById('facilitiesLink').addEventListener('click', (e) => {
    e.preventDefault();
    facModal.classList.add('open');
  });
  facModal.querySelector('.close-btn').addEventListener('click', () => {
    facModal.classList.remove('open');
  });
  facModal.addEventListener('click', (e) => {
    if (e.target === facModal) facModal.classList.remove('open');
  });

