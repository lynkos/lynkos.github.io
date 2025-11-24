/**
 * @license MIT
 * Copyright © 2024 – 2025 Kiran Brahmatewari. All rights reserved.
 * 
 * This work is licensed under the terms of the MIT license.
 * Refer to https://opensource.org/licenses/MIT for a copy.
 */

document.addEventListener("DOMContentLoaded", function() {
    const controlCenter = document.querySelector(".control-center");
    const controlCenterContainer = document.createElement("div");

    controlCenterContainer.innerHTML = ``;

    document.body.appendChild(controlCenterContainer.firstChild);

    function showControlCenter(x, y) {
        controlCenter.style.left = `${x}px`;
        controlCenter.style.top = `${y}px`;
        controlCenter.classList.add("control-center--visible");
    }

    function hideControlCenter() {
        controlCenter.classList.remove("control-center--visible");
    }

        function onClick(event) {
        event.preventDefault();
        hideContextMenu();
        document.removeEventListener("click", onClick);
    }
    
    document.addEventListener("contextmenu", onContextMenu, false);
});