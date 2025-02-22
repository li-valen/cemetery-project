document.addEventListener("DOMContentLoaded", function() {
  start(); // Automatically start the animation when the page loads
});

const parentContainer = document.querySelector('.container');
const overlay = document.querySelector('.overlay');
const logoOverlay = document.querySelector('.logoOverlay');
const logoSubtitle = document.querySelector('.logoSubtitle');
const logo = document.querySelector('.logo');
let images;
let currentIndex = 0;
let MAX_LOOPS = 15;   //15 
let timer = null
let timeOut = 1000;
let startTime;

const imgArray = ["../images/Document1.png",
"../images/Document2.png"
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
    timeoutVal = 115;
    currentImage.style.transition = `none`;
  } else if(completedPercentage > 0.3) {
    timeoutVal = 120;
    currentImage.style.transition = `none`;
    fadeInEndingLogo();
  } else if(completedPercentage > 0.2) {
    timeoutVal = 250;
  } else if(currentIndex > 0 && currentIndex % 2 > 0) {
    timeoutVal = 400;
  } else {
    timeoutVal = 350;
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
  
  // First fade in the logo
  logo.classList.add('scaleLogo');
  logoOverlay.classList.add('fadeInLogo');
  
  // Wait longer before showing subtitle
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
      .from('.container .overlay .logoOverlay',{duration:3.5, ease:'power1.inOut', yoyo:true, repeat:2}, 1)
      .to('.container .overlay .logoOverlay', {
        duration: 2, 
        opacity: 0, 
        ease: 'power3.inOut',
        onStart: () => {
          gsap.to('.parallax-animation', {
            opacity: 1,
            duration: 2,
            ease: "power3.inOut",
          });
          document.body.style.overflow = 'auto';
        },
        
        onComplete: () => {
          document.querySelector('.container').style.display = 'none';
          document.querySelector('.overlay').style.display = 'none';
          document.querySelector('.logoOverlay').style.display = 'none';
        }
      }, "-=2");

    // Parallax setup
    gsap.registerPlugin(ScrollTrigger);
    
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

    // Smooth scroll
    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {lenis.raf(time * 1000);});
    gsap.ticker.lagSmoothing(0);

    // Initial scroll lock
    document.body.style.overflow = 'hidden';

    // Resize handling
    window.onload = window.onresize = ()=> {
      const h = n*56;
      gsap.set('.tray', {height:h});
      gsap.set('.pov', {scale:innerHeight/h});
    }

    var $menu = $('.Menu-list'),
    $item = $('.Menu-list-item'),
    w = $(window).width(), //window width
    h = $(window).height(); //window height

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