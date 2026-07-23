//Só cálculos.

// Função para somar receitas, subtrair despesas e calcular saldo com reduce()
function calcularTotais(transacoes) {
    const receitas = transacoes.reduce((acumulador, t) => t.tipo === 'receita' ? acumulador + t.valor : acumulador, 0);
    const despesas = transacoes.reduce((acumulador, t) => t.tipo === 'despesa' ? acumulador + t.valor : acumulador, 0);
    const saldo = receitas - despesas;
    
    return { receitas, despesas, saldo };
}

// Função para agrupar e calcular a porcentagem de cada categoria
function calcularGastosPorCategoria(transacoes) {
    // Filtra apenas as despesas
    const despesas = transacoes.filter(t => t.tipo === 'despesa');
    const totalDespesas = despesas.reduce((acc, t) => acc + t.valor, 0);

    const agrupamento = {};
    
    // Soma os valores por categoria
    despesas.forEach(t => {
        if (!agrupamento[t.categoria]) {
            agrupamento[t.categoria] = 0;
        }
        agrupamento[t.categoria] += t.valor;
    });

    // Transforma o objeto em um array com a porcentagem
    return Object.keys(agrupamento).map(categoria => ({
        nome: categoria,
        valor: agrupamento[categoria],
        // Evita divisão por zero
        porcentagem: totalDespesas > 0 ? (agrupamento[categoria] / totalDespesas) * 100 : 0
    }));
}