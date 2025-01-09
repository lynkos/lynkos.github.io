$(document).ready(function() {
  var launchpad = $("#launchpad");
    
  // Open launchpad
  function openLaunchpad() {
    $(".menu-bar").fadeOut(400);
    $(".openWindow").fadeOut(400);
    launchpad.addClass("shown start");
    launchpad.find("nav").addClass("scale-down");
  }

  // Toggle launchpad
  $(".open-menu").on("click", function() {
    if (launchpad.hasClass("shown start")) {
      closeLaunchpad();
    } else openLaunchpad();
  });

  // Close launchpad
  function closeLaunchpad() {
    launchpad
      .removeClass("start")
      .addClass("end");
    launchpad.find("nav")
      .removeClass("scale-down")
      .addClass("scale-up");
    setTimeout(function() {
      launchpad.removeClass("shown end");
      launchpad.find("nav").removeClass("scale-up");
    }, 350);
    $(".menu-bar").fadeIn(400);
    $(".openWindow").fadeIn(400);
  }

  // Close launchpad when clicking any launchpad icon
  $(".launch").click(function() {
    closeLaunchpad();
  });

  // Make launchpad apps sortable
  $("#launchNav").sortable();
  $("#launchNav").disableSelection();

  // Center windows
  $(".mac-terminal, .text-edit, .email, .calc, .notes").position({
    my: "center center-36.5", // Subtract menubar height (3rem = 28.8px when font-size is 9.6px = 60%) from vertical center
    at: "center",
    collision: "fit",
    of: "#main-content"
  });

  // Show terminal on load
  $('.mac-terminal').fadeIn(500); // .show(500);

  // TODO Improve playlist toggle logic
  // Show playlist when icon clicked
  $("#play").click(function(e) {
    $("#playlist").css("left", $("#play").offset().left - $("#playlist").width() + 20);
    //bringToFront("#playlist");

    // Reset z-index for all windows
    let maxZIndex = Math.max(...$('.windows, .btn, .dialogue').map(function() {
      return parseInt($(this).css("z-index")) || 0;
    }).get());

    // Set higher z-index for the clicked window
    $("#playlist").css("z-index", maxZIndex + 1);

    // Show playlist
    $("#playlist").show();
    e.stopPropagation();
  });
  
  // Prevent playlist from closing when clicking on it
  $("#playlist").mousedown(function(e) {
    e.stopPropagation();
  });
  
  // Hide playlist when click outside
  $(document).mousedown(function() {
    $("#playlist").fadeOut(250);
  });

  // add class to launch while moving/dragging & remove when done
  // so that the launchpad doesn't close when sorting

  // Close the launchpad when the content is clicked, only if the target is not a link
  $(document).mouseup(function (e) {
    var content = launchpad.find(".launch-content"),
        nav = content.find("nav");
    
    if (content.is(e.target) || nav.is(e.target))
      closeLaunchpad();
  });

  // Grey out calculator's green button
  $(".calc-header__op-icon--green").css("--green", "rgba(255, 255, 255, 0.2)");
  $(".calc-header__op-icon--green").css("--green-active", "rgba(255, 255, 255, 0.1)");

  // Function to bring the clicked window to the front
  function bringToFront(element) {
    let maxZIndex = Math.max(...$('.windows, .btn, .dialogue').map(function() {
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
      handle: ".header, .text-edit-header, .mail-header, .calc-header, .sidebar-header, .main-header",
      cancel: ".header__op, .text-edit-header__op, .mail-header__op, .calc-header__op, .buttons-icon, .send-btn, .search-bar, .icons",
      start: function() {
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

  // Resize app store sidebar
  $(".sidebar").resizable({
    containment: ".notes",
    handles: "e"
  });

  // Dock Resizing
  // $('.divider').resizable({
  //   handles: 'n',
  //   maxHeight: 120,
  //   minHeight: 20,
  //   resize: function(event, ui) {
  //     $('.icon').css({
  //       width: ui.size.height,
  //       height: ui.size.height
  //     });
  //     $('.dock').css('height', ui.size.height + 10);
  //   }
  // });  

  // Highlight clicked nav item
  $('.child-nav li', '.sidebar').on("click", function() {
    $('.child-nav li', '.sidebar').removeClass('active');
    $(this).addClass('active');
  });

  // Make GitHub icon bounce on click
  $("#github").click(function() {
    $(this).effect("bounce", { times: 3 }, 600);
  });

  function bounceIcon(selector) {
    if (!$(selector).hasClass("open")) {
      // Bounce effect, if window is not already open
      $(selector).effect("bounce", { times: 3 }, 600);

      // Mark clicked window as opened
      $(selector).addClass("open");
    }
  }

  // Open window
  function openWindow(icon, win, displayType) {
    $(icon).on('click', function() {
      closeLaunchpad();
      $(win).css("display", displayType);
      bringToFront(win);
      $(win).addClass("openWindow");
      bounceIcon(icon);
    });
  }

  // Open terminal
  openWindow("#iterm", ".mac-terminal", "inline-block");

  // Open mail
  openWindow("#mail", ".email", "flex");

  // Open about me
  openWindow("#text-edit", ".text-edit", "flex");

  // Open projects
  openWindow("#notes", ".notes", "flex");

  // Open calculator
  openWindow("#calculator", ".calc", "inline-block");

  // Open trash dialogue
  openWindow("#trash-icon", ".dialogue", "inline-block");

  // Open app via launchpad
  function launchApp(icon, win, displayType) {
    $(icon).on('click', function() {    
      closeLaunchpad();
      bringToFront(win);
      $(win).css("display", displayType);
      $(win).addClass("openWindow");
    });
  }

  // Open terminal
  launchApp("#itermLaunch", ".mac-terminal", "inline-block");

  // Open mail
  launchApp("#mailLaunch", ".email", "flex");

  // Open about me
  launchApp("#textLaunch", ".text-edit", "flex");

  // Open projects
  launchApp("#notesLaunch", ".notes", "block");

  // Open calculator
  launchApp("#calculatorLaunch", ".calc", "inline-block");  

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
      $(win).removeClass("openWindow");
      $(parent).removeClass("open");
    });
  }
  
  // Close terminal
  closeWindow('.header__op-icon--red', '.mac-terminal', "#iterm");

  // Close mail
  closeWindow('.mail-header__op-icon--red', '.email', "#mail");

  // Close about me
  closeWindow('.text-edit-header__op-icon--red', '.text-edit', "#text-edit");

  // Close projects
  closeWindow('.buttons-icon--red', '.notes', "#notes");

  // Close calculator
  closeWindow('.calc-header__op-icon--red', '.calc', "#calculator");

  // Close trash dialogue
  closeWindow('.alert-btn', '.dialogue', "#trash-icon");  
    
  // Minimize terminal
  $('.header__op-icon--yellow').click(function() {
      // $('.mac-terminal').css("transform", "translateY(82%) translateX(0%) scale(0.75)");
      // $('.mac-terminal').css("transition", "all 0.25s");
    $('.mac-terminal').toggleClass('minimize');
    $('.mac-terminal').removeClass('maximize');
  });

  // Maximize terminal
  $('.header__op-icon--green').click(function() {
    $('.mac-terminal').toggleClass('maximize');
    $('.mac-terminal').removeClass('minimize');
  });

  $('#bold-btn').click(function() {
    $('.text-body').toggleClass("bold");
  });

  $('#italic-btn').click(function() {
    $('.text-body').toggleClass("italic");
  });

  $('#underline-btn').click(function() {
    $('.text-body').toggleClass("underline");
  });

  $('#left-btn').click(function() {
    $('.text-body').toggleClass("left");
    $('.text-body').removeClass("right");
    $('.text-body').removeClass("center");
    $('.text-body').removeClass("justify");
  });

  $('#center-btn').click(function() {
    $('.text-body').toggleClass("center");
    $('.text-body').removeClass("right");
    $('.text-body').removeClass("left");
    $('.text-body').removeClass("justify");
  });

  $('#right-btn').click(function() {
    $('.text-body').toggleClass("right");
    $('.text-body').removeClass("left");
    $('.text-body').removeClass("center");
    $('.text-body').removeClass("justify");
  });

  $('#justify-btn').click(function() {
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
  $('.text-body').css("font-size", (this.value / 10) + "rem");
});

const fontFamily = document.getElementById("fontFamily");
fontFamily.addEventListener("change", function() {
  $('.text-body').css("font-family", this.value);
});

const lineHeight = document.getElementById("lineHeight");
lineHeight.addEventListener("change", function() {
  $('.text-body').css("line-height", this.value);
});

var selectProject = function(element) {
  var projectInfo = document.getElementsByClassName("project");

  for (j = 0; j < projectInfo.length; ++j) {
    projectInfo[j].classList.remove("active");
  }

  project = document.querySelector("#" + element.dataset.id);
  project.classList.add("active");
}

document.querySelectorAll(".project-name").forEach(function(el) {
  el.addEventListener("click", function(e) {
    selectProject(e.target)
  });
});