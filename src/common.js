/**
 * @license MIT
 * Copyright © 2026 Kiran Brahmatewari. All rights reserved.
 * 
 * This work is licensed under the terms of the MIT license.
 * Refer to https://opensource.org/licenses/MIT for a copy.
 */
var aboutOpened = false;
const dock = document.getElementById("dock");
const computedStyle = getComputedStyle(document.documentElement);

// Max height = calc(100vh - ($menubar-height + $dock-icon-size + (3 * $padding))) = calc(100vh - 9rem)
const remToPx = 9 * parseFloat(computedStyle.fontSize); // Convert 9rem to px
const errorMargin = 3; // Include to account for calc discrepancies (i.e. few px off)
const maxHeight = window.innerHeight - remToPx - errorMargin; // Lower bound of max height
// No upper bound since oversized window should still be on top instead of center

export const macTerminal = document.getElementById("mac-terminal");
export const launchpad = document.getElementById("launchpad");
export const launchContent = document.getElementById("launch-content");
export const launchpadNav = document.getElementById("launchNav");
export const fadeMs = 350;
export const sortOpacity = 0.5;
export const sortSpeed = 10;
export const cursor = computedStyle.cursor;
export const getText = (element, selector, attr = "textContent") =>
    element?.querySelector(selector)?.[attr]?.trim().toLowerCase() ?? "";

// Center windows
export function centerWindow(win, my, at = "center") {
    $(win).position({
        my: my,
        at: at,
        collision: "fit",
        of: "#main-content"
    });
}

// Position window based off dims
export function positionWindow(win) {
    // Calculate menubar height (3rem) and convert to px
    // Used to subtract from vertical position to take menubar height into account
    // let dockHeight = dock.offsetHeight;
    let menubarHeight = 36.5; //3 * parseFloat(computedStyle.fontSize); // = 3rem --> px

    // IF window height >= max height, place at top (sub menubar height)
    if (document.querySelector(win).offsetHeight >= maxHeight) centerWindow(win, "top-" + menubarHeight, "top");

    // ELSE center
    else centerWindow(win, "center center-" + menubarHeight);
}

// ONLY auto-position window when first opened; this is to avoid calculating for windows that might never be opened
export function initPosition(icon, win, eventType) {
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
export function bringToFront(element) {
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
                    win.style.setProperty("--red", "rgba(255, 255, 255, 0.2)"); // vars.$disabled-grey
                    win.style.setProperty("--yellow", "rgba(255, 255, 255, 0.2)"); // vars.$disabled-grey
                    if (!(win.id === "text-edit" || win.id === "calc")) win.style.setProperty("--green", "rgba(255, 255, 255, 0.2)"); // vars.$disabled-grey
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
            }
        }
        
        // If given element is a window
        if (elementObj.classList.contains("windows")) {
            // Make its buttons active
            elementObj.style.setProperty("--red", "#ed6a5e"); // vars.$close-red
            elementObj.style.setProperty("--yellow", "#f5bf4f"); // vars.$minimize-yellow
            if (!(elementObj.id === "text-edit" || elementObj.id === "calc")) elementObj.style.setProperty("--green", "#62c554"); // vars.$maximize-green
        }
        
        // If given element is trash dialogue
        else if (elementObj.classList.contains("trash-dialogue")) {
            // Make its confirm buttons active
            elementObj.style.setProperty("--confirm", "linear-gradient(to bottom, #DB6BFA, #993DB3)"); // vars.$button-gradient
            elementObj.style.setProperty("--confirm-active", "#DB6BFA"); // vars.$primary-button-color
        }
    }
}

// Close launchpad
export function closeLaunchpad() {
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