"use strict";function _toConsumableArray(a){return _arrayWithoutHoles(a)||_iterableToArray(a)||_unsupportedIterableToArray(a)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(b,c){if(b){if("string"==typeof b)return _arrayLikeToArray(b,c);var a={}.toString.call(b).slice(8,-1);return"Object"===a&&b.constructor&&(a=b.constructor.name),"Map"===a||"Set"===a?Array.from(b):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?_arrayLikeToArray(b,c):void 0}}function _iterableToArray(a){if("undefined"!=typeof Symbol&&null!=a[Symbol.iterator]||null!=a["@@iterator"])return Array.from(a)}function _arrayWithoutHoles(a){if(Array.isArray(a))return _arrayLikeToArray(a)}function _arrayLikeToArray(b,c){(null==c||c>b.length)&&(c=b.length);for(var d=0,f=Array(c);d<c;d++)f[d]=b[d];return f}$(document).ready(function(){// Open launchpad
function a(){$(".menu-bar").fadeOut(400),$(".openWindow").fadeOut(400),i.addClass("shown start"),i.find("nav").addClass("scale-down")}// Toggle launchpad
// Close launchpad
function b(){i.removeClass("start").addClass("end"),i.find("nav").removeClass("scale-down").addClass("scale-up"),setTimeout(function(){i.removeClass("shown end"),i.find("nav").removeClass("scale-up")},350),$(".menu-bar").fadeIn(400),$(".openWindow").fadeIn(400)}// Close launchpad when clicking any launchpad icon
// Center windows
// Function to bring the clicked window to the front
function c(a,b){// No need to increase z-index if already in front
if(!$(a).hasClass("inFront")){// Get the highest z-index
var c=Math.max.apply(Math,_toConsumableArray($(b).map(function(){return $(this).hasClass("openWindow")&&($(this).hasClass("windows")?($(this).css("--red","rgba(255, 255, 255, 0.2)"),$(this).css("--yellow","rgba(255, 255, 255, 0.2)"),$(this).css("--green","rgba(255, 255, 255, 0.2)")):$(this).hasClass("dialogue")&&($(this).css("--confirm","rgb(115, 118, 115)"),$(this).css("--confirm-active","rgb(145, 148, 145)"))),$(this).hasClass("inFront")&&$(this).removeClass("inFront"),parseInt($(this).css("z-index"))||0}).get()));// Set higher z-index for the given element
$(a).css("z-index")<=c&&($(a).css("z-index",c+1),!$(a).is($("#playlist"))&&($("#playlist").css("z-index",c+2),$(".launch-content").css("z-index",c+3),$(".dock").css("z-index",c+4),$(a).addClass("inFront"))),$(a).hasClass("windows")?($(a).css("--red","#FF544D"),$(a).css("--yellow","#FFB429"),$(a).css("--green","#25C63A")):$(a).hasClass("dialogue")&&($(a).css("--confirm","linear-gradient(to bottom, #DB6BFA, #993DB3)"),$(a).css("--confirm-active","#DB6BFA"))}}// Make windows draggable and bring to front on drag
// Apply draggable to all existing windows
function d(a){$(a).hasClass("open")||($(a).effect("bounce",{times:3},600),$(a).addClass("open"))}// Open window
function e(a,e,f){$(a).on("click",function(){b(),$(e).css("display",f),c(e,".windows, .btn, .dialogue"),$(e).hasClass("openWindow")||$(e).addClass("openWindow"),d(a)})}// Open terminal
// Open app via launchpad
function f(a,d,e,f){$(a).on("click",function(){b(),c(d,".windows, .btn, .dialogue"),$(d).css("display",e),$(d).hasClass("openWindow")||$(d).addClass("openWindow"),null===$(f)||$(f).hasClass("open")||$(f).addClass("open")})}// Open terminal
// Close window
function g(a,b,c){$(a).on("click",function(){$(b).css("display","none"),$(b).hasClass("openWindow")&&$(b).removeClass("openWindow"),null!==$(c)&&$(c).hasClass("open")&&$(c).removeClass("open")})}// Close terminal
// Remove classes in element
function h(a,b){for(var c=0;c<b.length;c++)$(a).hasClass(b[c])&&$(a).removeClass(b[c])}// Toggle left text alignment in TextEdit
var i=$("#launchpad");// Make launchpad apps sortable
// Show terminal on load
// TODO Improve playlist toggle logic
// Show playlist when icon clicked
// Prevent playlist from closing when clicking on it
// Hide playlist when click outside
// add class to launch while moving/dragging & remove when done
// so that the launchpad doesn't close when sorting
// Close the launchpad when the content is clicked, only if the target is not a link
// Make dialogue draggable
// Make folder and file icons draggable
// Resize app store sidebar
// Dock Resizing
// $(".divider").resizable({
//   handles: "n",
//   maxHeight: 120,
//   minHeight: 20,
//   resize: function(event, ui) {
//     $(".icon").css({
//       width: ui.size.height,
//       height: ui.size.height
//     });
//     $(".dock").css("height", ui.size.height + 10);
//   }
// });  
// Highlight clicked nav item
// Make GitHub icon bounce on click
// Open mail
// Open about me
// Open projects
// Open safari
// Open trash dialogue
// Open about me when double-clicking "about.rtf"
// Open preview when double-clicking "profile.jpg"
// Open mail
// Open about me
// Open projects
// Open safari
// Open calculator
// Open calculator
// Empty trash
// Close mail
// Close about me
// Close projects
// Close safari
// Close calculator
// Close preview
// Close trash dialogue
// Maximize window
// function maximizeWindow(maximize, win, width, height) {
//   $(maximize).on("click", function() {
//     if (!$(win).hasClass("maximize")) {
//       $("footer").hide();
//       $(win).css("width", "100vw");
//       $(win).css("height", "100%");
//       $(win).css("top", "0");
//       $(win).css("left", "0");
//     } else {
//       $("footer").show();
//       $(win).css("width", width);
//       $(win).css("height", height);
//       centerWindow(win, "center center");
//     }
//     $(win).toggleClass("maximize");
//   });
// }
// // Maximize terminal
// maximizeWindow(".header__op-icon--green", ".mac-terminal", "40rem", "44.5rem");
// // Maximize terminal
// maximizeWindow(".mail-header__op-icon--green", ".email", "47rem", "42rem");
// // Maximize about me
// maximizeWindow(".text-edit-header__op-icon--green", ".text-edit", "48.35rem", "45rem");
// // Maximize projects
// maximizeWindow(".buttons-icon--green", ".notes", "55rem", "45rem");
// // Maximize safari
// maximizeWindow(".browser-buttons-icon--green", ".browser", "55rem", "45rem");
// // Maximize preview
// maximizeWindow(".preview-header__op-icon--green", ".preview", "55rem", "40rem");
// Toggle bold text in TextEdit
// Toggle italic text in TextEdit
// Toggle underlined text in TextEdit
// Toggle center text alignment in TextEdit
// Toggle right text alignment in TextEdit
// Toggle justify text alignment in TextEdit
$(".open-menu").on("click",function(){i.hasClass("shown start")?b():a()}),$(".launch").click(function(){b()}),$("#launchNav").sortable(),$("#launchNav").disableSelection(),function(a,b){$(a).position({my:b,// Subtract menubar height (3rem = 28.8px when font-size is 9.6px = 60%) from vertical center
at:"center",collision:"fit",of:"#main-content"})}(".mac-terminal, .text-edit, .email, .calc, .notes, .browser, .dialogue, .preview","center center-36.5"),$(".mac-terminal").fadeIn(500),$("#play").click(function(a){// Bring playlist to front
// Show playlist
$("#playlist").css("left",$("#play").offset().left-$("#playlist").width()+10),c("#playlist",".windows, .btn, .dialogue, #playlist"),$("#playlist").show(),a.stopPropagation()}),$("#playlist").mousedown(function(a){a.stopPropagation()}),$(document).mousedown(function(){$("#playlist").fadeOut(250)}),$(document).mouseup(function(a){var c=i.find(".launch-content"),d=c.find("nav");(c.is(a.target)||d.is(a.target))&&b()}),function(a){$(a).draggable({cursor:"default",handle:".handle",cancel:".cancel, .icons",start:function(){c(this,".windows, .btn, .dialogue")},containment:"#main-content",distance:0}).on("click",function(){c(this,".windows, .btn, .dialogue")})}(".windows"),$(".dialogue").draggable({cursor:"default",cancel:".alert-btn",start:function(){c(this,".windows, .btn, .dialogue")},// stack: ".windows, .btn, .dialogue",
containment:"#main-content",distance:0}).on("mousedown",function(){c(this,".windows, .btn, .dialogue")}),$(".btn").draggable({cursor:"default",cancel:!1,containment:"#main-content",distance:0}),$(".sidebar").resizable({containment:".notes",handles:"e"}),$(".child-nav li",".sidebar").on("click",function(){$(".child-nav li",".sidebar").removeClass("active"),$(this).hasClass("active")||$(this).addClass("active")}),$("#github-dock").click(function(){$(this).effect("bounce",{times:3},600)}),e("#iterm",".mac-terminal","inline-block"),e("#mail",".email","flex"),e("#text-edit",".text-edit","flex"),e("#notes",".notes","flex"),e("#safari",".browser","flex"),e("#trash-icon",".dialogue","inline-block"),$("#aboutFile").on("dblclick touchstart",function(a){a.preventDefault(),"none"===$(".text-edit").css("display")&&$(".text-edit").css("display","flex"),c(".text-edit",".windows, .btn, .dialogue"),$(".text-edit").hasClass("openWindow")||$(".text-edit").addClass("openWindow"),$("#text-edit").hasClass("open")||$("#text-edit").addClass("open")}),$("#profilePic").on("dblclick touchstart",function(a){a.preventDefault(),"none"===$(".preview").css("display")&&$(".preview").css("display","flex"),c(".preview",".windows, .btn, .dialogue"),$(".preview").hasClass("openWindow")||$(".preview").addClass("openWindow"),$("#preview").hasClass("open")||$("#preview").addClass("open")}),f("#itermLaunch",".mac-terminal","inline-block","#iterm"),f("#mailLaunch",".email","flex","#mail"),f("#textLaunch",".text-edit","flex","#text-edit"),f("#notesLaunch",".notes","block","#notes"),f("#safariLaunch",".browser","flex","#safari"),f("#calculatorLaunch",".calc","inline-block",null),f("#previewLaunch",".preview","flex",null),$(".confirm").click(function(a){new Audio("../assets/audio/empty_trash.mp3").play(),a.preventDefault(),$("#trash").attr("src","/assets/images/system/empty_trash.png"),$("#trash-icon").off("click")}),g(".header__op-icon--red",".mac-terminal","#iterm","40rem","44.5rem"),g(".mail-header__op-icon--red",".email","#mail","47rem","42rem"),g(".text-edit-header__op-icon--red",".text-edit","#text-edit","48.35rem","45rem"),g(".buttons-icon--red",".notes","#notes","55rem","45rem"),g(".browser-buttons-icon--red",".browser","#safari","55rem","45rem"),g(".calc-header__op-icon--red",".calc",null),g(".preview-header__op-icon--red",".preview",null,"55rem","40rem"),g(".alert-btn",".dialogue","#trash-icon"),$("#bold-btn").click(function(){$(".text-body").toggleClass("bold")}),$("#italic-btn").click(function(){$(".text-body").toggleClass("italic")}),$("#underline-btn").click(function(){$(".text-body").toggleClass("underline")}),$("#left-btn").click(function(){$(".text-body").toggleClass("left"),h(".text-body",["right","center","justify"])}),$("#center-btn").click(function(){$(".text-body").toggleClass("center"),h(".text-body",["right","left","justify"])}),$("#right-btn").click(function(){$(".text-body").toggleClass("right"),h(".text-body",["center","left","justify"])}),$("#justify-btn").click(function(){$(".text-body").toggleClass("justify"),h(".text-body",["center","left","right"])})});// Update text color in TextEdit
var colorPicker=document.getElementById("colorPicker");colorPicker.addEventListener("input",function(){$(".text-body").css("color",this.value)});// Update font size in TextEdit
var fontSize=document.getElementById("fontSize");fontSize.addEventListener("change",function(){$(".text-body").css("font-size",this.value/10+"rem")});// Update font family in TextEdit
var fontFamily=document.getElementById("fontFamily");fontFamily.addEventListener("change",function(){$(".text-body").css("font-family",this.value)});// Update line height in TextEdit
var lineHeight=document.getElementById("lineHeight");lineHeight.addEventListener("change",function(){$(".text-body").css("line-height",this.value)});// Make selected project in Notes sidebar active and all others inactive
var selectProject=function(a){for(var b=document.getElementsByClassName("project"),c=0;c<b.length;++c)b[c].classList.remove("active");var d=document.querySelector("#"+a.dataset.id);d.classList.add("active")};// Select project from projects in Notes sidebar
document.querySelectorAll(".project-name").forEach(function(a){a.addEventListener("click",function(a){selectProject(a.target)})});