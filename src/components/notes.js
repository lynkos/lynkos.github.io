/**
 * @license MIT
 * Copyright © 2024 – 2026 Kiran Brahmatewari. All rights reserved.
 * 
 * This work is licensed under the terms of the MIT license.
 * Refer to https://opensource.org/licenses/MIT for a copy.
 */

document.addEventListener("DOMContentLoaded", function() {
    // function highlightSelectedItem(containerSelector, itemSelector) {
    //     document.querySelectorAll(`${containerSelector} ${itemSelector}`).forEach(element => {
    //         element.addEventListener("click", function(e) {
    //             const item = e.target.closest(itemSelector);
    //             if (!item) return;
    //             element.querySelectorAll(itemSelector).forEach(el => el.classList.remove("active-item"));
    //             item.classList.add("active-item");
    //         });
    //     });
    // }
    
    // Highlight clicked item
    function highlightSelectedItem(containerSelector, itemSelector) {
        document.querySelectorAll(`${containerSelector} ${itemSelector}`).forEach(function(element) {
            element.addEventListener("click", function() {
                document.querySelectorAll(itemSelector).forEach(function(element) {
                    element.classList.remove("active-item");
                });
                
                document.querySelector(containerSelector).classList.remove("active-item");
                if (!this.classList.contains("active-item")) this.classList.add("active-item");
            });
        });
    }

    // Highlight clicked nav item in sidebar
    highlightSelectedItem(".sidebar .child-nav", "li");

    // Highlight clicked nav item in collapsible sidebar
    highlightSelectedItem(".collapsible-sidebar .content", ".text");

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