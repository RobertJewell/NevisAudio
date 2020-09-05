let form = document.getElementById("contactForm")
let name = document.getElementById("name")
let email = document.getElementById("email")
let inputFields = document.querySelectorAll(".inputBox")

form.addEventListener('submit', onSubmit);

// Custom email invalid message
email.addEventListener("input", function (event) {
    if (email.validity.typeMismatch) {
        email.setCustomValidity("Hi, virtual Joe here. \n\r This doesn't look like a valid email and I'm going to need one to slide into your DMs... \n\r (and By DMs, I mean your email inbox)");
    } else {
        email.setCustomValidity("");
    }
});


function onSubmit(event) {
    inputFields.forEach(element => {
        element.style.color = ("rgba(0,0,0,0)")
    });
    let message = document.getElementById("message");
    let newMessage = message.value.replace(/\n/g, "<br>");
    message.value = newMessage
}



