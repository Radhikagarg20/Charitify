const counters = document.querySelectorAll('.counter');
const speed = 200; 

counters.forEach(counter => {
  const updateCount  = () => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    
    const inc = target / speed;

    if (count < target) {
      counter.innerText = Math.ceil(count + inc);
      setTimeout(updateCount, 1);
    } else {
      counter.innerText = target;
    }
  }
  updateCount();
});


$(window).scroll(function() {
  if ($(this).scrollTop() > 100) {
    $('.back-to-top').fadeIn('slow');
  } else {
    $('.back-to-top').fadeOut('slow');
  }
});

$('.back-to-top').click(function() {
  $('html, body').animate({
    scrollTop: 0
  }, 1500, 'easeInOutExpo');
  return false;
});
