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
                } else if (task.status === 'completas') {
                    document.getElementById('doneList').appendChild(li);
                }

            });
        })
        .catch(error => {
            console.error('Erro ao carregar tarefas:', error);
        });
}
