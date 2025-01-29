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
      if(elements[k].name !== undefined) {
        return elements[k].name;
      // special case for Edge's html collection
      }else if(elements[k].length > 0){
        return elements[k].item(0).name;
      }
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
          if (item.checked || item.selected) {
            data.push(item.value);
          }
        }
        formData[name] = data.join(', ');
      }
    });

    // add form-specific values into the data
    formData.formDataNameOrder = JSON.stringify(fields);
    formData.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
    formData.formGoogleSendEmail = form.dataset.email || ""; // no email by default
    formData.gRecaptchaResponse = document.getElementById("g-recaptcha-response").value;

    return {data: formData, honeypot: honeypot};
  }

  function handleFormSubmit(event) {  // handles form submit without any jquery
    loadingCursor(); // Show spinner while sending email
    event.preventDefault();           // we are submitting via xhr below
    var form = event.target;
    var formData = getFormData(form);
    var data = formData.data;

    // If a honeypot field is filled, assume it was done so by a spam bot.
    if (formData.honeypot) {
      return false;
    }

    disableAllButtons(form);
    var url = form.action;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    // xhr.withCredentials = true;
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          form.reset();
          var formElements = form.querySelector(".email")
          if (formElements) {
            formElements.style.display = "none"; // hide form
          }

          revertCursor(); // Revert cursor to normal once sent

          // NOTIFICATION
          Toastify({
            text: "Message sent successfully!",
            className: "info",
            duration: 2500,
            style: {
              background: "rgba(45, 45, 45, 0.8)",
              "-webkit-box-shadow": "0 1.5rem 2.5rem 0 rgba(0, 0, 0, 0.5)",
              "-moz-box-shadow": "0 1.5rem 2.5rem 0 rgba(0, 0, 0, 0.5)",
              "box-shadow": "0 1.5rem 2.5rem 0 rgba(0, 0, 0, 0.5)",
              "backdrop-filter": "blur(0.8rem)",
              "-webkit-backdrop-filter": "blur(0.8rem)",
              padding: "2rem",
              "border-radius": "1rem",
              width: "25rem",
              "font-size": "1.4rem",
              border: "none",
              cursor: "default",
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
    }).join('&');
    xhr.send(encoded);
  }

  function loadingCursor() {
    document.body.style.cursor = "none";
    $('.loader').show();
    document.addEventListener('mousemove', moveMouse);
  };

  function revertCursor() {
    document.body.style.cursor = "auto";
    $('.loader').hide();
    document.removeEventListener('mousemove', moveMouse);
  };

  function moveMouse(e) {
    var cursor = document.querySelector('.loader');
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  }
  
  function loaded() {
    // bind to the submit event of our form
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
})();