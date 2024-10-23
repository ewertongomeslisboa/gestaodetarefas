from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

# Lista de tarefas
tasks = []

# Rota principal para renderizar o template


@app.route('/')
def index():
    return render_template('index.html')

# Rota para adicionar nova tarefa via POST


@app.route('/adicionar_tarefa', methods=['POST'])
def adicionar_tarefa():
    data = request.get_json()
    new_task = {
        'id': len(tasks),
        'name': data['name'],
        'status': 'a_fazer'  # A nova tarefa sempre começa com o status "a_fazer"
    }
    tasks.append(new_task)
    return jsonify({'message': 'Tarefa adicionada com sucesso!', 'tasks': tasks})

# Rota para listar todas as tarefas


@app.route('/listar_tarefas', methods=['GET'])
def listar_tarefas():
    return jsonify(tasks)


@app.route('/resetar_tarefas', methods=['DELETE'])
def resetar_tarefas():
    try:

        tasks.clear()
        return jsonify({'Sucess': True, 'message': 'Tarefas resetadas com sucesso!'})
    except Exception as e:
        return jsonify({'sucess': False, 'message': str(e)})

    # Limpa a lista de tarefas(ajuste para o que estiver usando como armazenamento)
    tasks.clear()
    return jsonify({'message': 'Todas as tarefas foram resetadas com sucesso!'})

# Rota para atualizar o status da tarefa


@app.route('/atualizar_status/<int:task_id>', methods=['PUT'])
def atualizar_status(task_id):
    data = request.get_json()
    new_status = data.get('status')

    task = next((t for t in tasks if t['id'] == task_id), None)

    if task:
        task['status'] = new_status
        return jsonify({'message': 'Status da tarefa atualizado com sucesso!'})

    return jsonify({'message': 'Tarefa não encontrada!'}), 404


if __name__ == '__main__':
    app.run(debug=True)
