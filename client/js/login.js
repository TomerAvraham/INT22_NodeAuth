const loginFormEl = document.querySelector("[data-login-form]");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

loginFormEl.addEventListener("submit", async (e) => {
  e.preventDefault();
  const requestBody = {
    username: usernameInput.value,
    password: passwordInput.value,
  };
  const res = await fetch("http://localhost:3001/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });
  const data = await res.json();
  console.log(data);
});
