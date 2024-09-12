document.addEventListener('DOMContentLoaded', () => {
  const atualizarKPIs = () => {
    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    const kpi = {
      'E-Safe': { valorTotal: 0, quantidadeTotal: 0, capacidade: 5000 },
      'HandyStore': { valorTotal: 0, quantidadeTotal: 0, capacidade: 5000 },
      'EquipStore': { valorTotal: 0, quantidadeTotal: 0, capacidade: 5000 },
      'MaterialHub': { valorTotal: 0, quantidadeTotal: 0, capacidade: 5000 }
    };

    produtos.forEach(produto => {
      const { localizacao, preco, quantidade } = produto;
      const precoFloat = parseFloat(preco) || 0;
      const quantidadeInt = parseInt(quantidade, 10) || 0;

      if (kpi[localizacao]) {
        kpi[localizacao].valorTotal += precoFloat * quantidadeInt;
        kpi[localizacao].quantidadeTotal += quantidadeInt;
      }
    });

    const mensagensAlarme = [];

    const atualizarTaxaOcupacao = (localizacao, valorElemento, estoqueElemento, taxaElemento, reposicaoElemento) => {
      const quantidadeTotal = kpi[localizacao].quantidadeTotal;
      const capacidade = kpi[localizacao].capacidade;
      const taxaOcupacao = (quantidadeTotal / capacidade) * 100;

      valorElemento.textContent = `Valor Total do Armazém: ${kpi[localizacao].valorTotal.toFixed(2)} $`;
      estoqueElemento.textContent = `Estoque Total do Armazém: ${quantidadeTotal} Itens`;

      const taxaOcupacaoSpan = taxaElemento.querySelector('.taxa_ocupacao_valor');
      taxaOcupacaoSpan.textContent = `${taxaOcupacao.toFixed(2)}%`;

      taxaOcupacaoSpan.classList.remove('estoquemedia', 'estoquealto', 'estoquebaixo');
      if (taxaOcupacao < 20) {
        taxaOcupacaoSpan.classList.add('estoquebaixo');
      } else if (taxaOcupacao > 80) {
        taxaOcupacaoSpan.classList.add('estoquealto');
      } else {
        taxaOcupacaoSpan.classList.add('estoquemedia');
      }

      reposicaoElemento.textContent = `Necessidade de Reposição: ${Math.max(0, capacidade - quantidadeTotal)} Itens`;

      // Adiciona mensagem de alarme conforme a taxa de ocupação
      if (taxaOcupacao > 80) {
        mensagensAlarme.push({
          tipo: 'alarme_critico',
          texto: `Alerta! O armazém ${localizacao} está em situação crítica com uma taxa de ocupação de ${taxaOcupacao.toFixed(2)}%.`
        });
      } else if (taxaOcupacao < 20) {
        mensagensAlarme.push({
          tipo: 'alarme_urgente',
          texto: `Atenção! O armazém ${localizacao} está com uma taxa de ocupação de ${taxaOcupacao.toFixed(2)}%.`
        });
      } else {
        mensagensAlarme.push({
          tipo: 'alarme_ok',
          texto: `Armazém ${localizacao} está OK com uma taxa de ocupação de ${taxaOcupacao.toFixed(2)}%.`
        });
      }
    };

    atualizarTaxaOcupacao('E-Safe',
      document.getElementById('valor_e_safe'),
      document.getElementById('estoque_e_safe'),
      document.getElementById('taxa_ocupacao_e_safe'),
      document.getElementById('reposicao_e_safe')
    );

    atualizarTaxaOcupacao('HandyStore',
      document.getElementById('valor_handy_store'),
      document.getElementById('estoque_handy_store'),
      document.getElementById('taxa_ocupacao_handy_store'),
      document.getElementById('reposicao_handy_store')
    );

    atualizarTaxaOcupacao('EquipStore',
      document.getElementById('valor_equip_store'),
      document.getElementById('estoque_equip_store'),
      document.getElementById('taxa_ocupacao_equip_store'),
      document.getElementById('reposicao_equip_store')
    );

    atualizarTaxaOcupacao('MaterialHub',
      document.getElementById('valor_material_hub'),
      document.getElementById('estoque_material_hub'),
      document.getElementById('taxa_ocupacao_material_hub'),
      document.getElementById('reposicao_material_hub')
    );

    const totalEstoque = produtos.reduce((acc, produto) => acc + parseInt(produto.quantidade, 10), 0);
    const totalValor = produtos.reduce((acc, produto) => acc + (parseFloat(produto.preco) * parseInt(produto.quantidade, 10)), 0);

    document.getElementById('quantidade_do_estoque').textContent = `${totalEstoque} Itens`;
    document.getElementById('valor_total_estoque').textContent = `${totalValor.toFixed(2)} $`;

    // Atualiza a seção de alarme
    const alarmeElemento = document.getElementById('alarme');
    alarmeElemento.innerHTML = ''; // Limpa mensagens anteriores

    mensagensAlarme.forEach(mensagem => {
      const p = document.createElement('p');
      p.classList.add(mensagem.tipo);
      p.textContent = mensagem.texto;
      alarmeElemento.appendChild(p);
    });
  };

  atualizarKPIs(); // Atualiza os KPIs quando a página é carregada
});
