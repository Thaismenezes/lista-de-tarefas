const tarefa = document.querySelector('.tarefaInput');
const btnDelete = document.querySelector('.btnDelete');
const btnAdiciona = document.querySelector('.btnAdiciona');
const lista = document.querySelector('ul');

var tarefasDB = [];

//Configurando os eventos
tarefa.addEventListener('keypress', event =>{
    const tarefaValue = tarefa.value;

    if(event.key == 'Enter' && tarefaValue != ""){
        adicionaTarefa();
    }
});

btnAdiciona.addEventListener('click', event =>{
    const tarefaValue = tarefa.value;
    if(tarefaValue != ""){
        adicionaTarefa();
    }
})

btnDelete.addEventListener('click', () =>{

    if(tarefasDB.length === 0){
        alert('Não há tarefas registradas!');
        return;
    }

    tarefasDB = []
    adicionaTarefaDB();
})

//Adcionando a entrada a variavel tarefaDB
function adicionaTarefa(){
    const tarefaValue = tarefa.value;
    if(tarefasDB.length >= 15){
        alert("O limite máximo de tarefas foi alcançado!");
        return;

    }

    if(tarefaValue.length >= 130){
        alert("O limite máximo de caracteres foi alcançado! Permitido 130 caracteres!");
        return;
    }

    tarefasDB.push({
        'item': tarefaValue,
        'status': ''
    })

    adicionaTarefaDB();
}

//Adicionando o array tarefasDB ao localStorage
function adicionaTarefaDB(){
    localStorage.setItem('listaDeTarefas', JSON.stringify(tarefasDB));
    atualizaTela();
}

//Atualizando a tela para inserir a tarefa na tela 
function atualizaTela(){
    lista.innerHTML = "";

    tarefasDB = JSON.parse(localStorage.getItem('listaDeTarefas')) ?? []

    tarefasDB.forEach((tarefa, index) => {
        insereNaTela(tarefa.item, tarefa.status, index);
    });
}

function insereNaTela(texto, status, index){
    const li = document.createElement('li');

    li.innerHTML = `
        <div class="containerLi">
            <input type="checkbox" ${status} data-i=${index} onchange="check(this, ${index});" />
            <span data-si=${index}>${texto}</span>
            <button onclick="removeTarefa(${index})" data-i=${index}>
             <i class="bi bi-trash3"></i>
            </button>
        </div>
    `
    lista.appendChild(li);

    if (status) {
        document.querySelector(`[data-si="${index}"]`).classList.add('riscaTexto')
      } else {
        document.querySelector(`[data-si="${index}"]`).classList.remove('riscaTexto')
      }
    
    tarefa.value = "";
}

function check(checkbox, index){
    if(checkbox.checked){
        tarefasDB[index].status = 'checked';
    } else{
        tarefasDB[index].status = '';
    }

    adicionaTarefaDB();
}

function removeTarefa(index){
    tarefasDB.splice(index, 1);
    adicionaTarefaDB();
}

atualizaTela();