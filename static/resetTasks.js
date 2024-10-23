document.getElementById('resetTasks').addEventListener('click', function () {
    if (confirm('Tem certeza que deseja resetar todas as tarefas?')) {
        fetch('/resetar_tarefas', {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    alert('Tarefas resetadas com sucesso');

                    // Limpa todas as listas de tarefas no front-end imediatamente
                    document.getElementById('todoList').innerHTML = '';
                    document.getElementById('doingList').innerHTML = '';
                    document.getElementById('doneList').innerHTML = '';

                    // Exibe mensagem de sucesso

                } else {
                    alert('Erro ao resetar tarefas.');
                }
            })
            .catch(error => {
                console.error('Erro ao resetar tarefas', error);
            });
    }
});
