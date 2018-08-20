$(document).ready(()=>{

  $('.lazy').Lazy({
    afterLoad: function(el){
      el.removeClass('loading');
      el.removeClass('lazy');
      const $img = el.find('img');
      $img.attr('src', $img.data('src'));
    },
    onError: function(el){
      el.remove();
    }
  });

  $('.photo-wrapper').scroll(()=>{
    // trigger lazy load
    window.dispatchEvent(new Event('scroll'))
  });


  // slideshow click
  // process:
  // find the distance between the starting point (.photo-wrapper).left (since this never changes) - the position of the first image
  // the distance is then used to find which image is in the view which is distance/width , which tells how many images away it is (assume images are all same length)
  // then add 1 or -1 depend on whcih button clicked and times it by the image width to find the next scroll position
  $('.button-wrapper').click(function(e){
    const leftright = $(e.target).closest('.button-wrapper').hasClass('left') ? -1 : 1;
    let initPos = $('.photo-wrapper').offset().left;
    const $photoStrip = $('.image-wrapper');
    const currPos = Math.abs(initPos - $('.image-wrapper').offset().left);
    const scrollBy = ($photoStrip.width() * Math.round((currPos/$photoStrip.width())+leftright));
    $('.photo-wrapper').animate({scrollLeft:(scrollBy)}, 500);
  });

});
