document.addEventListener("DOMContentLoaded", function() {
    start(); // Automatically start the animation when the page loads
    gsap.registerPlugin(ScrollTrigger);
  
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
  "/images/Document50a.png",
  "/images/group1.jpg",
  "/images/group2.jpg",
  "/images/group3.jpg",
  "/images/group4.jpg",
  "/images/group5.jpg",
  "/images/group6.jpg",
  "/images/group7.jpg",
  "/images/group8.jpg",
  "/images/group9.jpg",
  "/images/group10.jpg",
  "/images/group11.jpg",
  "/images/group12.jpg",
  "/images/group13.jpg",
  "/images/group14.jpg",
  "/images/group15.jpg",
  "/images/group16.jpg",
  "/images/group17.jpg",
  "/images/group18.jpg",
  "/images/group19.jpg",
  "/images/group20.jpg",
  "/images/group21.jpg",
  "/images/group22.jpg",
  "/images/group23.jpg"
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
      timeoutVal = 140;
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
    }, 5000);
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
      duration: 3,
      opacity: 0,  // Fading them out
      ease: 'power3.inOut',
      onStart: () => {
        gsap.to('.parallax-animation', {
          opacity: 1, // Ensure the parallax section becomes visible
          duration: 3,
          ease: "power3.inOut",
        });      
        setTimeout(() => {
        }, 3000);
      },
      onComplete: () => {
        document.querySelector('.container').style.display = 'none';
        document.querySelector('.overlay').style.display = 'none';
        document.querySelector('.logoOverlay').style.display = 'none';
        document.body.style.height = 'auto'; 
        document.documentElement.style.height = 'auto';  
        ScrollTrigger.refresh(); // Refresh ScrollTrigger after layout changes
      }
      
    }, "+=1"); // Use negative offset to make them fade out at the same time
  
  
  
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
  
  
  const lenis = new Lenis();
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {lenis.raf(time * 1000);});
  gsap.ticker.lagSmoothing(0);