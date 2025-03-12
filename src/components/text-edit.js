document.addEventListener("DOMContentLoaded", function() {
    const align = [ "left", "center", "right", "justify" ];
    const style = [ "bold", "italic", "underline" ];
    const textBody = document.querySelector(".text-body");

    // Remove classes in element
    function removeClasses(selector, classes) {
        const element = document.querySelector(selector);

        for (let i = 0; i < classes.length; i++) {
            if (element.classList.contains(classes[i])) element.classList.remove(classes[i]);
        }
    }

    // Toggle style in TextEdit
    style.forEach(element => {
        document.getElementById(`${element}-btn`).addEventListener("click", function() {
            textBody.classList.toggle(element);
        });
    });

    // Toggle alignment in TextEdit
    align.forEach(element => {
        document.getElementById(`${element}-btn`).addEventListener("click", function() {
            textBody.classList.toggle(element);
            removeClasses(".text-body", align.filter(item => item !== element));
        });
    });

    // Update text color in TextEdit
    document.getElementById("colorPicker").addEventListener("input", function() {
        textBody.style.color = this.value;
    });

    // Update font size in TextEdit
    document.getElementById("fontSize").addEventListener("change", function() {
        textBody.style.fontSize = (this.value / 10) + "rem";
    });

    // Update font family in TextEdit
    document.getElementById("fontFamily").addEventListener("change", function() {
        textBody.style.fontFamily = this.value;
    });

    // Update line height in TextEdit
    document.getElementById("lineHeight").addEventListener("change", function() {
        textBody.style.lineHeight = this.value;
    }); 
});