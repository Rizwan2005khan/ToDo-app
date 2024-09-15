const todoInput = document.querySelector('.todo-input')
const todoBtn = document.querySelector('.todo-btn')
const todoList = document.querySelector('.todo-list')

todoBtn.addEventListener('click', addTodo)
todoList.addEventListener('click', handleTodoClick)

function addTodo(event){
    event.preventDefault()

    if(todoInput.value !== ''){
        const todoDiv = document.createElement('div')
        todoDiv.className = 'todo'
        todoList.appendChild(todoDiv)

        const newTodo = document.createElement('li')
        newTodo.className = 'todo-item'
        newTodo.innerText = todoInput.value
        todoInput.value = ''
        todoDiv.appendChild(newTodo)

        const completeBtn = document.createElement('button')
        completeBtn.className = 'complete-btn'
        completeBtn.innerText = '✔️'
        todoDiv.appendChild(completeBtn)

        const editBtn = document.createElement('button')
        editBtn.className = 'edit-btn'
        editBtn.innerText = '✏️'
        todoDiv.appendChild(editBtn)

        const trashBtn = document.createElement('button')
        trashBtn.className = 'trash-btn'
        trashBtn.innerText = '❌'
        todoDiv.appendChild(trashBtn)
    }
}

function handleTodoClick(e){
    const item = e.target;

    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement.querySelector('.todo-item')
        todo.classList.toggle('completed')
    }
    else if(item.classList[0] === 'edit-btn'){
        editTodoInput(item)
    }
    else if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement
        todo.classList.add('fade-away')

        todo.addEventListener('transitionend', () => {
            todo.remove()
        })
    }
}

function editTodoInput(item){
    const todo = item.parentElement.querySelector('.todo-item')
    const editInput = document.createElement('input')
    editInput.type = 'text'
    editInput.className = 'edit-input'
    editInput.value = todo.innerText

    todo.replaceWith(editInput)
    editInput.focus()

    editInput.addEventListener('blur', () => saveEditedTodoInput(item.parentElement, editInput))
    editInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter'){
            saveEditedTodoInput(item.parentElement, editInput)
        }
    })
}

function saveEditedTodoInput(todoDiv, editInput){
    const updateTodo = document.createElement('li')
    updateTodo.className = 'todo-item'
    updateTodo.innerText = editInput.value

    editInput.replaceWith(updateTodo)
}
