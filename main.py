import sys
from PyQt5.QtWidgets import QApplication, QWidget, QVBoxLayout, QHBoxLayout, QLabel, QPushButton, QListWidget, QInputDialog, QLineEdit, QMessageBox
from PyQt5.QtCore import QTimer
from playsound import playsound
from PyQt5.QtGui import QFont
import PySimpleGUI as sg

# Layout da janela
layout = [
    [sg.Text("Gestão de Tarefas")],
    [sg.Button("Adicionar Tarefa"), sg.Button("Fechar")]
]

# Criar a janela
window = sg.Window("Gestão de Tarefas", layout)

# Loop para manter a janela aberta
while True:
    event, values = window.read()
    if event == sg.WIN_CLOSED or event == "Fechar":  # Fechar a janela
        break

# Lista de tarefas
tasks = []

# Função para adicionar nova tarefa com som


def add_task():
    prioridade, ok = QInputDialog.getItem(window, "Prioridade", "Selecione a prioridade:", [
                                          "Alta", "Média", "Baixa"], 0, False)
    if not ok:
        return
    responsavel, ok = QInputDialog.getText(
        window, "Responsável", "Digite o nome do responsável:")
    if not ok:
        return
    descricao, ok = QInputDialog.getText(
        window, "Descrição", "Descreva a tarefa:")
    if not ok:
        return

    task = {'prioridade': prioridade, 'responsavel': responsavel,
            'descricao': descricao, 'completed': False, 'time_spent': 0}
    tasks.append(task)
    play_notification()
    update_task_list()

# Função para tocar som de notificação


def play_notification():
    # Certifique-se de ter um arquivo de som adequado
    playsound('notification.mp3')

# Função para atualizar a lista de tarefas


def update_task_list():
    task_list.clear()
    for task in tasks:
        if not task['completed']:
            task_item = f"{task['prioridade']} | {task['responsavel']} | {task['descricao']}"
            task_list.addItem(task_item)

# Função para completar tarefa


def complete_task():
    selected_items = task_list.selectedItems()
    if not selected_items:
        QMessageBox.information(window, "Erro", "Nenhuma tarefa selecionada.")
        return

    selected_task_desc = selected_items[0].text()
    for task in tasks:
        task_str = f"{task['prioridade']} | {task['responsavel']} | {task['descricao']}"
        if task_str == selected_task_desc:
            task['completed'] = True
            update_task_list()
            return

# Função para monitorar o tempo da tarefa


def timer_event():
    for task in tasks:
        if not task['completed']:
            task['time_spent'] += 1
            time_label.setText(
                f"Tempo total gasto: {task['time_spent']} segundos")


# Estilos da aplicação
style_sheet = """
    QWidget {
        background-color: #2e2e2e;
        color: white;
    }
    QLabel {
        color: #FFD700;
        font-size: 18px;
        font-family: Arial, sans-serif;
    }
    QPushButton {
        background-color: #1E90FF;
        color: white;
        font-size: 14px;
        padding: 10px;
        border-radius: 5px;
    }
    QPushButton:hover {
        background-color: #4682B4;
    }
    QListWidget {
        background-color: #333333;
        color: white;
        border: 1px solid #FFD700;
        padding: 10px;
    }
"""

# Configurações da janela principal
app = QApplication(sys.argv)
window = QWidget()
window.setWindowTitle('Gestão de Tarefas - Empresa XYZ')
window.setGeometry(100, 100, 500, 400)
window.setStyleSheet(style_sheet)

# Layout
layout = QVBoxLayout()

# Labels e Botões
title_label = QLabel("Gestão de Tarefas")
title_label.setFont(QFont("Arial", 24, QFont.Bold))
layout.addWidget(title_label)

task_list = QListWidget()
layout.addWidget(task_list)

btn_add = QPushButton("Adicionar Tarefa")
btn_add.clicked.connect(add_task)
layout.addWidget(btn_add)

btn_complete = QPushButton("Completar Tarefa")
btn_complete.clicked.connect(complete_task)
layout.addWidget(btn_complete)

time_label = QLabel("Tempo total gasto: 0 segundos")
layout.addWidget(time_label)

# Timer
timer = QTimer()
timer.timeout.connect(timer_event)
timer.start(1000)

# Definindo layout e exibindo janela
window.setLayout(layout)
window.show()

sys.exit(app.exec_())
