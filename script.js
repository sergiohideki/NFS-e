// Armazenamento dos itens
let itensVendidos = [];

// Índice do item em edição/visualização
let itemIndexEdit = null;
let itemIndexView = null;

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

function fecharPopup(popupId) {
  document.getElementById(popupId).style.display = 'none';
}

/* =============================================================================
   CRUD de Itens
============================================================================= */
// Confirmação de Adição
function confirmarAdicao() {
  const nome = document.getElementById('addNomeItem').value.trim();
  const valor = parseFloat(document.getElementById('addValorItem').value);

  if (!nome || isNaN(valor) || valor <= 0) {
    alert('Por favor, preencha o nome e valor do item corretamente.');
    return;
  }

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

  if (!nome || isNaN(valor) || valor <= 0) {
    alert('Por favor, preencha o nome e valor do item corretamente.');
    return;
  }

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
    btnView.textContent = '👁';
    btnView.className = 'btnAcao';
    btnView.title = 'Visualizar Item';
    btnView.onclick = () => abrirPopupView(index);

    // Botão Editar (Lápis)
    const btnEdit = document.createElement('button');
    btnEdit.textContent = '✏';
    btnEdit.className = 'btnAcao';
    btnEdit.title = 'Editar Item';
    btnEdit.onclick = () => abrirPopupEdit(index);

    // Botão Excluir (X)
    const btnDelete = document.createElement('button');
    btnDelete.textContent = 'X';
    btnDelete.className = 'btnDelete';
    btnDelete.title = 'Excluir Item';
    btnDelete.onclick = () => excluirItem(index);

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
function gerarNotaFiscal() {
  const valorVenda = parseFloat(document.getElementById('valorVenda').value);
  const itens = itensVendidos.map(item => item.nome).join(', ');
  const irpf = parseFloat(document.getElementById('irpf').value);
  const pis = parseFloat(document.getElementById('pis').value);
  const cofins = parseFloat(document.getElementById('cofins').value);
  const inss = parseFloat(document.getElementById('inss').value);
  const issqn = parseFloat(document.getElementById('issqn').value);

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

  // Exibindo a Nota Fiscal
  document.getElementById('nfValorVenda').textContent = valorVenda.toFixed(2);
  document.getElementById('nfItens').textContent = itens;
  document.getElementById('nfIrpf').textContent = valorIrpf.toFixed(2);
  document.getElementById('nfPis').textContent = valorPis.toFixed(2);
  document.getElementById('nfCofins').textContent = valorCofins.toFixed(2);
  document.getElementById('nfInss').textContent = valorInss.toFixed(2);
  document.getElementById('nfIssqn').textContent = valorIssqn.toFixed(2);
  document.getElementById('nfTotalImpostos').textContent = totalImpostos.toFixed(2);
  document.getElementById('nfTotalFinal').textContent = valorTotalFinal.toFixed(2);

  document.getElementById('notaFiscal').style.display = 'block';
}

/* =============================================================================
   Eventos Principais
============================================================================= */
document.getElementById('btnAdicionarItem').addEventListener('click', abrirPopupAdd);
