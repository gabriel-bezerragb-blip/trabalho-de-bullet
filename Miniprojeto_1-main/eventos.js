// Só eventos de interação do usuário.

// --- ELEMENTOS DOM ---
const modalOverlay = document.getElementById('modalOverlay');
const modalLimite = document.getElementById('modalLimite');
const btnDespesa = document.getElementById('btnDespesa');
const btnReceita = document.getElementById('btnReceita');
let tipoSelecionado = 'despesa';

// --- EVENTOS: MODAL DE TRANSAÇÃO ---
document.getElementById('btnNovaTransacao').addEventListener('click', () => {
    modalOverlay.classList.add('active');
    document.getElementById('data').valueAsDate = new Date();
});

document.getElementById('btnFecharModal').addEventListener('click', () => {
    modalOverlay.classList.remove('active');
});

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) modalOverlay.classList.remove('active');
});

// Alternar Seletor de Tipo
btnDespesa.addEventListener('click', () => {
    tipoSelecionado = 'despesa';
    btnDespesa.classList.add('active');
    btnReceita.classList.remove('active');
});

btnReceita.addEventListener('click', () => {
    tipoSelecionado = 'receita';
    btnReceita.classList.add('active');
    btnDespesa.classList.remove('active');
});

// Salvar Nova Transação
document.getElementById('formTransacao').addEventListener('submit', (e) => {
    e.preventDefault(); 

    const novaTransacao = {
        descricao: document.getElementById('descricao').value,
        tipo: tipoSelecionado, 
        categoria: document.getElementById('categoria').value,
        valor: parseFloat(document.getElementById('valor').value),
        data: document.getElementById('data').value
    };

    adicionarTransacao(novaTransacao); // Chama a função no app.js

    e.target.reset();
    modalOverlay.classList.remove('active');
    
    // Reseta visual do botão para o padrão
    tipoSelecionado = 'despesa';
    btnDespesa.classList.add('active');
    btnReceita.classList.remove('active');
});

// --- EVENTOS: MODAL DE EDIÇÃO DE LIMITE ---
document.getElementById('btnEditarLimite').addEventListener('click', (e) => {
    e.preventDefault();
    modalLimite.classList.add('active');
    // Preenche o input com a variável global puxada no app.js
    document.getElementById('inputNovoLimite').value = limiteGlobal; 
});

document.getElementById('btnCancelarLimite').addEventListener('click', () => {
    modalLimite.classList.remove('active');
});

modalLimite.addEventListener('click', (e) => {
    if (e.target === modalLimite) modalLimite.classList.remove('active');
});

// Salvar Novo Limite
document.getElementById('formEditarLimite').addEventListener('submit', (e) => {
    e.preventDefault(); 
    
    const inputNovoLimite = document.getElementById('inputNovoLimite');
    const novoLimite = parseFloat(inputNovoLimite.value);

    if (!isNaN(novoLimite) && novoLimite >= 0) {
        atualizarLimite(novoLimite); // Chama a função no app.js, que cuida do cálculo, salvamento e renderização da DOM
        modalLimite.classList.remove('active');
    }
});

// --- EVENTOS: EXCLUIR TRANSAÇÃO ---
document.getElementById('listaTransacoes').addEventListener('click', (e) => {
    // Verifica se o elemento clicado (ou o pai dele) tem a classe da lixeira
    const btnDeletar = e.target.closest('.btn-deletar');
    
    if (btnDeletar) {
        // Pega o ID que guardamos no HTML
        const idTransacao = Number(btnDeletar.getAttribute('data-id'));
        removerTransacao(idTransacao); // Chama a função do app.js
    }
});