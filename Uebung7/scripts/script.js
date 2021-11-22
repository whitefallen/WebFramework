const form = document.querySelector(".needs-validation");
form.addEventListener(
  "submit",
  function (event) {
    event.preventDefault();
    if (!form.checkValidity()) {
      event.stopPropagation();
    }

    form.classList.add("was-validated");
  },
  false
);
