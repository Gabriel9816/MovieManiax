if (window.location.pathname === "/filmes") {
  const imgs = document.querySelector("#img");
  const imgList = document.querySelectorAll("#img .filmes-conteudo");

  let idx = 0;

  function carrossel() {
    idx++;

    imgList.forEach((img, index) => {
      const newIndex = (index + idx) % imgList.length;
      img.style.order = newIndex;
    });
  }

  setInterval(carrossel, 3200);
}

if (window.location.pathname === "/home") {
  const filmes = document.querySelectorAll(".carousel");

  console.log(filmes);

  let visualizaIdx = 0;

  function carrosselVisualiza() {
    visualizaIdx++;

    const filmesList = document.querySelectorAll(".carousel .filme");

    filmesList.forEach((div, index) => {
      const newIndex = (index + visualizaIdx) % filmesList.length;
      div.style.order = newIndex;
    });
  }

  setInterval(carrosselVisualiza, 3500);
}
