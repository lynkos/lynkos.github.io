"use strict";function _toConsumableArray(a){return _arrayWithoutHoles(a)||_iterableToArray(a)||_unsupportedIterableToArray(a)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(b,c){if(b){if("string"==typeof b)return _arrayLikeToArray(b,c);var a={}.toString.call(b).slice(8,-1);return"Object"===a&&b.constructor&&(a=b.constructor.name),"Map"===a||"Set"===a?Array.from(b):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?_arrayLikeToArray(b,c):void 0}}function _iterableToArray(a){if("undefined"!=typeof Symbol&&null!=a[Symbol.iterator]||null!=a["@@iterator"])return Array.from(a)}function _arrayWithoutHoles(a){if(Array.isArray(a))return _arrayLikeToArray(a)}function _arrayLikeToArray(b,c){(null==c||c>b.length)&&(c=b.length);for(var d=0,f=Array(c);d<c;d++)f[d]=b[d];return f}$(document).ready(function(){function a(){$(".menu-bar").fadeOut(400),$(".openWindow").fadeOut(400),$("#launchpad").addClass("shown start"),$("#launchpad").find("nav").addClass("scale-down")}function b(){$("#launchpad").removeClass("start").addClass("end"),$("#launchpad").find("nav").removeClass("scale-down").addClass("scale-up"),setTimeout(function(){$("#launchpad").removeClass("shown end"),$("#launchpad").find("nav").removeClass("scale-up")},350),$(".menu-bar").fadeIn(400),$(".openWindow").fadeIn(400)}function c(a){if(!$(a).hasClass("inFront")){var b=Math.max.apply(Math,_toConsumableArray($(".windows, .btn, .dialogue, #playlist").map(function(){return $(this).hasClass("openWindow")&&($(this).hasClass("windows")?($(this).css("--red","rgba(255, 255, 255, 0.2)"),$(this).css("--yellow","rgba(255, 255, 255, 0.2)"),$(this).css("--green","rgba(255, 255, 255, 0.2)")):$(this).hasClass("dialogue")&&($(this).css("--confirm","rgb(115, 118, 115)"),$(this).css("--confirm-active","rgb(145, 148, 145)"))),$(this).hasClass("inFront")&&$(this).removeClass("inFront"),parseInt($(this).css("z-index"))||0}).get()));$(a).css("z-index")<=b&&($(a).css("z-index",b+1),!$(a).is($("#playlist"))&&($("#playlist").css("z-index",b+2),$(".launch-content").css("z-index",b+3),$(".dock").css("z-index",b+4),$(a).addClass("inFront"))),$(a).hasClass("windows")?($(a).css("--red","#ed6a5e"),$(a).css("--yellow","#f5bf4f"),$(a).css("--green","#62c554")):$(a).hasClass("dialogue")&&($(a).css("--confirm","linear-gradient(to bottom, #DB6BFA, #993DB3)"),$(a).css("--confirm-active","#DB6BFA"))}}function d(a){$(a).hasClass("open")||($(a).effect("bounce",{times:3},600),$(a).addClass("open"))}function e(a,e,f){$(a).on("click",function(){b(),$(e).css("display",f),c(e),$(e).hasClass("openWindow")||$(e).addClass("openWindow"),d(a)})}function f(a,d,e,f){$(a).on("click",function(){b(),c(d),$(d).css("display",e),$(d).hasClass("openWindow")||$(d).addClass("openWindow"),$(f).hasClass("open")||$(f).addClass("open"),("#preview"===f||"#calc"===f)&&$(f).show()})}function g(a,b,c){$(a).on("click",function(){$(b).css("display","none"),$(b).hasClass("openWindow")&&$(b).removeClass("openWindow"),$(c).hasClass("open")&&$(c).removeClass("open"),("#preview"===c||"#calc"===c)&&$(c).fadeOut(150)})}function h(a,b){for(var c=0;c<b.length;c++)$(a).hasClass(b[c])&&$(a).removeClass(b[c])}var i=0,j=1;$(".open-menu").on("click",function(){$("#launchpad").hasClass("shown start")?b():a()}),$(".launch").click(function(){b()}),$("#launchNav").sortable(),$("#launchNav").disableSelection(),function(a,b){$(a).position({my:b,at:"center",collision:"fit",of:"#main-content"})}(".windows, .dialogue","center center-36.5"),$(".mac-terminal").fadeIn(500),$("#play").click(function(a){$("#playlist").css("left",$("#play").offset().left-$("#playlist").width()+13),c("#playlist"),$("#playlist").show(),a.stopPropagation()}),$("#playlist").mousedown(function(a){a.stopPropagation()}),$(document).mousedown(function(){$("#playlist").fadeOut(250)}),$(document).mouseup(function(a){var c=$("#launchpad").find(".launch-content"),d=c.find("nav");(c.is(a.target)||d.is(a.target))&&b()}),function(a){$(a).draggable({cursor:"default",handle:".handle",cancel:".cancel, .icons",start:function(){c(this)},containment:"#main-content",distance:0}).on("click",function(){c(this)})}(".windows"),$(".dialogue").draggable({cursor:"default",cancel:".alert-btn",start:function(){c(this)},containment:"#main-content",distance:0}).on("mousedown",function(){c(this)}),$(".btn").draggable({cursor:"default",cancel:!1,containment:"#main-content",distance:0}),$(".sidebar").resizable({containment:".notes",handles:"e"}),$(".mac-terminal, .email, .text-edit, .notes, .browser, .preview").resizable({containment:"#main-content",handles:"n, e, s, w, ne, nw, se, sw",animate:!0}),$(".child-nav li",".sidebar").on("click",function(){$(".child-nav li",".sidebar").removeClass("active"),$(this).hasClass("active")||$(this).addClass("active")}),$("#github-dock").click(function(){$(this).effect("bounce",{times:3},600)}),e("#iterm",".mac-terminal","inline-block"),e("#mail",".email","flex"),e("#text-edit",".text-edit","flex"),e("#notes",".notes","flex"),e("#safari",".browser","flex"),e("#preview",".preview","flex"),e("#calc",".calc","inline-block"),e("#trash-icon",".dialogue","inline-block"),$("#aboutFile").on("dblclick",function(a){a.preventDefault(),"none"===$(".text-edit").css("display")&&$(".text-edit").css("display","flex"),c(".text-edit"),$(".text-edit").hasClass("openWindow")||$(".text-edit").addClass("openWindow"),$("#text-edit").hasClass("open")||$("#text-edit").addClass("open")}),$("#aboutFile").on("touchstart",function(){$(this).data("moved",!1)}).on("touchmove",function(){$(this).data("moved",!0)}).on("touchend",function(){!1===$(this).data("moved")&&("none"===$(".text-edit").css("display")&&$(".text-edit").css("display","flex"),c(".text-edit"),!$(".text-edit").hasClass("openWindow")&&$(".text-edit").addClass("openWindow"),!$("#text-edit").hasClass("open")&&$("#text-edit").addClass("open"))}),$("#profilePic").on("dblclick",function(a){a.preventDefault(),"none"===$(".preview").css("display")&&$(".preview").css("display","flex"),c(".preview"),$(".preview").hasClass("openWindow")||$(".preview").addClass("openWindow"),$("#preview").hasClass("open")||($("#preview").addClass("open"),$("#preview").show())}),$("#profilePic").on("touchstart",function(){$(this).data("moved",!1)}).on("touchmove",function(){$(this).data("moved",!0)}).on("touchend",function(){!1===$(this).data("moved")&&("none"===$(".preview").css("display")&&$(".preview").css("display","flex"),c(".preview"),!$(".preview").hasClass("openWindow")&&$(".preview").addClass("openWindow"),!$("#preview").hasClass("open")&&($("#preview").addClass("open"),$("#preview").show()))}),$("#rotate").on("click",function(){i=(i-90)%360}),$("#zoomIn").on("click",function(){2.1>j?($("#zoomIn").hasClass("inactive")&&$("#zoomIn").removeClass("inactive"),$("#zoomOut").hasClass("inactive")&&$("#zoomOut").removeClass("inactive"),j+=.1):!$("#zoomIn").hasClass("inactive")&&$("#zoomIn").addClass("inactive")}),$("#zoomOut").on("click",function(){.2<j?($("#zoomOut").hasClass("inactive")&&$("#zoomOut").removeClass("inactive"),$("#zoomIn").hasClass("inactive")&&$("#zoomIn").removeClass("inactive"),j-=.1):!$("#zoomOut").hasClass("inactive")&&$("#zoomOut").addClass("inactive")}),$("#zoomOut, #zoomIn, #rotate").on("click",function(){$("#fullProfilePic").css("transform","rotate("+i+"deg) scale("+j+")"),$("#fullProfilePic").css("-moz-transform","rotate("+i+"deg) scale("+j+")"),$("#fullProfilePic").css("-ms-transform","rotate("+i+"deg) scale("+j+")"),$("#fullProfilePic").css("-o-transform","rotate("+i+"deg) scale("+j+")"),$("#fullProfilePic").css("-webkit-transform","rotate("+i+"deg) scale("+j+")")}),f("#itermLaunch",".mac-terminal","inline-block","#iterm"),f("#mailLaunch",".email","flex","#mail"),f("#textLaunch",".text-edit","flex","#text-edit"),f("#notesLaunch",".notes","block","#notes"),f("#safariLaunch",".browser","flex","#safari"),f("#calculatorLaunch",".calc","inline-block","#calc"),f("#previewLaunch",".preview","flex","#preview"),$(".confirm").click(function(a){new Audio("../assets/audio/empty_trash.mp3").play(),a.preventDefault(),$("#trash").attr("src","/assets/images/system/empty_trash.png"),$("#trash-icon").off("click")}),g(".header__op-icon--red",".mac-terminal","#iterm","40rem","44.5rem"),g(".mail-header__op-icon--red",".email","#mail","47rem","42rem"),g(".text-edit-header__op-icon--red",".text-edit","#text-edit","48.35rem","45rem"),g(".buttons-icon--red",".notes","#notes","55rem","45rem"),g(".browser-buttons-icon--red",".browser","#safari","55rem","45rem"),g(".calc-header__op-icon--red",".calc","#calc"),g(".preview-header__op-icon--red",".preview","#preview","55rem","40rem"),g(".alert-btn",".dialogue","#trash-icon"),$("#bold-btn").click(function(){$(".text-body").toggleClass("bold")}),$("#italic-btn").click(function(){$(".text-body").toggleClass("italic")}),$("#underline-btn").click(function(){$(".text-body").toggleClass("underline")}),$("#left-btn").click(function(){$(".text-body").toggleClass("left"),h(".text-body",["right","center","justify"])}),$("#center-btn").click(function(){$(".text-body").toggleClass("center"),h(".text-body",["right","left","justify"])}),$("#right-btn").click(function(){$(".text-body").toggleClass("right"),h(".text-body",["center","left","justify"])}),$("#justify-btn").click(function(){$(".text-body").toggleClass("justify"),h(".text-body",["center","left","right"])})});var colorPicker=document.getElementById("colorPicker");colorPicker.addEventListener("input",function(){$(".text-body").css("color",this.value)});var fontSize=document.getElementById("fontSize");fontSize.addEventListener("change",function(){$(".text-body").css("font-size",this.value/10+"rem")});var fontFamily=document.getElementById("fontFamily");fontFamily.addEventListener("change",function(){$(".text-body").css("font-family",this.value)});var lineHeight=document.getElementById("lineHeight");lineHeight.addEventListener("change",function(){$(".text-body").css("line-height",this.value)});var selectProject=function(a){for(var b=document.getElementsByClassName("project"),c=0;c<b.length;++c)b[c].classList.remove("active");var d=document.querySelector("#"+a.dataset.id);d.classList.add("active")};document.querySelectorAll(".project-name").forEach(function(a){a.addEventListener("click",function(a){selectProject(a.target)})});