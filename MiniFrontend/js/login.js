"use stict";

form = document.getElementById("login-form");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const formData = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  try {
    const response = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const result = await response.json();
    if (response.ok) {
      window.location.href = "dashboard.html";
    } else {
      alert("Error: " + result.error);
    }
  } catch (error) {
    console.log("Error: ", result);
    alert("something went wrong");
  }
});
