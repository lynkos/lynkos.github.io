$(function() {
    // Remove classes in element
    function removeClasses(element, classes) {
        for (let i = 0; i < classes.length; i++) {
            if ($(element).hasClass(classes[i])) $(element).removeClass(classes[i]);
        }
    }
    
    // Toggle bold text in TextEdit
    $("#bold-btn").on("click", function() {
        $(".text-body").toggleClass("bold");
    });

    // Toggle italic text in TextEdit
    $("#italic-btn").on("click", function() {
        $(".text-body").toggleClass("italic");
    });

    // Toggle underlined text in TextEdit
    $("#underline-btn").on("click", function() {
        $(".text-body").toggleClass("underline");
    });

    // Toggle left text alignment in TextEdit
    $("#left-btn").on("click", function() {
        $(".text-body").toggleClass("left");
        removeClasses(".text-body", [ "right", "center", "justify" ]);
    });

    // Toggle center text alignment in TextEdit
    $("#center-btn").on("click", function() {
        $(".text-body").toggleClass("center");
        removeClasses(".text-body", [ "right", "left", "justify" ]);
    });

    // Toggle right text alignment in TextEdit
    $("#right-btn").on("click", function() {
        $(".text-body").toggleClass("right");
        removeClasses(".text-body", [ "center", "left", "justify" ]);
    });

    // Toggle justify text alignment in TextEdit
    $("#justify-btn").on("click", function() {
        $(".text-body").toggleClass("justify");
        removeClasses(".text-body", [ "center", "left", "right" ]);
    });
});

// Update text color in TextEdit
document.getElementById("colorPicker").addEventListener("input", function() {
    $(".text-body").css("color", this.value);
});

// Update font size in TextEdit
document.getElementById("fontSize").addEventListener("change", function() {
    $(".text-body").css("font-size", (this.value / 10) + "rem");
});

// Update font family in TextEdit
document.getElementById("fontFamily").addEventListener("change", function() {
    $(".text-body").css("font-family", this.value);
});

// Update line height in TextEdit
document.getElementById("lineHeight").addEventListener("change", function() {
    $(".text-body").css("line-height", this.value);
});