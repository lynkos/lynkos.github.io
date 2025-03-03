$(document).ready(function() {
    /* VARIABLES */
    var angle = 0;
    var zoom = 1;

    /* JAVASCRIPT FUNCTIONS */
    // Open launchpad
    function openLaunchpad() {
        $(".menu-bar").fadeOut(400);
        $(".openWindow").fadeOut(400);
        $("#launchpad").addClass("shown start");
        $("#launchpad").find("nav").addClass("scale-down");
    }

    // Close launchpad
    function closeLaunchpad() {
        $("#launchpad")
            .removeClass("start")
            .addClass("end");
        $("#launchpad").find("nav")
            .removeClass("scale-down")
            .addClass("scale-up");
        setTimeout(function() {
            $("#launchpad").removeClass("shown end");
            $("#launchpad").find("nav").removeClass("scale-up");
        }, 350);
        $(".menu-bar").fadeIn(400);
        $(".openWindow").fadeIn(400);
    }

    // Center windows
    function centerWindow(win, pos) {
        $(win).position({
            my: pos, // Subtract menubar height (3rem = 28.8px when font-size is 9.6px = 60%) from vertical center
            at: "center",
            collision: "fit",
            of: "#main-content"
        });
    }

    // Bring clicked window to front
    function bringToFront(element) {
        // No need to increase z-index if already in front
        if (!$(element).hasClass("inFront")) {
            // Get highest z-index
            let maxZIndex = Math.max(...$(".windows, .btn, .dialogue, .menu-dropdown").map(function() {
                // If current element is open
                if ($(this).hasClass("openWindow")) {
                    // If current element is a window
                    if ($(this).hasClass("windows")) {
                        // Make its buttons inactive
                        $(this).css("--red", "rgba(255, 255, 255, 0.2)");
                        $(this).css("--yellow", "rgba(255, 255, 255, 0.2)");
                        $(this).css("--green", "rgba(255, 255, 255, 0.2)");
                    }

                    // If current element is trash dialogue
                    else if ($(this).hasClass("dialogue")) {
                        // Make its confirm buttons inactive
                        $(this).css("--confirm", "rgb(115, 118, 115)");
                        $(this).css("--confirm-active", "rgb(145, 148, 145)");
                    }
                }

                // Mark other [open] windows as not in front
                if ($(this).hasClass("inFront")) $(this).removeClass("inFront");

                return parseInt($(this).css("z-index")) || 0;
            }).get());

            // Set higher z-index for the given element
            if ($(element).css("z-index") <= maxZIndex) {
                $(element).css("z-index", maxZIndex + 1);

                // If not menu dropdown (since it will never be on top of dock and/or launchpad)
                if (!$(element).hasClass("menu-dropdown")) {
                    // Make sure menu dropdown, dock, and launchpad are always on top
                    $(".menu-dropdown").css("z-index", maxZIndex + 2);
                    $(".launch-content").css("z-index", maxZIndex + 3);
                    $(".dock").css("z-index", maxZIndex + 4);

                    // Mark element as in front
                    $(element).addClass("inFront");
                }
            }

            // If given element is a window
            if ($(element).hasClass("windows")) {
                // Make its buttons active
                $(element).css("--red", "#ed6a5e");
                $(element).css("--yellow", "#f5bf4f");
                $(element).css("--green", "#62c554");
            }

            // If given element is trash dialogue
            else if ($(element).hasClass("dialogue")) {
                // Make its confirm buttons active
                $(element).css("--confirm", "linear-gradient(to bottom, #DB6BFA, #993DB3)"); // vars.$button-gradient
                $(element).css("--confirm-active", "#DB6BFA"); // vars.$primary-button-color
            }
        }
    }

    // Make windows draggable and bring to front on drag
    function makeDraggable(selector) {
        $(selector).draggable({
            cursor: "default",
            handle: ".handle",
            cancel: ".cancel, .icons",
            start: function() {
                bringToFront(this);
            },
            containment: "#main-content",
            distance: 0,
        }).on("click", function() {
            bringToFront(this);
        });
    }

    // Bounce effect
    function bounce(selector) {
        $(selector).effect("bounce", { times: 3 }, 600);
    }

    // Open window
    function openWindow(icon, win, displayType) {
        $(icon).on("click", function() {
            closeLaunchpad();
            $(win).css("display", displayType);
            bringToFront(win);
            if (!$(win).hasClass("openWindow")) $(win).addClass("openWindow");

            // Bounce effect for dock icons
            if (!$(icon).hasClass("open")) {
                // Bounce effect, if window is not already open
                bounce(icon);

                // Mark clicked window as opened
                $(icon).addClass("open");
            }
        });
    }

    // Show file when clicking on desktop icon
    function showFile(icon, win, inDock) {
        if ($(win).css("display") === "none") $(win).css("display", "flex");
        bringToFront(win);
        if (!$(win).hasClass("openWindow")) $(win).addClass("openWindow");
        if (!$(icon).hasClass("open")) {
            $(icon).addClass("open");
            if (inDock) $(icon).show();
        }
    }

    // Open file when double-clicking or tapping its icon
    function openFile(file, icon, win, inDock) {
        // Open file when double-clicking
        $(file).on("dblclick", function(event) {
            event.preventDefault();
            showFile(icon, win, inDock);    
        });

        // Open file when tapping (mobile only)
        $(file)
        .on("touchstart", function() {
            $(this).data("moved", false);
        })
        .on("touchmove", function() {
            $(this).data("moved", true);
        })
        .on("touchend", function() {
            // Only open file if icon wasn't moved
            if ($(this).data("moved") === false) showFile(icon, win, inDock);
        });
    }

    // Open app via launchpad
    function launchApp(icon, win, displayType, dockIcon) {
        $(icon).on("click", function() {
            closeLaunchpad();
            bringToFront(win);
            $(win).css("display", displayType);
            if (!$(win).hasClass("openWindow")) $(win).addClass("openWindow");
            if (!$(dockIcon).hasClass("open")) $(dockIcon).addClass("open");
            if ((dockIcon === "#preview") || (dockIcon === "#calc")) $(dockIcon).show();
        });
    }

    // Close window
    function closeWindow(close, win, dockIcon, width, height) {
        $(close).on("click", function() {
            $(win).css("display", "none");
            if ($(win).hasClass("openWindow")) $(win).removeClass("openWindow");
            if ($(dockIcon).hasClass("open")) $(dockIcon).removeClass("open");

            // Make sure preview dock icon ONLY disappears if both `profile.webp` and `resume.pdf` are closed
            if ((dockIcon === "#preview" && (!$(".preview").hasClass("openWindow") && !$(".resume").hasClass("openWindow"))) || (dockIcon === "#calc")) $(dockIcon).fadeOut(150);
            // if ($(win).hasClass("maximize")) {
            //   $(win).css("width", width);
            //   $(win).css("height", height);
            //   centerWindow(win, "center center");
            //   $(win).removeClass("maximize");
            //   $("footer").show();
            // }
        });
    }

    // Remove classes in element
    function removeClasses(element, classes) {
        for (let i = 0; i < classes.length; i++) {
            if ($(element).hasClass(classes[i])) $(element).removeClass(classes[i]);
        }
    }

    // Show menu when icon clicked
    // TODO Improve toggle logic
    function showMenu(btn, menu, offset) {
        // When button is clicked
        $(btn).click(function(event) {
            
            // Select icon; same color as active menu item
            // if ($(btn).hasClass("selected-menu")) {
                
            //     $(btn).css("background", "transparent");
            // }
            // else {
            //     //$(btn).addClass("selected-menu");
            //     $(btn).css("background", "rgba(255, 255, 255, 0.2)");
            // }

            $(btn).toggleClass("selected-menu");

            // Change background color of icon
            // $(btn).css("background", "rgba(255, 255, 255, 0.2)");

            // Position menu
            $(menu).css("left", $(btn).offset().left + offset);    

            // Bring menu to front
            bringToFront(menu);
    
            // Show menu
            $(menu).show();
            event.stopPropagation();
        });

        // Prevent menu from closing when clicking on it
        $(menu).mousedown(function(event) {
            event.stopPropagation();
        });

        // Hide menu when click outside
        $(document).mousedown(function() {
            $(menu).fadeOut(250);
            $(btn).removeClass("selected-menu");
            //$(btn).css("background", "transparent");
        });
    }
    
    // Show right menu when icon clicked
    function showRightMenu(btn, menu, offset) {
        showMenu(btn, menu, offset - $(menu).width());
    }

    // Show left menu when icon clicked
    function showLeftMenu(btn, menu) {
        showMenu(btn, menu, 0);
    }

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

    /* JQUERY FUNCTIONS */
    // Toggle launchpad
    $(".open-menu").on("click", function() {
        if ($("#launchpad").hasClass("shown start")) closeLaunchpad();
        else openLaunchpad();
    });

    // Close launchpad when clicking any launchpad icon
    $(".launch").click(function() {
        closeLaunchpad();
    });

    // add class to launch while moving/dragging & remove when done
    // so that the launchpad doesn't close when sorting

    // Close the launchpad when the content is clicked, only if the target is not a link
    $(document).mouseup(function(event) {
        var content = $("#launchpad").find(".launch-content"),
            nav = content.find("nav");

        if (content.is(event.target) || nav.is(event.target)) closeLaunchpad();
    });

    // Highlight clicked nav item
    $(".child-nav li", ".sidebar").on("click", function() {
        $(".child-nav li", ".sidebar").removeClass("active");
        if (!$(this).hasClass("active")) $(this).addClass("active");
    });

    // Make GitHub icon bounce on click/tap
    $("#github-dock").click(function() {
        bounce(this);
    });

    // Rotate picture in `profile.webp` preview
    $("#rotate").on("click", function() {
        angle = (angle - 90) % 360;    
    });

    // Zoom into picture in `profile.webp` preview
    $("#zoomIn").on("click", function() {
        if (zoom < 2.1) {
            if ($("#zoomIn").hasClass("inactive")) $("#zoomIn").removeClass("inactive");
            if ($("#zoomOut").hasClass("inactive")) $("#zoomOut").removeClass("inactive");
            zoom += 0.1;
        } else if (!$("#zoomIn").hasClass("inactive")) $("#zoomIn").addClass("inactive");
    });

    // Zoom out of picture in `profile.webp` preview
    $("#zoomOut").on("click", function() {
        if (zoom > 0.2) {
            if ($("#zoomOut").hasClass("inactive")) $("#zoomOut").removeClass("inactive");
            if ($("#zoomIn").hasClass("inactive")) $("#zoomIn").removeClass("inactive");
            zoom -= 0.1;
        } else if (!$("#zoomOut").hasClass("inactive")) $("#zoomOut").addClass("inactive");
    });

    // Apply both zoom and rotation to picture in `profile.webp` preview
    $("#zoomOut, #zoomIn, #rotate").on("click", function() {
        $("#fullProfilePic").css("transform", "rotate(" + angle + "deg) scale(" + zoom + ")");
        $("#fullProfilePic").css("-moz-transform", "rotate(" + angle + "deg) scale(" + zoom + ")");
        $("#fullProfilePic").css("-ms-transform", "rotate(" + angle + "deg) scale(" + zoom + ")");
        $("#fullProfilePic").css("-o-transform", "rotate(" + angle + "deg) scale(" + zoom + ")");
        $("#fullProfilePic").css("-webkit-transform", "rotate(" + angle + "deg) scale(" + zoom + ")");
    });

    // Empty trash
    $(".confirm").click(function(event) {
        new Audio("../assets/audio/empty-trash.mp3").play();
        event.preventDefault();
        $("#trash").attr("src", "/assets/img/system/empty-trash.webp");
        $("#trash-icon").off("click");
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

    // Center windows on load
    centerWindow(".windows, .dialogue", "center center-36.5");

    // Show terminal on load
    $(".mac-terminal").fadeIn(500);

    // Apply draggable to all existing windows
    makeDraggable(".windows");

    // Make launchpad apps sortable
    $("#launchNav").sortable();
    $("#launchNav").disableSelection();

    // Make dialogue draggable
    $(".dialogue").draggable({
        cursor: "default",
        cancel: ".alert-btn",
        start: function() {
            bringToFront(this);
        },
        // stack: ".windows, .btn, .dialogue",
        containment: "#main-content",
        distance: 0,
    }).on("mousedown", function() {
        bringToFront(this);
    });

    // Make folder and file icons draggable
    $(".btn").draggable({
        cursor: "default",
        cancel: false,
        containment: "#main-content",
        distance: 0,
    });

    // Resize certain windows
    $(".mac-terminal, .email, .notes, .browser, .preview, .resume").resizable({
        containment: "#main-content",
        handles: "n, e, s, w, ne, nw, se, sw",
        animate: true
    });

    // Show playlist when play icon clicked
    showRightMenu("#play", "#playlist", 13);

    // Show wifi menu when wifi icon clicked
    showRightMenu("#wifi", "#wifi-menu", 13);

    // Show apple menu when apple icon clicked
    showLeftMenu("#apple", "#apple-menu");

    // Show finder menu when finder clicked
    showLeftMenu("#finder", "#finder-menu");

    // Show file menu when file clicked
    showLeftMenu("#file", "#file-menu");

    // Show edit menu when edit clicked
    showLeftMenu("#edit", "#edit-menu");

    // Show view menu when view clicked
    showLeftMenu("#view", "#view-menu");

    // Show go menu when go clicked
    showLeftMenu("#go", "#go-menu");

    // Show window menu when window clicked
    showLeftMenu("#window", "#window-menu");

    // Show help menu when help clicked
    showLeftMenu("#help", "#help-menu");

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

    // Open preview
    openWindow("#preview", ".preview", "flex");

    // Open resume
    openWindow("#preview", ".resume", "flex");

    // Open calculator
    openWindow("#calc", ".calc", "inline-block");

    // Open trash dialogue
    openWindow("#trash-icon", ".dialogue", "inline-block");

    // Open about me when double-clicking or tapping `about.rtf`
    openFile("#aboutFile", "#text-edit", ".text-edit", false);

    // Open resume when double-clicking or tapping `resume.pdf`
    openFile("#resumeFile", "#preview", ".resume", true);

    // Open preview when double-clicking or tapping `profile.webp`
    openFile("#profilePic", "#preview", ".preview", true);

    // Launch terminal
    launchApp("#itermLaunch", ".mac-terminal", "inline-block", "#iterm");

    // Launch mail
    launchApp("#mailLaunch", ".email", "flex", "#mail");

    // Launch about me
    launchApp("#textLaunch", ".text-edit", "flex", "#text-edit");

    // Launch projects
    launchApp("#notesLaunch", ".notes", "block", "#notes");

    // Launch safari
    launchApp("#safariLaunch", ".browser", "flex", "#safari");

    // Launch calculator
    launchApp("#calculatorLaunch", ".calc", "inline-block", "#calc");

    // Close terminal
    closeWindow(".header__op-icon--red", ".mac-terminal", "#iterm", "40rem", "44.5rem");

    // Close mail
    closeWindow(".mail-header__op-icon--red", ".email", "#mail", "47rem", "42rem");

    // Close about me
    closeWindow(".text-edit-header__op-icon--red", ".text-edit", "#text-edit", "48.35rem", "45rem");

    // Close projects
    closeWindow(".buttons-icon--red", ".notes", "#notes", "55rem", "45rem");

    // Close safari
    closeWindow(".browser-buttons-icon--red", ".browser", "#safari", "55rem", "45rem");

    // Close calculator
    closeWindow(".calc-header__op-icon--red", ".calc", "#calc");

    // Close preview
    closeWindow(".preview-header__op-icon--red", ".preview", "#preview", "55rem", "40rem");

    // Close resume
    closeWindow(".resume-header__op-icon--red", ".resume", "#preview", "55rem", "55rem");

    // Close trash dialogue
    closeWindow(".alert-btn", ".dialogue", "#trash-icon");

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

    // // Maximize resume
    // maximizeWindow(".resume-header__op-icon--green", ".resume", "55rem", "55rem");
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
    element.addEventListener("click", function(event) {
        selectProject(event.target)
    });
});