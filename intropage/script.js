document.addEventListener("DOMContentLoaded", function() {
  start(); // Automatically start the animation when the page loads

  // Initialize Lenis Smooth Scroll
const lenis = new Lenis({
  duration: 1.2, // Smooth scrolling duration
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function
  direction: "vertical", // Vertical scrolling
  smooth: true, // Enable smooth scrolling
  smoothTouch: true, // Enable smooth scrolling for touch devices
  touchMultiplier: 2, // Make touch scrolling smoother
});

// RAF (requestAnimationFrame) loop to keep Lenis active
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Enable ScrollTrigger to work with Lenis
lenis.on("scroll", ScrollTrigger.update);

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.scrollerProxy(document.body, {
  scrollTop(value) {
    return arguments.length ? lenis.scrollTo(value, { immediate: true }) : window.scrollY;
  },
  getBoundingClientRect() {
    return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
  }
});

lenis.on("scroll", ScrollTrigger.update); // Update ScrollTrigger when scrolling

});

const parentContainer = document.querySelector('.container');
const overlay = document.querySelector('.overlay');
const logoOverlay = document.querySelector('.logoOverlay');
const logoSubtitle = document.querySelector('.logoSubtitle');
const logo = document.querySelector('.logo');
let images;
let currentIndex = 0;
let MAX_LOOPS = 1;   //15 
let timer = null
let timeOut = 1000;
let startTime;

const imgArray = ["/images/Document1a.png",
"/images/Document2a.png",
"/images/Document2b.png",
"/images/Document2c.png",
"/images/Document2d.png",
"/images/Document3a.png",
"/images/Document4a.png",
"/images/Document5a.png",
"/images/Document5c.png",
"/images/Document5d.png",
"/images/Document6a.png",
"/images/Document7a.png",
"/images/Document7b.png",
"/images/Document7c.png",
"/images/Document8a.png",
"/images/Document9a.png",
"/images/Document10a.png",
"/images/Document11a.png",
"/images/Document11b.png",
"/images/Document12a.png",
"/images/Document12b.png",
"/images/Document13a.png",
"/images/Document13b.png",
"/images/Document13c.png",
"/images/Document13d.png",
"/images/Document14a.png",
"/images/Document15a.png",
"/images/Document15b.png",
"/images/Document15c.png",
"/images/Document16a.png",
"/images/Document17a.png",
"/images/Document18a.png",
"/images/Document19a.png",
"/images/Document20a.png",
"/images/Document21a.png",
"/images/Document22a.png",
"/images/Document23a.png",
"/images/Document24a.png",
"/images/Document25a.png",
"/images/Document26a.png",
"/images/Document27a.png",
"/images/Document27b.png",
"/images/Document28a.png",
"/images/Document29a.png",
"/images/Document30a.png",
"/images/Document30b.png",
"/images/Document30c.png",
"/images/Document31a.png",
"/images/Document31b.png",
"/images/Document32a.png",
"/images/Document32b.png",
"/images/Document33a.png",
"/images/Document33b.png",
"/images/Document34a.png",
"/images/Document35a.png",
"/images/Document36a.png",
"/images/Document37a.png",
"/images/Document38a.png",
"/images/Document39a.png",
"/images/Document40a.png",
"/images/Document41a.png",
"/images/Document42a.png",
"/images/Document42b.png",
"/images/Document34a.png",
"/images/Document44a.png",
"/images/Document44b.png",
"/images/Document44c.png",
"/images/Document45a.png",
"/images/Document46a.png",
"/images/Document47a.png",
"/images/Document48a.png",
"/images/Document49a.png",
"/images/Document50a.png"
               ];
loadBackgroundImages();

function start() {
startTime = new Date();
startAnimation();
}


function loadBackgroundImages() {
  let newImage;
  for(let j = 0; j < MAX_LOOPS; j++){
    for(let i = 0; i < imgArray.length; i++){
      newImage = document.createElement('div');
      newImage.classList.add('imageContainer');
      newImage.style.backgroundImage = `url(${imgArray[i]})`;
      parentContainer.appendChild(newImage);
    }  
  }
  images = document.querySelectorAll('.imageContainer');
  console.log(`LOADED ${images.length} images`);
}



function startAnimation() {
overlay.classList.add('fade');
setTimeout(transitionImage, timeOut);
}




