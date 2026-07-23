let limiteGlobal = carregarLimiteSalvo();
let listaDeTransacoes = carregarTransacoesSalvas();

function atualizarTelaPrincipal() {
    const totais = calcularTotais(listaDeTransacoes);
    const dadosCategorias = calcularGastosPorCategoria(listaDeTransacoes);

    atualizarPainelSaldo(totais, limiteGlobal);
    atualizarBarraOrcamento(totais.despesas, limiteGlobal);
    renderizarCategorias(dadosCategorias);
    renderizarHistorico(listaDeTransacoes);
}

document.addEventListener('DOMContentLoaded', atualizarTelaPrincipal);

function adicionarTransacao(novaTransacao) {
    novaTransacao.id = Date.now();
    listaDeTransacoes.unshift(novaTransacao);

    salvarTransacoesStorage(listaDeTransacoes);
    atualizarTelaPrincipal();
}

function atualizarLimite(novoValor) {
    limiteGlobal = novoValor;

    salvarLimiteStorage(novoValor);
    atualizarTelaPrincipal();
}

function removerTransacao(id) {
    listaDeTransacoes = listaDeTransacoes.filter(t => t.id !== id);

    salvarTransacoesStorage(listaDeTransacoes);
    atualizarTelaPrincipal();
}
