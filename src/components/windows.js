/**
 * @license MIT
 * Copyright © 2024 – 2026 Kiran Brahmatewari. All rights reserved.
 * 
 * This work is licensed under the terms of the MIT license.
 * Refer to https://opensource.org/licenses/MIT for a copy.
 */
import { bringToFront, centerWindow, closeLaunchpad, cursor, fadeMs, initPosition, macTerminal, positionWindow } from "../common.js";

// Store initial window dimensions
const initWindowDims = { };

// NOTE: If your JavaScript uses general query selectors such as document.querySelectorAll('li'),
// you may be unknowingly storing references to a very large number of nodes,
// which can overwhelm the memory capabilities of your users' devices.

// Make windows draggable and bring to front on drag
function makeDraggable(selector) {
    $(selector).draggable({
        cursor: cursor,
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
                // Ignore #previewDockIcon since it can only initially be opened via desktop, not dock
                if (dockIcon !== "#previewDockIcon") $(dockIcon).effect("bounce", { times: 3 }, 600);
    
                // Mark clicked window as opened
                iconElement.classList.add("open");
            }
        }
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

// Maximize window
function maximizeWindow(maximizeBtn, win) {
    document.querySelector(maximizeBtn).addEventListener("click", function() {
        const windowElement = document.querySelector(win);

        // Only maximize if window is open
        if (windowElement.classList.contains("openWindow")) {
            // Get initial window dimensions
            if (!(win in initWindowDims)) {
                initWindowDims[win] = {
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
                windowElement.style.width = initWindowDims[win].width + "px";
                windowElement.style.height = initWindowDims[win].height + "px";
                centerWindow(win, "center center");
            }
            
            // Toggle maximize class
            windowElement.classList.toggle("maximize");
        }
    });
}

export function initWindows() {
    // Position terminal
    positionWindow("#mac-terminal");

    // Show terminal on load
    $("#mac-terminal").fadeIn(fadeMs);

    initWindowDims["#mac-terminal"] = {
        width: macTerminal.offsetWidth,
        height: macTerminal.offsetHeight
    };

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

    // Make some windows resizeable
    // TODO: Add #email once mail app (aka contact form) is fixed
    $("#mac-terminal, #notes, #browser, .preview, .resume, #music-app").resizable({
        containment: "#main-content",
        handles: "n, e, s, w, ne, nw, se, sw",
        animate: true
    });

    // Apply draggable to all existing windows
    makeDraggable(".windows");

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
    
    // Open music app
    openWindow("#musicDockIcon", "#music-app");

    // Open trash dialogue
    openWindow("#trash-icon", ".trash-dialogue", "inline-block");
    
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
    
    // Close music app
    closeWindow(".music-buttons-icon--red", "#music-app", "#musicDockIcon");

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
    
    // Maximize music app
    maximizeWindow(".music-buttons-icon--green", "#music-app");

    // TODO: UNCOMMENT THE FOLLOWING ONCE TEXTEDIT (AKA ABOUT ME) APP'S RULER IS MADE DYNAMIC (I.E. ADJUSTS ON RESIZE)
    // Maximize about me
    //maximizeWindow(".text-edit-header__op-icon--green", "#text-edit");

    // TODO: UNCOMMENT THE FOLLOWING ONCE MAIL APP (AKA CONTACT FORM) IS FIXED

    // Maximize mail
    //maximizeWindow(".email-header__op-icon--green", "#email");

    // Close mail
    //closeWindow(".email-header__op-icon--red", "#email", "#mailDockIcon");

    // Open mail
    //openWindow("#mailDockIcon", "#email");

    // TODO: Delete the mailDockIcon bounce effect once mail app (aka contact form) is fixed,
    // since it's already included in openWindow function

    // Temporary bounce effect for mail icon in dock, since I commented it (i.e. "Mail" icon in dock) out in index.html
    // document.getElementById("mailDockIcon").addEventListener("click", function() {
    //     $("#mailDockIcon").effect("bounce", { times: 3 }, 600);
    // });    
}