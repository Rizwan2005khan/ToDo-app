const todoInput = document.querySelector('.todo-input');
const todoBtn = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');

todoBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', handleTodoClick);

function addTodo(event) {
    event.preventDefault();
    if (todoInput.value !== '') {
        const todoDiv = document.createElement('div');
        todoDiv.className = 'todo';

        const newTodo = document.createElement('li');
        newTodo.className = 'todo-item';
        newTodo.innerText = todoInput.value;
        todoDiv.appendChild(newTodo);
        todoInput.value = '';

        createAndAppendButtons(todoDiv);

        todoList.appendChild(todoDiv);
    }
}

function createAndAppendButtons(todoDiv) {
    const existingButtons = todoDiv.querySelectorAll('button');
    existingButtons.forEach(button => button.remove());

    const completedBtn = document.createElement('button');
    completedBtn.innerText = '✔️';
    completedBtn.classList.add('complete-btn');
    todoDiv.appendChild(completedBtn);

    const editBtn = document.createElement('button');
    editBtn.innerText = '✏️';
    editBtn.classList.add('edit-btn');
    todoDiv.appendChild(editBtn);

    const trashBtn = document.createElement('button');
    trashBtn.innerText = '❌';
    trashBtn.classList.add('trash-btn');
    todoDiv.appendChild(trashBtn);
}

function handleTodoClick(e) {
    const item = e.target;

    if (item.classList.contains('trash-btn')) {
        deleteTodoItem(item);
    } else if (item.classList.contains('complete-btn')) {
        toggleComplete(item);
    } else if (item.classList.contains('edit-btn')) {
        editTodoItem(item);
    }
}

function deleteTodoItem(item) {
    const todo = item.parentElement;
    todo.classList.add('fade-away');
    todo.addEventListener('transitionend', () => todo.remove());
}

function toggleComplete(item) {
    const todoItem = item.parentElement.querySelector('.todo-item');
    todoItem.classList.toggle('completed');
}

function editTodoItem(item) {
    const todoItem = item.parentElement.querySelector('.todo-item');
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.className = 'edit-input';
    editInput.value = todoItem.innerText;

    todoItem.replaceWith(editInput);
    editInput.focus();

    editInput.addEventListener('blur', () => saveEditedTodoItem(item.parentElement, editInput));
    editInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            saveEditedTodoItem(item.parentElement, editInput);
        }
    });
}

function saveEditedTodoItem(todoDiv, editInput) {
    const updatedTodo = document.createElement('li');
    updatedTodo.className = 'todo-item';
    updatedTodo.innerText = editInput.value;

    editInput.replaceWith(updatedTodo);

    createAndAppendButtons(todoDiv);
}
