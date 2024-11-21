// var visible = false,
//     alerted = false;

// function hideSpotlight() {
//   $('#spotlight_wrapper').hide();
//   $('#spotlight').val('');
//   visible = false;
// }

// function showSpotlight() {
//   $('#spotlight_wrapper').show();
//   $('#spotlight').focus();
//   visible = true;
// }

// // open spotlight when search button is clicked
// $('#search-btn').on('click', function(e) {
//   e.stopPropagation();

//   //check if spotlight is already visible
//   if(!visible) {
//     showSpotlight();
//   } else {
//     hideSpotlight();
//   }
  
//   // show message when enter is pressed
//   if(e.which == 13 && !alerted) {
//     alert('Search is not implemented yet!');
//     alerted = true;
//   }
// });

// // hide spotlight when clicked anywhere
// $("div:not(#search-btn)").on('click',function() {
//   hideSpotlight();
// });

// // stop propagating if clicked within the spotlight
// $('#spotlight').on('click', function(e) {
//   e.stopPropagation();
// });
/* set vars */
var firstChar = false,
    visible = false,
    pissed = false,
    $document = $(document),
    $spotlightWrapper = $('#spotlight_wrapper'),
    $spotlight = $('#spotlight');

function hideSpotlight(){
  $spotlightWrapper.hide();
  $spotlight.val('');
  visible = false;
}

function showSpotlight(){
  $spotlightWrapper.show();
  $spotlight.focus();
  visible = true;
}


/* add listener for keydown to detect shortcut */
$document.on('keydown',function(event){
  //17 = CTRL
  //32 = SPACE
  
  //save char code in var if it is ctrl
  if(event.which == 17){
    firstChar = event.which;
  }
  
  //if firstchar is ctrl and the current keydown event char is space, continue
  if(firstChar == 17 && event.which == 32){

    //check if spotlight is already visible
    if(!visible){

      //show spotlight
      showSpotlight();

    } else {

      //hide spotlight
      hideSpotlight();

    }
    
    //delete firstchar var
    firstChar = false;
    
  }  
  
  
  if(event.which == 13 && !pissed){
    alert('You really thought it would search anything? :-P');
    alert('Possibly in upcoming versions... Who knows? :-)');
    pissed = true;
  }
  
});

// delete firstchar var on keyup to ensure "shortcut" behaviour and that ther spotlight doesn't show up if not wanted
$document.on('keyup',function(){
  firstChar = false;
});

// stop propagating if clicked within the spotlight
$spotlight.on('click', function(e){
    e.stopPropagation();
});

// hide spotlight when clicked anywhere
$document.on('click',function(){
  //if (!$(this).is($("search-btn"))) {
    hideSpotlight();
  //}
});

$(document).ready(function(){
  // Open terminal
  $('#search-btn').click(function(){
    //this
    showSpotlight();
  });
});