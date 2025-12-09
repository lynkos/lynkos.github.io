/**
 * @license MIT
 * Copyright © 2024 – 2025 Kiran Brahmatewari. All rights reserved.
 * 
 * This work is licensed under the terms of the MIT license.
 * Refer to https://opensource.org/licenses/MIT for a copy.
 */

document.addEventListener("DOMContentLoaded", function() {
    /* VARIABLES */
    var aboutOpened = false;
    const fadeMs = 350;
    const launchpad = document.getElementById("launchpad");
    const launchpadNav = document.getElementById("launchNav");
    const launchContent = document.getElementById("launch-content");
    const dock = document.getElementById("dock");
    const macTerminal = document.getElementById("mac-terminal");
    const windowDims = { };
    const computedStyle = getComputedStyle(document.documentElement);
    const cursor = computedStyle.cursor;

    // Max height = calc(100vh - ($menubar-height + $dock-icon-size + (3 * $padding))) = calc(100vh - 9rem)
    const remToPx = 9 * parseFloat(computedStyle.fontSize); // Convert 9rem to px
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
        //const dockHeight = dock.offsetHeight;
        const menubarHeight = 36.5; // 3 * parseFloat(computedStyle.fontSize); = 3rem --> px

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
        // Convert selector string to element if needed
        const elementObj = typeof element === "string" ? document.querySelector(element) : element;
        
        // No need to increase z-index if already in front
        if (!elementObj.classList.contains("inFront")) {
            // Get all windows and trash dialogue
            const allWindows = [...document.querySelectorAll(".windows, .trash-dialogue")];
            
            // Process each window and get z-indices
            const zIndices = allWindows.map(function(win) {
                // If current element is open
                if (win.classList.contains("openWindow")) {
                    // If current element is a window
                    if (win.classList.contains("windows")) {
                        // Make its buttons inactive
                        win.style.setProperty("--red", "rgba(255, 255, 255, 0.2)");
                        win.style.setProperty("--yellow", "rgba(255, 255, 255, 0.2)");
                        if (!(win.id === "text-edit" || win.id === "calc")) win.style.setProperty("--green", "rgba(255, 255, 255, 0.2)");
                    }

                    // If current element is trash dialogue
                    else if (win.classList.contains("trash-dialogue")) {
                        // Make its confirm buttons inactive
                        win.style.setProperty("--confirm", "rgb(115, 118, 115)");
                        win.style.setProperty("--confirm-active", "rgb(145, 148, 145)");
                    }
                }
                
                // Mark other [open] windows as not in front
                if (win.classList.contains("inFront")) win.classList.remove("inFront");
                
                // Get z-index value
                return parseInt(getComputedStyle(win).zIndex) || 0;
            });
            
            // Get highest z-index
            const maxZIndex = Math.max(...zIndices);
            
            // Get current element's z-index
            const currentZIndex = parseInt(getComputedStyle(elementObj).zIndex) || 0;
            
            // Set higher z-index for the given element
            if (currentZIndex <= maxZIndex) {
                elementObj.style.zIndex = (maxZIndex + 1).toString();
                
                // If not menu dropdown (since it will never be on top of dock and/or launchpad)
                if (!elementObj.classList.contains("menu-dropdown")) {
                    // Mark element as in front
                    elementObj.classList.add("inFront");
                    
                    // Make sure menu dropdown is always on top
                    document.querySelectorAll(".menu-dropdown").forEach(el => {
                        el.style.zIndex = (maxZIndex + 2).toString();
                    });
                    
                    // Make sure launchpad is always on top
                    if (launchContent) launchContent.style.zIndex = (maxZIndex + 3).toString();

                    // Make sure dock is always on top
                    if (dock) dock.style.zIndex = (maxZIndex + 4).toString();
                    
                    // Make sure context menu is always on top
                    document.querySelectorAll(".context-menu").forEach(el => {
                        el.style.zIndex = (maxZIndex + 5).toString();
                    });
                }
            }
            
            // If given element is a window
            if (elementObj.classList.contains("windows")) {
                // Make its buttons active
                elementObj.style.setProperty("--red", "#ed6a5e");
                elementObj.style.setProperty("--yellow", "#f5bf4f");
                if (!(elementObj.id === "text-edit" || elementObj.id === "calc")) elementObj.style.setProperty("--green", "#62c554");
            }
            
            // If given element is trash dialogue
            else if (elementObj.classList.contains("trash-dialogue")) {
                // Make its confirm buttons active
                elementObj.style.setProperty("--confirm", "linear-gradient(to bottom, #DB6BFA, #993DB3)"); // vars.$button-gradient
                elementObj.style.setProperty("--confirm-active", "#DB6BFA"); // vars.$primary-button-color
            }
        }
    }
    
    // Make windows draggable and bring to front on drag
    function makeDraggable(selector) {
        $(selector).draggable({
            cursor: cursor,
            handle: ".handle",
            cancel: ".cancel, .icons, #sticky-note-close",
            start: function() {
                bringToFront(this);
            },
            containment: "#main-content",
            distance: 0
        }).on("click", function() {
            bringToFront(this);
        });
    }

    // Open window/app via dock
    function openWindow(dockIcon, win, displayType = "flex") {
        // Position window when first opened
        // Ignore #previewDockIcon since it can only initially be opened via desktop (not dock)
        // and is already init positioned when first opened via desktop
        if (dockIcon !== "#previewDockIcon") initPosition(dockIcon, win, "click");

        const windowElement = document.querySelector(win);
        const iconElement = document.querySelector(dockIcon);
    
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
                    if (dockIcon !== "#previewDockIcon") $(dockIcon).effect("bounce", { times: 3 }, 600);
        
                    // Mark clicked window as opened
                    iconElement.classList.add("open");
                }
            }
        });
    }

    // Show file when clicking on desktop icon
    function showDesktopFile(dockIcon, win, inDock) {
        const windowElement = document.querySelector(win);
        const dockIconElement = document.querySelector(dockIcon);
        
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

        const windowElement = document.querySelector(win);
        const dockIconElement = document.querySelector(dockIcon);
    
        document.querySelector(launchIcon).addEventListener("click", function() {
            closeLaunchpad();
            bringToFront(win);
            windowElement.style.display = displayType;
            
            if (!windowElement.classList.contains("openWindow")) windowElement.classList.add("openWindow");
            if (!dockIconElement.classList.contains("open")) dockIconElement.classList.add("open");
            if ((dockIcon === "#previewDockIcon") || (dockIcon === "#calcDockIcon")) dockIconElement.style.display = "block";
        });
    }

    // Close window
    function closeWindow(closeBtn, win, dockIcon) {
        document.querySelector(closeBtn).addEventListener("click", function() {
            const windowElement = document.querySelector(win);
            const dockIconElement = document.querySelector(dockIcon);

            windowElement.style.display = "none";
            
            if (windowElement.classList.contains("openWindow")) windowElement.classList.remove("openWindow");
            if (dockIconElement.classList.contains("open")) dockIconElement.classList.remove("open");
    
            // Make sure preview dock icon ONLY disappears if both `profile.webp` and `resume.pdf` are closed
            if ((dockIcon === "#calcDockIcon") || (dockIcon === "#previewDockIcon" && 
                !(document.querySelector(".preview").classList.contains("openWindow") || 
                 document.querySelector(".resume").classList.contains("openWindow")))) {
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
    function maximizeWindow(maximizeBtn, win) {
        document.querySelector(maximizeBtn).addEventListener("click", function() {
            const windowElement = document.querySelector(win);

            // Only maximize if window is open
            if (windowElement.classList.contains("openWindow")) {
                // Get initial window dimensions
                if (!(win in windowDims)) {
                    windowDims[win] = {
                        width: windowElement.offsetWidth,
                        height: windowElement.offsetHeight
                    };
                }
            
                // Maximize window
                if (!windowElement.classList.contains("maximize")) {
                    windowElement.style.width = "100vw";
                    windowElement.style.height = "100%";
                    windowElement.style.top = "0";
                    windowElement.style.left = "0";
                } else { // Restore window
                    windowElement.style.width = windowDims[win].width + "px";
                    windowElement.style.height = windowDims[win].height + "px";
                    centerWindow(win, "center center");
                }
                
                // Toggle maximize class
                windowElement.classList.toggle("maximize");
            }
        });
    }

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
        if (event.target === launchpadNav || event.target === launchContent) closeLaunchpad();
    });
    
    // Position terminal
    positionWindow("#mac-terminal");
    
    // Show terminal on load
    $("#mac-terminal").fadeIn(fadeMs);

    // Store initial window dimensions
    windowDims["#mac-terminal"] = {
        width: macTerminal.offsetWidth,
        height: macTerminal.offsetHeight
    };

    // Apply draggable to all existing windows
    makeDraggable(".windows");

    // Make launchpad apps sortable
    $("#launchNav").sortable();
    $("#launchNav").disableSelection();

    // Empty trash
    document.querySelector(".confirm").addEventListener("click", function(event) {
        // Play empty trash sound
        new Audio("../assets/audio/empty-trash.mp3").play();

        // Prevent default action
        event.preventDefault();

        // Change trash icon to empty trash
        document.getElementById("trash").setAttribute("src", "/assets/img/system/empty-trash.webp");

        // Hide trash dialogue
        document.querySelector(".trash-dialogue").style.display = "none";

        // Remove click event from trash icon (by cloning and replacing it)
        const trashIcon = document.getElementById("trash-icon");
        const newTrashIcon = trashIcon.cloneNode(true);
        trashIcon.parentNode.replaceChild(newTrashIcon, trashIcon);
    });

    // Make trash dialogue draggable
    $(".trash-dialogue").draggable({
        cursor: cursor,
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
        cursor: cursor,
        cancel: false,
        containment: "#main-content",
        distance: 0
    });

    // Make some windows resizeable
    // TODO: Add #email once mail app (aka contact form) is fixed
    $("#mac-terminal, #notes, #browser, .preview, .resume, #sticky-note").resizable({
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

    // Maximize terminal
    maximizeWindow(".header__op-icon--green", "#mac-terminal");

    // Maximize Safari browser
    maximizeWindow(".browser-buttons-icon--green", "#browser");

    // Maximize projects
    maximizeWindow(".buttons-icon--green", "#notes");

    // Maximize preview
    maximizeWindow(".preview-header__op-icon--green", ".preview");

    // Maximize resume
    maximizeWindow(".resume-header__op-icon--green", ".resume");

    // Maximize about me
    //maximizeWindow(".text-edit-header__op-icon--green", "#text-edit");

    // TODO: UNCOMMENT THE FOLLOWING ONCE MAIL APP (AKA CONTACT FORM) IS FIXED

    // Maximize mail
    //maximizeWindow(".email-header__op-icon--green", "#email");

    // Close mail
    //closeWindow(".email-header__op-icon--red", "#email", "#mailDockIcon");

    // Launch mail
    //launchApp("#mailLaunch", "#email", "#mailDockIcon");

    // Open mail
    //openWindow("#mailDockIcon", "#email");

    positionWindow("#sticky-note");

    document.getElementById("not-ai").addEventListener("click", function() {
        bringToFront("#sticky-note");
        
        document.getElementById("sticky-note").style.display = "block";

        if (!document.getElementById("sticky-note").classList.contains("openWindow")) document.getElementById("sticky-note").classList.add("openWindow");

        // Mark clicked window as opened
        if (!document.getElementById("not-ai").classList.contains("open")) document.getElementById("not-ai").classList.add("open");
    });
});