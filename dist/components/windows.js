"use strict";function _toConsumableArray(a){return _arrayWithoutHoles(a)||_iterableToArray(a)||_unsupportedIterableToArray(a)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(b,c){if(b){if("string"==typeof b)return _arrayLikeToArray(b,c);var a={}.toString.call(b).slice(8,-1);return"Object"===a&&b.constructor&&(a=b.constructor.name),"Map"===a||"Set"===a?Array.from(b):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?_arrayLikeToArray(b,c):void 0}}function _iterableToArray(a){if("undefined"!=typeof Symbol&&null!=a[Symbol.iterator]||null!=a["@@iterator"])return Array.from(a)}function _arrayWithoutHoles(a){if(Array.isArray(a))return _arrayLikeToArray(a)}function _arrayLikeToArray(b,c){(null==c||c>b.length)&&(c=b.length);for(var d=0,f=Array(c);d<c;d++)f[d]=b[d];return f}$(function(){function a(){$(".menu-bar").fadeOut(350),$(".openWindow").fadeOut(350),$("#launchpad").addClass("shown start"),$("#launchpad").find("nav").addClass("scale-down")}function b(){$("#launchpad").removeClass("start").addClass("end"),$("#launchpad").find("nav").removeClass("scale-down").addClass("scale-up"),setTimeout(function(){$("#launchpad").removeClass("shown end"),$("#launchpad").find("nav").removeClass("scale-up")},350),$(".menu-bar").fadeIn(350),$(".openWindow").fadeIn(350)}function c(a,b){var c=2<arguments.length&&arguments[2]!==void 0?arguments[2]:"center";$(a).position({my:b,at:c,collision:"fit",of:"#main-content"})}function d(a){var b=$(".dock").height(),d=36.5;$(a).height()>=r?c(a,"top-"+d,"top"):c(a,"center center-"+d)}function e(a,b,c){".mac-terminal"!==b&&$(a).one(c,function(){".text-edit"===b?!p&&(d(b),p=!0):d(b)})}function f(a){if(!$(a).hasClass("inFront")){var b=Math.max.apply(Math,_toConsumableArray($(".windows, .btn, .trash-dialogue, .menu-dropdown").map(function(){return $(this).hasClass("openWindow")&&($(this).hasClass("windows")?($(this).css("--red","rgba(255, 255, 255, 0.2)"),$(this).css("--yellow","rgba(255, 255, 255, 0.2)"),$(this).css("--green","rgba(255, 255, 255, 0.2)")):$(this).hasClass("trash-dialogue")&&($(this).css("--confirm","rgb(115, 118, 115)"),$(this).css("--confirm-active","rgb(145, 148, 145)"))),$(this).hasClass("inFront")&&$(this).removeClass("inFront"),parseInt($(this).css("z-index"))||0}).get()));$(a).css("z-index")<=b&&($(a).css("z-index",b+1),!$(a).hasClass("menu-dropdown")&&($(".menu-dropdown").css("z-index",b+2),$("#launch-content").css("z-index",b+3),$(".dock").css("z-index",b+4),$(a).addClass("inFront"))),$(a).hasClass("windows")?($(a).css("--red","#ed6a5e"),$(a).css("--yellow","#f5bf4f"),$(a).css("--green","#62c554")):$(a).hasClass("trash-dialogue")&&($(a).css("--confirm","linear-gradient(to bottom, #DB6BFA, #993DB3)"),$(a).css("--confirm-active","#DB6BFA"))}}function g(a){$(a).effect("bounce",{times:3},600)}function h(a,c){var d=2<arguments.length&&arguments[2]!==void 0?arguments[2]:"flex";e(a,c,"click"),document.querySelector(a).addEventListener("click",function(){b(),document.querySelector(c).style.display=d,f(c),document.querySelector(c).classList.contains("openWindow")||document.querySelector(c).classList.add("openWindow"),document.querySelector(a).classList.contains("open")||(g(a),document.querySelector(a).classList.add("open"))})}function i(a,b,c){var d=document.querySelector(b),e=document.querySelector(a);"none"===getComputedStyle(d).display&&(d.style.display="flex"),f(b),d.classList.contains("openWindow")||d.classList.add("openWindow"),e.classList.contains("open")||(e.classList.add("open"),!c&&(e.style.display="block"))}function j(a,b,c){var d=!!(3<arguments.length&&arguments[3]!==void 0)&&arguments[3];e(a,c,"dblclick"),e(a,c,"touchend"),document.querySelector(a).addEventListener("dblclick",function(a){a.preventDefault(),i(b,c,d)});var f=document.querySelector(a),g=!1;f.addEventListener("touchstart",function(){g=!1}),f.addEventListener("touchmove",function(){g=!0}),f.addEventListener("touchend",function(){g||i(b,c,d)})}function k(a,c,d){var g=3<arguments.length&&arguments[3]!==void 0?arguments[3]:"flex";e(a,c,"click");var h=document.querySelector(c),i=document.querySelector(d);document.querySelector(a).addEventListener("click",function(){b(),f(c),h.style.display=g,h.classList.contains("openWindow")||h.classList.add("openWindow"),i.classList.contains("open")||i.classList.add("open"),("#preview"===d||"#calc"===d)&&(i.style.display="block")})}function l(a,b,c){$(a).on("click",function(){$(b).css("display","none"),$(b).hasClass("openWindow")&&$(b).removeClass("openWindow"),$(c).hasClass("open")&&$(c).removeClass("open"),("#preview"!==c||$(".preview").hasClass("openWindow")||$(".resume").hasClass("openWindow"))&&"#calc"!==c||$(c).fadeOut(150)})}function m(a,b,c){$(a).on("click",function(d){$(a).toggleClass("selected-menu"),$(b).css("left",$(a).offset().left+c),f(b),$(b).show(),d.stopPropagation()}),$(b).on("mousedown",function(a){a.stopPropagation()}),$(document).on("mousedown",function(){$(b).fadeOut(250),$(a).removeClass("selected-menu")})}function n(a,b,c){m(a,b,c+$(a).width()-$(b).width())}function o(a,b){m(a,b,0)}var p=!1,q=9*parseFloat($("html").css("font-size")),r=window.innerHeight-q-3;document.getElementById("open-menu").addEventListener("click",function(){var c=document.getElementById("launchpad");c.classList.contains("shown")&&c.classList.contains("start")?b():a()}),document.querySelectorAll(".launch").forEach(function(a){a.addEventListener("click",function(){b()})}),document.addEventListener("mouseup",function(a){var c=document.getElementById("launchpad"),d=c.querySelector("#launch-content"),e=d.querySelector("nav");(a.target===d||a.target===e)&&b()}),document.getElementById("confirm").addEventListener("click",function(a){new Audio("../assets/audio/empty-trash.mp3").play(),a.preventDefault(),document.getElementById("trash").setAttribute("src","/assets/img/system/empty-trash.webp");var b=document.getElementById("trash-icon"),c=b.cloneNode(!0);b.parentNode.replaceChild(c,b)}),d(".mac-terminal"),$(".mac-terminal").fadeIn(350),function(a){$(a).draggable({cursor:"default",handle:".handle",cancel:".cancel, .icons",start:function(){f(this)},containment:"#main-content",distance:0}).on("click",function(){f(this)})}(".windows"),$("#launchNav").sortable(),$("#launchNav").disableSelection(),$(".trash-dialogue").draggable({cursor:"default",cancel:".alert-btn",start:function(){f(this)},containment:"#main-content",distance:0}).on("mousedown",function(){f(this)}),$(".btn").draggable({cursor:"default",cancel:!1,containment:"#main-content",distance:0}),$(".mac-terminal, .email, .notes, .browser, .preview, .resume").resizable({containment:"#main-content",handles:"n, e, s, w, ne, nw, se, sw",animate:!0}),n("#play","#playlist",4),n("#wifi","#wifi-menu",0),o("#apple","#apple-menu"),o("#finder","#finder-menu"),o("#file","#file-menu"),o("#edit","#edit-menu"),o("#view","#view-menu"),o("#go","#go-menu"),o("#window","#window-menu"),o("#help","#help-menu"),h("#iterm",".mac-terminal","inline-block"),h("#mail",".email"),h("#text-edit",".text-edit"),h("#notes",".notes"),h("#safari",".browser"),h("#preview",".preview"),h("#preview",".resume"),h("#calc",".calc","inline-block"),h("#trash-icon",".trash-dialogue","inline-block"),j("#aboutFile","#text-edit",".text-edit",!0),j("#resumeFile","#preview",".resume"),j("#profilePic","#preview",".preview"),k("#itermLaunch",".mac-terminal","#iterm","inline-block"),k("#mailLaunch",".email","#mail"),k("#textLaunch",".text-edit","#text-edit"),k("#notesLaunch",".notes","#notes","block"),k("#safariLaunch",".browser","#safari"),k("#calculatorLaunch",".calc","#calc","inline-block"),l(".header__op-icon--red",".mac-terminal","#iterm","40rem","44.5rem"),l(".email-header__op-icon--red",".email","#mail","47rem","42rem"),l(".text-edit-header__op-icon--red",".text-edit","#text-edit","48.35rem","45rem"),l(".buttons-icon--red",".notes","#notes","55rem","45rem"),l(".browser-buttons-icon--red",".browser","#safari","55rem","45rem"),l(".calc-header__op-icon--red",".calc","#calc"),l(".preview-header__op-icon--red",".preview","#preview","55rem","40rem"),l(".resume-header__op-icon--red",".resume","#preview","55rem","55rem"),l(".alert-btn",".trash-dialogue","#trash-icon")});