//Form

const myForm = document.querySelector("#myForm");
const send = document.querySelector("#send");

send.addEventListener("click", (event) => {
  event.preventDefault();

  if (validateForm(myForm)) {
    const data = {
      name: myForm.elements.email.value,
    };

    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open("POST", " https://webdev-api.loftschool.com/sendmail");
    xhr.send(JSON.stringify(data));
    xhr.addEventListener("load", () => {
      if (xhr.response.status) {
        console.log("все ок");
      }
    });
  }
});

function validateForm(form) {
  let valid = true;

  if (!validateField(form.elements.email)) {
    valid = false;
  }
  return valid;
}

function validateField(field) {
  if (!field.checkValidity()) {
    field.nextElementSibling.textContent = field.validationMessage;

    return false;
  } else {
    field.nextElementSibling.textContent = "";

    return true;
  }
}