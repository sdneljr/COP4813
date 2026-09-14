const form = document.getElementById("userForm");
const phoneInput = document.getElementById("phone");

// Phone number input mask
phoneInput.addEventListener("input", function () {
    let numbers = phoneInput.value.replace(/\D/g, "").slice(0, 10);

    if (numbers.length >= 7) {
        phoneInput.value =
            "(" + numbers.slice(0, 3) + ")" +
            numbers.slice(3, 6) + "-" +
            numbers.slice(6);
    } else if (numbers.length >= 4) {
        phoneInput.value =
            "(" + numbers.slice(0, 3) + ")" +
            numbers.slice(3);
    } else if (numbers.length > 0) {
        phoneInput.value = "(" + numbers;
    }
});

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const address = document.getElementById("address").value.trim();
    const city = document.getElementById("city").value.trim();
    const state = document.getElementById("state").value.trim().toUpperCase();
    const zip = document.getElementById("zip").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const birthdate = document.getElementById("birthdate").value;
    const message = document.getElementById("message").value.trim();
    const confirm = document.getElementById("confirm").value.trim();

    const namePattern = /^[A-Za-z'-]+$/;
    const cityPattern = /^[A-Za-z .'-]+$/;
    const statePattern = /^[A-Za-z]{2}$/;
    const zipPattern = /^\d{5}(-\d{4})?$/;
    const phonePattern = /^\(\d{3}\)\d{3}-\d{4}$/;

    if (!namePattern.test(firstName)) {
        alert("Please enter a valid first name.");
        return;
    }

    if (!namePattern.test(lastName)) {
        alert("Please enter a valid last name.");
        return;
    }

    if (address.length < 5) {
        alert("Please enter a valid street address.");
        return;
    }

    if (!cityPattern.test(city)) {
        alert("Please enter a valid city.");
        return;
    }

    if (!statePattern.test(state)) {
        alert("Please enter a valid 2-letter state abbreviation.");
        return;
    }

    if (!zipPattern.test(zip)) {
        alert("Please enter a valid ZIP code.");
        return;
    }

    if (!phonePattern.test(phone)) {
        alert("Please enter a complete 10-digit phone number.");
        return;
    }

    if (!birthdate) {
        alert("Please enter your birth date.");
        return;
    }

    const selectedDate = new Date(birthdate + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate > today) {
        alert("Birth date cannot be in the future.");
        return;
    }

    if (message.length === 0) {
        alert("Please enter a message.");
        return;
    }

    if (confirm !== "8") {
        alert("Security question is incorrect. Please try again.");
        return;
    }

    const formData = {
        firstName,
        lastName,
        address,
        city,
        state,
        zip,
        phone,
        email,
        birthdate,
        message
    };

    sessionStorage.setItem("formData", JSON.stringify(formData));

    window.location.href = "confirmation.html";
});