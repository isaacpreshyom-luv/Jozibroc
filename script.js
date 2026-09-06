/* =========================================
   JOZIBROC JAVASCRIPT
========================================= */


/* =========================================
   MOBILE MENU
========================================= */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");


menuBtn.addEventListener("click", function () {

    navMenu.classList.toggle("active");

});


/* Close mobile menu after clicking a link */

document.querySelectorAll("#navMenu a").forEach(function (link) {

    link.addEventListener("click", function () {

        navMenu.classList.remove("active");

    });

});


/* =========================================
   SCROLL REVEAL ANIMATION
========================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const observer =
    new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(function (element) {

    observer.observe(element);

});


/* =========================================
   CURRENT YEAR
========================================= */

document.getElementById("year").textContent =
    new Date().getFullYear();


/* =========================================
   GUIDE INTEREST TRACKING
   META PIXEL
========================================= */

const guideButtons =
    document.querySelectorAll("[data-guide]");


guideButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const guide =
            button.getAttribute("data-guide");


        /*
            Send custom event to Meta Pixel
        */

        if (typeof fbq === "function") {

            fbq(
                "trackCustom",
                "GuideInterest",
                {
                    guide_name: guide
                }
            );

        }


        /*
            Update WhatsApp message
            based on selected guide
        */

        const whatsappLinks =
            document.querySelectorAll(
                'a[href^="https://wa.me/"]'
            );


        const message =
            encodeURIComponent(
                `Hello Elizabeth, I'm interested in "${guide}". Please send me the details.`
            );


        whatsappLinks.forEach(function (link) {

            link.href =
                `https://wa.me/2348035386550?text=${message}`;

        });

    });

});


/* =========================================
   WHATSAPP LEAD TRACKING
========================================= */

const whatsappLinks =
    document.querySelectorAll(
        'a[href^="https://wa.me/"]'
    );


whatsappLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        if (typeof fbq === "function") {

            fbq(
                "track",
                "Lead"
            );

        }

    });

});