// Armazenamento dos itens
let itensVendidos = [];

// Índice do item em edição/visualização
let itemIndexEdit = null;
let itemIndexView = null;
let itemIndexDelete = null;

// Carregar o cabeçalho dinâmico
fetch('header.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('header').innerHTML = data;
  });

/* =============================================================================
   Funções de Pop-up
============================================================================= */
function abrirPopupAdd() {
  document.getElementById('popupAdd').style.display = 'flex';
}

function abrirPopupView(index) {
  itemIndexView = index;
  const item = itensVendidos[index];
  document.getElementById('viewNomeItem').textContent = item.nome;
  document.getElementById('viewValorItem').textContent = item.valor.toFixed(2);
  document.getElementById('popupView').style.display = 'flex';
}

function abrirPopupEdit(index) {
  itemIndexEdit = index;
  const item = itensVendidos[index];
  document.getElementById('editNomeItem').value = item.nome;
  document.getElementById('editValorItem').value = item.valor;
  document.getElementById('popupEdit').style.display = 'flex';
}

function abrirPopupExcluir(index) {
    itemIndexDelete = index; // Salvar o índice do item a ser excluído
    document.getElementById('popupConfirmDelete').style.display = 'flex';
}

function confirmarExclusao() {
    if (itemIndexDelete !== null) {
      itensVendidos.splice(itemIndexDelete, 1); // Remove o item da lista
      atualizarTabelaItens(); // Atualiza a tabela
      atualizarValorVenda(); // Atualiza o valor total da venda
      itemIndexDelete = null; // Reseta o índice
    }
    fecharPopup('popupConfirmDelete');
}

function fecharPopup(popupId) {
  document.getElementById(popupId).style.display = 'none';
}

function fecharPopup(popupId, event) {
    if (event) event.preventDefault(); // Previne comportamento padrão
    document.getElementById(popupId).style.display = 'none';
}

/* =============================================================================
   CRUD de Itens
============================================================================= */
// Confirmação de Adição
function confirmarAdicao() {
  const nome = document.getElementById('addNomeItem').value.trim();
  const valor = parseFloat(document.getElementById('addValorItem').value);

// Função para exibir mensagens de erro
function mostrarErro(campoId, mensagem) {
    const erroElemento = document.getElementById(`error-${campoId}`);
    erroElemento.textContent = mensagem;
    erroElemento.style.display = 'block';
  }

  // Função para limpar as mensagens de erro
  function limparErros() {
    document.querySelectorAll('.error-message').forEach(el => {
      el.textContent = '';
      el.style.display = 'none';
    });
  }

  // Limpar mensagens anteriores
  limparErros();

  // Validar os campos
  let erros = false;

  if (!nome) {
    mostrarErro('addNomeItem', 'Por favor, preencha o nome do item.');
    erros = true;
  }

  if (isNaN(valor) || valor <= 0) {
    mostrarErro('addValorItem', 'Por favor, insira um valor válido.');
    erros = true;
  }

  // Interromper a execução se houver erros
  if (erros) return;

  itensVendidos.push({ nome, valor });
  atualizarTabelaItens();
  atualizarValorVenda();

  // Limpa campos e fecha pop-up
  document.getElementById('addNomeItem').value = '';
  document.getElementById('addValorItem').value = '';
  fecharPopup('popupAdd');
}

// Confirmação de Edição
function confirmarEdicao() {
  const nome = document.getElementById('editNomeItem').value.trim();
  const valor = parseFloat(document.getElementById('editValorItem').value);

 // Função para exibir mensagens de erro
 function mostrarErro(campoId, mensagem) {
    const erroElemento = document.getElementById(`error-${campoId}`);
    erroElemento.textContent = mensagem;
    erroElemento.style.display = 'block';
  }

  // Função para limpar as mensagens de erro
  function limparErros() {
    document.querySelectorAll('.error-message').forEach(el => {
      el.textContent = '';
      el.style.display = 'none';
    });
  }

  // Limpar mensagens anteriores
  limparErros();

  // Validar os campos
  let erros = false;

  if (!nome) {
    mostrarErro('editNomeItem', 'Por favor, preencha o nome do item.');
    erros = true;
  }

  if (isNaN(valor) || valor <= 0) {
    mostrarErro('editValorItem', 'Por favor, insira um valor válido.');
    erros = true;
  }

  // Interromper a execução se houver erros
  if (erros) return;

  itensVendidos[itemIndexEdit] = { nome, valor };
  atualizarTabelaItens();
  atualizarValorVenda();

  fecharPopup('popupEdit');
}

// Excluir Item
function excluirItem(index) {
  if (confirm('Deseja realmente excluir este item?')) {
    itensVendidos.splice(index, 1);
    atualizarTabelaItens();
    atualizarValorVenda();
  }
}

