/* =========================================================
   CGD MEDIA — NISHA AI
   PREMIUM BUSINESS CONSULTANT VERSION
   ========================================================= */

(function () {

    "use strict";


    /* =====================================================
       CONFIG
    ===================================================== */

    const CONFIG = {

        whatsapp: "917569798676",

        email: "clickgrowthdigitalofficial@gmail.com",

        servicesPage: "services.html",

        portfolioPage: "portfolio.html",

        contactPage: "contact.html"

    };


    /* =====================================================
       NISHA STATE
       Keeps track of the conversation
    ===================================================== */

    const state = {

        initialized: false,

        business: "",

        goal: "",

        challenge: "",

        service: "",

        askedBusiness: false,

        askedGoal: false,

        askedChallenge: false,

        recommendationGiven: false,

        leadStarted: false

    };


    /* =====================================================
       HELPER — GET ELEMENT
    ===================================================== */

    function get(selector) {

        return document.querySelector(selector);

    }


    /* =====================================================
       INITIALIZE
    ===================================================== */

    function initNisha() {

        if (state.initialized) {

            return;

        }


        const chat =
            get(".nisha-chat");


        const launcher =
            get(".nisha-launcher");


        const close =
            get(".nisha-close");


        const input =
            get(".nisha-input");


        const send =
            get(".nisha-send");


        const body =
            get(".nisha-body");


        if (
            !chat ||
            !launcher ||
            !close ||
            !input ||
            !send ||
            !body
        ) {

            return;

        }


        state.initialized = true;


        setupLauncher();

        setupClose();

        setupInput();

        setupQuickButtons();

        setupGreeting();


        /*
         * Important:
         * HTML already contains the welcome message.
         * We do NOT create another welcome message.
         */

        scrollToBottom();

    }



    /* =====================================================
       LAUNCHER
    ===================================================== */

    function setupLauncher() {

        const launcher =
            get(".nisha-launcher");


        const chat =
            get(".nisha-chat");


        if (
            !launcher ||
            !chat
        ) {

            return;

        }


        launcher.addEventListener(
            "click",
            function () {

                const isOpen =
                    chat.classList.contains("open");


                if (isOpen) {

                    closeNisha();

                } else {

                    openNisha();

                }

            }
        );

    }



    /* =====================================================
       OPEN NISHA
    ===================================================== */

    function openNisha() {

        const chat =
            get(".nisha-chat");


        const launcher =
            get(".nisha-launcher");


        const greeting =
            get(".nisha-greeting");


        if (chat) {

            chat.classList.add("open");

        }


        if (launcher) {

            launcher.setAttribute(
                "aria-expanded",
                "true"
            );

        }


        if (greeting) {

            greeting.classList.remove("show");

        }


        setTimeout(
            function () {

                const input =
                    get(".nisha-input");


                if (input) {

                    input.focus();

                }

            },
            250
        );


        scrollToBottom();

    }



    /* =====================================================
       CLOSE NISHA
    ===================================================== */

    function closeNisha() {

        const chat =
            get(".nisha-chat");


        const launcher =
            get(".nisha-launcher");


        if (chat) {

            chat.classList.remove("open");

        }


        if (launcher) {

            launcher.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    }



    /* =====================================================
       CLOSE BUTTON
    ===================================================== */

    function setupClose() {

        const close =
            get(".nisha-close");


        if (!close) {

            return;

        }


        close.addEventListener(
            "click",
            closeNisha
        );

    }



    /* =====================================================
       GREETING
    ===================================================== */

    function setupGreeting() {

        const greeting =
            get(".nisha-greeting");


        if (!greeting) {

            return;

        }


        setTimeout(
            function () {

                /*
                 * Only show if chat isn't already open.
                 */

                const chat =
                    get(".nisha-chat");


                if (
                    chat &&
                    !chat.classList.contains("open")
                ) {

                    greeting.classList.add("show");

                }

            },
            1400
        );


        setTimeout(
            function () {

                greeting.classList.remove("show");

            },
            8000
        );

    }



    /* =====================================================
       INPUT
    ===================================================== */

    function setupInput() {

        const input =
            get(".nisha-input");


        const send =
            get(".nisha-send");


        if (
            !input ||
            !send
        ) {

            return;

        }


        send.addEventListener(
            "click",
            sendUserMessage
        );


        input.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter"
                ) {

                    event.preventDefault();

                    sendUserMessage();

                }

            }
        );

    }



    /* =====================================================
       QUICK BUTTONS
    ===================================================== */

    function setupQuickButtons() {

        document.addEventListener(
            "click",
            function (event) {

                const button =
                    event.target.closest(
                        ".nisha-quick-btn"
                    );


                if (!button) {

                    return;

                }


                const message =
                    button.getAttribute(
                        "data-message"
                    );


                if (!message) {

                    return;

                }


                /*
                 * Don't send twice if button is inside
                 * a form or special action.
                 */

                event.preventDefault();


                processMessage(message);

            }
        );

    }



    /* =====================================================
       SEND USER MESSAGE
    ===================================================== */

    function sendUserMessage() {

        const input =
            get(".nisha-input");


        if (!input) {

            return;

        }


        const text =
            input.value.trim();


        if (!text) {

            return;

        }


        input.value = "";


        processMessage(text);

    }



    /* =====================================================
       PROCESS MESSAGE
    ===================================================== */

    function processMessage(text) {

        openNisha();


        addUserMessage(text);


        showTyping();


        const delay =
            Math.min(
                650 + text.length * 8,
                1300
            );


        setTimeout(
            function () {

                removeTyping();

                generateResponse(text);

            },
            delay
        );

    }



    /* =====================================================
       RESPONSE ENGINE
    ===================================================== */

    function generateResponse(text) {

        const message =
            text.toLowerCase().trim();


        /*
         * GREETING
         */

        if (
            isGreeting(message)
        ) {

            respondGreeting();

            return;

        }


        /*
         * THANK YOU
         */

        if (
            containsAny(
                message,
                [
                    "thank you",
                    "thanks",
                    "thank",
                    "great",
                    "nice"
                ]
            )
        ) {

            botMessage(
                `
                You're welcome! 😊

                <br><br>

                If you'd like, tell me a little
                about your business and I'll help
                you figure out the right digital
                growth direction.
                `
            );

            return;

        }


        /*
         * BUSINESS TYPE DETECTION
         */

        const detectedBusiness =
            detectBusiness(message);


        if (detectedBusiness) {

            state.business =
                detectedBusiness;

        }


        /*
         * GOAL DETECTION
         */

        const detectedGoal =
            detectGoal(message);


        if (detectedGoal) {

            state.goal =
                detectedGoal;

        }


        /*
         * CHALLENGE DETECTION
         */

        const detectedChallenge =
            detectChallenge(message);


        if (detectedChallenge) {

            state.challenge =
                detectedChallenge;

        }


        /*
         * SERVICE DETECTION
         */

        const detectedService =
            detectService(message);


        if (detectedService) {

            state.service =
                detectedService;

        }


        /*
         * PORTFOLIO
         */

        if (
            containsAny(
                message,
                [
                    "portfolio",
                    "projects",
                    "project",
                    "work",
                    "clients",
                    "previous work",
                    "examples"
                ]
            )
        ) {

            respondPortfolio();

            return;

        }


        /*
         * CONTACT
         */

        if (
            containsAny(
                message,
                [
                    "contact",
                    "phone number",
                    "mobile number",
                    "email",
                    "call you",
                    "talk to team"
                ]
            )
        ) {

            respondContact();

            return;

        }


        /*
         * PRICING
         */

        if (
            containsAny(
                message,
                [
                    "price",
                    "pricing",
                    "cost",
                    "budget",
                    "package",
                    "packages",
                    "how much",
                    "quote"
                ]
            )
        ) {

            respondPricing();

            return;

        }


        /*
         * SERVICE DIRECT QUESTION
         */

        if (detectedService) {

            respondService(
                detectedService
            );

            return;

        }


        /*
         * IF BUSINESS + GOAL ARE AVAILABLE
         */

        if (
            state.business &&
            state.goal
        ) {

            giveRecommendation();

            return;

        }


        /*
         * IF ONLY GOAL AVAILABLE
         */

        if (
            state.goal &&
            !state.business
        ) {

            askBusinessType();

            return;

        }


        /*
         * IF ONLY BUSINESS AVAILABLE
         */

        if (
            state.business &&
            !state.goal
        ) {

            askBusinessGoal();

            return;

        }


        /*
         * CHALLENGE ONLY
         */

        if (
            state.challenge &&
            !state.business
        ) {

            botMessage(
                `
                I can definitely help with that.

                <br><br>

                Before I suggest the right solution,
                what type of business do you run?

                <br><br>

                For example:

                <br>

                Restaurant • School • Furniture •
                Events • Real Estate • Gym •
                Retail • Service Business
                `
            );

            state.askedBusiness =
                true;

            return;

        }


        /*
         * UNKNOWN / GENERAL MESSAGE
         */

        handleGeneralMessage(message);

    }



    /* =====================================================
       GREETING RESPONSE
    ===================================================== */

    function respondGreeting() {

        botMessage(
            `
            Hi! 👋 I'm <strong>Nisha</strong>.

            <br><br>

            I don't want to simply show you a
            list of services. I'd first like to
            understand your business.

            <br><br>

            <strong>What type of business do you run?</strong>

            <br><br>

            You can simply type something like:

            <br>

            “I run a furniture store”
            `
        );


        state.askedBusiness =
            true;

    }



    /* =====================================================
       BUSINESS QUESTION
    ===================================================== */

    function askBusinessType() {

        if (state.askedBusiness) {

            return;

        }


        botMessage(
            `
            Great. 👍

            <br><br>

            To guide you properly,
            <strong>what type of business do you run?</strong>

            <br><br>

            For example:

            <br>

            Restaurant • School • Furniture •
            Events • Real Estate • Gym •
            Retail • Service Business
            `
        );


        state.askedBusiness =
            true;

    }



    /* =====================================================
       GOAL QUESTION
    ===================================================== */

    function askBusinessGoal() {

        if (state.askedGoal) {

            return;

        }


        botMessage(
            `
            Got it — <strong>${escapeHTML(
                state.business
            )}</strong>. 👍

            <br><br>

            What are you mainly trying to achieve
            right now?

            <br><br>

            <strong>More customers?</strong><br>

            <strong>More leads?</strong><br>

            <strong>Better branding?</strong><br>

            <strong>More visibility online?</strong><br>

            <strong>Website?</strong>

            <br><br>

            Just tell me in your own words.
            `
        );


        state.askedGoal =
            true;

    }



    /* =====================================================
       RECOMMENDATION
    ===================================================== */

    function giveRecommendation() {

        if (
            state.recommendationGiven
        ) {

            /*
             * If recommendation was already given,
             * answer with a more direct CTA.
             */

            botMessage(
                `
                Based on what you've told me,
                I can help you take this forward.

                <br><br>

                Would you like to discuss the
                requirement with our team?
                `
                + quoteButton()
            );

            return;

        }


        const recommendation =
            buildRecommendation();


        state.recommendationGiven =
            true;


        botMessage(
            `
            Thanks — that gives me a much
            clearer picture. 👍

            <br><br>

            <strong>Business:</strong>
            ${escapeHTML(state.business)}

            <br>

            <strong>Goal:</strong>
            ${escapeHTML(state.goal)}

            <br><br>

            Based on that, I'd recommend:

            <br><br>

            ${recommendation}

            <br><br>

            We can build this around your
            actual business goals rather than
            using a one-size-fits-all package.

            <br><br>

            Would you like to discuss your
            requirement with our team?

            ${quoteButton()}
            `
        );

    }



    /* =====================================================
       BUILD RECOMMENDATION
    ===================================================== */

    function buildRecommendation() {

        const goal =
            state.goal.toLowerCase();


        /*
         * LEADS / ENQUIRIES
         */

        if (
            containsAny(
                goal,
                [
                    "lead",
                    "enquir",
                    "customer",
                    "sales",
                    "sale"
                ]
            )
        ) {

            return `
                <strong>Performance Marketing</strong>

                <br><br>

                • Meta Ads<br>
                • Google Ads<br>
                • Landing / Website Optimization<br>
                • Lead Generation Strategy<br>
                • Conversion-focused content
            `;

        }


        /*
         * BRANDING
         */

        if (
            containsAny(
                goal,
                [
                    "brand",
                    "branding",
                    "identity",
                    "professional"
                ]
            )
        ) {

            return `
                <strong>Brand Building</strong>

                <br><br>

                • Brand Strategy<br>
                • Visual Identity<br>
                • Graphic Design<br>
                • Social Media Presence<br>
                • Website Experience
            `;

        }


        /*
         * VISIBILITY / GOOGLE
         */

        if (
            containsAny(
                goal,
                [
                    "visibility",
                    "google",
                    "search",
                    "ranking",
                    "seo",
                    "online presence"
                ]
            )
        ) {

            return `
                <strong>Digital Visibility</strong>

                <br><br>

                • SEO<br>
                • Google Business Presence<br>
                • Website Optimization<br>
                • Local Search Strategy<br>
                • Content & Social Media
            `;

        }


        /*
         * WEBSITE
         */

        if (
            containsAny(
                goal,
                [
                    "website",
                    "web",
                    "site"
                ]
            )
        ) {

            return `
                <strong>Website & Digital Foundation</strong>

                <br><br>

                • Professional Website<br>
                • Mobile-first Design<br>
                • SEO-ready Structure<br>
                • Conversion-focused Pages<br>
                • Analytics & Optimization
            `;

        }


        /*
         * SOCIAL MEDIA
         */

        if (
            containsAny(
                goal,
                [
                    "social",
                    "instagram",
                    "facebook",
                    "content"
                ]
            )
        ) {

            return `
                <strong>Social Media Growth</strong>

                <br><br>

                • Social Media Strategy<br>
                • Content Creation<br>
                • Instagram Growth<br>
                • Meta Ads<br>
                • Audience Engagement
            `;

        }


        /*
         * DEFAULT
         */

        return `
            <strong>Complete Digital Growth Strategy</strong>

            <br><br>

            • Strategy & Branding<br>
            • Website Development<br>
            • SEO<br>
            • Social Media Marketing<br>
            • Meta & Google Ads<br>
            • Content & Creative
        `;

    }



    /* =====================================================
       SERVICE RESPONSE
    ===================================================== */

    function respondService(service) {

        const serviceData = {

            seo: {
                title: "SEO",
                text: `
                    We help businesses improve their
                    search visibility through SEO,
                    content strategy and local search
                    optimization.
                `
            },

            meta: {
                title: "Meta Ads",
                text: `
                    We create and manage Meta campaigns
                    designed to reach the right audience,
                    generate enquiries and support business
                    growth.
                `
            },

            google: {
                title: "Google Ads",
                text: `
                    Google Ads can help businesses reach
                    people who are actively searching for
                    their products or services.
                `
            },

            website: {
                title: "Website Development",
                text: `
                    We build modern, responsive and
                    conversion-focused websites that
                    support your brand and digital growth.
                `
            },

            social: {
                title: "Social Media Marketing",
                text: `
                    We help businesses build a consistent
                    social presence through strategy,
                    content, creatives and audience growth.
                `
            },

            branding: {
                title: "Branding & Design",
                text: `
                    We create stronger visual identities
                    and brand experiences that help businesses
                    look professional and memorable.
                `
            },

            digital: {
                title: "Digital Marketing",
                text: `
                    We combine strategy, social media,
                    advertising, SEO, websites and creative
                    solutions based on your business goals.
                `
            }

        };


        const data =
            serviceData[service] ||
            serviceData.digital;


        botMessage(
            `
            <strong>${data.title}</strong>

            <br><br>

            ${data.text}

            <br><br>

            Instead of recommending a package immediately,
            I can understand your business first and
            suggest what would actually make sense.

            <br><br>

            <strong>
                What type of business do you run?
            </strong>
            `
        );


        state.service =
            service;


        state.askedBusiness =
            true;

    }



    /* =====================================================
       PORTFOLIO
    ===================================================== */

    function respondPortfolio() {

        botMessage(
            `
            Absolutely. 📁

            <br><br>

            You can explore some of the brands and
            businesses we've worked with in our portfolio.

            <br><br>

            <a
                href="${CONFIG.portfolioPage}"
                class="nisha-inline-link">

                View Our Portfolio →
            </a>

            <br><br>

            If you tell me your industry,
            I can also help you understand which
            type of digital solution may fit your business.
            `
        );

    }



    /* =====================================================
       CONTACT
    ===================================================== */

    function respondContact() {

        botMessage(
            `
            Of course. 👋

            <br><br>

            <strong>CGD Media</strong>

            <br><br>

            📞 <strong>+91 75697 98676</strong>

            <br><br>

            📧 <strong>${CONFIG.email}</strong>

            <br><br>

            You can also send your requirement
            directly through WhatsApp.

            <br><br>

            ${whatsappButton()}
            `
        );

    }



    /* =====================================================
       PRICING
    ===================================================== */

    function respondPricing() {

        botMessage(
            `
            Our pricing depends on what your business
            actually needs — for example, a website,
            social media, SEO, ads or a complete
            digital growth strategy.

            <br><br>

            I don't want to give you a random price
            without understanding the requirement.

            <br><br>

            <strong>
                Tell me your business type and what
                you're looking to achieve.
            </strong>

            <br><br>

            ${quoteButton()}
            `
        );

    }



    /* =====================================================
       GENERAL MESSAGE
    ===================================================== */

    function handleGeneralMessage(message) {

        /*
         * Short generic messages
         */

        if (
            message.length < 5
        ) {

            botMessage(
                `
                Sure. 😊

                Tell me a little more about
                what you're looking for.
                `
            );

            return;

        }


        /*
         * Business-looking sentence
         */

        if (
            !state.business
        ) {

            botMessage(
                `
                I can help with that. 👍

                <br><br>

                Before I suggest anything,
                <strong>what type of business do you run?</strong>

                <br><br>

                For example:

                <br>

                “I run a furniture store”
                `
            );


            state.askedBusiness =
                true;


            return;

        }


        /*
         * Business exists but goal doesn't
         */

        if (
            state.business &&
            !state.goal
        ) {

            askBusinessGoal();

            return;

        }


        /*
         * Fallback
         */

        botMessage(
            `
            I understand.

            <br><br>

            Let me help you narrow it down.

            <br><br>

            Are you mainly looking for:

            <br>

            <strong>More customers</strong>,
            <strong>better branding</strong>,
            <strong>a website</strong>,
            <strong>SEO / Google visibility</strong>,
            or <strong>social media growth</strong>?

            <br><br>

            Just type what you're trying to achieve.
            `
        );

    }



    /* =====================================================
       DETECT BUSINESS
    ===================================================== */

    function detectBusiness(text) {

        const businesses = [

            {
                words: [
                    "restaurant",
                    "hotel",
                    "cafe",
                    "café",
                    "food",
                    "bakery",
                    "bar",
                    "pub"
                ],
                value: "Food / Hospitality Business"
            },

            {
                words: [
                    "school",
                    "college",
                    "institute",
                    "institution",
                    "education",
                    "academy"
                ],
                value: "Education Business"
            },

            {
                words: [
                    "hospital",
                    "clinic",
                    "doctor",
                    "healthcare",
                    "medical"
                ],
                value: "Healthcare Business"
            },

            {
                words: [
                    "real estate",
                    "property",
                    "builder",
                    "construction",
                    "apartment"
                ],
                value: "Real Estate / Construction Business"
            },

            {
                words: [
                    "furniture",
                    "interior",
                    "interiors",
                    "home decor",
                    "home décor"
                ],
                value: "Furniture / Interior Business"
            },

            {
                words: [
                    "event",
                    "events",
                    "wedding",
                    "decorations",
                    "decoration"
                ],
                value: "Events Business"
            },

            {
                words: [
                    "gym",
                    "fitness",
                    "workout"
                ],
                value: "Fitness Business"
            },

            {
                words: [
                    "boutique",
                    "fashion",
                    "clothing",
                    "garments"
                ],
                value: "Fashion / Retail Business"
            },

            {
                words: [
                    "car",
                    "automobile",
                    "auto",
                    "detailing",
                    "car wash"
                ],
                value: "Automotive Business"
            },

            {
                words: [
                    "shop",
                    "store",
                    "retail"
                ],
                value: "Retail Business"
            }

        ];


        for (
            let i = 0;
            i < businesses.length;
            i++
        ) {

            if (
                containsAny(
                    text,
                    businesses[i].words
                )
            ) {

                return businesses[i].value;

            }

        }


        return "";

    }



    /* =====================================================
       DETECT GOAL
    ===================================================== */

    function detectGoal(text) {

        if (
            containsAny(
                text,
                [
                    "more leads",
                    "leads",
                    "enquiries",
                    "enquiry",
                    "inquiries",
                    "inquiry",
                    "customers",
                    "sales",
                    "sell more",
                    "more sales"
                ]
            )
        ) {

            return "Generate more leads and customers";

        }


        if (
            containsAny(
                text,
                [
                    "branding",
                    "brand",
                    "rebrand",
                    "identity"
                ]
            )
        ) {

            return "Build a stronger brand";

        }


        if (
            containsAny(
                text,
                [
                    "website",
                    "web site",
                    "web development",
                    "new website"
                ]
            )
        ) {

            return "Build or improve a website";

        }


        if (
            containsAny(
                text,
                [
                    "seo",
                    "google ranking",
                    "rank on google",
                    "visibility",
                    "search"
                ]
            )
        ) {

            return "Improve online visibility";

        }


        if (
            containsAny(
                text,
                [
                    "instagram",
                    "facebook",
                    "social media",
                    "social"
                ]
            )
        ) {

            return "Grow social media presence";

        }


        if (
            containsAny(
                text,
                [
                    "grow",
                    "growth",
                    "grow my business",
                    "business growth"
                ]
            )
        ) {

            return "Grow the business digitally";

        }


        if (
            containsAny(
                text,
                [
                    "online presence",
                    "digital presence",
                    "digital marketing"
                ]
            )
        ) {

            return "Build a stronger digital presence";

        }


        return "";

    }



    /* =====================================================
       DETECT CHALLENGE
    ===================================================== */

    function detectChallenge(text) {

        if (
            containsAny(
                text,
                [
                    "no customers",
                    "low sales",
                    "not getting customers",
                    "not getting leads",
                    "no leads"
                ]
            )
        ) {

            return "Low leads or sales";

        }


        if (
            containsAny(
                text,
                [
                    "no website",
                    "don't have website",
                    "dont have website"
                ]
            )
        ) {

            return "No professional website";

        }


        if (
            containsAny(
                text,
                [
                    "not ranking",
                    "google ranking",
                    "not visible",
                    "low visibility"
                ]
            )
        ) {

            return "Low online visibility";

        }


        if (
            containsAny(
                text,
                [
                    "followers",
                    "engagement",
                    "social media"
                ]
            )
        ) {

            return "Weak social media presence";

        }


        return "";

    }



    /* =====================================================
       DETECT SERVICE
    ===================================================== */

    function detectService(text) {

        if (
            containsAny(
                text,
                [
                    "meta ads",
                    "facebook ads",
                    "instagram ads"
                ]
            )
        ) {

            return "meta";

        }


        if (
            containsAny(
                text,
                [
                    "google ads",
                    "google advertisement",
                    "ppc"
                ]
            )
        ) {

            return "google";

        }


        if (
            containsAny(
                text,
                [
                    "seo",
                    "search engine optimization"
                ]
            )
        ) {

            return "seo";

        }


        if (
            containsAny(
                text,
                [
                    "website",
                    "web development",
                    "web design"
                ]
            )
        ) {

            return "website";

        }


        if (
            containsAny(
                text,
                [
                    "social media",
                    "instagram marketing",
                    "facebook marketing"
                ]
            )
        ) {

            return "social";

        }


        if (
            containsAny(
                text,
                [
                    "branding",
                    "graphic design",
                    "brand identity"
                ]
            )
        ) {

            return "branding";

        }


        if (
            containsAny(
                text,
                [
                    "digital marketing"
                ]
            )
        ) {

            return "digital";

        }


        return "";

    }



    /* =====================================================
       GREETING DETECTOR
    ===================================================== */

    function isGreeting(text) {

        return containsAny(
            text,
            [
                "hi",
                "hello",
                "hey",
                "hii",
                "hiii",
                "good morning",
                "good evening",
                "good afternoon"
            ]
        );

    }



    /* =====================================================
       STRING MATCH HELPER
    ===================================================== */

    function containsAny(
        text,
        words
    ) {

        return words.some(
            function (word) {

                return text.includes(
                    word
                );

            }
        );

    }



    /* =====================================================
       ADD BOT MESSAGE
    ===================================================== */

    function botMessage(html) {

        const body =
            get(".nisha-body");


        if (!body) {

            return;

        }


        const typingElement =
            body.querySelector(
                ".nisha-typing-message"
            );


        const message =
            document.createElement(
                "div"
            );


        message.className =
            "nisha-message bot";


        message.innerHTML = `

            <div class="nisha-bubble">

                ${html}

            </div>

        `;


        /*
         * Insert before typing if it exists
         */

        if (typingElement) {

            body.insertBefore(
                message,
                typingElement
            );

        } else {

            body.appendChild(
                message
            );

        }


        scrollToBottom();

    }



    /* =====================================================
       ADD USER MESSAGE
    ===================================================== */

    function addUserMessage(text) {

        const body =
            get(".nisha-body");


        if (!body) {

            return;

        }


        const message =
            document.createElement(
                "div"
            );


        message.className =
            "nisha-message user";


        message.innerHTML = `

            <div class="nisha-bubble">

                ${escapeHTML(text)}

            </div>

        `;


        body.appendChild(
            message
        );


        scrollToBottom();

    }



    /* =====================================================
       TYPING
    ===================================================== */

    function showTyping() {

        const body =
            get(".nisha-body");


        if (!body) {

            return;

        }


        removeTyping();


        const typing =
            document.createElement(
                "div"
            );


        typing.id =
            "nishaTyping";


        typing.className =
            "nisha-message bot nisha-typing-message";


        typing.innerHTML = `

            <div class="nisha-bubble">

                <div class="nisha-typing">

                    <span></span>
                    <span></span>
                    <span></span>

                </div>

            </div>

        `;


        body.appendChild(
            typing
        );


        scrollToBottom();

    }



    /* =====================================================
       REMOVE TYPING
    ===================================================== */

    function removeTyping() {

        const typing =
            document.getElementById(
                "nishaTyping"
            );


        if (typing) {

            typing.remove();

        }

    }



    /* =====================================================
       SCROLL
    ===================================================== */

    function scrollToBottom() {

        const body =
            get(".nisha-body");


        if (!body) {

            return;

        }


        setTimeout(
            function () {

                body.scrollTop =
                    body.scrollHeight;

            },
            50
        );

    }



    /* =====================================================
       QUOTE BUTTON
    ===================================================== */

    function quoteButton() {

        return `

            <button
                type="button"
                class="nisha-quick-btn nisha-action-quote"
                data-nisha-quote="true">

                🚀 Discuss My Requirement

            </button>

        `;

    }



    /* =====================================================
       WHATSAPP BUTTON
    ===================================================== */

    function whatsappButton() {

        const url =
            `https://wa.me/${CONFIG.whatsapp}`;


        return `

            <a
                href="${url}"
                class="nisha-inline-whatsapp"
                target="_blank"
                rel="noopener noreferrer">

                <i class="fab fa-whatsapp"></i>

                Chat on WhatsApp →

            </a>

        `;

    }



    /* =====================================================
       QUOTE BUTTON LISTENER
    ===================================================== */

    document.addEventListener(
        "click",
        function (event) {

            const button =
                event.target.closest(
                    "[data-nisha-quote]"
                );


            if (!button) {

                return;

            }


            event.preventDefault();


            showLeadForm();

        }
    );



    /* =====================================================
       LEAD FORM
    ===================================================== */

    function showLeadForm() {

        if (
            document.querySelector(
                ".nisha-lead-form"
            )
        ) {

            return;

        }


        state.leadStarted =
            true;


        const body =
            get(".nisha-body");


        if (!body) {

            return;

        }


        const message =
            document.createElement(
                "div"
            );


        message.className =
            "nisha-message bot";


        message.innerHTML = `

            <div class="nisha-bubble">

                <strong>
                    Let's take the next step. 🚀
                </strong>

                <br><br>

                Give me a few details and
                I'll prepare a WhatsApp message
                for our team.

                <form
                    class="nisha-lead-form">

                    <input
                        type="text"
                        name="name"
                        placeholder="Your name"
                        autocomplete="name"
                        required
                    >

                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone number"
                        autocomplete="tel"
                        required
                    >

                    <input
                        type="text"
                        name="business"
                        placeholder="Business name"
                        autocomplete="organization"
                        required
                    >

                    <textarea
                        name="requirement"
                        placeholder="Tell us what you need..."
                        rows="3"
                        required
                    ></textarea>

                    <button
                        type="submit"
                        class="nisha-lead-submit">

                        Continue to WhatsApp
                        <i class="fab fa-whatsapp"></i>

                    </button>

                </form>

            </div>

        `;


        body.appendChild(
            message
        );


        scrollToBottom();


        const form =
            message.querySelector(
                ".nisha-lead-form"
            );


        form.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const formData =
                    new FormData(form);


                const name =
                    formData.get(
                        "name"
                    ).trim();


                const phone =
                    formData.get(
                        "phone"
                    ).trim();


                const business =
                    formData.get(
                        "business"
                    ).trim();


                const requirement =
                    formData.get(
                        "requirement"
                    ).trim();


                const whatsappMessage =

                    `Hi CGD Media 👋

I spoke with Nisha on your website.

Name: ${name}
Phone: ${phone}
Business: ${business}
Requirement: ${requirement}`;


                const url =

                    `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(
                        whatsappMessage
                    )}`;


                form.innerHTML = `

                    <div class="nisha-form-success">

                        <i class="fab fa-whatsapp"></i>

                        Opening WhatsApp...

                    </div>

                `;


                setTimeout(
                    function () {

                        window.open(
                            url,
                            "_blank",
                            "noopener,noreferrer"
                        );

                    },
                    500
                );

            }
        );

    }



    /* =====================================================
       ESCAPE HTML
    ===================================================== */

    function escapeHTML(text) {

        const element =
            document.createElement(
                "div"
            );


        element.textContent =
            text;


        return element.innerHTML;

    }



    /* =====================================================
       DYNAMIC HTML SUPPORT
       Useful if Nisha HTML is loaded using
       include.js after DOMContentLoaded.
    ===================================================== */

    function watchForNisha() {

        initNisha();


        if (
            state.initialized
        ) {

            return;

        }


        const observer =
            new MutationObserver(
                function () {

                    if (
                        !state.initialized
                    ) {

                        initNisha();

                    }


                    if (
                        state.initialized
                    ) {

                        observer.disconnect();

                    }

                }
            );


        observer.observe(
            document.body,
            {
                childList: true,
                subtree: true
            }
        );


        /*
         * Safety fallback for include.js
         */

        setTimeout(
            initNisha,
            500
        );


        setTimeout(
            initNisha,
            1200
        );


        setTimeout(
            initNisha,
            2000
        );

    }



    /* =====================================================
       START
    ===================================================== */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            watchForNisha,
            {
                once: true
            }
        );

    } else {

        watchForNisha();

    }


})();