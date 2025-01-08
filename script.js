// Função para gerar a nota fiscal com os dados informados
function gerarNotaFiscal() {
    // Obtendo os valores do formulário
    const valorVenda = parseFloat(document.getElementById('valorVenda').value);
    const itens = document.getElementById('itens').value;
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

    // Exibindo a nota fiscal
    document.getElementById('notaFiscal').style.display = 'block';
}
