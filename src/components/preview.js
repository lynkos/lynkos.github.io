$(function() {
    var angle = 0;
    var zoom = 1;
    
    // Rotate picture in `profile.webp` preview
    $("#rotate").on("click", function() {
        angle = (angle - 90) % 360;    
    });

    // Zoom into picture in `profile.webp` preview
    $("#zoomIn").on("click", function() {
        if (zoom < 2.1) {
            if ($("#zoomIn").hasClass("inactive")) $("#zoomIn").removeClass("inactive");
            if ($("#zoomOut").hasClass("inactive")) $("#zoomOut").removeClass("inactive");
            zoom += 0.1;
        } else if (!$("#zoomIn").hasClass("inactive")) $("#zoomIn").addClass("inactive");
    });

    // Zoom out of picture in `profile.webp` preview
    $("#zoomOut").on("click", function() {
        if (zoom > 0.2) {
            if ($("#zoomOut").hasClass("inactive")) $("#zoomOut").removeClass("inactive");
            if ($("#zoomIn").hasClass("inactive")) $("#zoomIn").removeClass("inactive");
            zoom -= 0.1;
        } else if (!$("#zoomOut").hasClass("inactive")) $("#zoomOut").addClass("inactive");
    });

    // Apply both zoom and rotation to picture in `profile.webp` preview
    $("#zoomOut, #zoomIn, #rotate").on("click", function() {
        $("#fullProfilePic").css("transform", "rotate(" + angle + "deg) scale(" + zoom + ")");
        $("#fullProfilePic").css("-moz-transform", "rotate(" + angle + "deg) scale(" + zoom + ")");
        $("#fullProfilePic").css("-ms-transform", "rotate(" + angle + "deg) scale(" + zoom + ")");
        $("#fullProfilePic").css("-o-transform", "rotate(" + angle + "deg) scale(" + zoom + ")");
        $("#fullProfilePic").css("-webkit-transform", "rotate(" + angle + "deg) scale(" + zoom + ")");
    });
});