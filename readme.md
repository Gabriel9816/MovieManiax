<h1> AVISO </h1> 
<h2> NÃO TEM RESPONSIVIDADE EM NENHUMA DAS TELAS. </h2>

<p>SE O FILME NÃO TIVER ASSSISTIDO, VAI CHAMAR O ÍCONE <code>&lt;i class='bx bx-badge-check'&gt;&lt;/i&gt;</code> </p>

<p>SE ELE TIVER ASSISTIDO VAI CHAMAR <code> &lt;i class='bx bxs-badge-check'&gt;&lt;/i&gt; </code> </p>

FUNDO QUE CORTA A PÁGINA

body {
background: url(/dist/views/source/image/fundos/besouro-azul-salto.jpg) fixed;
background-size: cover;
overflow: hidden;
display: grid;
grid-template-columns: repeat(3, 1fr);
}

body::before {
content: "";
position: fixed;
top: 0;
left: 0;
width: 100vw;
height: 100vh;
/_ background: rgba(40,46,58,0.7); O ultimo digito 0.7 altera a opacidade _/
background: rgba(40, 46, 58, 0.7) fixed;
z-index: 1; /_ Ajuste o índice z conforme necessário para a sobreposição correta _/
}

.pagina-inteira {
content: "";
position: fixed;
top: 0;
left: 0;
width: 100vw;
height: 100%;
background-color: rgba(40, 46, 58, 1);
clip-path: polygon(0% 100%, 0% 53%, 100% 27%, 100% 100%);
z-index: 1;

box-shadow: 0px -1px 7px 2px rgba(0, 0, 0, 0.3);
-webkit-box-shadow: 0px -1px 7px 2px rgba(0, 0, 0, 0.3);
-moz-box-shadow: 0px -1px 7px 2px rgba(0, 0, 0, 0.3);
}
