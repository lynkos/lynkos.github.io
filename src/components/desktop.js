/**
 * @license MIT
 * Copyright © 2024 – 2026 Kiran Brahmatewari. All rights reserved.
 * 
 * This work is licensed under the terms of the MIT license.
 * Refer to https://opensource.org/licenses/MIT for a copy.
 */
import { bringToFront, cursor, initPosition } from "../common.js";

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

export function initDesktop() {
    // Make folder and file icons draggable
    $(".btn").draggable({
        cursor: cursor,
        cancel: false,
        containment: "#main-content",
        distance: 0
    });

    // Open about me when double-clicking or tapping `about.rtf`
    openDesktopFile("#aboutFile", "#textEditDockIcon", "#text-edit", true);

    // Open resume when double-clicking or tapping `resume.pdf`
    openDesktopFile("#resumeFile", "#previewDockIcon", "#resume");

    // Open preview when double-clicking or tapping `profile.webp`
    openDesktopFile("#profilePic", "#previewDockIcon", "#preview");
}