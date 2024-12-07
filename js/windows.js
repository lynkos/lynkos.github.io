// Function to bring the clicked window to the front
function bringToFront(element) {
  let maxZIndex = Math.max(...$('.windows').map(function() {
      return parseInt($(this).css("z-index")) || 0;
  }).get());
  $(element).css("z-index", maxZIndex + 1); // Set higher z-index for the clicked window
}

// Make windows draggable and bring to front on drag
function makeDraggable(selector) {
  $(selector).draggable({
      start: function(event, ui) {
          bringToFront(this);
      },
      containment: "#main-content",
      distance: 0
  }).on('click', function() {
      bringToFront(this);
  });
}

$(function() {
  $(".mac-terminal")
    .draggable({
      handle: "div.header",
      cancel: "div.header__op",
      //stack: ".windows",
      containment: "#main-content",
      distance: 0,
      start: function(event, ui) {
        bringToFront(this);
        makeDraggable(this);
    },
    });

  $(".text-edit")
    .draggable({
      handle: "div.notes-header",
      cancel: "div.notes-header__op",
      //stack: ".windows",
      containment: "#main-content",
      distance: 0,
      start: function(event, ui) {
        bringToFront(this);
        makeDraggable(this);
    },
    });

    $(".email")
    .draggable({
      handle: "div.mail-header",
      cancel: "div.mail-header__op, .send-btn",
      //stack: ".windows",
      containment: "#main-content",
      distance: 0,
      start: function(event, ui) {
        bringToFront(this);
        makeDraggable(this);
    },
    });

  $(".calc")
    .draggable({
      handle: "div.calc-header",
      cancel: "div.calc-header__op",
      //stack: ".windows",
      containment: "#main-content",
      distance: 0,
      start: function(event, ui) {
        bringToFront(this);
        makeDraggable(this);
    },
    });

  $(".btn")        
    .draggable({
      cursor: "default",
      cancel: false,
      containment: "#main-content",
      distance: 0,
    });

    // $("#spotlight_wrapper")        
    // .draggable({
    //   cursor: "default",
    //   cancel: false,
    //   //stack: ".windows",
    //   // containment: "#main-content",
    //   // distance: 0,
    //   start: function(event, ui) {
    //     bringToFront(this);
    //     makeDraggable(this);
    // },
    // });

    $(".dialogue")        
    .draggable({
      cursor: "default",
      cancel: ".alert-btn",
      //stack: ".windows",
      containment: "#main-content",
      distance: 0,
      start: function(event, ui) {
        bringToFront(this);
        makeDraggable(this);
    },
    });
});

