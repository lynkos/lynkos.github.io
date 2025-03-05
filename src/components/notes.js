$(function() {
    // Highlight clicked nav item
    $(".child-nav li", ".sidebar").on("click", function() {
        $(".child-nav li", ".sidebar").removeClass("active");
        if (!$(this).hasClass("active")) $(this).addClass("active");
    });
});

// Make selected project in Notes sidebar active and all others inactive
var selectProject = function(element) {
    var projectInfo = document.getElementsByClassName("project");

    for (let j = 0; j < projectInfo.length; ++j) {
        projectInfo[j].classList.remove("active");
    }

    var project = document.querySelector("#" + element.dataset.id);
    project.classList.add("active");
}

// Select project from projects in Notes sidebar
document.querySelectorAll(".project-name").forEach(function(element) {
    element.addEventListener("click", function(event) {
        selectProject(event.target)
    });
});