// Controlador Principal da Aplicação

// Variáveis Globais que puxam os dados do localStorage na inicialização
let limiteGlobal = carregarLimiteSalvo();
let listaDeTransacoes = carregarTransacoesSalvas(); 

// Função principal que atualiza toda a tela de uma vez dinamicamente
function atualizarTelaPrincipal() {
    // 1. Processa os cálculos
    const totais = calcularTotais(listaDeTransacoes);
    const dadosCategorias = calcularGastosPorCategoria(listaDeTransacoes);

    // 2. Envia para a DOM desenhar
    atualizarPainelSaldo(totais, limiteGlobal);
    atualizarBarraOrcamento(totais.despesas, limiteGlobal);
    renderizarCategorias(dadosCategorias);
    renderizarHistorico(listaDeTransacoes);
}

// Inicializa a aplicação assim que o HTML carregar
document.addEventListener('DOMContentLoaded', atualizarTelaPrincipal);

// Adiciona transação, salva no navegador e atualiza a tela sem recarregar a página
function adicionarTransacao(novaTransacao) {
    novaTransacao.id = Date.now();
    listaDeTransacoes.unshift(novaTransacao);
    
    salvarTransacoesStorage(listaDeTransacoes); // Salva no Storage
    atualizarTelaPrincipal(); // Atualiza a tela
}

// Atualiza o limite, salva no navegador e atualiza a tela sem recarregar a página
function atualizarLimite(novoValor) {
    limiteGlobal = novoValor;
    
    salvarLimiteStorage(novoValor); // Salva no Storage
    atualizarTelaPrincipal(); // Atualiza a tela e a barra de progresso
}

// Remove uma transação pelo ID, salva e atualiza a tela
function removerTransacao(id) {
    // Filtra a lista, mantendo apenas os itens que NÃO tem o ID clicado
    listaDeTransacoes = listaDeTransacoes.filter(t => t.id !== id);
    
    salvarTransacoesStorage(listaDeTransacoes); // Salva a nova lista no Storage
    atualizarTelaPrincipal(); // Re-desenha a tela com os totais atualizados
}