function transitionImage() {
  let currentImage = images[currentIndex];
  const opacityFadeClass = currentIndex < 10 ? 'opacityFadeInit' : 'opacityFade';
  const completedPercentage = currentIndex / images.length;
  
  if(completedPercentage > 0.5) {          
    timeoutVal = 100;
    currentImage.style.transition = `none`;
  } else if(completedPercentage > 0.3) {
    timeoutVal = 100;
    currentImage.style.transition = `none`;
    fadeInEndingLogo();
  } else if(completedPercentage > 0.2) {
    timeoutVal = 125;
  } else if(currentIndex > 0 && currentIndex % 2 > 0) {
    timeoutVal = 150;
  } else {
    timeoutVal = 150;
  }

  currentImage.classList.add(opacityFadeClass);  
  currentImage.classList.add('blur');
  currentImage.style.top = `0`; // Changed from 10px
  currentIndex += 1;
  if(currentIndex < images.length) {
    setTimeout(transitionImage, timeoutVal);
  } else {
    console.log(`DONE`);
    console.log(`Elapsed time ${new Date() - startTime}`);
  }
}

function fadeInEndingLogo() {
  const logo = document.querySelector('.logo');
  const logoOverlay = document.querySelector('.logoOverlay');
  
  logo.classList.add('scaleLogo');
  console.log("works");
  logoOverlay.classList.add('fadeInLogo');
  
  setTimeout(() => {
      renderSubtitle();
  }, 4000);
}

function renderSubtitle() {
  const subtitle = document.querySelector('.logoSubtitle');
  const subtitleText = document.querySelector('.subtitle-text');
  
  if (subtitle && subtitleText) {
      subtitle.classList.add('borderAndHeight');
  }
}

const mainTimeline = gsap.timeline();

mainTimeline
  .from('.logoOverlay', { duration: 3.5, opacity: 1, ease: 'power1.inOut', yoyo: true, repeat: 2 }, 1) // Fading in/out logoOverlay
  .to(['.logoOverlay', '.container'], {  // Targeting both .logoOverlay and .container
    duration: 2,
    opacity: 0,  // Fading them out
    ease: 'power3.inOut',
    onStart: () => {
      gsap.to('.parallax-animation', {
        opacity: 1, // Ensure the parallax section becomes visible
        duration: 2,
        ease: "power3.inOut",
      });      
      setTimeout(() => {
      }, 2000);
    },
    onComplete: () => {
      document.querySelector('.container').style.display = 'none';
      document.querySelector('.overlay').style.display = 'none';
      document.querySelector('.logoOverlay').style.display = 'none';
      document.body.style.height = 'auto'; 
      document.documentElement.style.height = 'auto';  
      ScrollTrigger.refresh(); // Refresh ScrollTrigger after layout changes
    }
    
  }, "-=2"); // Use negative offset to make them fade out at the same time



// Parallax setup

document.querySelectorAll('[data-parallax-layers]').forEach((triggerElement) => {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerElement,
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });
  
  const layers = [
    { layer: "1", yPercent: 70 },
    { layer: "2", yPercent: 55 },
    { layer: "3", yPercent: 40 },
    { layer: "4", yPercent: 10 }
  ];
  
  layers.forEach((layerObj, idx) => {
    tl.to(
      triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`),
      {
        yPercent: layerObj.yPercent,
        ease: "none"
      },
      idx === 0 ? undefined : "<"
    );
  });
});



$(window).on('mousemove', function(e) {
  var offsetX = 0.5 - e.pageX / w, //cursor position X
      offsetY = 0.5 - e.pageY / h, //cursor position Y
      dy = e.pageY - h / 2, //@h/2 = center of poster
      dx = e.pageX - w / 2, //@w/2 = center of poster
      theta = Math.atan2(dy, dx), //angle between cursor and center of poster in RAD
      angle = theta * 180 / Math.PI - 90, //convert rad in degrees
      offsetPoster = $menu.data('offset'),
      transformPoster = 'translate3d(0, ' + -offsetX * offsetPoster + 'px, 0) rotateX(' + (-offsetY * offsetPoster) + 'deg) rotateY(' + (offsetX * (offsetPoster * 2)) + 'deg)'; //poster transform

  //get angle between 0-360
  if (angle < 0) {
    angle = angle + 360;
  }

  //poster transform
  $menu.css('transform', transformPoster);

  //parallax for each layer
  $item.each(function() {
    var $this = $(this),
        offsetLayer = $this.data('offset') || 0,
        transformLayer = 'translate3d(' + offsetX * offsetLayer + 'px, ' + offsetY * offsetLayer + 'px, 20px)';

    $this.css('transform', transformLayer);
  });
});