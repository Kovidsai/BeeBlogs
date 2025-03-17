"use strict";

const form = document.getElementById("register-form");

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  try {
    const response = await fetch("http://localhost:8080/auth/register", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });


    const result = await response.json();

    if (response.ok) {
      alert("Registration Successfull!");
      window.location.href = "login.html";
    } else {
      alert("Error: " + result.error);
    }
  } catch (error) {
    console.error("Error: ", error);
    alert("Some thing went wrong");
  }
});
