/**
 * @license MIT
 * Copyright © 2026 Kiran Brahmatewari. All rights reserved.
 * 
 * This work is licensed under the terms of the MIT license.
 * Refer to https://opensource.org/licenses/MIT for a copy.
 */
import { bringToFront, closeLaunchpad, cursor, fadeMs, getText, initPosition, launchContent, launchpad, launchpadNav } from "../common.js";

const launchInput = document.getElementById("launchInput");

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

// --- Launchpad Search ---
function filterLaunchpad() {
    const filter = launchInput.value.toLowerCase();

    document.querySelectorAll("#launchNav .launch").forEach(app => {
        const appName = getText(app, "img[alt]", "alt") || getText(app, "svg[alt]", "alt");
        app.style.display = appName.toLowerCase().includes(filter) ? "" : "none";
    });
}

export function initLaunchpad() {
    // Toggle launchpad on click
    document.getElementById("launchpadDockIcon").addEventListener("click", function() {
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

    // Make launchpad apps sortable
    $("#launchNav").sortable({
        cursor: cursor,
    });

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
    
    // Launch music app
    launchApp("#musicLaunch", "#music-app", "#musicDockIcon");

    // TODO: UNCOMMENT THE FOLLOWING ONCE MAIL APP (AKA CONTACT FORM) IS FIXED
    // Launch mail
    //launchApp("#mailLaunch", "#email", "#mailDockIcon");

    // Make launchpad searchable
    if (launchInput) {
        launchInput.addEventListener("keyup", filterLaunchpad);
    }
}