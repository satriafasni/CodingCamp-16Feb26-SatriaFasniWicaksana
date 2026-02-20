let todos = [];
const STORAGE_KEY = 'todos';

// Load todos dari localStorage saat halaman pertama kali dimuat
function loadTodos() {
    const savedTodos = localStorage.getItem(STORAGE_KEY);
    if (savedTodos) {
        todos = JSON.parse(savedTodos);
    }
    renderTodos();
}

// Simpan todos ke localStorage menggunakan JSON.stringify
function saveTodos() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const dateInput = document.getElementById('dateInput');

    if(taskInput.value === '' || dateInput.value === '') {
       alert("Mohon isi tugas beserta tanggal deadlinenya!");
       
    }else {const newTodo = {
        id: Date.now(),
        text: taskInput.value,
        deadline: new Date(dateInput.value).getTime(),
        inputTime: new Date().getTime()
    };

    todos.push(newTodo);
    saveTodos(); // Simpan ke localStorage

    //reset form
    taskInput.value = '';
    dateInput.value = '';

    renderTodos();
    }
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos(); // Simpan ke localStorage setelah hapus
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
        // tailwind utility classes plus custom animation
        li.className = 'bg-[#C83E4D] border border-gray-200 p-4 mb-2 rounded flex justify-between items-center animate-fadeIn';
        li.innerHTML = `
        <div class="flex flex-col">
          <b class="block text-[#F4D6CC]">${todo.text}</b>
          <span class="text-sm text-[#F4D6CC]">Deadline: ${dateString}</span>
        </div>
        <button class="bg-[#4A5859] text-white px-2 py-1 rounded hover:bg-[#F4D6CC]" onclick="deleteTodo(${todo.id})">Hapus</button>
        `;
        listElement.appendChild(li);
    });
}

// Jalankan loadTodos() saat halaman dimuat
document.addEventListener('DOMContentLoaded', loadTodos);
