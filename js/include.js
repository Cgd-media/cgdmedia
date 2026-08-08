/* ==========================================
   CLICK GROW DIGITAL
   INCLUDE SYSTEM
========================================== */

document.addEventListener("DOMContentLoaded", async () => {

    /* ==========================================
       LOAD HEADER
    ========================================== */

    await loadComponent(
        "header",
        "header.html"
    );


    /* ==========================================
       LOAD FOOTER
    ========================================== */

    await loadComponent(
        "footer",
        "footer.html"
    );


    /* ==========================================
       WEBSITE FUNCTIONS
    ========================================== */

    setActiveMenu();

    initNavbar();

    initMobileMenu();


    /* ==========================================
       LOAD NISHA
    ========================================== */

    await loadNisha();

});



/* ==========================================
   LOAD COMPONENT
========================================== */

async function loadComponent(id, file) {

    const element =
        document.getElementById(id);


    if (!element) {

        console.warn(
            `Element #${id} not found.`
        );

        return;

    }


    try {

        const response =
            await fetch(file);


        if (!response.ok) {

            throw new Error(
                `${file} could not be loaded. Status: ${response.status}`
            );

        }


        element.innerHTML =
            await response.text();


        console.log(
            `${file} loaded successfully.`
        );

    }

    catch (error) {

        console.error(
            `Error loading ${file}:`,
            error
        );

    }

}



/* ==========================================
   LOAD NISHA AI
========================================== */

async function loadNisha() {

    try {

        /* --------------------------------------
           PREVENT DUPLICATE NISHA
        -------------------------------------- */

        if (
            document.querySelector(
                ".nisha-wrapper"
            )
        ) {

            return;

        }


        /* --------------------------------------
           LOAD NISHA HTML
        -------------------------------------- */

        const response =
            await fetch("nisha.html");


        if (!response.ok) {

            throw new Error(
                `nisha.html could not be loaded. Status: ${response.status}`
            );

        }


        const nishaHTML =
            await response.text();


        /* --------------------------------------
           CREATE CONTAINER
        -------------------------------------- */

        const container =
            document.createElement("div");


        container.id =
            "nisha-container";


        container.innerHTML =
            nishaHTML;


        document.body.appendChild(
            container
        );


        /* --------------------------------------
           LOAD NISHA CSS
        -------------------------------------- */

        if (
            !document.querySelector(
                'link[href="css/nisha.css"]'
            )
        ) {

            const nishaCSS =
                document.createElement("link");


            nishaCSS.rel =
                "stylesheet";


            nishaCSS.href =
                "css/nisha.css";


            document.head.appendChild(
                nishaCSS
            );

        }


        /* --------------------------------------
           LOAD NISHA JS
        -------------------------------------- */

        if (
            !document.querySelector(
                'script[src="js/nisha.js"]'
            )
        ) {

            const nishaJS =
                document.createElement("script");


            nishaJS.src =
                "js/nisha.js";


            nishaJS.onload = () => {

                console.log(
                    "nisha.js loaded successfully."
                );

            };


            nishaJS.onerror = () => {

                console.error(
                    "nisha.js could not be loaded."
                );

            };


            document.body.appendChild(
                nishaJS
            );

        }

    }

    catch (error) {

        console.error(
            "Nisha loading error:",
            error
        );

    }

}



/* ==========================================
   ACTIVE MENU
========================================== */

function setActiveMenu() {

    const currentPage =
        window.location.pathname
            .split("/")
            .pop() || "index.html";


    document
        .querySelectorAll(".nav-links a")
        .forEach(link => {

            const href =
                link.getAttribute("href");


            if (
                href === currentPage
            ) {

                link.classList.add(
                    "active"
                );

            }

        });

}



/* ==========================================
   NAVBAR SCROLL
========================================== */

function initNavbar() {

    const header =
        document.querySelector(
            ".site-header"
        );


    if (!header) {

        return;

    }


    function onScroll() {

        if (
            window.scrollY > 40
        ) {

            header.classList.add(
                "scrolled"
            );

        }

        else {

            header.classList.remove(
                "scrolled"
            );

        }

    }


    onScroll();


    window.addEventListener(
        "scroll",
        onScroll
    );

}



/* ==========================================
   MOBILE MENU
========================================== */

function initMobileMenu() {

    const menuButton =
        document.querySelector(
            ".menu-toggle"
        );


    const navLinks =
        document.querySelector(
            ".nav-links"
        );


    if (
        !menuButton ||
        !navLinks
    ) {

        return;

    }


    menuButton.addEventListener(
        "click",
        () => {

            navLinks.classList.toggle(
                "show"
            );


            const icon =
                menuButton.querySelector(
                    "i"
                );


            if (!icon) {

                return;

            }


            if (
                navLinks.classList.contains(
                    "show"
                )
            ) {

                icon.classList.remove(
                    "fa-bars"
                );

                icon.classList.add(
                    "fa-xmark"
                );

            }

            else {

                icon.classList.remove(
                    "fa-xmark"
                );

                icon.classList.add(
                    "fa-bars"
                );

            }

        }
    );

}



/* ==========================================
   CLOSE MENU AFTER CLICK
========================================== */

document.addEventListener(
    "click",
    event => {

        const nav =
            document.querySelector(
                ".nav-links"
            );


        const button =
            document.querySelector(
                ".menu-toggle"
            );


        if (
            !nav ||
            !button
        ) {

            return;

        }


        if (

            nav.classList.contains(
                "show"
            ) &&

            !nav.contains(
                event.target
            ) &&

            !button.contains(
                event.target
            )

        ) {

            nav.classList.remove(
                "show"
            );


            const icon =
                button.querySelector(
                    "i"
                );


            if (!icon) {

                return;

            }


            icon.classList.remove(
                "fa-xmark"
            );


            icon.classList.add(
                "fa-bars"
            );

        }

    }
);