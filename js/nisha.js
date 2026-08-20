/* =========================================================
   NISHA AI
   CGD MEDIA DIGITAL GROWTH ASSISTANT
========================================================= */

(function () {

    "use strict";


    /* =====================================================
       STATE
    ===================================================== */

    const answers = {
        business: "",
        goal: "",
        challenge: ""
    };

    let currentStep = 1;
    let initialized = false;


    /* =====================================================
       RECOMMENDATIONS
    ===================================================== */

    const recommendations = {

        "More Leads & Enquiries": [

            {
                title: "Meta & Google Ads",
                description: "Target the right audience and generate quality enquiries.",
                icon: "fa-bullseye"
            },

            {
                title: "Landing Pages",
                description: "Convert ad traffic into calls, leads and enquiries.",
                icon: "fa-file-lines"
            },

            {
                title: "Lead Generation Strategy",
                description: "Build a clear system to attract and capture prospects.",
                icon: "fa-filter-circle-dollar"
            }

        ],


        "Build Online Presence": [

            {
                title: "Website Development",
                description: "Build a professional website that represents your business.",
                icon: "fa-laptop-code"
            },

            {
                title: "SEO & Local SEO",
                description: "Improve visibility when customers search online.",
                icon: "fa-magnifying-glass-chart"
            },

            {
                title: "Social Media Marketing",
                description: "Build a consistent and credible digital presence.",
                icon: "fa-hashtag"
            }

        ],


        "Brand Awareness": [

            {
                title: "Branding & Design",
                description: "Create a clear and memorable visual identity.",
                icon: "fa-pen-ruler"
            },

            {
                title: "Content Creation",
                description: "Create content that communicates your brand story.",
                icon: "fa-wand-magic-sparkles"
            },

            {
                title: "Social Media Marketing",
                description: "Build recognition through consistent communication.",
                icon: "fa-share-nodes"
            }

        ],


        "More Sales": [

            {
                title: "Performance Marketing",
                description: "Use targeted campaigns to reach high-intent customers.",
                icon: "fa-chart-line"
            },

            {
                title: "Creative Content",
                description: "Use stronger creatives and messaging to improve conversion.",
                icon: "fa-photo-film"
            },

            {
                title: "Conversion-Focused Website",
                description: "Make it easier for visitors to take action.",
                icon: "fa-arrow-pointer"
            }

        ]

    };


    /* =====================================================
       HELPERS
    ===================================================== */

    function get(selector) {

        return document.querySelector(selector);

    }


    function getAll(selector) {

        return document.querySelectorAll(selector);

    }


    /* =====================================================
       CHECK NISHA EXISTS
    ===================================================== */

    function nishaExists() {

        return !!(
            get(".nisha-chat") &&
            get(".nisha-launcher") &&
            get("#nisha-body")
        );

    }


    /* =====================================================
       OPEN NISHA
    ===================================================== */

    function openNisha() {

        const chat = get(".nisha-chat");

        const launcher = get(".nisha-launcher");

        const greeting = get(".nisha-greeting");


        if (chat) {

            chat.classList.add("active");

        }


        if (launcher) {

            launcher.classList.add("active");

            launcher.setAttribute(
                "aria-expanded",
                "true"
            );

        }


        if (greeting) {

            greeting.classList.add("hide");

        }

    }


    /* =====================================================
       CLOSE NISHA
    ===================================================== */

    function closeNisha() {

        const chat = get(".nisha-chat");

        const launcher = get(".nisha-launcher");

        const greeting = get(".nisha-greeting");


        if (chat) {

            chat.classList.remove("active");

        }


        if (launcher) {

            launcher.classList.remove("active");

            launcher.setAttribute(
                "aria-expanded",
                "false"
            );

        }


        if (greeting) {

            greeting.classList.remove("hide");

        }

    }


    /* =====================================================
       UPDATE PROGRESS
    ===================================================== */

    function updateProgress(step) {

        const progress = get("#nisha-progress-bar");

        const stepNumber = get("#nisha-step-number");

        const stepCount = get(".nisha-step-count");


        if (!progress) return;


        if (step === 4) {

            progress.style.width = "100%";


            if (stepNumber) {

                stepNumber.textContent = "Done";

            }


            if (stepCount) {

                stepCount.classList.add("done");

            }


            return;

        }


        if (stepCount) {

            stepCount.classList.remove("done");

        }


        if (stepNumber) {

            stepNumber.textContent = step;

        }


        progress.style.width =
            ((step / 3) * 100) + "%";

    }


    /* =====================================================
       SHOW STEP
    ===================================================== */

    function showStep(step) {

        const body = get("#nisha-body");

        const typing = get(".nisha-typing");


        currentStep = step;


        getAll(".nisha-step").forEach(function (item) {

            item.classList.remove("active");

        });


        /* RESULT STEP */

        if (step === 4) {

            if (typing) {

                typing.classList.add("show");

            }


            setTimeout(function () {

                if (typing) {

                    typing.classList.remove("show");

                }


                const resultStep =
                    get('.nisha-step[data-step="4"]');


                if (resultStep) {

                    resultStep.classList.add("active");

                }


                buildRecommendation();

                updateProgress(4);


                if (body) {

                    body.scrollTop = 0;

                }

            }, 600);


            return;

        }


        /* NORMAL STEP */

        const nextStep =
            get(
                '.nisha-step[data-step="' +
                step +
                '"]'
            );


        if (nextStep) {

            nextStep.classList.add("active");

        }


        updateProgress(step);


        if (body) {

            body.scrollTop = 0;

        }

    }


    /* =====================================================
       SELECT OPTION
    ===================================================== */

    function selectOption(button, type) {

        const value =
            button.getAttribute(
                "data-" + type
            );


        if (!value) return;


        /* REMOVE OLD SELECTION */

        getAll(
            "[data-" + type + "]"
        ).forEach(function (item) {

            item.classList.remove("selected");

        });


        /* ADD NEW SELECTION */

        button.classList.add("selected");


        /* SAVE ANSWER */

        answers[type] = value;


        /* MOVE TO NEXT STEP */

        setTimeout(function () {

            showStep(
                currentStep + 1
            );

        }, 280);

    }


    /* =====================================================
       BUILD RECOMMENDATION
    ===================================================== */

    function buildRecommendation() {

        const resultServices =
            get("#nisha-services-result");

        const resultSummary =
            get("#nisha-result-summary");


        if (!resultServices) return;


        const selectedServices =
            recommendations[answers.goal] ||
            recommendations[
                "Build Online Presence"
            ];


        /* SUMMARY */

        if (resultSummary) {

            resultSummary.textContent =
                "Based on your " +
                (answers.business || "business") +
                " and goal of " +
                (answers.goal || "digital growth") +
                ", these services would be a strong starting point for you.";

        }


        /* CLEAR OLD RESULTS */

        resultServices.innerHTML = "";


        /* CREATE RESULTS */

        selectedServices.forEach(
            function (service, index) {

                const item =
                    document.createElement("div");


                item.className =
                    "nisha-service-result";


                item.innerHTML = `

                    <span class="nisha-service-number">

                        0${index + 1}

                    </span>


                    <span class="nisha-service-icon">

                        <i class="fas ${service.icon}"></i>

                    </span>


                    <div>

                        <strong>
                            ${service.title}
                        </strong>

                        <p>
                            ${service.description}
                        </p>

                    </div>

                `;


                resultServices.appendChild(
                    item
                );

            }
        );

    }


    /* =====================================================
       RESTART
    ===================================================== */

    function restartNisha() {

        answers.business = "";

        answers.goal = "";

        answers.challenge = "";


        getAll(".nisha-option").forEach(
            function (item) {

                item.classList.remove("selected");

            }
        );


        showStep(1);

    }


    /* =====================================================
       SEND CUSTOM MESSAGE
    ===================================================== */

    function escapeHTML(text) {

        const div =
            document.createElement("div");


        div.textContent = text;


        return div.innerHTML;

    }


    function sendCustomMessage() {

        const input =
            get(".nisha-input");

        const body =
            get("#nisha-body");

        const typing =
            get(".nisha-typing");


        if (!input || !body) return;


        const message =
            input.value.trim();


        if (!message) return;


        const activeStep =
            get(".nisha-step.active");


        if (!activeStep) return;


        /* USER MESSAGE */

        const userMessage =
            document.createElement("div");


        userMessage.className =
            "nisha-message user";


        userMessage.innerHTML = `

            <div class="nisha-user-bubble">

                ${escapeHTML(message)}

            </div>

        `;


        activeStep.appendChild(
            userMessage
        );


        input.value = "";


        body.scrollTop =
            body.scrollHeight;


        /* TYPING */

        if (typing) {

            typing.classList.add("show");

        }


        setTimeout(function () {

            if (typing) {

                typing.classList.remove("show");

            }


            const reply =
                document.createElement("div");


            reply.className =
                "nisha-message bot nisha-direct-reply";


            reply.innerHTML = `

                <div class="nisha-bubble">

                    <div class="nisha-bubble-title">

                        Thanks for sharing
                        <span>✨</span>

                    </div>


                    <p>

                        I understand what you're looking for.
                        You can continue with the quick questions
                        above so I can suggest the right CGD Media
                        services for your business.

                    </p>

                </div>

            `;


            activeStep.appendChild(reply);


            body.scrollTop =
                body.scrollHeight;

        }, 600);

    }


    /* =====================================================
       EVENT DELEGATION
       Works even when HTML is loaded by include.js
    ===================================================== */

    function setupEvents() {

        if (document.body.dataset.nishaEvents === "true") {

            return;

        }


        document.body.dataset.nishaEvents =
            "true";


        document.addEventListener(
            "click",
            function (event) {


                /* LAUNCHER */

                const launcher =
                    event.target.closest(
                        ".nisha-launcher"
                    );


                if (launcher) {

                    const chat =
                        get(".nisha-chat");


                    if (
                        chat &&
                        chat.classList.contains(
                            "active"
                        )
                    ) {

                        closeNisha();

                    } else {

                        openNisha();

                    }


                    return;

                }


                /* CLOSE */

                const close =
                    event.target.closest(
                        ".nisha-close"
                    );


                if (close) {

                    closeNisha();

                    return;

                }


                /* BUSINESS */

                const business =
                    event.target.closest(
                        "[data-business]"
                    );


                if (business) {

                    selectOption(
                        business,
                        "business"
                    );

                    return;

                }


                /* GOAL */

                const goal =
                    event.target.closest(
                        "[data-goal]"
                    );


                if (goal) {

                    selectOption(
                        goal,
                        "goal"
                    );

                    return;

                }


                /* CHALLENGE */

                const challenge =
                    event.target.closest(
                        "[data-challenge]"
                    );


                if (challenge) {

                    selectOption(
                        challenge,
                        "challenge"
                    );

                    return;

                }


                /* BACK */

                const back =
                    event.target.closest(
                        ".nisha-back"
                    );


                if (back) {

                    showStep(
                        Math.max(
                            1,
                            currentStep - 1
                        )
                    );

                    return;

                }


                /* RESTART */

                const restart =
                    event.target.closest(
                        ".nisha-restart"
                    );


                if (restart) {

                    restartNisha();

                    return;

                }


                /* SEND */

                const send =
                    event.target.closest(
                        ".nisha-send"
                    );


                if (send) {

                    sendCustomMessage();

                }

            }
        );


        /* ENTER KEY */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter" &&
                    event.target.matches(
                        ".nisha-input"
                    )
                ) {

                    event.preventDefault();

                    sendCustomMessage();

                }

            }
        );

    }


    /* =====================================================
       INITIALIZE NISHA
    ===================================================== */

    function initNisha() {

        if (!nishaExists()) {

            return false;

        }


        if (!initialized) {

            setupEvents();

            initialized = true;

        }


        showStep(1);


        return true;

    }


    /* =====================================================
       WATCH FOR DYNAMIC INCLUDE
    ===================================================== */

    function watchForNisha() {

        if (initNisha()) {

            return;

        }


        const observer =
            new MutationObserver(
                function () {

                    if (initNisha()) {

                        observer.disconnect();

                    }

                }
            );


        observer.observe(
            document.documentElement,
            {
                childList: true,
                subtree: true
            }
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
            watchForNisha
        );

    } else {

        watchForNisha();

    }


})();