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

// 1. Abre o carrinho
btnAbrir.addEventListener('click', abrirCarrinho);
// 2. Fecha o carrinho pelo botão X
btnFechar.addEventListener('click', fecharCarrinho);
// 3. Fecha o carrinho clicando no fundo escuro
overlay.addEventListener('click', fecharCarrinho);


// Seleciona todos os botões que estão dentro dos cards de produtos
document.querySelectorAll('.produto-card button').forEach(botao => {
  // Para cada botão encontrado, adiciona um evento de clique
  botao.addEventListener('click', () => {
    // Encontra o card ao qual o botão clicado pertence
    const card = botao.closest('.produto-card');
    // Procura o h3 dentro desse card e pega o nome do produto
    const nomeProduto = card.querySelector('h3').innerText;
    // Chama a função que adiciona o produto ao carrinho
    adicionarAoCarrinho(nomeProduto);

  });
});

// Conecta o botão do produto em destaque

//  botão que está dentro da seção do produto em destaque
const btnDestaque = document.querySelector('.informacoes-destaque button');


  // Quando o botão for clicado, executa a função abaixo
  btnDestaque.addEventListener('click', () => {
    // Procura o h2 da seção de destaque e pega o nome do produto
    const nomeDestaque = document.querySelector('.informacoes-destaque h2').innerText;
    // Chama a função para adicionar esse produto ao carrinho
    adicionarAoCarrinho(nomeDestaque);
  });



// Função responsável por adicionar um produto ao carrinho
function adicionarAoCarrinho(nome) {
  // Adiciona o nome do produto ao final do array carrinho
  carrinho.push(nome);
  // Atualiza a lista de produtos exibida no carrinho
  atualizarCarrinho();
  // Abre o carrinho lateral automaticamente
  abrirCarrinho();
}


// Função responsável por remover um produto do carrinho
function removerDoCarrinho(index) {
  // Remove 1 produto do array na posição indicada pelo index
  carrinho.splice(index, 1);
  // Atualiza a lista após remover o produto
  atualizarCarrinho();
}


// Função responsável por atualizar os produtos exibidos no carrinho
function atualizarCarrinho() {
  // Seleciona a lista onde os produtos serão exibidos
  const lista = document.getElementById('lista-carrinho');
  // Seleciona o elemento que mostra a quantidade de itens no rodapé
  const contagemRodape = document.getElementById('total-itens');
  // Limpa a lista HTML antes de mostrar os produtos atualizados
  lista.innerHTML = '';
  
  
  // Percorre todos os produtos do array carrinho
  // nomeProduto representa o nome e index representa sua posição no array
  carrinho.forEach((nomeProduto, index) => {
    // Cria um novo elemento <li> para representar o produto
    const li = document.createElement('li');
    // Adiciona ao <li> o nome do produto e um botão para removê-lo
    // ${nomeProduto} insere o nome do produto!!!
    // ${index} indica qual posição será removida ao clicar no botão
    li.innerHTML = `
      <span>${nomeProduto}</span>
      <button onclick="removerDoCarrinho(${index})">Remover</button>
    `;
    // Adiciona o <li> criado dentro da lista do carrinho
    lista.appendChild(li);
  });

  /*EXEMPLO: <ul id="lista-carrinho">
    <li>
        <span>Chocolate Branco</span>
        <button onclick="removerDoCarrinho(0)">Remover</button>
    </li>
  </ul>*/

  
  // Atualiza a quantidade de itens usando o tamanho do array
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
