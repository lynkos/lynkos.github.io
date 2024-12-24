$(document).ready(function() {
  // Center windows
  $(".mac-terminal, .text-edit, .email, .calc").position({
    my: "center center-28.8", // Subtract menubar height (3rem = 28.8px when font-size is 9.6px = 60%) from vertical center
    at: "center",
    collision: "fit",
    of: "#main-content"
  });

  // Show terminal on load
  $('.mac-terminal').fadeIn(500); // .show(500);

  // Function to bring the clicked window to the front
  function bringToFront(element) {
    let maxZIndex = Math.max(...$('.windows').map(function() {
      // Make buttons inactive
      $(this).css("--red", "rgba(255, 255, 255, 0.2)");
      $(this).css("--yellow", "rgba(255, 255, 255, 0.2)");
      $(this).css("--green", "rgba(255, 255, 255, 0.2)");
      $(this).css("--red-active", "rgba(255, 255, 255, 0.1)");
      $(this).css("--yellow-active", "rgba(255, 255, 255, 0.1)");
      $(this).css("--green-active", "rgba(255, 255, 255, 0.1)");

      // Reset z-index for all windows
      return parseInt($(this).css("z-index")) || 0;
    }).get());

    // Set higher z-index for the clicked window
    $(element).css("z-index", maxZIndex + 1);

    // Make buttons active for the clicked window
    $(element).css("--red", "#FF544D");
    $(element).css("--yellow", "#FFB429");
    $(element).css("--green", "#25C63A");
    $(element).css("--red-active", "#c14645");
    $(element).css("--yellow-active", "#c08e38");
    $(element).css("--green-active", "#029740");
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

  // Make dialogue draggable
  $(".dialogue").draggable({
    cursor: "default",
    cancel: ".alert-btn",
    containment: "#main-content",
    distance: 0,
  });  

  // Make folder and file icons draggable
  $(".btn").draggable({
    cursor: "default",
    cancel: false,
    containment: "#main-content",
    distance: 0,
  });

  // Make GitHub, Spotify, and Steam icon bounce on click
  $("#github, #spotify, #steam").click(function() {
    $(this).effect("bounce", { times: 3 }, 600);
  });
  
  // Open terminal
  $('#iterm').click(function(){
    $('.mac-terminal').css("display", "inline-block");
    bringToFront('.mac-terminal');

    if (!$(this).hasClass("open")) {
      // Bounce effect, if window is not already open
      $(this).effect("bounce", { times: 3 }, 600);

      // Mark clicked window as opened
      $(this).addClass("open");
    }
  });

  // Open mail
  $('#mail').click(function(){
    $('.email').css("display", "flex");
    bringToFront('.email');

    if (!$(this).hasClass("open")) {
      // Bounce effect, if window is not already open
      $(this).effect("bounce", { times: 3 }, 600);

      // Mark clicked window as opened
      $(this).addClass("open");
    }
  });    

  // Open about me
  $('#notes').click(function(){
    $('.text-edit').css("display", "flex");
    bringToFront('.text-edit');

    if (!$(this).hasClass("open")) {
      // Bounce effect, if window is not already open
      $(this).effect("bounce", { times: 3 }, 600);

      // Mark clicked window as opened
      $(this).addClass("open");
    }
  });

  // Open calculator
  $('#calculator').click(function(){
    $('.calc').css("display", "inline-block");
    bringToFront('.calc');

    if (!$(this).hasClass("open")) {
      // Bounce effect, if window is not already open
      $(this).effect("bounce", { times: 3 }, 600);

      // Mark clicked window as opened
      $(this).addClass("open");
    }
  });

  // Open trash dialogue
  $('#trash-icon').click(function(){
    $('.dialogue').css("display", "inline-block");
    bringToFront('.dialogue');

    if (!$(this).hasClass("open")) {
      // Bounce effect, if window is not already open
      $(this).effect("bounce", { times: 3 }, 600);

      // Mark clicked window as opened
      $(this).addClass("open");
    }
  });

  // Empty trash
  $(".confirm").click(function (e) {
    new Audio('../assets/audio/empty_trash.mp3').play();
    e.preventDefault();
    $('#trash').attr('src', 'assets/icons/empty_trash.png');
    $("#trash-icon").off("click");
  });

  // Close window
  function closeWindow(close, win, parent) {
    $(close).on('click', function() {
      $(win).css("display", "none");
      $(parent).removeClass("open");
    });
  }
  
  // Close terminal
  closeWindow('.header__op-icon--red', '.mac-terminal', "#iterm");

  // Close mail
  closeWindow('.mail-header__op-icon--red', '.email', "#mail");

  // Close about me
  closeWindow('.notes-header__op-icon--red', '.text-edit', "#notes");

  // Close calculator
  closeWindow('.calc-header__op-icon--red', '.calc', "#calculator");

  // Close trash dialogue
  closeWindow('.alert-btn', '.dialogue', "#trash-icon");  
    
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

const lineHeight = document.getElementById("lineHeight");
lineHeight.addEventListener("change", function() {
  $('.text-body').css("line-height", this.value);
});