$(document).ready(function() {
    // Center windows
    $(".mac-terminal, .text-edit, .email, .calc").position({
      my: "center",
      at: "center",
      collision: "fit",
      of: "#main-content"
    });

    // Function to bring the clicked window to the front
    function bringToFront(element) {
        let maxZIndex = Math.max(...$('.windows').map(function() {
            return parseInt($(this).css("z-index")) || 0;
        }).get());
        $(element).css("z-index", maxZIndex + 1); // Set higher z-index for the clicked window
    }

    // Make windows draggable and bring to front on drag
    function makeDraggable(selector) {
        $(selector).draggable({
            handle: ".header, .notes-header, .mail-header, .calc-header", //, #spotlight_wrapper",
            cancel: ".header__op, .notes-header__op, .mail-header__op, .calc-header__op, .send-btn",
            start: function(event, ui) {
                bringToFront(this);
            },
            containment: "#main-content",
            distance: 0
        }).on('click', function() {
            bringToFront(this);
        });
    }

    // Apply draggable to all existing windows
    makeDraggable('.windows');

    // Open terminal
    $('#iterm').click(function(){
      $('.mac-terminal').css("display", "inline-block").addClass('windows');
      bringToFront('.mac-terminal');
      makeDraggable('.mac-terminal');
    });

    // Open mail
    $('#mail').click(function(){
      $('.email').css("display", "inline-block").addClass('windows');
      bringToFront('.email');
      makeDraggable('.email');
    });    

    // Open about me
    $('#notes').click(function(){
      $('.text-edit').css("display", "inline-block").addClass('windows');
      bringToFront('.text-edit');
      makeDraggable('.text-edit');
    });

    // Open calculator
    $('#calculator').click(function(){
      $('.calc').css("display", "inline-block").addClass('windows');
      bringToFront('.calc');
      makeDraggable('.calc');
    });

    // Open trash dialogue
    $('#trash-icon').click(function(){
      $('.dialogue').css("display", "inline-block").addClass('windows');
      bringToFront('.dialogue');
      makeDraggable('.dialogue');
    });

    // Close trash dialogue
    $('.alert-btn').click(function(){
      $('.dialogue').css("display", "none");
    });

    // Close terminal
    $('.header__op-icon--red').click(function(){
      $('.mac-terminal').css("display", "none");
    });

    // Close mail
    $('.mail-header__op-icon--red').click(function(){
      $('.email').css("display", "none");
    });  

    // Close about me
    $('.notes-header__op-icon--red').click(function(){
      $('.text-edit').css("display", "none");
    });

    // Close calculator
    $('.calc-header__op-icon--red').click(function(){
      $('.calc').css("display", "none");
    });

    // Empty trash
    $(".confirm").click(function (e) {
      e.preventDefault();
      $('#trash').attr('src', 'assets/icons/empty_trash.png');
      $("#trash-icon").off("click");
    });
    
    // Minimize terminal
    $('.header__op-icon--yellow').click(function(){
        // $('.mac-terminal').css("transform", "translateY(82%) translateX(0%) scale(0.75)");
        // $('.mac-terminal').css("transition", "all 0.25s");
      $('.mac-terminal').toggleClass('minimize');
      $('.mac-terminal').removeClass('maximize');
    });

    // Maximize terminal
    $('.header__op-icon--green').click(function(){
      $('.mac-terminal').toggleClass('maximize');
      $('.mac-terminal').removeClass('minimize');
    });

    $('#bold-btn').click(function(){
      $('.text-body').toggleClass("bold");
    });

   $('#italic-btn').click(function(){
      $('.text-body').toggleClass("italic");
   });

   $('#underline-btn').click(function(){
      $('.text-body').toggleClass("underline");
   });

   $('#left-btn').click(function(){
      $('.text-body').toggleClass("left");
      $('.text-body').removeClass("right");
      $('.text-body').removeClass("center");
      $('.text-body').removeClass("justify");
   });

   $('#center-btn').click(function(){
      $('.text-body').toggleClass("center");
      $('.text-body').removeClass("right");
      $('.text-body').removeClass("left");
      $('.text-body').removeClass("justify");
   });

   $('#right-btn').click(function(){
      $('.text-body').toggleClass("right");
      $('.text-body').removeClass("left");
      $('.text-body').removeClass("center");
      $('.text-body').removeClass("justify");
   });

   $('#justify-btn').click(function(){
      $('.text-body').toggleClass("justify");
      $('.text-body').removeClass("right");
      $('.text-body').removeClass("center");
      $('.text-body').removeClass("left");
   });
  });

const colorPicker = document.getElementById("colorPicker");
colorPicker.addEventListener("input", function() {
  $('.text-body').css("color", this.value);
});

const fontSize = document.getElementById("fontSize");
fontSize.addEventListener("change", function() {
  $('.text-body').css("font-size", this.value + "px");
});

const fontFamily = document.getElementById("fontFamily");
fontFamily.addEventListener("change", function() {
  $('.text-body').css("font-family", this.value);
});

// var closeWindow = function() {
//   $('.window-close').bind('click', function(e) {
//     e.preventDefault();
//     $(this).parents('.windows').removeClass('current-window window-opened').addClass('window-closed').hide();
//   });
// };
// closeWindow();