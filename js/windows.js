$(document).ready(function() {
  // Center windows
  $(".mac-terminal, .text-edit, .email, .calc").position({
    my: "center",
    at: "center",
    collision: "fit",
    of: "#main-content"
  });

  // Show terminal on load
  $('.mac-terminal').fadeIn(500); // .show(500);

  // Function to bring the clicked window to the front
  function bringToFront(element) {
    let maxZIndex = Math.max(...$('.windows').map(function() {
      return parseInt($(this).css("z-index")) || 0;
    }).get());
    // Set higher z-index for the clicked window
    $(element).css("z-index", maxZIndex + 1);
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
      distance: 0,
      // stack: ".windows",
    }).on('click', function() {
      bringToFront(this);
    });
  }

  // Apply draggable to all existing windows
  makeDraggable('.windows');

  // Make folder and file icons draggable
  $(".btn").draggable({
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
  // });
  
  // Open terminal
  $('#iterm').click(function(){
    $('.mac-terminal').css("display", "inline-block");
    bringToFront('.mac-terminal');
  });

  // Open mail
  $('#mail').click(function(){
    $('.email').css("display", "flex");
    bringToFront('.email');
  });    

  // Open about me
  $('#notes').click(function(){
    $('.text-edit').css("display", "flex");
    bringToFront('.text-edit');
  });

  // Open calculator
  $('#calculator').click(function(){
    $('.calc').css("display", "inline-block");
    bringToFront('.calc');
  });

  // Open trash dialogue
  $('#trash-icon').click(function(){
    $('.dialogue').css("display", "inline-block");
    bringToFront('.dialogue');
  });

  // Empty trash
  $(".confirm").click(function (e) {
    e.preventDefault();
    $('#trash').attr('src', 'assets/icons/empty_trash.png');
    $("#trash-icon").off("click");
  });

  // Close window
  function closeWindow(close, win) {
    $(close).on('click', function() {
      $(win).css("display", "none");
    });
  }
  
  // Close terminal
  closeWindow('.header__op-icon--red', '.mac-terminal');

  // Close mail
  closeWindow('.mail-header__op-icon--red', '.email');

  // Close about me
  closeWindow('.notes-header__op-icon--red', '.text-edit');

  // Close calculator
  closeWindow('.calc-header__op-icon--red', '.calc');

  // Close trash dialogue
  closeWindow('.alert-btn', '.dialogue');  
    
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