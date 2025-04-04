let check = 0;

var $menu = $('.Menu-list'),
  $item = $('.Menu-list-item'),
  k = $(window).width(), //window width
  h = $(window).height(); //window height

$(window).on('mousemove', function (e) {
  var offsetX = 0.5 - e.pageX / k, //cursor position X
    offsetY = 0.5 - e.pageY / h, //cursor position Y
    dy = e.pageY - h / 2, //@h/2 = center of poster
    dx = e.pageX - k / 2, //@w/2 = center of poster
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
  $item.each(function () {
    var $this = $(this),
      offsetLayer = $this.data('offset') || 0,
      transformLayer = 'translate3d(' + offsetX * offsetLayer + 'px, ' + offsetY * offsetLayer + 'px, 20px)';

    $this.css('transform', transformLayer);
  });
});

function navigateTo(url) {
  window.location.href = url;  // Navigate to the URL when the item is clicked
}


function displayMenu() {
  if (check == 0) {
    document.querySelector('.thing').style.scale = '1';
    document.querySelector('.menu-wrap').style.zIndex = '300';
    document.querySelector('.menu-wrap').style.pointerEvents = 'fill';
    check = 1;
  } else if (check == 1) {
    document.querySelector('.thing').style.scale = '0';
    document.querySelector('.menu-wrap').style.pointerEvents = 'none';
    setTimeout(() => {
      document.querySelector('.menu-wrap').style.zIndex = '0';
    }, 500);
    check = 0;
  }
}