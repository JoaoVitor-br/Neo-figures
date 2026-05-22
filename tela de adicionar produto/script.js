const pesquisar = document.getElementById("pesquisar");

if (pesquisar) {
  const produtos = document.querySelectorAll("#listaProdutos tr");

  pesquisar.addEventListener("keyup", () => {
    const valor = pesquisar.value.toLowerCase();

    produtos.forEach((produto) => {
      const texto = produto.textContent.toLowerCase();
      produto.style.display = texto.includes(valor) ? "" : "none";
    });
  });
}
