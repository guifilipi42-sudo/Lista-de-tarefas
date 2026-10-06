const campoTarefa = document.querySelector("#campo-tarefa");
const botaoAdicionar = document.querySelector("#botao-adicionar");
const listaTarefas = document.querySelector("#lista-tarefas");
const mensagemErro = document.querySelector("#mensagem-erro");
const listaVazia = document.querySelector("#lista-vazia");

function atualizarMensagemDaLista() {
    const possuiTarefas = listaTarefas.children.length > 0;
    listaVazia.hidden = possuiTarefas;
}

function adicionarTarefa() {
    const texto = campoTarefa.value.trim();

    if (texto === "") {
        mensagemErro.textContent = "Digite uma tarefa antes de adicionar.";
        campoTarefa.focus();
        return;
    }

    mensagemErro.textContent = "";

    const item = document.createElement("li");
    item.classList.add("tarefa");

    const caixaConclusao = document.createElement("input");
    caixaConclusao.type = "checkbox";
    caixaConclusao.setAttribute("aria-label", `Concluir tarefa: ${texto}`);

    const textoTarefa = document.createElement("span");
    textoTarefa.classList.add("texto-tarefa");
    textoTarefa.textContent = texto;

    const botaoExcluir = document.createElement("button");
    botaoExcluir.type = "button";
    botaoExcluir.classList.add("botao-excluir");
    botaoExcluir.textContent = "Excluir";
    botaoExcluir.setAttribute("aria-label", `Excluir tarefa: ${texto}`);

    caixaConclusao.addEventListener("change", function () {
        item.classList.toggle("concluida", caixaConclusao.checked);
    });

    botaoExcluir.addEventListener("click", function () {
        item.remove();
        atualizarMensagemDaLista();
    });

    item.append(caixaConclusao, textoTarefa, botaoExcluir);
    listaTarefas.appendChild(item);

    campoTarefa.value = "";
    campoTarefa.focus();

    atualizarMensagemDaLista();
}

botaoAdicionar.addEventListener("click", adicionarTarefa);

campoTarefa.addEventListener("keydown", function (evento) {
    if (evento.key === "Enter") {
        adicionarTarefa();
    }
});

campoTarefa.addEventListener("input", function () {
    if (campoTarefa.value.trim() !== "") {
        mensagemErro.textContent = "";
    }
});

atualizarMensagemDaLista();
