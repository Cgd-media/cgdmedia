/* =========================================================
   CGD MEDIA — NISHA
   FINAL SINGLE INSTANCE VERSION
========================================================= */

(function () {

    "use strict";


    /* =====================================================
       CONFIG
    ===================================================== */

    const NISHA_IMAGE =
        "images/nisha.png";

    const WHATSAPP =
        "917569798676";

    const EMAIL =
        "clickgrowthdigitalofficial@gmail.com";


    /* =====================================================
       CLEAN OLD NISHA
       This removes the old Nisha UI that was already
       present inside your HTML pages.
    ===================================================== */

    function cleanOldNisha() {

        /* Old IDs */

        const oldIds = [

            "nisha",

            "nishaWidget",

            "nisha-widget",

            "nishaAssistant",

            "nisha-assistant",

            "nishaChat",

            "nisha-chat"

        ];


        oldIds.forEach(function (id) {

            const element =
                document.getElementById(id);

            if (
                element &&
                id !== "nishaAssistant"
            ) {

                element.remove();

            }

        });


        /* Old classes */

        const oldSelectors = [

            ".nisha-widget",

            ".nisha-assistant",

            ".nisha-chatbot",

            ".nisha-popup",

            ".nisha-container",

            ".nisha-floating",

            ".nisha-float-button",

            ".nisha-bot",

            ".nisha-avatar-wrapper",

            ".nisha-message-box"

        ];


        oldSelectors.forEach(function (selector) {

            document
                .querySelectorAll(selector)
                .forEach(function (element) {

                    element.remove();

                });

        });


        /*
         * Remove old standalone Nisha image.
         *
         * IMPORTANT:
         * This only removes an image using nisha.png
         * before our new assistant is created.
         */

        document
            .querySelectorAll(
                'img[src*="nisha.png"]'
            )
            .forEach(function (image) {

                /*
                 * If it is already inside our new
                 * assistant, don't touch it.
                 */

                if (
                    image.closest(
                        "#nishaAssistant"
                    )
                ) {

                    return;

                }


                /*
                 * Hide/remove old image.
                 */

                image.style.display =
                    "none";


                /*
                 * Remove simple old image
                 * containers if clearly identifiable.
                 */

                const parent =
                    image.parentElement;


                if (
                    parent &&
                    (
                        parent.className
                            .toString()
                            .toLowerCase()
                            .includes("nisha")
                        ||
                        parent.id
                            .toString()
                            .toLowerCase()
                            .includes("nisha")
                    )
                ) {

                    parent.remove();

                }

            });

    }



    /* =====================================================
       CREATE ASSISTANT
    ===================================================== */

    function createNisha() {


        /* Never create twice */

        if (
            document.getElementById(
                "nishaAssistant"
            )
        ) {

            return;

        }


        const wrapper =
            document.createElement("div");


        wrapper.id =
            "nishaAssistant";


        wrapper.className =
            "nisha-wrapper";


        wrapper.innerHTML = `

            <!-- GREETING -->

            <div
                class="nisha-greeting"
                id="nishaGreeting">

                👋 Hi! I'm
                <strong>Nisha</strong>.

                <br>

                How can I help you
                grow your business?

            </div>


            <!-- CHAT -->

            <div
                class="nisha-chat"
                id="nishaChat">


                <!-- HEADER -->

                <div class="nisha-header">

                    <div class="nisha-header-avatar">

                        <img
                            src="${NISHA_IMAGE}"
                            alt="Nisha">

                    </div>


                    <div class="nisha-header-info">

                        <strong>
                            Nisha
                        </strong>

                        <span>
                            CGD Media Virtual Assistant
                        </span>

                    </div>


                    <button
                        type="button"
                        class="nisha-close"
                        id="nishaClose"
                        aria-label="Close">

                        <i class="fas fa-xmark"></i>

                    </button>

                </div>


                <!-- MESSAGES -->

                <div
                    class="nisha-messages"
                    id="nishaMessages">
                </div>


                <!-- INPUT -->

                <div class="nisha-input-area">

                    <div class="nisha-input-row">

                        <input
                            type="text"
                            class="nisha-input"
                            id="nishaInput"
                            placeholder="Ask Nisha..."
                            autocomplete="off">

                        <button
                            type="button"
                            class="nisha-send"
                            id="nishaSend">

                            <i class="fas fa-paper-plane"></i>

                        </button>

                    </div>


                    <div class="nisha-powered">

                        Click Grow Digital

                    </div>

                </div>

            </div>


            <!-- FLOATING AVATAR -->

            <button
                type="button"
                class="nisha-float"
                id="nishaFloat"
                aria-label="Open Nisha">

                <img
                    class="nisha-avatar"
                    src="${NISHA_IMAGE}"
                    alt="Nisha">

                <span
                    class="nisha-online">
                </span>

            </button>

        `;


        document.body.appendChild(wrapper);


        setupNisha();

    }



    /* =====================================================
       SETUP
    ===================================================== */

    function setupNisha() {


        const float =
            document.getElementById(
                "nishaFloat"
            );


        const chat =
            document.getElementById(
                "nishaChat"
            );


        const close =
            document.getElementById(
                "nishaClose"
            );


        const input =
            document.getElementById(
                "nishaInput"
            );


        const send =
            document.getElementById(
                "nishaSend"
            );


        const greeting =
            document.getElementById(
                "nishaGreeting"
            );


        if (
            !float ||
            !chat ||
            !close ||
            !input ||
            !send
        ) {

            return;

        }


        /* Greeting */

        setTimeout(function () {

            greeting.classList.add(
                "show"
            );

        }, 1200);


        setTimeout(function () {

            greeting.classList.remove(
                "show"
            );

        }, 7000);


        /* Open */

        float.addEventListener(
            "click",
            function () {

                chat.classList.add(
                    "open"
                );

                greeting.classList.remove(
                    "show"
                );

                setTimeout(function () {

                    input.focus();

                }, 250);

            }
        );


        /* Close */

        close.addEventListener(
            "click",
            function () {

                chat.classList.remove(
                    "open"
                );

            }
        );


        /* Send */

        send.addEventListener(
            "click",
            sendMessage
        );


        /* Enter */

        input.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter"
                ) {

                    event.preventDefault();

                    sendMessage();

                }

            }
        );


        /* Welcome */

        botMessage(
            `
            Hi! I'm <strong>Nisha</strong> 👋

            <br><br>

            I'm the virtual assistant
            for <strong>Click Grow Digital</strong>.

            <br><br>

            How can I help you today?

            ${quickButtons()}
            `
        );


    }



    /* =====================================================
       SEND MESSAGE
    ===================================================== */

    function sendMessage() {

        const input =
            document.getElementById(
                "nishaInput"
            );


        const text =
            input.value.trim();


        if (!text) {
            return;
        }


        userMessage(text);


        input.value = "";


        typing();


        setTimeout(function () {

            removeTyping();

            respond(text);

        }, 600);

    }



    /* =====================================================
       QUICK BUTTONS
    ===================================================== */

    function quickButtons() {

        return `

            <div class="nisha-quick-actions">

                <button
                    type="button"
                    class="nisha-quick-btn"
                    data-nisha-action="services">

                    💼 Services

                </button>


                <button
                    type="button"
                    class="nisha-quick-btn"
                    data-nisha-action="portfolio">

                    📁 Portfolio

                </button>


                <button
                    type="button"
                    class="nisha-quick-btn"
                    data-nisha-action="quote">

                    🚀 Get Quote

                </button>


                <button
                    type="button"
                    class="nisha-quick-btn"
                    data-nisha-action="contact">

                    📞 Contact

                </button>

            </div>

        `;

    }



    /* =====================================================
       QUICK ACTION LISTENER
    ===================================================== */

    document.addEventListener(
        "click",
        function (event) {

            const button =
                event.target.closest(
                    "[data-nisha-action]"
                );


            if (!button) {
                return;
            }


            const action =
                button.dataset.nishaAction;


            if (action === "services") {

                botMessage(
                    `
                    We help businesses grow through:

                    <br><br>

                    • Digital Marketing<br>
                    • Social Media Marketing<br>
                    • Meta Ads<br>
                    • Google Ads<br>
                    • Website Development<br>
                    • SEO<br>
                    • Branding & Design

                    <br><br>

                    <a
                        href="services.html"
                        style="
                            color:#16a34a;
                            font-weight:700;
                            text-decoration:none;
                        ">

                        Explore Services →

                    </a>
                    `
                );

            }


            if (action === "portfolio") {

                botMessage(
                    `
                    We have worked with businesses
                    across different industries.

                    <br><br>

                    Explore our projects and
                    success stories.

                    <br><br>

                    <a
                        href="portfolio.html"
                        style="
                            color:#16a34a;
                            font-weight:700;
                            text-decoration:none;
                        ">

                        View Portfolio →

                    </a>
                    `
                );

            }


            if (action === "quote") {

                showLeadForm();

            }


            if (action === "contact") {

                botMessage(
                    `
                    You can reach
                    <strong>Click Grow Digital</strong> at:

                    <br><br>

                    📞 <strong>
                    +91 75697 98676
                    </strong>

                    <br><br>

                    📧 ${EMAIL}

                    <br><br>

                    <a
                        href="contact.html"
                        style="
                            color:#16a34a;
                            font-weight:700;
                            text-decoration:none;
                        ">

                        Contact Us →

                    </a>
                    `
                );

            }

        }
    );



    /* =====================================================
       RESPONSE ENGINE
    ===================================================== */

    function respond(text) {

        const t =
            text.toLowerCase();


        if (
            t.includes("hi") ||
            t.includes("hello") ||
            t.includes("hey")
        ) {

            botMessage(
                `
                Hello! 👋

                I'm Nisha.

                <br><br>

                What would you like
                to know about CGD Media?

                ${quickButtons()}
                `
            );

            return;

        }


        if (
            t.includes("service") ||
            t.includes("what do you do")
        ) {

            botMessage(
                `
                Our core services include:

                <br><br>

                💼 Digital Marketing<br>
                📱 Social Media Marketing<br>
                📈 Meta & Google Ads<br>
                🌐 Website Development<br>
                🔎 SEO<br>
                🎨 Branding & Design

                <br><br>

                <a
                    href="services.html"
                    style="
                        color:#16a34a;
                        font-weight:700;
                        text-decoration:none;
                    ">

                    Explore Services →

                </a>
                `
            );

            return;

        }


        if (
            t.includes("portfolio") ||
            t.includes("project") ||
            t.includes("work")
        ) {

            botMessage(
                `
                Absolutely! 📁

                You can explore our completed
                projects and brand work here.

                <br><br>

                <a
                    href="portfolio.html"
                    style="
                        color:#16a34a;
                        font-weight:700;
                        text-decoration:none;
                    ">

                    View Portfolio →

                </a>
                `
            );

            return;

        }


        if (
            t.includes("price") ||
            t.includes("pricing") ||
            t.includes("cost") ||
            t.includes("budget") ||
            t.includes("quote")
        ) {

            botMessage(
                `
                Our pricing depends on your
                business goals and required services.

                <br><br>

                Tell me about your requirement
                and our team can discuss the
                right solution with you.

                <br><br>

                <button
                    type="button"
                    class="nisha-quick-btn"
                    data-nisha-action="quote">

                    🚀 Get A Quote

                </button>
                `
            );

            return;

        }


        if (
            t.includes("contact") ||
            t.includes("phone") ||
            t.includes("number") ||
            t.includes("email")
        ) {

            botMessage(
                `
                Sure! 👋

                📞 <strong>
                +91 75697 98676
                </strong>

                <br><br>

                📧 ${EMAIL}

                <br><br>

                <a
                    href="contact.html"
                    style="
                        color:#16a34a;
                        font-weight:700;
                        text-decoration:none;
                    ">

                    Contact Us →

                </a>
                `
            );

            return;

        }


        if (
            t.includes("website") ||
            t.includes("web")
        ) {

            botMessage(
                `
                Yes! 🌐

                We create modern, responsive
                business websites designed to
                support your digital growth.

                <br><br>

                <a
                    href="services.html"
                    style="
                        color:#16a34a;
                        font-weight:700;
                        text-decoration:none;
                    ">

                    Explore Services →

                </a>
                `
            );

            return;

        }


        if (
            t.includes("meta") ||
            t.includes("facebook") ||
            t.includes("instagram") ||
            t.includes("google ads") ||
            t.includes("ads")
        ) {

            botMessage(
                `
                We manage Meta and Google Ads
                campaigns focused on meaningful
                business results.

                <br><br>

                Want to discuss your campaign?

                <br><br>

                <button
                    type="button"
                    class="nisha-quick-btn"
                    data-nisha-action="quote">

                    🚀 Discuss Campaign

                </button>
                `
            );

            return;

        }


        botMessage(
            `
            I can help you with:

            <br><br>

            • Our services<br>
            • Portfolio<br>
            • Pricing enquiries<br>
            • Websites<br>
            • Meta & Google Ads<br>
            • Contact details

            <br><br>

            What would you like to know?

            ${quickButtons()}
            `
        );

    }



    /* =====================================================
       LEAD FORM → WHATSAPP
    ===================================================== */

    function showLeadForm() {

        const messages =
            document.getElementById(
                "nishaMessages"
            );


        if (!messages) {
            return;
        }


        const wrapper =
            document.createElement("div");


        wrapper.className =
            "nisha-message bot";


        wrapper.innerHTML = `

            <div class="nisha-bubble">

                Great! 🚀

                <br><br>

                Tell me a few details
                and I'll connect you with
                our team on WhatsApp.

                <form
                    class="nisha-lead-form"
                    id="nishaLeadForm">

                    <input
                        name="name"
                        type="text"
                        placeholder="Your name"
                        required>

                    <input
                        name="phone"
                        type="tel"
                        placeholder="Phone number"
                        required>

                    <input
                        name="business"
                        type="text"
                        placeholder="Business name">

                    <input
                        name="requirement"
                        type="text"
                        placeholder="What do you need?"
                        required>

                    <button
                        type="submit"
                        class="nisha-lead-submit">

                        Continue to WhatsApp

                    </button>

                </form>

            </div>

        `;


        messages.appendChild(wrapper);


        scrollMessages();


        const form =
            document.getElementById(
                "nishaLeadForm"
            );


        form.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const data =
                    new FormData(form);


                const name =
                    data.get("name");


                const phone =
                    data.get("phone");


                const business =
                    data.get("business") ||
                    "Not provided";


                const requirement =
                    data.get("requirement");


                const whatsappText =

                    `Hi CGD Media 👋

I spoke with Nisha on your website.

Name: ${name}
Phone: ${phone}
Business: ${business}
Requirement: ${requirement}`;


                const whatsappURL =

                    `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
                        whatsappText
                    )}`;


                form.innerHTML = `

                    <div
                        style="
                            padding:10px;
                            text-align:center;
                            color:#16a34a;
                            font-weight:700;
                            font-size:10px;
                        ">

                        Opening WhatsApp... 📲

                    </div>

                `;


                setTimeout(
                    function () {

                        window.open(
                            whatsappURL,
                            "_blank"
                        );

                    },
                    500
                );

            }
        );

    }



    /* =====================================================
       BOT MESSAGE
    ===================================================== */

    function botMessage(html) {

        const messages =
            document.getElementById(
                "nishaMessages"
            );


        if (!messages) {
            return;
        }


        const wrapper =
            document.createElement("div");


        wrapper.className =
            "nisha-message bot";


        wrapper.innerHTML = `

            <div class="nisha-bubble">

                ${html}

            </div>

        `;


        messages.appendChild(wrapper);


        scrollMessages();

    }



    /* =====================================================
       USER MESSAGE
    ===================================================== */

    function userMessage(text) {

        const messages =
            document.getElementById(
                "nishaMessages"
            );


        if (!messages) {
            return;
        }


        const wrapper =
            document.createElement("div");


        wrapper.className =
            "nisha-message user";


        wrapper.innerHTML = `

            <div class="nisha-bubble">

                ${escapeHTML(text)}

            </div>

        `;


        messages.appendChild(wrapper);


        scrollMessages();

    }



    /* =====================================================
       TYPING
    ===================================================== */

    function typing() {

        const messages =
            document.getElementById(
                "nishaMessages"
            );


        if (!messages) {
            return;
        }


        const wrapper =
            document.createElement("div");


        wrapper.id =
            "nishaTyping";


        wrapper.className =
            "nisha-message bot";


        wrapper.innerHTML = `

            <div class="nisha-typing">

                <span></span>
                <span></span>
                <span></span>

            </div>

        `;


        messages.appendChild(wrapper);


        scrollMessages();

    }



    /* =====================================================
       REMOVE TYPING
    ===================================================== */

    function removeTyping() {

        const element =
            document.getElementById(
                "nishaTyping"
            );


        if (element) {
            element.remove();
        }

    }



    /* =====================================================
       SCROLL
    ===================================================== */

    function scrollMessages() {

        const messages =
            document.getElementById(
                "nishaMessages"
            );


        if (!messages) {
            return;
        }


        setTimeout(
            function () {

                messages.scrollTop =
                    messages.scrollHeight;

            },
            30
        );

    }



    /* =====================================================
       ESCAPE
    ===================================================== */

    function escapeHTML(text) {

        const div =
            document.createElement(
                "div"
            );


        div.textContent =
            text;


        return div.innerHTML;

    }



    /* =====================================================
       START
    ===================================================== */

    function start() {

        /*
         * First remove old Nisha
         */

        cleanOldNisha();


        /*
         * Then create only our new Nisha
         */

        createNisha();

    }


    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            start,
            {
                once: true
            }
        );

    } else {

        start();

    }

})();