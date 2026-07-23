// Só localStorage.

const KEY_TRANSACOES = 'finup_transacoes';
const KEY_LIMITE = 'finup_limite';

// Busca as transações salvas ou usa o dados.js como padrão inicial
function carregarTransacoesSalvas() {
    const dados = localStorage.getItem(KEY_TRANSACOES);
    return dados ? JSON.parse(dados) : [...dadosIniciais];
}

function salvarTransacoesStorage(transacoes) {
    localStorage.setItem(KEY_TRANSACOES, JSON.stringify(transacoes));
}

function carregarLimiteSalvo() {
    const limite = localStorage.getItem(KEY_LIMITE);
    return limite ? parseFloat(limite) : 1500.00;
}

function salvarLimiteStorage(valor) {
    localStorage.setItem(KEY_LIMITE, valor);
}