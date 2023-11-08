const form = document.querySelector("#loginUser");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  await fetch("/login/enter", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.value,
      senha: password.value,
    }),
  }).then(() => {
    window.location.href = "/home";
  });
});
