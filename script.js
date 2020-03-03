const form = document.querySelector("#form");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const password2 = document.querySelector("#password2");

function checkPasswordsMatch(input1, input2) {
  if (input1.value.trim() !== input2.value.trim()) {
    showError(input2, "Passwords does not match");
  }
}
function checkValidEmail(input) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   return re.test(String(input).toLowerCase());
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
}

/**
 * Show error message to the user
 * @param {*} input input control to check
 * @param {*} message message to be shown to the user
 */
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

/**
 * Show input border
 * @param {*} input input control to check
 */
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

function getFieldName(input) {
  return `${input.id.charAt(0).toUpperCase()}${input.id.slice(1)}`;
}

function checkRequired(controls) {
  controls.forEach(function(input) {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

function checkLength(input, min, max) {
  let val = input.value.trim().length;
  if (val >= min && val <= max) {
    showSuccess(input);
  } else {
    showError(
      input,
      `${getFieldName(input)} must be between ${min} and ${max} characters`
    );
  }
}

form.addEventListener("submit", function(event) {
  event.preventDefault();
  checkRequired([username, email, password, password2]);
  checkLength(username, 4, 15);
  checkLength(password, 6, 20);
  checkValidEmail(email);
  checkPasswordsMatch(password, password2);
});
