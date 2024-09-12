document.addEventListener('DOMContentLoaded', () => {
    const irPraTelaAdicionarProduto = document.getElementById('adicionar_produto');
    const irPraTelaEstoque = document.getElementById('inventario');
    const irPraTelaInicial = document.getElementById('botao_voltar');
    
    if (irPraTelaAdicionarProduto) {
        irPraTelaAdicionarProduto.addEventListener('click', () => {
            window.location.href = 'adicionarProduto.html'; 
        });
    }

    if (irPraTelaEstoque) {
        irPraTelaEstoque.addEventListener('click', () => {
            window.location.href = 'estoque.html';
        })
    }

    if (irPraTelaInicial) {
        irPraTelaInicial.addEventListener('click', () => {
            window.location.href = 'telaPrincipal.html';
        })
    }

});
