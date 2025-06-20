/**
 * @license MIT
 * Copyright © 2024 – 2025 Kiran Brahmatewari. All rights reserved.
 * 
 * This work is licensed under the terms of the MIT license.
 * Refer to https://opensource.org/licenses/MIT for a copy.
 */

document.addEventListener("DOMContentLoaded", function() {
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

        var project = document.querySelector("#" + element.dataset.id);
        project.classList.add("active");
    }

    // Select project from projects in Notes sidebar
    document.querySelectorAll(".project-name").forEach(function(element) {
        element.addEventListener("click", function(event) {
            selectProject(event.target)
        });
    });
});