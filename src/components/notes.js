/**
 * @license MIT
 * Copyright © 2024 – 2026 Kiran Brahmatewari. All rights reserved.
 * 
 * This work is licensed under the terms of the MIT license.
 * Refer to https://opensource.org/licenses/MIT for a copy.
 */
export function initNotes() {
    // Highlight clicked nav item
    document.querySelectorAll(".sidebar .child-nav li").forEach(function(element) {
        element.addEventListener("click", function() {
            document.querySelectorAll(".child-nav li").forEach(function(element) {
                element.classList.remove("active");
            });
            
            document.querySelector(".sidebar").classList.remove("active");
            if (!this.classList.contains("active")) this.classList.add("active");
        });
    });

    // Make selected project in Notes sidebar active and all others inactive
    var selectProject = function(element) {
        var projectInfo = document.getElementsByClassName("project");

        for (let j = 0; j < projectInfo.length; ++j)
            projectInfo[j].classList.remove("active");

        var project = document.getElementById(element.dataset.id);
        project.classList.add("active");
    }

    // Select project from projects in Notes sidebar
    document.querySelectorAll(".project-name").forEach(function(element) {
        element.addEventListener("click", function(event) {
            selectProject(event.target)
        });
    });

    // Automatically activate the first li .project-name and its project
    const firstProjectName = document.querySelector("li.project-name");

    if (firstProjectName) {
        firstProjectName.classList.add("active");

        // Add 'active' to the corresponding project
        const id = firstProjectName.dataset.id;
        if (id) {
            const project = document.getElementById(id);
            if (project) project.classList.add("active");
        }
    }
}