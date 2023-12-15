async function calculaMediaAvaliacao(avaliacoes) {
  let media = 0;

  await avaliacoes.forEach((element) => {
    media += Number(element.avaliacao);
  });

  return Number(media / avaliacoes.length);
}

module.exports = calculaMediaAvaliacao;
