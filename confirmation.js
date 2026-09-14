const savedData = sessionStorage.getItem("formData");

if (!savedData) {
    window.location.href = "form.html";
} else {
    const formData = JSON.parse(savedData);

    document.getElementById("confirmName").textContent =
        formData.firstName + " " + formData.lastName;

    document.getElementById("confirmAddress").textContent =
        formData.address + ", " +
        formData.city + ", " +
        formData.state + " " +
        formData.zip;

    document.getElementById("confirmPhone").textContent =
        formData.phone;

    document.getElementById("confirmEmail").textContent =
        formData.email;

    document.getElementById("confirmBirthdate").textContent =
        formData.birthdate;

    document.getElementById("confirmMessage").textContent =
        formData.message;

    document.getElementById("editButton").addEventListener("click", function () {
        history.back();
    });

   document.getElementById("confirmButton").addEventListener("click", function () {
    const subject = "COP4813 Assignment 3 Form Submission";

    const body =
        "Name: " + formData.firstName + " " + formData.lastName + "\n" +
        "Address: " + formData.address + ", " +
        formData.city + ", " +
        formData.state + " " +
        formData.zip + "\n" +
        "Phone: " + formData.phone + "\n" +
        "Email: " + formData.email + "\n" +
        "Birth Date: " + formData.birthdate + "\n\n" +
        "Message:\n" + formData.message;

    const mailtoLink =
        "mailto:sean_nelson@daytonastate.edu" +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

    window.location.href = mailtoLink;
}); 
}