/**
 * @license MIT
 * Copyright © 2026 Kiran Brahmatewari. All rights reserved.
 * 
 * This work is licensed under the terms of the MIT license.
 * Refer to https://opensource.org/licenses/MIT for a copy.
 */
import { cursor, getText, sortOpacity, sortSpeed } from "../common.js";

var sortMode = 0; // 0 = Ascending, 1 = Descending, 2 = Original
var isSorting = false;
const browserInput = document.getElementById("browserInput");
const sortSkill = document.getElementById("sort-skills");
const skillSections = document.querySelectorAll("#browser .inside .section");

// Skills search
function filterBrowser() {
    // Filter skills
    document.querySelectorAll(".skill-entry").forEach(skill => {
        skill.style.display = getText(skill, ".heading").includes(browserInput.value.toLowerCase()) ? "" : "none";
    });

    // Hide section headings IFF ALL their skills are hidden
    document.querySelectorAll("#browser .inside h2").forEach(h2 => {
        const section = h2.nextElementSibling;
        if (!section?.classList.contains("section")) return;
        const anyVisible = Array.from(section.querySelectorAll(".skill-entry"))
        .some(skill => skill.style.display !== "none");
        section.style.display = h2.style.display = anyVisible ? "" : "none";
    });
}

// Skills sorting
function sortSkills() {
    skillSections.forEach(section => {
        let skills = Array.from(section.querySelectorAll(".skill-entry"));
        if (sortMode === 0) { // Ascending
            skills.sort((a, b) =>
                getText(a, ".heading").localeCompare(getText(b, ".heading"))
            );
        } else if (sortMode === 1) { // Descending
            skills.sort((a, b) =>
                getText(b, ".heading").localeCompare(getText(a, ".heading"))
            );
        } else { // Original
            skills = section._originalOrder.slice();
        }
        skills.forEach(skill => section.appendChild(skill));
    });
    sortMode = (sortMode + 1) % 3;
}

// Show/hide skill description
const toggleContent = item => {
    // Prevent toggling content when sorting
    if (!isSorting) {
        const arrow = document.querySelector(`${item}-trigger > i`);
        arrow?.classList.toggle("rotate0");
        arrow?.classList.toggle("rotate90");
        document.querySelector(`${item}-content`)?.classList.toggle("hidden-content");
    }
};

export function initBrowser() {
    skillSections.forEach(section => {
        section._originalOrder = Array.from(section.querySelectorAll(".skill-entry"));
    });

    // Make skills sortable
    $(".section").sortable({
        axis: "y",
        containment: "parent",
        cursor: cursor,
        handle: ".row",
        opacity: sortOpacity,
        scroll: true,
        scrollSpeed: sortSpeed,
        start: function() { isSorting = true; },
        stop: function() { setTimeout(() => { isSorting = false; }, 0); }
    }).on("sortupdate", function() {
        // Update original order after sorting
        this._originalOrder = Array.from(this.querySelectorAll(".skill-entry"));
    });
    
    if (browserInput) {
        browserInput.addEventListener("keyup", filterBrowser);
    }

    if (sortSkill) {
        sortSkill.addEventListener("click", sortSkills);
        sortSkill.addEventListener("touchend", function(event) {
            event.preventDefault();
            sortSkills();
        });
    }

    window.toggleContent = toggleContent;
}