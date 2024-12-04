$(function() {
  $(".mac-terminal")
    .draggable({
      handle: "div.header",
      cancel: "div.header__op",
      //zIndex: 999999,
      //stack: ".box",
    });

  $(".text-edit")
    .draggable({
      handle: "div.notes-header",
      cancel: "div.notes-header__op",
      //stack: ".box",
    });

  $(".calc")
    .draggable({
      handle: "div.calc-header",
      cancel: "div.calc-header__op",
    });

  $(".btn")        
    .draggable({
      cursor: "default",
      cancel: false,
      containment: "body"
    });

    $("#spotlight_wrapper")        
    .draggable({
      cursor: "default",
      cancel: false,
    });

    $(".dialogue")        
    .draggable({
      cursor: "default",
      cancel: ".alert-btn",
    });
});

$(document).ready(function(){
    // Open terminal
    $('#iterm').click(function(){
      $('.mac-terminal').css("display", "block");
    });

    // Open about me
    $('#notes').click(function(){
      $('.text-edit').css("display", "block");
    });

    // Open calculator
    $('#calculator').click(function(){
      $('.calc').css("display", "block");
    });
    
    // Open trash dialogue
    $('#trash').click(function(){
      $('.dialogue').css("display", "block");
    });

    // Close trash dialogue
    $('.alert-btn').click(function(){
      $('.dialogue').css("display", "none");
    });

    // Close terminal
    $('.header__op-icon--red').click(function(){
      $('.mac-terminal').css("display", "none");
    });

    // Close about me
    $('.notes-header__op-icon--red').click(function(){
      $('.text-edit').css("display", "none");
    });

    // Close calculator
    $('.calc-header__op-icon--red').click(function(){
      $('.calc').css("display", "none");
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