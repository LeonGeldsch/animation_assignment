// the slideshow control buttons
var slideRightButton = document.querySelector(".btn-right");
var slideLeftButton = document.querySelector(".btn-left");

// all slides in the slideshow
var allSlides = document.querySelectorAll(".slideshow-image");

// the container of the slideshow
var slideContainer = document.querySelector(".slideshow-container");

// the position of the first slide
var firstSlideIndex = 0;


// turn the slideshow one right
function turnSlideRight () {
    zeroToOne(allSlides[firstSlideIndex % allSlides.length]);
    oneToTwo(allSlides[(firstSlideIndex+3) % allSlides.length]);
    twoToThree(allSlides[(firstSlideIndex+2) % allSlides.length]);
    threeToZero(allSlides[(firstSlideIndex+1) % allSlides.length]);
    firstSlideIndex++;
}
// turn the slideshow one left
function turnSlideLeft () {
    twoToOne(allSlides[(firstSlideIndex+2) % allSlides.length]);
    oneToTwo(allSlides[(firstSlideIndex+1) % allSlides.length]);
    zeroToThree(allSlides[(firstSlideIndex) % allSlides.length]);
    threeToZero(allSlides[(firstSlideIndex+3) % allSlides.length]);
    firstSlideIndex--;

    if (firstSlideIndex <= -1) {
        firstSlideIndex = allSlides.length - 1;
    }
}


// start the slideshow and move the slides to their place
function startSlideShow () {
    zeroToOne(allSlides[0]);
    oneToTwo(allSlides[0], 1);
    twoToThreeStart(allSlides[0], 2);

    zeroToOne(allSlides[1], 1);
    oneToTwo(allSlides[1], 2);

    zeroToOne(allSlides[2], 2);

    firstSlideIndex = 3;
}


/*
 *  ------------------------- HELPER FUNCTIONS ------------------------------
 */

// give the percentage width of an element in pixel
function percentWidthToPixel(_elem, _perc){
    return (_elem.offsetWidth/100)* parseFloat(_perc);
}
// give the percentage heigth of an element in pixel
function percentHeightToPixel(_elem, _perc){
    return (_elem.offsetHeight/100)* parseFloat(_perc);
}


// set the z-index of a slide
function setZIndex(slide, zindex, delay = 0) {
    gsap.set(slide, {
        zIndex: zindex,
        delay: delay
    });
}

/*
 *  ------------------------ MOVE SLIDESHOW IMAGE FUNCTIONS --------------------------
 */


// move a slide from position 0 to position 1
function zeroToOne (slide, delay = 0) {
    gsap.to(slide, {
        x:-percentWidthToPixel(slide.parentNode, 50) + percentWidthToPixel(slide, 50),
        y:percentHeightToPixel(slide.parentNode, 3),
        width:percentWidthToPixel(slide.parentNode, 20),
        duration: 1,
        delay: delay,
        ease: "power1"
    });
}
// move a slide from position 1 to position 2
function oneToTwo (slide, delay = 0) {
    gsap.set(slide, {
        zIndex:1,
        delay: delay
    });
    gsap.to(slide, {
        x:0,
        y:percentHeightToPixel(slide.parentNode, 6),
        width:percentWidthToPixel(slide.parentNode, 50),
        duration: 1,
        delay: delay,
        ease: "power1"
    });
}
// move a slide from position 2 to position 3
function twoToThree (slide, delay = 0) {
    gsap.to(slide, {
        x:percentWidthToPixel(slide.parentNode, 50) - percentWidthToPixel(slide, 50) / 2.5,
        y:percentHeightToPixel(slide.parentNode, 3),
        width:percentWidthToPixel(slide.parentNode, 20),
        duration: 1,
        delay: delay,
        ease: "power1"
    });
}
// move a slide from position 2 to position 3 at the start of the slideshow
function twoToThreeStart (slide, delay = 0) {
    gsap.to(slide, {
        x:percentWidthToPixel(slide.parentNode, 50) - percentWidthToPixel(slide, 50),
        y:percentHeightToPixel(slide.parentNode, 3),
        width:percentWidthToPixel(slide.parentNode, 20),
        duration: 1,
        delay: delay,
        ease: "power1"
    });
}
// move a slide from position 3 to position 0
function threeToZero (slide, delay = 0) {
    gsap.set(slide, {
        zIndex:0,
        delay: delay
    });
    gsap.to(slide, {
        x:0,
        y:0,
        width:percentWidthToPixel(slide.parentNode, 15),
        duration: 1,
        delay: delay,
        ease: "power1"
    });
}
// move a slide from position 2 to position 1
function twoToOne(slide, delay = 0) {
    gsap.to(slide, {
        x:-percentWidthToPixel(slide.parentNode, 50) + percentWidthToPixel(slide, 50) / 2.5,
        y:percentHeightToPixel(slide.parentNode, 3),
        width:percentWidthToPixel(slide.parentNode, 20),
        duration: 1,
        delay: delay,
        ease: "power1"
    });
}
// move a slide from position 0 to position 3
function zeroToThree(slide, delay = 0) {
    gsap.to(slide, {
        x:percentWidthToPixel(slide.parentNode, 50) - percentWidthToPixel(slide, 50),
        y:percentHeightToPixel(slide.parentNode, 3),
        width:percentWidthToPixel(slide.parentNode, 20),
        duration: 1,
        delay: delay,
        ease: "power1"
    });
}


/*
 *  ---------------------------- EVENT LISTENERS ----------------------------
 */


 // turn the slideshow with arrow keys
document.addEventListener('keydown', function(e) {
    if (e.code == "ArrowLeft") {
        turnSlideLeft();
    }
    if (e.code == "ArrowRight") {
        turnSlideRight();
    }
});

// add a hover effect on the slideshow images
allSlides.forEach(element =>
    element.addEventListener('mouseenter', function(e) {
        gsap.to(e.target, {
            scale: 1.1,
            ease: 'power1',
            borderRadius: 10
        })
        for (let i = 0; i < allSlides.length; i++) {
            if (allSlides[i] != e.target) {
                gsap.to(allSlides[i], {
                    opacity: 0.5,
                    ease: 'power1'
                })
            }
        }
    })
);
allSlides.forEach(element =>
    element.addEventListener('mouseleave', function(e) {
        gsap.to(e.target, {
            scale: 1,
            ease: 'power1',
            borderRadius: 0
        })
        for (let i = 0; i < allSlides.length; i++) {
            if (allSlides[i] != e.target) {
                gsap.to(allSlides[i], {
                    opacity: 1,
                    ease: 'power1'
                })
            }
        }
    })
);

// turn the slideshow with the buttons
slideRightButton.addEventListener('click', turnSlideRight);
slideLeftButton.addEventListener('click', turnSlideLeft);


/*
 *  -------------------------------------------------------------------------
 */


startSlideShow();