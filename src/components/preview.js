/**
 * @license MIT
 * Copyright © 2024 – 2025 Kiran Brahmatewari. All rights reserved.
 * 
 * This work is licensed under the terms of the MIT license.
 * Refer to https://opensource.org/licenses/MIT for a copy.
 */

document.addEventListener("DOMContentLoaded", function() {
    const rotate = document.getElementById("rotate");
    const zoomIn = document.getElementById("zoomIn");
    const zoomOut = document.getElementById("zoomOut");
    const fullProfilePic = document.getElementById("fullProfilePic");
    var angle = 0;
    var zoom = 1;

    // Rotate picture in `profile.webp` preview
    rotate.addEventListener("click", function() {
        angle = (angle - 90) % 360;
    });
    
    // Zoom into picture in `profile.webp` preview
    zoomIn.addEventListener("click", function() {
        if (zoom < 2.1) {
            if (zoomIn.classList.contains("inactive")) zoomIn.classList.remove("inactive");
            if (zoomOut.classList.contains("inactive")) zoomOut.classList.remove("inactive");
            zoom += 0.1;
        } else if (!zoomIn.classList.contains("inactive")) zoomIn.classList.add("inactive");
    });

    // Zoom out of picture in `profile.webp` preview
    zoomOut.addEventListener("click", function() {
        if (zoom > 0.2) {
            if (zoomIn.classList.contains("inactive")) zoomIn.classList.remove("inactive");
            if (zoomOut.classList.contains("inactive")) zoomOut.classList.remove("inactive");
            zoom -= 0.1;
        } else if (!zoomOut.classList.contains("inactive")) zoomOut.classList.add("inactive");
    });

    // Apply both zoom and rotation to picture in `profile.webp` preview
    [ zoomIn, zoomOut, rotate ].forEach(element => {
        element.addEventListener("click", function() {
            const transformValue = `rotate(${angle}deg) scale(${zoom})`;            
            fullProfilePic.style.transform = transformValue;
            fullProfilePic.style.mozTransform = transformValue;
            fullProfilePic.style.msTransform = transformValue;
            fullProfilePic.style.oTransform = transformValue;
            fullProfilePic.style.webkitTransform = transformValue;
        });
    });
});