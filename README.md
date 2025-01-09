# 📝 Emissão de Nota Fiscal de Serviço (NFS-e)

Um projeto desenvolvido com foco na **organização**, **boas práticas de desenvolvimento** e **validação**, criado para emissão de Nota Fiscal de Serviço.

O site permite que os usuários adicionem itens vendidos, calculem impostos e gerem uma nota fiscal com exibição detalhada.

---

## 🚀 Funcionalidades

- **Adição de itens vendidos** com nome e valor.
- **Cálculo automático** do valor total da venda.
- **Cálculo de impostos** (IRPF, PIS, COFINS, INSS, ISSQN) com base nas porcentagens informadas.
- **Exibição detalhada da Nota Fiscal**, incluindo:
  - Lista de itens vendidos com seus valores individuais.
  - Valor total da venda.
  - Detalhamento dos impostos calculados.
  - Total de impostos e valor final com impostos inclusos.
- Pop-ups dinâmicos para confirmação de ações (adicionar, editar e excluir itens).

---

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e organizada.
- **CSS3**: Estilos para um layout moderno e visualmente agradável.
- **JavaScript (ES6)**: 
  - Manipulação de DOM para adicionar, editar e excluir itens.
  - Validação de formulários para garantir entradas corretas.
  - Uso do `localStorage` para salvar e exibir dados da Nota Fiscal.
- **GitHub Pages**: Hospedagem gratuita para o projeto.

---

## ✨ Boas Práticas Adotadas

1. **Organização Modular**:
   - Divisão do código em arquivos específicos (`HTML`, `CSS`, `JS`) para facilitar a manutenção.
   - Reutilização do cabeçalho com um arquivo `header.html` dinâmico.

2. **Validação de Entradas**:
   - Validação dos campos para evitar entradas inválidas, como valores vazios ou negativos.
   - Feedback amigável com mensagens de erro diretamente nos campos.

3. **Pop-ups Dinâmicos**:
   - Confirmação de ações como adicionar, editar e excluir itens sem recarregar a página.

---

## 🔧 Como Executar o Projeto Localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/sergiohideki/NFS-e.git

2. Navegue até o diretório do projeto:
   ```bash
   cd nfs-project
   
3. Abra o arquivo index.html no navegador:
   - No VS Code, você pode usar a extensão Live Server para hospedar o projeto localmente.

---

## 🌐 Acesse o Projeto Online

O projeto está hospedado no GitHub Pages e pode ser acessado pelo link abaixo:

[**Acesse Aqui**](https://sergiohideki.github.io/NFS-e/)

---

## 📞 Contato
Para dúvidas ou sugestões, entre em contato:

- Email: shnakashimanakata@gmail.com
- LinkedIn: https://www.linkedin.com/in/sergio-hideki/
