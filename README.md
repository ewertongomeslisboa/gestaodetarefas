# Gestão de Tarefas

Aplicação web para gerenciar tarefas opensource em construção, utilizando tecnologias modernas como Flask no backend e Bootstrap para o front-end. O sistema permite adicionar, visualizar, mover e deletar tarefas, além de agrupar as tarefas em diferentes categorias: "A Fazer", "Realizando" e "Completas".

## Funcionalidades

- Adicionar novas tarefas com status inicial "A Fazer".
- Atualizar o status das tarefas para "Realizando" ou "Completas".
- Resetar todas as tarefas.
- Interface responsiva e moderna usando Bootstrap.
- Persistência de dados no backend (Ex.: Lista de tarefas em memória).

## Tecnologias Utilizadas

- **Backend**: Flask (Python)
- **Frontend**: HTML, CSS, Bootstrap 5, JavaScript
- **Persistência de Dados**: (Informe o mecanismo de persistência que usou: pode ser uma lista em memória, banco de dados SQLite, etc.)

## Pré-requisitos

Para executar o projeto localmente, você precisará ter o seguinte instalado:

- Python 3.x
- Pip (gerenciador de pacotes do Python)

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/ewertongomeslisboa/gestaodetarefas.git
   ```


2. Acesse o diretório do projeto:
   ```
   cd gestaodetarefas
   ```

3. Crie um ambiente virtual(Opcional, mas recomendado)
   ```
   python -m venv venv
   source venv/bin/activate  # Linux/MacOS
   venv\Scripts\activate  # Windows

   ```
   
### Configuração e execução 

1. Inicie o servidor Flask:
   ```bash
   flask run 
   ```

### Estrutura do projeto 

```
.
├── app.py               # Arquivo principal da aplicação Flask
├── templates/
│   └── index.html       # Página HTML da aplicação
├── static/
│   ├── styles.css       # Arquivo de estilos CSS customizados
│   ├── resetTasks.js    # Script de resetar as tarefas
│   └── loadTasks.js     # Script para carregar as tarefas
├── requirements.txt     # Dependências do projeto
└── README.md            # Documentação do projeto
```
### Uso da Aplicação
1. Adicionar Tarefa: No campo de formulário, digite o nome da tarefa e clique no botão "Adicionar Tarefa".
2. Atualizar Status: Cada tarefa tem botões que permitem movê-la para a lista "A Fazer", "Realizando" ou "Completas".
3. Resetar Tarefas: Clicando no botão "Resetar Tarefas", todas as tarefas serão removidas.

### Contribuição
Se quiser contribuir para o projeto:

Faça um fork do projeto.
1. Crie uma nova branch para suas alterações:
```bash
git checkout -b minha-feature
2. Faça as alterações necessárias e commit:
```
```bash
git commit -m "Descrição das alterações"
```
3. Envie suas alterações:
```bash
git push origin minha-feature
```
4. Abra um Pull Request para análise.

### Licença
Este projeto está licenciado sob a licença MIT.

Autores
Ewerton Gomes Lisboa (DJ Tonzera) - [Seu GitHub](https://github.com/ewertongomeslisboa)
perl




