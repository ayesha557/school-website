
document.addEventListener("DOMContentLoaded", function () {

    /* =====================================
       1. FOOTER YEAR
    ===================================== */

    document.querySelectorAll(".year").forEach(function (element) {
        element.textContent = new Date().getFullYear();
    });


    /* =====================================
       2. MOBILE NAVIGATION
    ===================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector("nav");

    if (menuToggle && nav) {

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.addEventListener("click", function () {

            nav.classList.toggle("show");

            const isOpen = nav.classList.contains("show");

            menuToggle.setAttribute("aria-expanded", isOpen);

        });

        // Close menu after selecting a link
        nav.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                nav.classList.remove("show");

                menuToggle.setAttribute("aria-expanded", "false");

            });

        });

    }


    /* =====================================
       3. HERO IMAGE SLIDER
    ===================================== */

    const heroSlides = document.querySelectorAll(".hero-slider .slide");

    let heroIndex = 0;

    if (heroSlides.length > 0) {

        function showHeroSlide(index) {

            heroSlides.forEach(function (slide, i) {

                slide.classList.toggle("active", i === index);

            });

        }

        setInterval(function () {

            heroIndex = (heroIndex + 1) % heroSlides.length;

            showHeroSlide(heroIndex);

        }, 4000);

    }


    /* =====================================
       4. STEAM IMAGE SLIDER
    ===================================== */

    const steamSlides = document.querySelectorAll(".steam_image .slide");

    let steamIndex = 0;

    if (steamSlides.length > 0) {

        function showSteamSlide(index) {

            steamSlides.forEach(function (slide, i) {

                slide.classList.toggle("active", i === index);

            });

        }

        setInterval(function () {

            steamIndex = (steamIndex + 1) % steamSlides.length;

            showSteamSlide(steamIndex);

        }, 3500);

    }


    /* =====================================
       5. GALLERY SLIDERS
    ===================================== */

    document.querySelectorAll(".gallery-box-slider").forEach(function (slider) {

        const slides = Array.from(
            slider.querySelectorAll(".gallery-slide, .slide, img")
        ).filter(function (slide, index, array) {
            return array.indexOf(slide) === index;
        });

        let index = 0;

        if (slides.length > 1) {

            slides.forEach(function (slide, i) {

                slide.classList.toggle("active", i === 0);

            });

            setInterval(function () {

                slides[index].classList.remove("active");

                index = (index + 1) % slides.length;

                slides[index].classList.add("active");

            }, 3000);

        }

    });


    /* =====================================
       6. GALLERY LIGHTBOX
    ===================================== */

    const lightbox = document.querySelector(".lightbox");

    const lightboxImage = document.querySelector(".lightbox img");

    const closeLightbox = document.querySelector(
        ".lightbox-close, .lightbox .close, .lightbox .close-btn"
    );

    if (lightbox && lightboxImage) {

        document.querySelectorAll(
            ".gallery img, .gallery-grid img, .gallery-box-slider img"
        ).forEach(function (img) {

            img.addEventListener("click", function () {

                lightboxImage.src = img.src;

                lightboxImage.alt = img.alt || "Gallery image";

                lightbox.classList.add("show");

            });

        });

        if (closeLightbox) {

            closeLightbox.addEventListener("click", function () {

                lightbox.classList.remove("show");

            });

        }

        lightbox.addEventListener("click", function (event) {

            if (event.target === lightbox) {

                lightbox.classList.remove("show");

            }

        });

        document.addEventListener("keydown", function (event) {

            if (event.key === "Escape") {

                lightbox.classList.remove("show");

            }

        });

    }


    /* =====================================
       7. BACK TO TOP BUTTON
    ===================================== */

    const backToTop = document.querySelector("#backToTop");

    if (backToTop) {

        window.addEventListener("scroll", function () {

            backToTop.style.display =
                window.scrollY > 300 ? "block" : "none";

        });

        backToTop.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =====================================
       8. SHARED GEMINI AI CONNECTION
    ===================================== */

    async function getGeminiReply(question) {

        const response = await fetch(
            "/.netlify/functions/ai",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    message: question
                })
            }
        );

        const raw = await response.text();

        let data;

        try {

            data = JSON.parse(raw);

        } catch {

            throw new Error(
                "The AI service returned an invalid response."
            );

        }

        if (!response.ok) {

            throw new Error(
                data.error || "Assistant is temporarily unavailable."
            );

        }

        return data.reply || "Sorry, I could not prepare an answer.";

    }


    /* =====================================
       9. GGSS FLOATING AI ROBOT
    ===================================== */

    if (!document.getElementById("ggssRobotLauncher")) {

        const robot = document.createElement("button");

        robot.id = "ggssRobotLauncher";

        robot.type = "button";

        robot.setAttribute(
            "aria-label",
            "Open GGSS AI Assistant"
        );

        robot.setAttribute("aria-expanded", "false");

        robot.innerHTML = `

            <span class="ggss-robot-figure">

                <span class="ggss-robot-antenna"></span>

                <span class="ggss-robot-ear left"></span>

                <span class="ggss-robot-ear right"></span>

                <span class="ggss-robot-head">

                    <span class="ggss-robot-face">

                        <span class="ggss-robot-eye"></span>

                        <span class="ggss-robot-eye"></span>

                        <span class="ggss-robot-smile"></span>

                    </span>

                </span>

                <span class="ggss-robot-body">✦</span>

                <span class="ggss-robot-shadow"></span>

            </span>

            <span class="ggss-robot-label">
                Ask GGSS 🤖
            </span>

        `;


        /* =====================================
           10. AI CHAT WINDOW
        ===================================== */

        const panel = document.createElement("div");

        panel.id = "ggssChatPanel";

        panel.innerHTML = `

            <div class="ggss-chat-header">

                <div class="ggss-chat-avatar">🤖</div>

                <div class="ggss-chat-heading">

                    <strong>GGSS AI Assistant</strong>

                    <small>● Online Assistant</small>

                </div>

                <button
                    class="ggss-chat-fullscreen"
                    type="button"
                    aria-label="Open full screen"
                    title="Full screen"
                >
                    ⛶
                </button>

                <button
                    class="ggss-chat-close"
                    type="button"
                    aria-label="Close chat"
                >
                    &times;
                </button>

            </div>


            <div
                class="ggss-chat-messages"
                id="ggssPopupMessages"
                aria-live="polite"
            >

                <div class="ggss-popup-message ggss-popup-bot">

                    Assalam-o-Alaikum! 👋

                    Welcome to GGSS Block V.

                    I can help you with admissions, classes,
                    syllabus, school facilities and activities.

                    How may I help you?

                </div>

            </div>


            <div class="ggss-popup-quick">

                <button
                    type="button"
                    data-question="Which classes are offered?"
                >
                    Classes offered?
                </button>

                <button
                    type="button"
                    data-question="What documents are required for admission?"
                >
                    Admission documents?
                </button>

                <button
                    type="button"
                    data-question="What facilities does the school provide?"
                >
                    School facilities?
                </button>

            </div>


            <form class="ggss-popup-form" id="ggssPopupForm">

                <input
                    id="ggssPopupInput"
                    type="text"
                    placeholder="Type your question..."
                    autocomplete="off"
                    required
                >

                <button
                    id="ggssPopupSend"
                    type="submit"
                    aria-label="Send message"
                >
                    ➤
                </button>

            </form>


            <div class="ggss-chat-footer">
                Powered by GGSS AI Assistant
            </div>

        `;


        document.body.appendChild(robot);

        document.body.appendChild(panel);


        /* =====================================
           11. CHAT ELEMENTS
        ===================================== */

        const closeButton = panel.querySelector(".ggss-chat-close");

        const fullscreenButton = panel.querySelector(
            ".ggss-chat-fullscreen"
        );

        const messages = panel.querySelector("#ggssPopupMessages");

        const input = panel.querySelector("#ggssPopupInput");

        const form = panel.querySelector("#ggssPopupForm");

        const sendButton = panel.querySelector("#ggssPopupSend");

        let busy = false;

        let isFullscreen = false;


        /* =====================================
           12. OPEN AND CLOSE CHAT
        ===================================== */

        function openChat() {

            panel.classList.add("ggss-chat-open");

            robot.setAttribute("aria-expanded", "true");

            input.focus();

        }

        function closeChat() {

            panel.classList.remove("ggss-chat-open");

            robot.setAttribute("aria-expanded", "false");

            if (isFullscreen) {

                exitFullscreenMode();

            }

        }

        robot.addEventListener("click", function () {

            if (panel.classList.contains("ggss-chat-open")) {

                closeChat();

            } else {

                openChat();

            }

        });

        closeButton.addEventListener("click", closeChat);


        /* =====================================
           13. FULL SCREEN CHAT
        ===================================== */

        function enterFullscreenMode() {

            isFullscreen = true;

            panel.style.position = "fixed";

            panel.style.top = "0";

            panel.style.left = "0";

            panel.style.right = "0";

            panel.style.bottom = "0";

            panel.style.width = "100vw";

            panel.style.height = "100vh";

            panel.style.height = "100dvh";

            panel.style.maxWidth = "none";

            panel.style.maxHeight = "none";

            panel.style.borderRadius = "0";

            panel.style.zIndex = "100000";

            fullscreenButton.textContent = "⊡";

            fullscreenButton.setAttribute(
                "aria-label",
                "Exit full screen"
            );

            fullscreenButton.title = "Exit full screen";

        }

        function exitFullscreenMode() {

            isFullscreen = false;

            panel.style.position = "";

            panel.style.top = "";

            panel.style.left = "";

            panel.style.right = "";

            panel.style.bottom = "";

            panel.style.width = "";

            panel.style.height = "";

            panel.style.maxWidth = "";

            panel.style.maxHeight = "";

            panel.style.borderRadius = "";

            panel.style.zIndex = "";

            fullscreenButton.textContent = "⛶";

            fullscreenButton.setAttribute(
                "aria-label",
                "Open full screen"
            );

            fullscreenButton.title = "Full screen";

        }

        fullscreenButton.addEventListener("click", function () {

            if (isFullscreen) {

                exitFullscreenMode();

            } else {

                enterFullscreenMode();

            }

        });


        /* =====================================
           14. ESCAPE KEY
        ===================================== */

        document.addEventListener("keydown", function (event) {

            if (event.key === "Escape") {

                if (isFullscreen) {

                    exitFullscreenMode();

                } else {

                    closeChat();

                }

            }

        });


        /* =====================================
           15. ADD CHAT MESSAGE
        ===================================== */

        function addPopupMessage(message, type) {

            const div = document.createElement("div");

            div.className = "ggss-popup-message " + type;

            div.textContent = message;

            messages.appendChild(div);

            messages.scrollTop = messages.scrollHeight;

            return div;

        }


        /* =====================================
           16. SEND QUESTION TO GEMINI
        ===================================== */

        async function sendPopupQuestion(question) {

            if (!question || busy) return;

            busy = true;

            addPopupMessage(
                question,
                "ggss-popup-user"
            );

            const loading = addPopupMessage(
                "Please wait, I am preparing your answer...",
                "ggss-popup-bot"
            );

            input.value = "";

            sendButton.disabled = true;

            try {

                const reply = await getGeminiReply(question);

                loading.remove();

                addPopupMessage(
                    reply,
                    "ggss-popup-bot"
                );

            } catch (error) {

                loading.remove();

                addPopupMessage(
                    "Sorry! The AI assistant is temporarily unavailable. Please try again or contact the school office.",
                    "ggss-popup-bot"
                );

                console.error("GGSS AI Error:", error);

            } finally {

                busy = false;

                sendButton.disabled = false;

                input.focus();

            }

        }


        /* =====================================
           17. CHAT FORM SUBMISSION
        ===================================== */

        form.addEventListener("submit", function (event) {

            event.preventDefault();

            sendPopupQuestion(input.value.trim());

        });


        /* =====================================
           18. QUICK QUESTIONS
        ===================================== */

        panel.querySelectorAll("[data-question]").forEach(
            function (button) {

                button.addEventListener("click", function () {

                    const question = button.dataset.question;

                    sendPopupQuestion(question);

                });

            }
        );

    }

});
