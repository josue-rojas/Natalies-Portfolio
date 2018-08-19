$(document).ready(()=>{

  $('.lazy').Lazy({
    afterLoad: function(el){
      el.removeClass('loading');
      el.removeClass('lazy');
      const $img = el.find('img');
      $img.attr('src', $img.data('src'));
    }
  });

  $('.photo-wrapper').scroll(()=>{
    // trigger lazy load
    window.dispatchEvent(new Event('scroll'))
  });


  // slideshow click
  let initPos = $('.image-wrapper').offset().left;
  $('.button-wrapper').click(function(e){
    const leftright = $(e.target).closest('.button-wrapper').hasClass('left') ? -1 : 1;
    const $photoStrip = $('.photo-wrapper');
    const currPos = Math.abs($('.image-wrapper').offset().left-initPos);
    const scrollBy = $photoStrip.width() * Math.floor((currPos/$photoStrip.width())+leftright);
    $photoStrip.animate({scrollLeft:(scrollBy)}, 500);
  });

});
