$(function() {
    $(".mac-terminal")
        .resizable({
            animate: true,
            handles: "n, e, s, w, ne, se, sw, nw",
        })
        
        .draggable({
            cursor: "move",
            handle: "div.header",
            //containment: "#mac-terminal"
        });
});