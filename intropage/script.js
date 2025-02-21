    // Animation settings
    const n = 19;
    const rots = [
      { ry: 270, a:0.5 },
      { ry: 0,   a:0.85 },
      { ry: 90,  a:0.4 },
      { ry: 180, a:0.0 }
    ];

    // Initial setup
    gsap.set(".pov", { opacity: 0, scale: 0.5 });
    gsap.set(".face", {
      z: 200,
      rotateY: i => rots[i].ry,
      transformOrigin: "50% 50% -201px"
    });

    // Create name animation clones
    for (let i=0; i<n; i++){
      let die = document.querySelector('.die');
      let cube = die.querySelector('.cube');
      
      if (i>0){    
        let clone = document.querySelector('.die').cloneNode(true);
        document.querySelector('.tray').append(clone);
        cube = clone.querySelector('.cube');
      }
      
      gsap.timeline({repeat:-1, yoyo:true, defaults:{ease:'power3.inOut', duration:1}})
        .fromTo(cube, {
          rotateY:-90
        },{
          rotateY:90,
          ease:'power1.inOut',
          duration:2
        })
        .fromTo(cube.querySelectorAll('.face'), {
          color:(j)=>'hsl('+(i/n*75+130)+', 67%,'+(100*[rots[3].a, rots[0].a, rots[1].a][j])+'%)'
        },{
          color:(j)=>'hsl('+(i/n*75+130)+', 67%,'+(100*[rots[0].a, rots[1].a, rots[2].a][j])+'%)'
        }, 0)
        .to(cube.querySelectorAll('.face'), {
          color:(j)=>'hsl('+(i/n*75+130)+', 67%,'+(100*[rots[1].a, rots[2].a, rots[3].a][j])+'%)'
        }, 1)
        .progress(i/n);
    }

    // Combined animation sequence
    const mainTimeline = gsap.timeline();
    
    mainTimeline
      .to(".pov", {
        opacity: 1,
        scale: 1,
        duration: 2,
        ease: "power2.inOut"
      })
      .from('.tray', {yPercent:-3, duration:2, ease:'power1.inOut', yoyo:true, repeat:2}, 1)
      .fromTo('.tray', {rotate:-15},{rotate:15, duration:0, ease:'power1.inOut', yoyo:true, repeat:1}, 1)
      .from('.die', {duration:0.01, opacity:0, stagger:{each:-0.05, ease:'power1.in'}}, 1)
      .to('.tray', {
        scale: 10, 
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
          document.querySelector('.intro-animation').style.display = 'none';
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