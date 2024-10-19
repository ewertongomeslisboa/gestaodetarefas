function updateTaskStatus(index, newStatus) {
    fetch(`/atualizar_status/${index}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus })
    })
        .then(response => {
            if (response.ok) {
                console.log(`Status da tarefa ${index} atualizado para ${newStatus}`);
                loadTasks();  // Chama a função para recarregar as tarefas
            } else {
                console.error('Erro ao atualizar status da tarefa');
            }
        })
        .catch(error => {
            console.error('Erro ao fazer a requisição:', error);
        });
}
