$(function() {
    $(".mac-terminal")
        .resizable({
            animate: true,
            handles: "n, e, s, w, ne, se, sw, nw",
        })
        
        .draggable({
            cursor: "move",
            //containment: "#mac-terminal",
            //cursorAt: { top: 8 },
            //cancel: "p.ui-widget-header"
        });
});