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
    if (launchpad.hasClass("shown start")) closeLaunchpad();
    else openLaunchpad();
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
  $(".mac-terminal, .text-edit, .email, .calc, .notes, .browser, .dialogue, .preview").position({
    my: "center center-36.5", // Subtract menubar height (3rem = 28.8px when font-size is 9.6px = 60%) from vertical center
    at: "center",
    collision: "fit",
    of: "#main-content"
  });

  // Show terminal on load
  $(".mac-terminal").fadeIn(500); // .show(500);

  // TODO Improve playlist toggle logic
  // Show playlist when icon clicked
  $("#play").click(function(e) {
    $("#playlist").css("left", $("#play").offset().left - $("#playlist").width() + 14);

    // Bring playlist to front
    bringToFront("#playlist", ".windows, .btn, .dialogue, #playlist");

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
    
    if (content.is(e.target) || nav.is(e.target))
      closeLaunchpad();
  });

  // Grey out calculator's green button
  $(".calc-header__op-icon--green").css("--green", "rgba(255, 255, 255, 0.2)");
  $(".calc-header__op-icon--green").css("--green-active", "rgba(255, 255, 255, 0.1)");

  // Function to bring the clicked window to the front
  function bringToFront(element, allElements) {
    // Get the highest z-index
    let maxZIndex = Math.max(...$(allElements).map(function() {
      // If current element is open
      if ($(this).hasClass("openWindow")) {
        // If current element is a window
        if ($(this).hasClass("windows")) {
          // Make its buttons inactive
          $(this).css("--red", "rgba(255, 255, 255, 0.2)");
          $(this).css("--yellow", "rgba(255, 255, 255, 0.2)");
          $(this).css("--green", "rgba(255, 255, 255, 0.2)");
          $(this).css("--red-active", "rgba(255, 255, 255, 0.1)");
          $(this).css("--yellow-active", "rgba(255, 255, 255, 0.1)");
          $(this).css("--green-active", "rgba(255, 255, 255, 0.1)");
        }
        
        // If current element is trash dialogue
        else if ($(this).hasClass("dialogue")) {
          // Make its confirm buttons inactive
          $(this).css("--confirm", "rgb(115, 118, 115)");
          $(this).css("--confirm-active", "rgb(145, 148, 145)");
        }
      }

      return parseInt($(this).css("z-index")) || 0;
    }).get());

    // Set higher z-index for the given element
    if ($(element).css("z-index") <= maxZIndex) {
      $(element).css("z-index", maxZIndex + 1);

      // If not playlist (since it will never be on top of dock and/or launchpad)
      if (!$(element).is($("#playlist"))) {
        // Make sure dock and launchpad are always on top
        $(".launch-content").css("z-index", maxZIndex + 2);
        $(".dock").css("z-index", maxZIndex + 3);
      }
    }

    // If given element is a window
    if ($(element).hasClass("windows")) {
      // Make its buttons active
      $(element).css("--red", "#FF544D");
      $(element).css("--yellow", "#FFB429");
      $(element).css("--green", "#25C63A");
      $(element).css("--red-active", "#C14645");
      $(element).css("--yellow-active", "#c08E38");
      $(element).css("--green-active", "#029740");
    }

    // If given element is trash dialogue
    else if ($(element).hasClass("dialogue")) {
      // Make its confirm buttons active
      $(element).css("--confirm", "linear-gradient(to bottom, #DB6BFA, #993DB3)"); // vars.$button-gradient
      $(element).css("--confirm-active", "#DB6BFA"); // vars.$primary-button-color
    }
  }

  // Make windows draggable and bring to front on drag
  function makeDraggable(selector) {
    $(selector).draggable({
      cursor: "default",
      handle: ".header, .text-edit-header, .mail-header, .calc-header, .sidebar-header, .main-header, .top, .preview-header",
      cancel: ".header__op-icon, .text-edit-header__op-icon, .mail-header__op-icon, .calc-header__op-icon, .buttons-icon, #send-btn, .search-bar, .browser-buttons-icon, .icons, .address, .preview-header__op-icon, .preview-header-icons",
      start: function() {
        bringToFront(this, ".windows, .btn, .dialogue");
      },
      containment: "#main-content",
      distance: 0,
    }).on("click", function() {
      bringToFront(this, ".windows, .btn, .dialogue");
    });
  }

  // Apply draggable to all existing windows
  makeDraggable(".windows");

  // Make dialogue draggable
  $(".dialogue").draggable({
    cursor: "default",
    cancel: ".alert-btn",
    start: function() {
      bringToFront(this, ".windows, .btn, .dialogue");
    },
    // stack: ".windows, .btn, .dialogue",
    containment: "#main-content",
    distance: 0,
  }).on("mousedown", function() {
    bringToFront(this, ".windows, .btn, .dialogue");
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
  $(".child-nav li", ".sidebar").on("click", function() {
    $(".child-nav li", ".sidebar").removeClass("active");
    if (!$(this).hasClass("active")) $(this).addClass("active");
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
    $(icon).on("click", function() {
      closeLaunchpad();
      $(win).css("display", displayType);
      bringToFront(win, ".windows, .btn, .dialogue");
      if (!$(win).hasClass("openWindow")) $(win).addClass("openWindow");
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

  // Open safari
  openWindow("#safari", ".browser", "flex");

  // Open trash dialogue
  openWindow("#trash-icon", ".dialogue", "inline-block");

  // Open about me when double-clicking "about.rtf"
  $("#aboutFile").dblclick(function() {
    if ($(".text-edit").css("display") === "none") $(".text-edit").css("display", "flex");
    bringToFront(".text-edit", ".windows, .btn, .dialogue");
    if (!$(".text-edit").hasClass("openWindow")) $(".text-edit").addClass("openWindow");
    if (!$("#text-edit").hasClass("open")) $("#text-edit").addClass("open");
  });

  // Open preview when double-clicking "profile.jpg"
  $("#profilePic").dblclick(function() {
    if ($(".preview").css("display") === "none") $(".preview").css("display", "flex");
    bringToFront(".preview", ".windows, .btn, .dialogue");
    if (!$(".preview").hasClass("openWindow")) $(".preview").addClass("openWindow");
    if (!$("#preview").hasClass("open")) $("#preview").addClass("open");
  });  

  // Open app via launchpad
  function launchApp(icon, win, displayType, dockIcon) {
    $(icon).on("click", function() {    
      closeLaunchpad();
      bringToFront(win, ".windows, .btn, .dialogue");
      $(win).css("display", displayType);
      if (!$(win).hasClass("openWindow")) $(win).addClass("openWindow");
      if (($(dockIcon) !== null) && !$(dockIcon).hasClass("open")) $(dockIcon).addClass("open");
    });
  }

  // Open terminal
  launchApp("#itermLaunch", ".mac-terminal", "inline-block", "#iterm");

  // Open mail
  launchApp("#mailLaunch", ".email", "flex", "#mail");

  // Open about me
  launchApp("#textLaunch", ".text-edit", "flex", "#text-edit");

  // Open projects
  launchApp("#notesLaunch", ".notes", "block", "#notes");

  // Open safari
  launchApp("#safariLaunch", ".browser", "flex", "#safari");  

  // Open calculator
  launchApp("#calculatorLaunch", ".calc", "inline-block", null);  

  // Open calculator
  launchApp("#previewLaunch", ".preview", "flex", null);  

  // Empty trash
  $(".confirm").click(function (e) {
    new Audio("../assets/audio/empty_trash.mp3").play();
    e.preventDefault();
    $("#trash").attr("src", "/assets/images/system/empty_trash.png");
    $("#trash-icon").off("click");
  });

  // Close window
  function closeWindow(close, win, dockIcon) {
    $(close).on("click", function() {
      $(win).css("display", "none");
      if ($(win).hasClass("openWindow")) $(win).removeClass("openWindow");
      if (($(dockIcon) !== null) && $(dockIcon).hasClass("open")) $(dockIcon).removeClass("open");
    });
  }
  
  // Close terminal
  closeWindow(".header__op-icon--red", ".mac-terminal", "#iterm");

  // Close mail
  closeWindow(".mail-header__op-icon--red", ".email", "#mail");

  // Close about me
  closeWindow(".text-edit-header__op-icon--red", ".text-edit", "#text-edit");

  // Close projects
  closeWindow(".buttons-icon--red", ".notes", "#notes");

  // Close safari
  closeWindow(".browser-buttons-icon--red", ".browser", "#safari");

  // Close calculator
  closeWindow(".calc-header__op-icon--red", ".calc", null);

  // Close preview
  closeWindow(".preview-header__op-icon--red", ".preview", null);

  // Close trash dialogue
  closeWindow(".alert-btn", ".dialogue", "#trash-icon");  
    
  // Minimize terminal
  $(".header__op-icon--yellow").click(function() {
      // $(".mac-terminal").css("transform", "translateY(82%) translateX(0%) scale(0.75)");
      // $(".mac-terminal").css("transition", "all 0.25s");
    $(".mac-terminal").toggleClass("minimize");
    if ($(".mac-terminal").hasClass("maximize")) $(".mac-terminal").removeClass("maximize");
  });

  // Maximize terminal
  $(".header__op-icon--green").click(function() {
    $(".mac-terminal").toggleClass("maximize");
    if ($(".mac-terminal").hasClass("minimize")) $(".mac-terminal").removeClass("minimize");
  });

  // Toggle bold text in TextEdit
  $("#bold-btn").click(function() {
    $(".text-body").toggleClass("bold");
  });

  // Toggle italic text in TextEdit
  $("#italic-btn").click(function() {
    $(".text-body").toggleClass("italic");
  });

  // Toggle underlined text in TextEdit
  $("#underline-btn").click(function() {
    $(".text-body").toggleClass("underline");
  });

  // Remove classes in element
  function removeClasses(element, classes) {
    for (let i = 0; i < classes.length; i++) {
      if ($(element).hasClass(classes[i])) $(element).removeClass(classes[i]);
    }
  }

  // Toggle left text alignment in TextEdit
  $("#left-btn").click(function() {
    $(".text-body").toggleClass("left");
    removeClasses(".text-body", [ "right", "center", "justify" ]);
  });

  // Toggle center text alignment in TextEdit
  $("#center-btn").click(function() {
    $(".text-body").toggleClass("center");
    removeClasses(".text-body", [ "right", "left", "justify" ]);
  });

  // Toggle right text alignment in TextEdit
  $("#right-btn").click(function() {
    $(".text-body").toggleClass("right");
    removeClasses(".text-body", [ "center", "left", "justify" ]);
  });

  // Toggle justify text alignment in TextEdit
  $("#justify-btn").click(function() {
    $(".text-body").toggleClass("justify");
    removeClasses(".text-body", [ "center", "left", "right" ]);
  });
});

// Update text color in TextEdit
const colorPicker = document.getElementById("colorPicker");
colorPicker.addEventListener("input", function() {
  $(".text-body").css("color", this.value);
});

// Update font size in TextEdit
const fontSize = document.getElementById("fontSize");
fontSize.addEventListener("change", function() {
  $(".text-body").css("font-size", (this.value / 10) + "rem");
});

// Update font family in TextEdit
const fontFamily = document.getElementById("fontFamily");
fontFamily.addEventListener("change", function() {
  $(".text-body").css("font-family", this.value);
});

// Update line height in TextEdit
const lineHeight = document.getElementById("lineHeight");
lineHeight.addEventListener("change", function() {
  $(".text-body").css("line-height", this.value);
});

// Make selected project in Notes sidebar active and all others inactive
var selectProject = function(element) {
  var projectInfo = document.getElementsByClassName("project");

  for (let j = 0; j < projectInfo.length; ++j) {
    projectInfo[j].classList.remove("active");
  }

  var project = document.querySelector("#" + element.dataset.id);
  project.classList.add("active");
}

// Select project from projects in Notes sidebar
document.querySelectorAll(".project-name").forEach(function(element) {
  element.addEventListener("click", function(e) {
    selectProject(e.target)
  });
});