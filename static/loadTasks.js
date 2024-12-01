let timers = {};

function loadTasks() {
    fetch('/listar_tarefas')  // Chama a rota do back-end que retorna a lista de tarefas
        .then(response => response.json())
        .then(tasks => {
            console.log(tasks);


            // Limpa todas as listas de tarefas
            document.getElementById('todoList').innerHTML = '';
            document.getElementById('doingList').innerHTML = '';
            document.getElementById('doneList').innerHTML = '';


            tasks.forEach((task, index) => {
                const li = document.createElement('li');
                li.classList.add('list-group-item');
                li.innerText = task.name;
                if (task.status === 'realizando') {
                    startTimer(task.id); // Certifique-se de iniciar o cronômetro
                } else {
                    stopTimer(task.id); // Pare o cronômetro para outros status
                }

                // Elemento para mostrar o cronômetro
                const timerDisplay = document.createElement('span');
                timerDisplay.id = `timer-${task.id}`; // ID único para cada cronômetro
                timerDisplay.classList.add('task-timer'); // Classe para estilizar o cronômetro
                timerDisplay.innerText = '0:00'; // Inicializa o texto do cronômetro
                li.appendChild(timerDisplay); // Adiciona o cronômetro à tarefa



                // Cria um container para os botões de ação
                const actionButtons = document.createElement('div');
                actionButtons.classList.add('task-actions');

                // Botão mover para "A Fazer"
                const todoButton = document.createElement('button');
                todoButton.classList.add('btn', 'btn-info', 'btn-task');
                todoButton.innerText = 'A Fazer';
                todoButton.onclick = () => updateTaskStatus(task.id, 'a_fazer');

                // Botão para "Realizando"
                const doingButton = document.createElement('button');
                doingButton.classList.add('btn', 'btn-warning', 'btn-task');
                doingButton.innerText = 'Realizando';
                doingButton.onclick = () => updateTaskStatus(task.id, 'realizando');

                // Botão para "Completas"
                const doneButton = document.createElement('button');
                doneButton.classList.add('btn', 'btn-success', 'btn-task');
                doneButton.innerText = 'Completas';
                doneButton.onclick = () => updateTaskStatus(task.id, 'completas');

                // Adiciona os botões ao container de ações
                actionButtons.appendChild(todoButton);
                actionButtons.appendChild(doingButton);
                actionButtons.appendChild(doneButton);

                // Adiciona os botões e a tarefa à lista
                li.appendChild(actionButtons);


                // adiciona a tarefa na lista correta com base no status
                if (task.status === 'a_fazer') {
                    document.getElementById('todoList').appendChild(li);
                } else if (task.status === 'realizando') {
                    document.getElementById('doingList').appendChild(li);
                    startTimer(task.id);
                } else if (task.status === 'completas') {
                    document.getElementById('doneList').appendChild(li);
                    stopTimer(task.id);
                }

            });

        })
        .catch(error => {
            console.error('Erro ao carregar tarefas:', error);
        });
}
function startTimer(taskId) {
    const timerDisplay = document.getElementById(`timer-${taskId}`);
    if (!timerDisplay) {
        console.error(`Cronômetro não encontrado para a tarefa ${taskId}`);
        return;

    }

    let time = 0;

    // Se já existe um cronômetro, pare o anterior
    if (timers[taskId]) {
        clearInterval(timers[taskId]);
    }

    timers[taskId] = setInterval(() => {
        time++;
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        timerDisplay.innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }, 1000);
}

function stopTimer(taskId) {
    if (timers[taskId]) {
        clearInterval(timers[taskId]); // Para o cronômetro
        timers[taskId] = null; // Remove o cronômetro ativo
    }

    const timerDisplay = document.getElementById(`timer-${taskId}`);
    if (timerDisplay) {
        const [minutes, seconds] = timerDisplay.innerText.split(':').map(Number);
        const elapsedTime = (minutes || 0) * 60 + (seconds || 0);

        // Envia o tempo decorrido para o back-end
        fetch(`/atualizar_tempo/${taskId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ elapsedTime }) // Envia o tempo decorrido
        }).catch((error) => console.error('Erro ao salvar o tempo:', error));

    }
}
