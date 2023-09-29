const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

let cursor = document.querySelector("#cursor");
let mainDiv = document.querySelector("#main");

function firstPageAnim() {
    let tl = gsap.timeline();

    tl.from(".nav", {
        y: '-10',
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })
        .to(".boundingelem", {
            y: 0,
            ease: Expo.easeInOut,
            duration: 2,
            delay: -1,
            stagger: .2
        })
        .to(".boundingelem1", {
            y: 0,
            ease: Expo.easeInOut,
            duration: 2,
            delay: -2,
            stagger: .1,
        })
        .from(".heroFooter", {
            y: -10,
            ease: Expo.easeInOut,
            duration: 1.5,
            opacity: 0,
            delay: -2,
        })
}

firstPageAnim();

// Skew cursor

let timeout;

function skewCursor() {

    let xScale = 0;
    let yScale = 0;

    let xPrev = 0;
    let yPrev = 0;

    window.addEventListener("mousemove", (dets) => {

        clearTimeout(timeout);

        let xdiff = dets.clientX - xPrev;
        let ydiff = dets.clientY - yPrev;

        xScale = gsap.utils.clamp(.8, 1.2, xdiff);
        yScale = gsap.utils.clamp(.8, 1.2, ydiff);

        xPrev = dets.clientX;
        yPrev = dets.clientY;

        customCursor(xScale, yScale);

        timeout = setTimeout(() => {
            cursor.style.transform = `translate(${dets.clientX - 5}px, ${dets.clientY - 2}px) scale(1,1)`;
        }, 100);

    })
}

// skewCursor();


function customCursor(xScale, yScale) {
    mainDiv.addEventListener("mousemove", (dets) => {
        cursor.style.transform = `translate(${dets.clientX - 5}px, ${dets.clientY - 2}px)`;
        // scale(${xScale}, ${yScale})
    })
}

customCursor();

// Image Hovering Effect

let allCards = document.querySelectorAll(".elem");
allCards.forEach((val) => {

    val.addEventListener("mouseleave", () => {
        gsap.to(val.querySelector("img"), {
            opacity: 0,
            ease: Power3,
            duration: 0.5
        })
    })

    let rotate = 0;
    let diffrot = 0;

    val.addEventListener("mousemove", (details) => {

        // For getting Details of A DIV, top,left, bottom , right position and many more
        let diff = details.clientY - val.getBoundingClientRect().top - 80;
        diffrot = details.clientX - rotate;  // Current location or jahan move hoga uske difference jitna rotate karainge
        rotate = details.clientX;

        // Agr mouse ek dm se boht tez move hogya to difference ki value boht bari ajaegi like 180 to hm apni image ko itna rotate thori karainge to iske lye hm gsap ka clamp function use karainge wo kia karega k hm usko apni minimum and maximum values batadainge wo phir output ko usi ki values k mutabiq handle karega

        gsap.to(val.querySelector("img"), {
            opacity: 1,
            ease: Power3,  // For more smoothness increase the value of power like, 4,5 ...
            top: diff,
            left: details.x,
            rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5)
        })
    })

})