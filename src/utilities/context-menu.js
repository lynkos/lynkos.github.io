document.addEventListener("DOMContentLoaded", function() {
    const contextMenuContainer = document.createElement("div");
    
    contextMenuContainer.innerHTML = `<ul class="context-menu">
    <li class="context-menu-item"><button type="button" class="context-menu-btn">New Folder</button></li>

    <li class="context-menu-item divider"></li>

    <li class="context-menu-item"><button type="button" class="context-menu-btn">Get Info</button></li>
    <li class="context-menu-item"><button type="button" class="context-menu-btn">Change Wallpaper…</button></li>
    <li class="context-menu-item"><button type="button" class="context-menu-btn">Edit Widgets…</button></li>

    <li class="context-menu-item divider"></li>

    <li class="context-menu-item"><button type="button" class="context-menu-btn">Use Stacks</button></li>

    <li class="context-menu-item context-menu-item-submenu">
    <button type="button" class="context-menu-btn">Sort By <i alt="Right chevron icon" class="fas fa-chevron-right mini-icon" aria-hidden="true"></i></button>
    <ul class="context-menu context-menu-submenu" style="width:16rem">
        <li class="context-menu-item"><button type="button" class="context-menu-btn">&nbsp;&nbsp;&nbsp; None</button></li>
        <li class="context-menu-item divider"></li>
        <li class="context-menu-item"><button type="button" class="context-menu-btn">&nbsp;&nbsp;&nbsp; Snap to Grid</button></li>
        <li class="context-menu-item divider"></li>
        <li class="context-menu-item"><button type="button" class="context-menu-btn">&nbsp;&nbsp;&nbsp; Name</button></li>
        <li class="context-menu-item"><button type="button" class="context-menu-btn">✓ Kind</button></li>
        <li class="context-menu-item"><button type="button" class="context-menu-btn">&nbsp;&nbsp;&nbsp; Shared By</button></li>
        <li class="context-menu-item"><button type="button" class="context-menu-btn">&nbsp;&nbsp;&nbsp; Last Modified By</button></li>
        <li class="context-menu-item"><button type="button" class="context-menu-btn">&nbsp;&nbsp;&nbsp; Date Last Opened</button></li>
        <li class="context-menu-item"><button type="button" class="context-menu-btn">&nbsp;&nbsp;&nbsp; Date Added</button></li>
        <li class="context-menu-item"><button type="button" class="context-menu-btn">&nbsp;&nbsp;&nbsp; Date Modified</button></li>
        <li class="context-menu-item"><button type="button" class="context-menu-btn">&nbsp;&nbsp;&nbsp; Date Created</button></li>
        <li class="context-menu-item"><button type="button" class="context-menu-btn">&nbsp;&nbsp;&nbsp; Size</button></li>
        <li class="context-menu-item"><button type="button" class="context-menu-btn">&nbsp;&nbsp;&nbsp; Tags</button></li>
    </ul>
    </li>

    <li class="context-menu-item"><button type="button" class="context-menu-btn">Show View Options</button></li>

    <li class="context-menu-item divider"></li>

    <li class="context-menu-item context-menu-item-submenu">
    <button type="button" class="context-menu-btn">Import from iPhone <i alt="Right chevron icon" class="fas fa-chevron-right mini-icon" aria-hidden="true"></i></button>
    <ul class="context-menu" style="width:15rem">
        <li class="context-menu-item context-menu-item-disabled"><button type="button" class="context-menu-btn context-menu-btn-disabled">Lynkos</button></li>
        <li class="context-menu-item"><button type="button" class="context-menu-btn">Take Photo</button></li>
        <li class="context-menu-item"><button type="button" class="context-menu-btn">Scan Documents</button></li>
        <li class="context-menu-item"><button type="button" class="context-menu-btn">Add Sketch</button></li>
    </ul>
    </li>
    </ul>`;
    
    document.body.appendChild(contextMenuContainer.firstChild);

    const contextMenu = document.querySelector(".context-menu");

    function showContextMenu(x, y) {
        contextMenu.style.left = x + "px";
        contextMenu.style.top = y + "px";
        contextMenu.classList.add("context-menu-show");
    }

    function hideContextMenu() {
        contextMenu.classList.remove("context-menu-show");
    }

    function onContextMenu(event) {
        event.preventDefault();

        if (!(event.target.id === "menu-bar" || event.target.classList.contains("menus"))) {
            const clientX = event.pageX;
            const clientY = event.pageY;
    
            const positionY = clientY + contextMenu.offsetHeight >= window.innerHeight ? window.innerHeight - contextMenu.offsetHeight : clientY;
            const positionX = clientX + contextMenu.offsetWidth >= window.innerWidth ? window.innerWidth - contextMenu.offsetWidth : clientX;
    
            showContextMenu(positionX, positionY);
            document.addEventListener("mousedown", onMouseDown, false);
        }
    }

    function onMouseDown(event) {
        event.preventDefault();
        hideContextMenu();
        document.removeEventListener("mousedown", onMouseDown);
    }

    contextMenu.addEventListener("mousedown", function(event) {
        event.stopPropagation();
    });
    
    document.addEventListener("contextmenu", onContextMenu, false);
});