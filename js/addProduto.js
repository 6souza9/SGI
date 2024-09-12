document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('categorio_produto').addEventListener('change', function () {
        const categoriaSelecionada = this.value;
        const localizacao = document.getElementById('local_produto');

        switch (categoriaSelecionada) {
            case 'Eletrônicos':
                localizacao.value = 'E-Safe';
                break;
            case 'Máquinas':
                localizacao.value = 'EquipStore';
                break;
            case 'Ferramentas':
                localizacao.value = 'HandyStore';
                break;
            case 'Materiais':
                localizacao.value = 'MaterialHub';
                break;
            default:
                localizacao.value = '';
                break;
        }
    });

    document.getElementById('formulario_produtos').addEventListener('submit', function(event) {
        event.preventDefault();

        const nomeProduto = document.getElementById('nome_produto').value.trim();
        const categoria = document.getElementById('categorio_produto').value;
        const quantidade = document.getElementById('quantidade_produto').value.trim();
        const preco = document.getElementById('preco_produto').value.trim();
        const fornecedor = document.getElementById('fornecedor').value.trim();
        const localizacao = document.getElementById('local_produto').value;
        const dataValidade = document.getElementById('expiracao_produto').value;
        const descricao = document.getElementById('discricao_produto').value.trim();

        const produto = {
            nome_produto: nomeProduto,
            categoria: categoria,
            quantidade: quantidade,
            preco: preco,
            fornecedor: fornecedor,
            localizacao: localizacao,
            data_validade: dataValidade,
            descricao: descricao,
        };

        let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
        produtos.push(produto);
        localStorage.setItem('produtos', JSON.stringify(produtos));

        alert('Produto adicionado com sucesso!');
        this.reset(); // Limpa o formulário após o envio
    });
});
