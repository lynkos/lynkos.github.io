(function() {
  // get all data in form and return object
  function getFormData(form) {
    var elements = form.elements;
    var honeypot;

    var fields = Object.keys(elements).filter(function(k) {
      if (elements[k].name === "honeypot") {
        honeypot = elements[k].value;
        return false;
      }
      return true;
    }).map(function(k) {
      if (elements[k].name !== undefined) return elements[k].name;

      // special case for Edge's html collection
      else if (elements[k].length > 0) return elements[k].item(0).name;
    }).filter(function(item, pos, self) {
      return self.indexOf(item) == pos && item;
    });

    var formData = {};
    fields.forEach(function(name){
      var element = elements[name];
      
      // singular form elements just have one value
      formData[name] = element.value;

      // when our element has multiple items, get their values
      if (element.length) {
        var data = [];
        for (var i = 0; i < element.length; i++) {
          var item = element.item(i);
          if (item.checked || item.selected) data.push(item.value);
        }
        formData[name] = data.join(", ");
      }
    });

    // add form-specific values into the data
    formData.formDataNameOrder = JSON.stringify(fields);
    formData.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
    formData.formGoogleSendEmail = form.dataset.email || ""; // no email by default
    formData.gRecaptchaResponse = document.getElementById("g-recaptcha-response").value;

    return { data: formData, honeypot: honeypot };
  }

  function handleFormSubmit(event) {  // handles form submit without any jquery
    loadingCursor(); // Show spinner while sending email
    event.preventDefault(); // Submitting via xhr below
    var form = event.target;
    var formData = getFormData(form);
    var data = formData.data;

    // If a honeypot field is filled, assume it was done so by a spam bot
    if (formData.honeypot) return false;

    disableAllButtons(form);
    var url = form.action;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    // xhr.withCredentials = true;
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          form.reset();
          var formElements = form.querySelector(".email");

          // Hide email form
          if (formElements) formElements.style.display = "none";

          // Revert cursor to normal once sent
          revertCursor();

          // Only load Toastify once
          if (typeof Toastify === "undefined") loadToastify();

          // Show success message
          Toastify({
            text: "Message sent successfully!",
            duration: 2500,
            style: {
              width: "25rem",
              "font-size": "1.4rem"
            },
            offset: {
              x: 0,
              y: "3rem" // Height of menubar
            },
          }).showToast();
        }
    };
    // url encode form data for sending as post data
    var encoded = Object.keys(data).map(function(k) {
        return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
    }).join("&");
    xhr.send(encoded);
  }

  // Show spinner while sending email
  function loadingCursor() {
    document.body.style.cursor = "none";
    $(".loader").show();
    document.addEventListener("mousemove", moveMouse);
  };

  // Revert cursor to normal once sent
  function revertCursor() {
    document.body.style.cursor = "auto";
    $(".loader").hide();
    document.removeEventListener("mousemove", moveMouse);
  };

  function moveMouse(e) {
    var cursor = document.querySelector(".loader");
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  }
  
  // Bind to the submit event of our form
  function loaded() {
    var forms = document.querySelectorAll("form.gform");
    for (var i = 0; i < forms.length; i++) {
      forms[i].addEventListener("submit", handleFormSubmit, false);
    }
  };

  document.addEventListener("DOMContentLoaded", loaded, false);

  function disableAllButtons(form) {
    var buttons = form.querySelectorAll("button");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
  }

  // Load script
  function loadScript(url, integrity, crossorigin, async = false, defer = false) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    if (integrity !== undefined) script.integrity = integrity;
    if (crossorigin !== undefined) script.crossorigin = crossorigin;
    if (async) script.async = true;
    if (defer) script.defer = true;
    document.head.appendChild(script);
  }

  // Load Toastify if not already loaded
  function loadToastify() {
    loadScript("https://cdn.jsdelivr.net/npm/toastify-js", "sha256-b6v+vkDiub4K6BYBnCxU8i3QkGgQ0YkR+MSLduPEQmw=", "anonymous");
  }

  // Load reCAPTCHA when mail form is opened (i.e. mail icon is clicked)
  function loadRecaptcha() {
    loadScript("https://www.google.com/recaptcha/api.js");

    // Remove event listener to avoid js error
    document.getElementById("mail").removeEventListener("click", loadRecaptcha);
    document.getElementById("mailLaunch").removeEventListener("click", loadRecaptcha);
  };
  
  // Add initial event listener to mail form
  document.getElementById("mail").addEventListener("click", loadRecaptcha, false);
  document.getElementById("mailLaunch").addEventListener("click", loadRecaptcha, false);
})();