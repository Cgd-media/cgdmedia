/* ==========================================
   CLICK GROW DIGITAL
   ANIMATIONS
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    initRevealAnimation();

    initParallax();

    initButtonRipple();

});



/* ==========================================
   SCROLL REVEAL
========================================== */

function initRevealAnimation(){

    const elements = document.querySelectorAll(

        ".card, .glass, .section-header, .hero-content, .hero-image"

    );

    const observer = new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("show");

            }

        });

    },{

        threshold:0.15

    });

    elements.forEach(element=>{

        element.classList.add("fade-up");

        observer.observe(element);

    });

}



/* ==========================================
   HERO PARALLAX
========================================== */

function initParallax(){

    const heroImage = document.querySelector(".hero-image");

    if(!heroImage) return;

    window.addEventListener("mousemove",(event)=>{

        const x = (event.clientX - window.innerWidth / 2) / 50;

        const y = (event.clientY - window.innerHeight / 2) / 50;

        heroImage.style.transform = `translate(${x}px, ${y}px)`;

    });

}



/* ==========================================
   BUTTON RIPPLE
========================================== */

function initButtonRipple(){

    const buttons = document.querySelectorAll(".btn");

    buttons.forEach(button=>{

        button.addEventListener("click",(event)=>{

            const ripple = document.createElement("span");

            const size = Math.max(

                button.clientWidth,

                button.clientHeight

            );

            ripple.style.width = size + "px";

            ripple.style.height = size + "px";

            ripple.style.left =

                event.offsetX - size / 2 + "px";

            ripple.style.top =

                event.offsetY - size / 2 + "px";

            ripple.classList.add("ripple");

            const oldRipple = button.querySelector(".ripple");

            if(oldRipple){

                oldRipple.remove();

            }

            button.appendChild(ripple);

        });

    });

}