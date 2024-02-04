// Sample data structure for tasks
let tasks = [];

function addTask() {
    // Retrieve values from the form
    const taskName = document.getElementById('taskName').value;
    const dueDate = document.getElementById('dueDate').value;
    const priority = document.getElementById('priority').value;

    // Create a task object
    const task = {
        name: taskName,
        dueDate: dueDate,
        priority: priority,
        status: 'To-do', // Initial status
    };

    // Add the task to the tasks array
    tasks.push(task);

    // Update the task list display
    displayTasks();

    // Clear the form inputs
    document.getElementById('taskName').value = '';
    document.getElementById('dueDate').value = '';
}

function displayTasks() {
    const taskListDiv = document.getElementById('taskList');
    taskListDiv.innerHTML = ''; // Clear previous content

    tasks.forEach((task, index) => {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');
        taskDiv.innerHTML = `
            <span>${task.name} - ${task.dueDate} - ${task.priority}</span>
            <button onclick="editTask(${index})">Edit</button>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        taskListDiv.appendChild(taskDiv);
    });
}

function editTask(index) {
    const newName = prompt('Enter new task name:');
    if (newName !== null) {
        tasks[index].name = newName;
        displayTasks();
    }
}

function deleteTask(index) {
    const confirmDelete = confirm('Are you sure you want to delete this task?');
    if (confirmDelete) {
        tasks.splice(index, 1);
        displayTasks();
    }
}

// Initialize the task list display
displayTasks();
