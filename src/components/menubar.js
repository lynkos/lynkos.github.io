/**
 * @license MIT
 * Copyright © 2026 Kiran Brahmatewari. All rights reserved.
 * 
 * This work is licensed under the terms of the MIT license.
 * Refer to https://opensource.org/licenses/MIT for a copy.
 */
import { bringToFront } from "../common.js";

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

export function initMenubar() {
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
}