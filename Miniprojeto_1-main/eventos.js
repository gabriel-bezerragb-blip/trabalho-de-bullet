const modalOverlay = document.getElementById('modalOverlay');
const modalLimite = document.getElementById('modalLimite');
const btnDespesa = document.getElementById('btnDespesa');
const btnReceita = document.getElementById('btnReceita');

let tipoSelecionado = 'despesa';

document.getElementById('btnNovaTransacao').addEventListener('click', () => {
    modalOverlay.classList.add('active');
    document.getElementById('data').valueAsDate = new Date();
});

document.getElementById('btnFecharModal').addEventListener('click', () => {
    modalOverlay.classList.remove('active');
});

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
    }
});

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

document.getElementById('formTransacao').addEventListener('submit', (e) => {
    e.preventDefault();

    const novaTransacao = {
        descricao: document.getElementById('descricao').value,
        tipo: tipoSelecionado,
        categoria: document.getElementById('categoria').value,
        valor: parseFloat(document.getElementById('valor').value),
        data: document.getElementById('data').value
    };

    adicionarTransacao(novaTransacao);

    e.target.reset();
    modalOverlay.classList.remove('active');

    tipoSelecionado = 'despesa';
    btnDespesa.classList.add('active');
    btnReceita.classList.remove('active');
});

document.getElementById('btnEditarLimite').addEventListener('click', (e) => {
    e.preventDefault();
    modalLimite.classList.add('active');
    document.getElementById('inputNovoLimite').value = limiteGlobal;
});

document.getElementById('btnCancelarLimite').addEventListener('click', () => {
    modalLimite.classList.remove('active');
});

modalLimite.addEventListener('click', (e) => {
    if (e.target === modalLimite) {
        modalLimite.classList.remove('active');
    }
});

document.getElementById('formEditarLimite').addEventListener('submit', (e) => {
    e.preventDefault();

    const inputNovoLimite = document.getElementById('inputNovoLimite');
    const novoLimite = parseFloat(inputNovoLimite.value);

    if (!isNaN(novoLimite) && novoLimite >= 0) {
        atualizarLimite(novoLimite);
        modalLimite.classList.remove('active');
    }
});

document.getElementById('listaTransacoes').addEventListener('click', (e) => {
    const btnDeletar = e.target.closest('.btn-deletar');

    if (btnDeletar) {
        const idTransacao = Number(btnDeletar.getAttribute('data-id'));
        removerTransacao(idTransacao);
    }
});
