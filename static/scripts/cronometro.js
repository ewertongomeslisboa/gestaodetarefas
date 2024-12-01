let timerInterval = null;  // Variável para armazenar o intervalo do cronômetro

function startTimer(task_id) {
    const startTime = new Date();  // Marca o início
    const timerElement = document.getElementById(`timer-${task_id}`);

    timerInterval = setInterval(() => {
        const elapsedTime = Math.floor((new Date() - startTime) / 1000);  // Calcula o tempo passado em segundos
        timerElement.innerText = `Tempo: ${elapsedTime}s`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);  // Para o cronômetro
}
function loadTasks() {
    fetch('/listar_tarefas')  // Chama a rota do back-end que retorna a lista de tarefas
        .then(response => response.json())
        .then(tasks => {
            // Limpa as listas de tarefas
            document.getElementById('taskList').innerHTML = '';
            tasks.forEach((task, index) => {
                const li = document.createElement('li');
                li.classList.add('list-group-item');
                li.innerText = task.name;

                // Elemento para mostrar o cronômetro
                const timerDisplay = document.createElement('span');
                timerDisplay.id = `timer-${task.id}`;
                timerDisplay.classList.add('task-timer');
                li.appendChild(timerDisplay); // Adiciona o cronômetro à tarefa

                // Adiciona os botões de ação
                const actionButtons = document.createElement('div');
                actionButtons.classList.add('task-actions');

                const todoButton = document.createElement('button');
                todoButton.classList.add('btn', 'btn-info', 'btn-task');
                todoButton.innerText = 'A Fazer';
                todoButton.onclick = () => updateTaskStatus(task.id, 'a_fazer');

                const doingButton = document.createElement('button');
                doingButton.classList.add('btn', 'btn-warning', 'btn-task');
                doingButton.innerText = 'Realizando';
                doingButton.onclick = () => updateTaskStatus(task.id, 'realizando');

                const doneButton = document.createElement('button');
                doneButton.classList.add('btn', 'btn-success', 'btn-task');
                doneButton.innerText = 'Completas';
                doneButton.onclick = () => updateTaskStatus(task.id, 'completa');

                actionButtons.appendChild(todoButton);
                actionButtons.appendChild(doingButton);
                actionButtons.appendChild(doneButton);

                li.appendChild(actionButtons);
                document.getElementById('taskList').appendChild(li);

                // Inicia o cronômetro se a tarefa estiver em 'realizando'
                if (task.status === 'realizando') {
                    startTimer(task.id);
                } else {
                    stopTimer();
                }
            });
        })
        .catch(error => {
            console.error('Erro ao carregar tarefas:', error);
        });
}
function updateTaskStatus(task_id, newStatus) {
    fetch(`/atualizar_status/${task_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message);

            // Inicia o cronômetro se o status for "realizando"
            if (newStatus === 'realizando') {
                startTimer(task_id);
            } else if (newStatus === 'completa') {
                stopTimer();
            }
            loadTasks();  // Atualiza a lista de tarefas
        })
        .catch(error => {
            alert('Erro ao atualizar a tarefa: ' + error.message);
        });
}
