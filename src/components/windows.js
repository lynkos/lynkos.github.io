document.addEventListener("DOMContentLoaded", function() {
    /* VARIABLES */
    var aboutOpened = false;
    const fadeMs = 350;
    const launchpad = document.getElementById("launchpad");
    const launchpadNav = document.getElementById("launchNav");

    // Max height = calc(100vh - ($menubar-height + $dock-icon-size + (3 * $padding))) = calc(100vh - 9rem)
    const remToPx = 9 * parseFloat(getComputedStyle(document.documentElement).fontSize); // Convert 9rem to px
    const errorMargin = 3; // Include to account for calc discrepancies (i.e. few px off)
    const maxHeight = window.innerHeight - remToPx - errorMargin; // Lower bound of max height
    // No upper bound since oversized window should still be on top instead of center
    
    const originalAddEventListener = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function(type, listener, options) {
        const passiveEvents = [ "touchstart", "touchmove", "touchend", "touchcancel", "wheel", "mousewheel" ];
        if (passiveEvents.includes(type)) {
            const newOptions = options || {};
            if (typeof newOptions === "object") newOptions.passive = true;
            else options = { passive: true };
            originalAddEventListener.call(this, type, listener, newOptions);
        } else originalAddEventListener.call(this, type, listener, options);
    };

    // If your JavaScript uses general query selectors such as document.querySelectorAll('li'),
    // you may be unknowingly storing references to a very large number of nodes,
    // which can overwhelm the memory capabilities of your users' devices.
    
    /* FUNCTIONS */
    // Open launchpad
    function openLaunchpad() {        
        // Set up fade transition
        $("#menu-bar").fadeOut(fadeMs);
        $(".openWindow").fadeOut(fadeMs);
        
        // Show launchpad with animation classes
        launchpad.classList.add("shown", "start");
        
        // Find the nav element within launchpad and add class
        launchpadNav.classList.add("scale-down");
    }

    // Close launchpad
    function closeLaunchpad() {        
        // Remove start, add end
        launchpad.classList.remove("start");
        launchpad.classList.add("end");
        
        // Remove scale-down, add scale-up to nav
        launchpadNav.classList.remove("scale-down");
        launchpadNav.classList.add("scale-up");
        
        // After transition completes, remove shown & end classes
        setTimeout(function() {
            launchpad.classList.remove("shown", "end");
            launchpadNav.classList.remove("scale-up");
        }, fadeMs);
        
        $("#menu-bar").fadeIn(fadeMs);
        $(".openWindow").fadeIn(fadeMs);
    }

    // Center windows
    function centerWindow(win, my, at = "center") {
        $(win).position({
            my: my,
            at: at,
            collision: "fit",
            of: "#main-content"
        });
    }

    // Position window based off dims
    function positionWindow(win) {
        // Calculate menubar height (3rem) and convert to px
        // Used to subtract from vertical position to take menubar height into account
        //const dockHeight = document.getElementById("dock").offsetHeight;
        const menubarHeight = 36.5; // 3 * parseFloat(getComputedStyle(document.documentElement).fontSize); = 3rem --> px

        // IF window height >= max height, place at top (sub menubar height)
        if (document.querySelector(win).offsetHeight >= maxHeight) centerWindow(win, "top-" + menubarHeight, "top");

        // ELSE center
        else centerWindow(win, "center center-" + menubarHeight);
    }

    // ONLY auto-position window when first opened; this is to avoid calculating for windows that might never be opened
    function initPosition(icon, win, eventType) {
        // Ignore terminal since it's already positioned on load
        if (win !== "#mac-terminal") {
            $(icon).one(eventType, function() {
                // Auto-position all windows except About
                if (win !== "#text-edit") positionWindow(win);

                // Since About is the only window/app that can be opened in
                // multiple ways (i.e. clicking dock icon, double-clicking
                // or tapping Desktop file), only position it if not yet opened
                else if (!aboutOpened) {
                    positionWindow(win);
                    aboutOpened = true;
                }
            });
        }
    }
    
    // Bring clicked window to front
    function bringToFront(element) {
        // No need to increase z-index if already in front
        if (!$(element).hasClass("inFront")) {
            // Get highest z-index
            let maxZIndex = Math.max(...$(".windows, .trash-dialogue").map(function() {
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
                    else if ($(this).hasClass("trash-dialogue")) {
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
                    // Make sure menu dropdown, context menu, dock, and launchpad are always on top
                    $(".menu-dropdown").css("z-index", maxZIndex + 2);
                    $("#launch-content").css("z-index", maxZIndex + 3);
                    $("#dock").css("z-index", maxZIndex + 4);
                    $(".context-menu").css("z-index", maxZIndex + 5);

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
            else if ($(element).hasClass("trash-dialogue")) {
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
            distance: 0
        }).on("click", function() {
            bringToFront(this);
        });
    }

    // Bounce effect
    function bounce(selector) {
        $(selector).effect("bounce", { times: 3 }, 600);
    }

    // Open window/app via dock
    function openWindow(icon, win, displayType = "flex") {
        // Position window when first opened
        // Ignore #previewDockIcon since it can only initially be opened via desktop (not dock)
        // and is already init positioned when first opened via desktop
        if (icon !== "#previewDockIcon") initPosition(icon, win, "click");

        const windowElement = document.querySelector(win);
        const iconElement = document.querySelector(icon);
    
        iconElement.addEventListener("click", function() {
            closeLaunchpad();
            bringToFront(win);

            // Ignore preview and resume since they can only be opened via desktop (not dock)
            if (win !== ".preview" && win !== ".resume") {
                windowElement.style.display = displayType;
            
                if (!windowElement.classList.contains("openWindow")) windowElement.classList.add("openWindow");

                // Bounce effect for dock icons
                if (!iconElement.classList.contains("open")) {
                    // Bounce effect, if window is not already open
                    // Ignore #previewDockIcon since it can only initially be opened via desktop (not dock)
                    if (icon !== "#previewDockIcon") bounce(icon);
        
                    // Mark clicked window as opened
                    iconElement.classList.add("open");
                }
            }
        });
    }

    // Show file when clicking on desktop icon
    function showDesktopFile(dockIcon, win, inDock) {
        const windowElement = document.querySelector(win);
        const dockIconElement = document.getElementById(dockIcon);
        
        // Check if window is hidden and unhide it if it is
        if (getComputedStyle(windowElement).display === "none") windowElement.style.display = "flex";

        // Bring window to front
        bringToFront(win);
        
        // Mark window as open, if not already done so
        if (!windowElement.classList.contains("openWindow")) windowElement.classList.add("openWindow");
        
        // Handle dock icon if not already opened
        if (!dockIconElement.classList.contains("open")) {
            dockIconElement.classList.add("open");
            
            // Show dock icon if not already in dock
            if (!inDock) dockIconElement.style.display = "block";
        }
    }

    // Open Desktop file when double-clicking or tapping its icon
    function openDesktopFile(file, dockIcon, win, inDock = false) {
        // Only position window when first opened
        initPosition(file, win, "dblclick");
        initPosition(file, win, "touchend");

        const fileElement = document.querySelector(file);

        // Open file when double-clicking
        fileElement.addEventListener("dblclick", function(event) {
            event.preventDefault();
            showDesktopFile(dockIcon, win, inDock);
        });

        // Open file when tapping (mobile only)
        let moved = false;
        fileElement.addEventListener("touchstart", function() { moved = false; });
        fileElement.addEventListener("touchmove", function() { moved = true; });
        fileElement.addEventListener("touchend", function() {
            // Only open file if icon wasn't moved
            if (!moved) showDesktopFile(dockIcon, win, inDock);
        });
    }

    // Open app via launchpad
    function launchApp(launchIcon, win, dockIcon, displayType = "flex") {
        // Position window when first opened
        initPosition(launchIcon, win, "click");

        const _window = document.querySelector(win);
        const _dockIcon = document.querySelector(dockIcon);
    
        document.querySelector(launchIcon).addEventListener("click", function() {
            closeLaunchpad();
            bringToFront(win);
            _window.style.display = displayType;
            
            if (!_window.classList.contains("openWindow")) _window.classList.add("openWindow");
            if (!_dockIcon.classList.contains("open")) _dockIcon.classList.add("open");
            if ((dockIcon === "#previewDockIcon") || (dockIcon === "#calcDockIcon")) _dockIcon.style.display = "block";
        });
    }

    // Close window
    function closeWindow(closeBtn, win, dockIcon) {
        document.querySelector(closeBtn).addEventListener("click", function() {
            const _window = document.querySelector(win);
            const _dockIcon = document.querySelector(dockIcon);

            _window.style.display = "none";
            
            if (_window.classList.contains("openWindow")) _window.classList.remove("openWindow");
            if (_dockIcon.classList.contains("open")) _dockIcon.classList.remove("open");
    
            // Make sure preview dock icon ONLY disappears if both `profile.webp` and `resume.pdf` are closed
            if ((dockIcon === "#previewDockIcon" && 
                (!document.querySelector(".preview").classList.contains("openWindow") && 
                 !document.querySelector(".resume").classList.contains("openWindow"))) || 
                (dockIcon === "#calcDockIcon")) {
                    $(dockIcon).fadeOut(150);
            }
        });
    }

    // Show menu when icon clicked
    // TODO Improve toggle logic
    function showMenu(menubarBtn, menu, offset) {
        const menubarElement = document.querySelector(menubarBtn);
        const menuElement = document.querySelector(menu);

        // When button is clicked
        menubarElement.addEventListener("click", function(event) {
            // Toggle selected-menu class
            menubarElement.classList.toggle("selected-menu");

            // Position menu
            const buttonRect = menubarElement.getBoundingClientRect();
            const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
            const buttonLeftPosition = buttonRect.left + scrollLeft;
            menuElement.style.left = `${buttonLeftPosition + offset}px`;

            // Bring menu to front
            bringToFront(menu);
            
            // Show menu
            menuElement.style.display = "block";
            event.stopPropagation();
        });

        // Prevent menu from closing when clicking on it
        menuElement.addEventListener("mousedown", function(event) {
            event.stopPropagation();
        });

        // Hide menu when click outside
        document.addEventListener("mousedown", function() {
            $(menu).fadeOut(150);
            menubarElement.classList.remove("selected-menu");
        });
    }
    
    // Show right menu when icon clicked
    function showRightMenu(menubarBtn, menu, offset) {
        showMenu(menubarBtn, menu, offset + $(menubarBtn).width() - $(menu).width());
    }

    // Show left menu when icon clicked
    function showLeftMenu(menubarBtn, menu) {
        showMenu(menubarBtn, menu, 0);
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

    // Toggle launchpad on click
    document.getElementById("open-menu").addEventListener("click", function() {
        if (launchpad.classList.contains("shown") && launchpad.classList.contains("start")) closeLaunchpad();
        else openLaunchpad();
    });

    // Close launchpad when clicking any launchpad icon
    document.querySelectorAll(".launch").forEach(launchElement => {
        launchElement.addEventListener("click", function() {
            closeLaunchpad();
        });
    });
    
    // add class to launch while moving/dragging & remove when done
    // so that the launchpad doesn't close when sorting

    // Close the launchpad after the content is clicked, only if the target is not a link
    document.addEventListener("mouseup", function(event) {    
        if (event.target === launchpadNav || event.target === document.getElementById("launch-content")) closeLaunchpad();
    });
    
    // Position terminal
    positionWindow("#mac-terminal");
    
    // Show terminal on load
    $("#mac-terminal").fadeIn(fadeMs);

    // Apply draggable to all existing windows
    makeDraggable(".windows");

    // Make launchpad apps sortable
    $("#launchNav").sortable();
    $("#launchNav").disableSelection();

    // Empty trash
    $(".confirm").on("click", function(event) {
        new Audio("../assets/audio/empty-trash.mp3").play();
        event.preventDefault();
        $("#trash").attr("src", "/assets/img/system/empty-trash.webp");
        $("#trash-icon").off("click");
        $(".trash-dialogue").hide();
    });

    // Make trash dialogue draggable
    $(".trash-dialogue").draggable({
        cursor: "default",
        cancel: ".alert-btn",
        start: function() {
            bringToFront(this);
        },
        containment: "#main-content",
        distance: 0
    }).on("mousedown", function() {
        bringToFront(this);
    });

    // Make folder and file icons draggable
    $(".btn").draggable({
        cursor: "default",
        cancel: false,
        containment: "#main-content",
        distance: 0
    });

    // Make some windows resizeable
    $("#mac-terminal, #email, #notes, #browser, .preview, .resume").resizable({
        containment: "#main-content",
        handles: "n, e, s, w, ne, nw, se, sw",
        animate: true
    });

    // Show playlist when play icon clicked
    showRightMenu("#play", "#playlist", 4);

    // Show wifi menu when wifi icon clicked
    showRightMenu("#wifi", "#wifi-menu", 0);

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
    openWindow("#iTermDockIcon", "#mac-terminal", "inline-block");

    // Open mail
    openWindow("#mailDockIcon", "#email");

    // Open about me
    openWindow("#textEditDockIcon", "#text-edit");

    // Open projects
    openWindow("#notesDockIcon", "#notes");

    // Open safari
    openWindow("#safariDockIcon", "#browser");

    // Open preview
    openWindow("#previewDockIcon", ".preview");

    // Open resume
    openWindow("#previewDockIcon", ".resume");

    // Open calculator
    openWindow("#calcDockIcon", "#calc", "inline-block");

    // Open trash dialogue
    openWindow("#trash-icon", ".trash-dialogue", "inline-block");

    // Open about me when double-clicking or tapping `about.rtf`
    openDesktopFile("#aboutFile", "#textEditDockIcon", "#text-edit", true);

    // Open resume when double-clicking or tapping `resume.pdf`
    openDesktopFile("#resumeFile", "#previewDockIcon", ".resume");

    // Open preview when double-clicking or tapping `profile.webp`
    openDesktopFile("#profilePic", "#previewDockIcon", ".preview");

    // Launch terminal
    launchApp("#itermLaunch", "#mac-terminal", "#iTermDockIcon", "inline-block");

    // Launch mail
    launchApp("#mailLaunch", "#email", "#mailDockIcon");

    // Launch about me
    launchApp("#textLaunch", "#text-edit", "#textEditDockIcon");

    // Launch projects
    launchApp("#notesLaunch", "#notes", "#notesDockIcon", "block");

    // Launch safari
    launchApp("#safariLaunch", "#browser", "#safariDockIcon");

    // Launch calculator
    launchApp("#calculatorLaunch", "#calc", "#calcDockIcon", "inline-block");

    // Close terminal
    closeWindow(".header__op-icon--red", "#mac-terminal", "#iTermDockIcon");

    // Close mail
    closeWindow(".email-header__op-icon--red", "#email", "#mailDockIcon");

    // Close about me
    closeWindow(".text-edit-header__op-icon--red", "#text-edit", "#textEditDockIcon");

    // Close projects
    closeWindow(".buttons-icon--red", "#notes", "#notesDockIcon");

    // Close safari
    closeWindow(".browser-buttons-icon--red", "#browser", "#safariDockIcon");

    // Close calculator
    closeWindow(".calc-header__op-icon--red", "#calc", "#calcDockIcon");

    // Close preview
    closeWindow(".preview-header__op-icon--red", ".preview", "#previewDockIcon");

    // Close resume
    closeWindow(".resume-header__op-icon--red", ".resume", "#previewDockIcon");

    // Close trash dialogue
    closeWindow(".alert-btn", ".trash-dialogue", "#trash-icon");
});