let todos =[];

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const dateInput = document.getElementById('dateInput')

    if(taskInput.value === '' || dateInput.value === '') {
       alert("Mohon isi tugas beserta tanggalnya!");
       return; 
    }

    // objek data to-do
    const newTodo = {
        id: Date.now(),
        text: taskInput.value,
        deadline: new Date(dateInput.value).getTime(),
        inputTime: new Date().getTime()
    };

    todos.push(newTodo);

    //reset form
    taskInput.value = '';
    dateInput.value = '';

    renderTodos();
}

function renderTodos() {
    const listElement = document.getElementById('todoList');
    const sortBy = document.getElementById('sortSelect').value;

    listElement.innerHTML = '';

    //Logika filter/sorting
    let sortedTodos = [...todos]

    if (sortBy === 'inputTerbaru') {
        sortedTodos.sort((a,b) => b.inputTime - a.inputTime);
    } else if (sortBy === 'inputTerlama') {
        sortedTodos.sort((a,b) => a.inputTime - b.inputTime);
    } else if (sortBy === 'deadlineDekat') {
        sortedTodos.sort((a,b) => a.deadline - b.deadline);   
    } else if (sortBy === 'deadlineJauh') {
        sortedTodos.sort((a,b) => b.deadline - a.deadline);
    }

    // Menampilkan ke HTML
    sortedTodos.forEach(todo => {
        const dateString = new Date(todo.deadline).toLocaleDateString('id-ID');

        const li = document.createElement('li');
        li.className = 'todo-item';
        li.innerHTML = `
        <div class="todo-info">
        <b>${todo.text}</b>
        <span> Deadline: ${dateString}</span>
        </div>
        <button class="delete-btn" onclick="deleteTodo(${todo.id})">Hapus</button>
        `;
        listElement.appendChild(li);
    });
}
