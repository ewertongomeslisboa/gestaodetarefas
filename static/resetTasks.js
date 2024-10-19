document.getElementById('resetTasks').addEventListener('click', function () {
    fetch('/resetar_tarefas', {
        method: 'DELETE',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            alert(data.message);  // Mostra a mensagem de sucesso
            document.getElementById('taskList').innerHTML = '';  // Limpa a lista de tarefas na interface
        })
        .catch(error => {
            console.error('Erro ao resetar as tarefas:', error);
        });
});
