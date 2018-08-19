$(document).ready(()=>{

  // $('.lazy').Lazy();
  // i didnt really like/ or didnt find any that catared to me so i am making my own lazy loader
  const $images = $('.lazy');
  let loadedCount = 0;
  const loadedPos = [];

  function lazyload(el){
    const $el = $(el);
    $el.attr('src', $el.data('src'));
    // when its added in the loadedCount that means it is loading
    console.log('src', $el.data('src'))
    loadedPos.push(loadedCount++);
    const tmpImg = new Image() ;
    tmpImg.onload = ()=>{
      $el.closest('.loading').removeClass('loading');
    }
    tmpImg.src = $el.data('src')
  }
  // load first three images first
  lazyload($images[0]);
  lazyload($images[1]);
  lazyload($images[2]);

  // slideshow click
  let initPos = $('.image-wrapper').offset().left;
  $('.button-wrapper').click(function(e){
    const leftright = $(e.target).closest('.button-wrapper').hasClass('left') ? -1 : 1;
    const $photoStrip = $('.photo-wrapper');
    const currPos = Math.abs($('.image-wrapper').offset().left-initPos);
    const scrollBy = $photoStrip.width() * Math.floor((currPos/$photoStrip.width())+leftright);
    $photoStrip.animate({scrollLeft:(scrollBy)}, 500);
  });

// TODO: fix bug where scroll too fast skips some
  $('.photo-wrapper').scroll(()=>{
    console.log( $images.length);
    if(loadedCount === $images.length) return
    const currPos = Math.abs($('.image-wrapper').offset().left-initPos);
    let nextToLoad = Math.floor((currPos/$('.photo-wrapper').width())+1);
    console.log('scroll', nextToLoad)
    // load 2 images
    if(loadedPos.includes(nextToLoad)) return
    lazyload($images[nextToLoad]);
    if(loadedPos.includes(nextToLoad+1)) return
    lazyload($images[nextToLoad+1]);
  });

  // might need to add a check for mobile since this is only for mobile
  $(window).scroll(()=>{
    if(loadedCount === $images.length) return
    console.log('window scroll')
  });
});
