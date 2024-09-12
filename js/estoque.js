document.addEventListener('DOMContentLoaded', () => {
  const tabela = document.getElementById('tabela_inventario');
  const botaoExcluir = document.getElementById('botao_excluir');
  let produtos = JSON.parse(localStorage.getItem('produtos')) || [];

  function atualizarTabela() {
      const tbody = tabela.querySelector('tbody');
      tbody.innerHTML = ''; // Limpa a tabela antes de atualizar
      produtos.forEach((produto, index) => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
              <td><input type="checkbox" class="excluir-item" data-index="${index}"></td>
              <td>${produto.nome_produto}</td>
              <td>${produto.categoria}</td>
              <td>${produto.quantidade}</td>
              <td>${produto.preco}</td>
              <td>${produto.fornecedor}</td>
              <td>${produto.localizacao}</td>
              <td>${produto.data_validade || 'N/A'}</td>
              <td>${produto.descricao || 'N/A'}</td>
          `;
          tbody.appendChild(tr);
      });
  }

  atualizarTabela();

  botaoExcluir.addEventListener('click', () => {
      const checkboxes = document.querySelectorAll('.excluir-item');
      checkboxes.forEach(checkbox => {
          if (checkbox.checked) {
              const index = checkbox.getAttribute('data-index');
              produtos.splice(index, 1);
          }
      });
      localStorage.setItem('produtos', JSON.stringify(produtos));
      atualizarTabela(); 
  });
});
