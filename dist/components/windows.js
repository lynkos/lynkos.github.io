"use strict";function _toConsumableArray(a){return _arrayWithoutHoles(a)||_iterableToArray(a)||_unsupportedIterableToArray(a)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(b,c){if(b){if("string"==typeof b)return _arrayLikeToArray(b,c);var a={}.toString.call(b).slice(8,-1);return"Object"===a&&b.constructor&&(a=b.constructor.name),"Map"===a||"Set"===a?Array.from(b):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?_arrayLikeToArray(b,c):void 0}}function _iterableToArray(a){if("undefined"!=typeof Symbol&&null!=a[Symbol.iterator]||null!=a["@@iterator"])return Array.from(a)}function _arrayWithoutHoles(a){if(Array.isArray(a))return _arrayLikeToArray(a)}function _arrayLikeToArray(b,c){(null==c||c>b.length)&&(c=b.length);for(var d=0,f=Array(c);d<c;d++)f[d]=b[d];return f}function _typeof(a){"@babel/helpers - typeof";return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},_typeof(a)}document.addEventListener("DOMContentLoaded",function(){function a(){$("#menu-bar").fadeOut(350),$(".openWindow").fadeOut(350),q.classList.add("shown","start"),r.classList.add("scale-down")}function b(){q.classList.remove("start"),q.classList.add("end"),r.classList.remove("scale-down"),r.classList.add("scale-up"),setTimeout(function(){q.classList.remove("shown","end"),r.classList.remove("scale-up")},350),$("#menu-bar").fadeIn(350),$(".openWindow").fadeIn(350)}function c(a,b){var c=2<arguments.length&&arguments[2]!==void 0?arguments[2]:"center";$(a).position({my:b,at:c,collision:"fit",of:"#main-content"})}function d(a){document.querySelector(a).offsetHeight>=x?c(a,"top-36.5","top"):c(a,"center center-36.5")}function e(a,b,c){"#mac-terminal"!==b&&$(a).one(c,function(){"#text-edit"===b?!p&&(d(b),p=!0):d(b)})}function f(a){var b="string"==typeof a?document.querySelector(a):a;if(!b.classList.contains("inFront")){var c=_toConsumableArray(document.querySelectorAll(".windows, .trash-dialogue")),d=c.map(function(a){return a.classList.contains("openWindow")&&(a.classList.contains("windows")?(a.style.setProperty("--red","rgba(255, 255, 255, 0.2)"),a.style.setProperty("--yellow","rgba(255, 255, 255, 0.2)"),"text-edit"!==a.id&&"calc"!==a.id&&a.style.setProperty("--green","rgba(255, 255, 255, 0.2)")):a.classList.contains("trash-dialogue")&&(a.style.setProperty("--confirm","rgb(115, 118, 115)"),a.style.setProperty("--confirm-active","rgb(145, 148, 145)"))),a.classList.contains("inFront")&&a.classList.remove("inFront"),parseInt(getComputedStyle(a).zIndex)||0}),e=Math.max.apply(Math,_toConsumableArray(d)),f=parseInt(getComputedStyle(b).zIndex)||0;f<=e&&(b.style.zIndex=(e+1).toString(),!b.classList.contains("menu-dropdown")&&(b.classList.add("inFront"),document.querySelectorAll(".menu-dropdown").forEach(function(a){a.style.zIndex=(e+2).toString()}),s&&(s.style.zIndex=(e+3).toString()),t&&(t.style.zIndex=(e+4).toString()),document.querySelectorAll(".context-menu").forEach(function(a){a.style.zIndex=(e+5).toString()}))),b.classList.contains("windows")?(b.style.setProperty("--red","#ed6a5e"),b.style.setProperty("--yellow","#f5bf4f"),"text-edit"!==b.id&&"calc"!==b.id&&b.style.setProperty("--green","#62c554")):b.classList.contains("trash-dialogue")&&(b.style.setProperty("--confirm","linear-gradient(to bottom, #DB6BFA, #993DB3)"),b.style.setProperty("--confirm-active","#DB6BFA"))}}function g(a,c){var d=2<arguments.length&&arguments[2]!==void 0?arguments[2]:"flex";"#previewDockIcon"!==a&&e(a,c,"click");var g=document.querySelector(c),h=document.querySelector(a);h.addEventListener("click",function(){b(),f(c),".preview"!==c&&".resume"!==c&&(g.style.display=d,!g.classList.contains("openWindow")&&g.classList.add("openWindow"),!h.classList.contains("open")&&("#previewDockIcon"!==a&&$(a).effect("bounce",{times:3},600),h.classList.add("open")))})}function h(a,b,c){var d=document.querySelector(b),e=document.querySelector(a);"none"===getComputedStyle(d).display&&(d.style.display="flex"),f(b),d.classList.contains("openWindow")||d.classList.add("openWindow"),e.classList.contains("open")||(e.classList.add("open"),!c&&(e.style.display="block"))}function i(a,b,c){var d=!!(3<arguments.length&&arguments[3]!==void 0)&&arguments[3];e(a,c,"dblclick"),e(a,c,"touchend");var f=document.querySelector(a);f.addEventListener("dblclick",function(a){a.preventDefault(),h(b,c,d)});var g=!1;f.addEventListener("touchstart",function(){g=!1}),f.addEventListener("touchmove",function(){g=!0}),f.addEventListener("touchend",function(){g||h(b,c,d)})}function j(a,c,d){var g=3<arguments.length&&arguments[3]!==void 0?arguments[3]:"flex";e(a,c,"click");var h=document.querySelector(c),i=document.querySelector(d);document.querySelector(a).addEventListener("click",function(){b(),f(c),h.style.display=g,h.classList.contains("openWindow")||h.classList.add("openWindow"),i.classList.contains("open")||i.classList.add("open"),("#previewDockIcon"===d||"#calcDockIcon"===d)&&(i.style.display="block")})}function k(a,b,c){document.querySelector(a).addEventListener("click",function(){var a=document.querySelector(b),d=document.querySelector(c);a.style.display="none",a.classList.contains("openWindow")&&a.classList.remove("openWindow"),d.classList.contains("open")&&d.classList.remove("open"),"#calcDockIcon"!==c&&("#previewDockIcon"!==c||document.querySelector(".preview").classList.contains("openWindow")||document.querySelector(".resume").classList.contains("openWindow"))||$(c).fadeOut(150)})}function l(a,b,c){var d=document.querySelector(a),e=document.querySelector(b);d.addEventListener("click",function(a){d.classList.toggle("selected-menu");var g=d.getBoundingClientRect(),h=window.pageXOffset||document.documentElement.scrollLeft,i=g.left+h;e.style.left="".concat(i+c,"px"),f(b),e.style.display="block",a.stopPropagation()}),e.addEventListener("mousedown",function(a){a.stopPropagation()}),document.addEventListener("mousedown",function(){$(b).fadeOut(150),d.classList.remove("selected-menu")})}function m(a,b,c){l(a,b,c+$(a).width()-$(b).width())}function n(a,b){l(a,b,0)}function o(a,b){document.querySelector(a).addEventListener("click",function(){var a=document.querySelector(b);a.classList.contains("openWindow")&&(!(b in v)&&(v[b]={width:a.offsetWidth,height:a.offsetHeight}),a.classList.contains("maximize")?(a.style.width=v[b].width+"px",a.style.height=v[b].height+"px",c(b,"center center")):(a.style.width="100vw",a.style.height="100%",a.style.top="0",a.style.left="0"),a.classList.toggle("maximize"))})}var p=!1,q=document.getElementById("launchpad"),r=document.getElementById("launchNav"),s=document.getElementById("launch-content"),t=document.getElementById("dock"),u=document.getElementById("mac-terminal"),v={},w=9*parseFloat(getComputedStyle(document.documentElement).fontSize),x=window.innerHeight-w-3,y=EventTarget.prototype.addEventListener;EventTarget.prototype.addEventListener=function(a,b,c){if(["touchstart","touchmove","touchend","touchcancel","wheel","mousewheel"].includes(a)){var d=c||{};"object"===_typeof(d)?d.passive=!0:c={passive:!0},y.call(this,a,b,d)}else y.call(this,a,b,c)},document.getElementById("open-menu").addEventListener("click",function(){q.classList.contains("shown")&&q.classList.contains("start")?b():a()}),document.querySelectorAll(".launch").forEach(function(a){a.addEventListener("click",function(){b()})}),document.addEventListener("mouseup",function(a){(a.target===r||a.target===s)&&b()}),d("#mac-terminal"),$("#mac-terminal").fadeIn(350),v["#mac-terminal"]={width:u.offsetWidth,height:u.offsetHeight},function(a){$(a).draggable({cursor:"default",handle:".handle",cancel:".cancel, .icons",start:function(){f(this)},containment:"#main-content",distance:0}).on("click",function(){f(this)})}(".windows"),$("#launchNav").sortable(),$("#launchNav").disableSelection(),document.querySelector(".confirm").addEventListener("click",function(a){new Audio("../assets/audio/empty-trash.mp3").play(),a.preventDefault(),document.getElementById("trash").setAttribute("src","/assets/img/system/empty-trash.webp"),document.querySelector(".trash-dialogue").style.display="none";var b=document.getElementById("trash-icon"),c=b.cloneNode(!0);b.parentNode.replaceChild(c,b)}),$(".trash-dialogue").draggable({cursor:"default",cancel:".alert-btn",start:function(){f(this)},containment:"#main-content",distance:0}).on("mousedown",function(){f(this)}),$(".btn").draggable({cursor:"default",cancel:!1,containment:"#main-content",distance:0}),$("#mac-terminal, #email, #notes, #browser, .preview, .resume").resizable({containment:"#main-content",handles:"n, e, s, w, ne, nw, se, sw",animate:!0}),m("#play","#playlist",4),m("#wifi","#wifi-menu",0),n("#apple","#apple-menu"),n("#finder","#finder-menu"),n("#file","#file-menu"),n("#edit","#edit-menu"),n("#view","#view-menu"),n("#go","#go-menu"),n("#window","#window-menu"),n("#help","#help-menu"),g("#iTermDockIcon","#mac-terminal","inline-block"),g("#mailDockIcon","#email"),g("#textEditDockIcon","#text-edit"),g("#notesDockIcon","#notes"),g("#safariDockIcon","#browser"),g("#previewDockIcon",".preview"),g("#previewDockIcon",".resume"),g("#calcDockIcon","#calc","inline-block"),g("#trash-icon",".trash-dialogue","inline-block"),i("#aboutFile","#textEditDockIcon","#text-edit",!0),i("#resumeFile","#previewDockIcon",".resume"),i("#profilePic","#previewDockIcon",".preview"),j("#itermLaunch","#mac-terminal","#iTermDockIcon","inline-block"),j("#mailLaunch","#email","#mailDockIcon"),j("#textLaunch","#text-edit","#textEditDockIcon"),j("#notesLaunch","#notes","#notesDockIcon","block"),j("#safariLaunch","#browser","#safariDockIcon"),j("#calculatorLaunch","#calc","#calcDockIcon","inline-block"),k(".header__op-icon--red","#mac-terminal","#iTermDockIcon"),k(".email-header__op-icon--red","#email","#mailDockIcon"),k(".text-edit-header__op-icon--red","#text-edit","#textEditDockIcon"),k(".buttons-icon--red","#notes","#notesDockIcon"),k(".browser-buttons-icon--red","#browser","#safariDockIcon"),k(".calc-header__op-icon--red","#calc","#calcDockIcon"),k(".preview-header__op-icon--red",".preview","#previewDockIcon"),k(".resume-header__op-icon--red",".resume","#previewDockIcon"),k(".alert-btn",".trash-dialogue","#trash-icon"),o(".header__op-icon--green","#mac-terminal"),o(".browser-buttons-icon--green","#browser"),o(".email-header__op-icon--green","#email"),o(".buttons-icon--green","#notes"),o(".preview-header__op-icon--green",".preview"),o(".resume-header__op-icon--green",".resume")});