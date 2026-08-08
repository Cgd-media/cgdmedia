/* ==========================================
   CLICK GROW DIGITAL
   MAIN JS
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    initScrollTop();

    initSmoothScroll();

    initCounters();

});



/* ==========================================
   SCROLL TO TOP
========================================== */

function initScrollTop(){

    const button = document.querySelector(".scroll-top");

    if(!button) return;

    window.addEventListener("scroll", () => {

        if(window.scrollY > 400){

            button.classList.add("show");

        }

        else{

            button.classList.remove("show");

        }

    });

    button.addEventListener("click", () => {

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}



/* ==========================================
   SMOOTH SCROLL
========================================== */

function initSmoothScroll(){

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function(e){

            const target = document.querySelector(this.getAttribute("href"));

            if(!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior:"smooth",

                block:"start"

            });

        });

    });

}



/* ==========================================
   COUNTER ANIMATION
========================================== */

function initCounters(){

    const counters = document.querySelectorAll("[data-count]");

    if(!counters.length) return;

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if(!entry.isIntersecting) return;

            const counter = entry.target;

            const target = parseInt(counter.dataset.count);

            const suffix = counter.dataset.suffix || "";

            let current = 0;

            const increment = Math.max(1, Math.ceil(target / 100));

            function update(){

                current += increment;

                if(current >= target){

                    counter.textContent = target + suffix;

                    return;

                }

                counter.textContent = current + suffix;

                requestAnimationFrame(update);

            }

            update();

            observer.unobserve(counter);

        });

    },{

        threshold:0.5

    });

    counters.forEach(counter => observer.observe(counter));

}