/* =============================================================================
   Atualizações na Tabela e no Valor da Venda
============================================================================= */
function atualizarTabelaItens() {
  const tabela = document.getElementById('tabelaItens');
  const tbody = document.getElementById('tabelaCorpo');

  // Se não houver itens, esconde a tabela
  if (itensVendidos.length === 0) {
    tabela.style.display = 'none';
    tbody.innerHTML = '';
    return;
  }

  // Caso exista ao menos um item, mostra a tabela
  tabela.style.display = 'table';

  // Limpa o corpo da tabela antes de recriar as linhas
  tbody.innerHTML = '';

  // Cria uma linha para cada item
  itensVendidos.forEach((item, index) => {
    const tr = document.createElement('tr');

    // Coluna Nome
    const tdNome = document.createElement('td');
    tdNome.textContent = item.nome;
    tr.appendChild(tdNome);

    // Coluna Valor
    const tdValor = document.createElement('td');
    tdValor.textContent = item.valor.toFixed(2);
    tr.appendChild(tdValor);

    // Coluna Ações
    const tdAcoes = document.createElement('td');
    tdAcoes.className = 'acoes';

    // Botão Visualizar (Olho)
    const btnView = document.createElement('button');
    btnView.className = 'btnAcao view';
    btnView.title = 'Visualizar Item';
    btnView.onclick = () => abrirPopupView(index);

    // Ícone interno do botão "Visualizar"
    btnView.textContent = '👁'; // Adiciona o ícone do olho
    tdAcoes.appendChild(btnView);


    // Botão Editar (Lápis)
    const btnEdit = document.createElement('button');
    btnEdit.className = 'btnAcao edit';
    btnEdit.title = 'Editar Item';
    btnEdit.onclick = () => abrirPopupEdit(index);

    // Ícone interno do botão "Editar"
    const editIcon = document.createElement('span');
    editIcon.className = 'edit-icon';
    editIcon.textContent = '✏'; // Adiciona o ícone do lápis
    btnEdit.appendChild(editIcon); // Insere o ícone no botão

    tdAcoes.appendChild(btnEdit);


    // Botão Excluir (X)
    const btnDelete = document.createElement('button');
    btnDelete.textContent = 'X';
    btnDelete.className = 'btnDelete';
    btnDelete.title = 'Excluir Item';
    btnDelete.onclick = () => abrirPopupExcluir(index);

    tdAcoes.appendChild(btnView);
    tdAcoes.appendChild(btnEdit);
    tdAcoes.appendChild(btnDelete);

    tr.appendChild(tdAcoes);

    tbody.appendChild(tr);
  });
}

// Atualiza o valor total da venda
function atualizarValorVenda() {
  const valorTotal = itensVendidos.reduce((soma, item) => soma + item.valor, 0);
  document.getElementById('valorVenda').value = valorTotal.toFixed(2);
}

/* =============================================================================
   Geração de Nota Fiscal
============================================================================= */

function validarFormularioPrincipal(event) {
    event.preventDefault();
    // Lógica de validação dos campos
    return true; // Ou false, dependendo da validação
}

function gerarNotaFiscal() {
    const valorVenda = parseFloat(document.getElementById('valorVenda').value);
    const irpf = parseFloat(document.getElementById('irpf').value);
    const pis = parseFloat(document.getElementById('pis').value);
    const cofins = parseFloat(document.getElementById('cofins').value);
    const inss = parseFloat(document.getElementById('inss').value);
    const issqn = parseFloat(document.getElementById('issqn').value);
  
    // Função para exibir a mensagem de erro
    function mostrarErro(campoId, mensagem) {
      const erroElemento = document.getElementById(`error-${campoId}`);
      erroElemento.textContent = mensagem;
      erroElemento.style.display = 'block';
    }
  
    // Função para limpar as mensagens de erro
    function limparErros() {
      document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
        el.style.display = 'none';
      });
    }
  
    // Limpar mensagens anteriores
    limparErros();
  
    // Validar campos obrigatórios
    let erros = false;
  
    if (isNaN(valorVenda) || valorVenda <= 0) {
      mostrarErro('valorVenda', 'Preencha corretamente o Valor da Venda.');
      erros = true;
    }
    if (isNaN(irpf)) {
      mostrarErro('irpf', 'Preencha corretamente o campo IRPF.');
      erros = true;
    }
    if (isNaN(pis)) {
      mostrarErro('pis', 'Preencha corretamente o campo PIS.');
      erros = true;
    }
    if (isNaN(cofins)) {
      mostrarErro('cofins', 'Preencha corretamente o campo COFINS.');
      erros = true;
    }
    if (isNaN(inss)) {
      mostrarErro('inss', 'Preencha corretamente o campo INSS.');
      erros = true;
    }
    if (isNaN(issqn)) {
      mostrarErro('issqn', 'Preencha corretamente o campo ISSQN.');
      erros = true;
    }
  
    // Se houver erros, interrompa a execução
    if (erros) return;
  
    // Calculando os impostos
    const valorIrpf = valorVenda * (irpf / 100);
    const valorPis = valorVenda * (pis / 100);
    const valorCofins = valorVenda * (cofins / 100);
    const valorInss = valorVenda * (inss / 100);
    const valorIssqn = valorVenda * (issqn / 100);
  
    // Total de impostos
    const totalImpostos = valorIrpf + valorPis + valorCofins + valorInss + valorIssqn;
  
    // Valor total com impostos
    const valorTotalFinal = valorVenda + totalImpostos;
  
    // Salvar os dados no localStorage
    localStorage.setItem('notaFiscal', JSON.stringify({
      valorVenda: valorVenda.toFixed(2),
      itensVendidos: itensVendidos, // Salvar a lista completa de itens
      irpf: valorIrpf.toFixed(2),
      pis: valorPis.toFixed(2),
      cofins: valorCofins.toFixed(2),
      inss: valorInss.toFixed(2),
      issqn: valorIssqn.toFixed(2),
      totalImpostos: totalImpostos.toFixed(2),
      valorTotalFinal: valorTotalFinal.toFixed(2),
    }));
  
    // Redirecionar para a página de exibição
    window.location.href = 'nota-fiscal.html';
  }
  

/* =============================================================================
   Eventos Principais
============================================================================= */
document.getElementById('btnAdicionarItem').addEventListener('click', abrirPopupAdd);
