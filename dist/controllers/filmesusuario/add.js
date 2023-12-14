const form = document.querySelector("#asssitido");
const idFilme = document.querySelector("#idfilme");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let avalia = 0;

  for (const element of avaliacao) {
    console.log(element);

    if (element.checked) {
      avalia = element.value;
      console.log(avalia);
      break;
    }
  }

  await fetch("/filmes/userlist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      assistido: check.checked,
      idFilme: idFilme.value,
      avaliacao: avalia,
    }),
  }).then(() => {
    window.location.reload();
  });
});
