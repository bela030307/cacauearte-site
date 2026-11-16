let carrinho = []; // Cria um array vazio para armazenar os produtos adicionados ao carrinho

const carrinhoLateral = document.getElementById('carrinho-lateral'); // Seleciona o carrinho lateral pelo ID
const overlay = document.getElementById('overlay'); // Seleciona o fundo escuro que aparece quando o carrinho é aberto
const btnAbrir = document.querySelector('.carrinho'); // Seleciona o ícone do carrinho que fica no header
const btnFechar = document.getElementById('fechar-carrinho'); // Seleciona o botão de fechar (X) do carrinho

function abrirCarrinho() {
  carrinhoLateral.classList.add('aberto');
  overlay.classList.add('ativo');
}

function fecharCarrinho() {
  carrinhoLateral.classList.remove('aberto');
  overlay.classList.remove('ativo');
}

if (btnAbrir) btnAbrir.addEventListener('click', abrirCarrinho);
btnFechar.addEventListener('click', fecharCarrinho);
overlay.addEventListener('click', fecharCarrinho);

// Conecta automaticamente todos os botões dos cards de produto
document.querySelectorAll('.produto-card button').forEach(botao => {
  botao.addEventListener('click', () => {
    const card = botao.closest('.produto-card');
    const nomeProduto = card.querySelector('h3').innerText;
    adicionarAoCarrinho(nomeProduto);
  });
});

// Conecta o botão do produto destaque
const btnDestaque = document.querySelector('.informacoes-destaque button');
if (btnDestaque) {
  btnDestaque.addEventListener('click', () => {
    const nomeDestaque = document.querySelector('.informacoes-destaque h2').innerText;
    adicionarAoCarrinho(nomeDestaque);
  });
}

function adicionarAoCarrinho(nome) {
  carrinho.push(nome);
  atualizarCarrinho();
  abrirCarrinho();
}

function removerDoCarrinho(index) {
  carrinho.splice(index, 1);
  atualizarCarrinho();
}

function atualizarCarrinho() {
  const lista = document.getElementById('lista-carrinho');
  const contagemRodape = document.getElementById('total-itens');

  lista.innerHTML = '';

  carrinho.forEach((nomeProduto, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${nomeProduto}</span>
      <button onclick="removerDoCarrinho(${index})">Remover</button>
    `;
    lista.appendChild(li);
  });

  contagemRodape.innerText = carrinho.length;
}


/*------MENU SANDUICHE----------*/

const botaoMenu = document.querySelector(".menu-mobile");/*botao ☰ que a pessoa aperta.*/
const menu= document.querySelector(".menu-links");/*div que contem os links*/
const botaoFechar= document.querySelector(".fechar-menu");
const linksMenu = document.querySelectorAll(".menu-links .nav-link"); /*procura os elementos com a classe nav-link que estão dentro de .menu-links.*/
const botaoCadastro = document.querySelector(".cadastro-menu");

botaoMenu.addEventListener("click",function(){/*detecta o clique do botao.*/
  menu.classList.add("aberto"); /*adiciona a classe aberto ao menu.*/
  
});

botaoFechar.addEventListener("click", function() {
    menu.classList.remove("aberto");
});

document.addEventListener("click", function(event) {
    if (!menu.contains(event.target) && !botaoMenu.contains(event.target)) {
        menu.classList.remove("aberto");
    }
});

linksMenu.forEach(function(link) {
    link.addEventListener("click", function() {
        menu.classList.remove("aberto");
    });
});

botaoCadastro.addEventListener("click",function(){
   menu.classList.remove("aberto");
})


/*------CADASTRO E LOGIN----------*/
const abaEntrar = document.querySelector("#aba-entrar");
const abaCadastrar = document.querySelector("#aba-cadastrar");
const formulario = document.querySelector(".form-cadastro");
const botaoFormulario = document.querySelector(".btn-cadastrar");
const textoLogin = document.querySelector(".cliente-login");

abaEntrar.addEventListener("click",function(){
  abaEntrar.classList.add("ativa"); //Ativa o Entrar
  abaCadastrar.classList.remove("ativa");  // Desativa a aba Cadastrar

  formulario.classList.add("modo-login"); // Esconde Nome e Confirmar senha
  formulario.reset();

  botaoFormulario.textContent = "Entrar";

  textoLogin.innerHTML = 'Não tem uma conta? <a href="#" id="link-cadastrar">Cadastre-se</a>';

})

abaCadastrar.addEventListener("click",function(){
  abaEntrar.classList.remove("ativa"); 
  abaCadastrar.classList.add("ativa");  

  formulario.classList.remove("modo-login"); // Esconde Nome e Confirmar senha

  formulario.reset();

  botaoFormulario.textContent = "Cadastrar";

  textoLogin.innerHTML = 'Já tem uma conta? <a href="#" id="link-entrar">Entrar</a>';

})

textoLogin.addEventListener("click", function(event) {

    event.preventDefault();

    if (event.target.id === "link-entrar") {
        abaEntrar.click();
    } else if (event.target.id === "link-cadastrar") {
        abaCadastrar.click();
    }

});

const botoesMostrarSenha = document.querySelectorAll(".mostrar-senha");


botoesMostrarSenha.forEach(function(botao) {
    botao.addEventListener("click", function() {
      const campoSenha = botao.parentElement.querySelector("input");
      if (campoSenha.type === "password") {
        campoSenha.type = "text";
      } else {
        campoSenha.type = "password";
}
    });
});


const botoesFiltro = document.querySelectorAll(".filtro");
const cardsProdutos = document.querySelectorAll(".produto-card");

botoesFiltro.forEach(function(botao) {
    botao.addEventListener("click", function() {

        const categoriaSelecionada = botao.dataset.categoria;

        // Remove o destaque de todos os filtros
        botoesFiltro.forEach(function(filtro) {
          filtro.classList.remove("ativo");
        });

        // Destaca o filtro clicado
        botao.classList.add("ativo");

        //Filtra os produtos
        cardsProdutos.forEach(function(card) {
            if (categoriaSelecionada === "todos" ||
                card.dataset.categoria === categoriaSelecionada) {

                card.style.display = "";

            } else {
                card.style.display = "none";
            }
        });

    });
});