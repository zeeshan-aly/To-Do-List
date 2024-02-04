// Sample data structure for tasks
let tasks = [];

function addTask() {
    // Retrieve values from the form
    const taskName = document.getElementById('taskName').value;
    const dueDate = document.getElementById('dueDate').value;
    const priority = document.getElementById('priority').value;
    const status = 'To-do'; // Initial status

    // Create a task object
    const task = {
        name: taskName,
        dueDate: dueDate,
        priority: priority,
        status: status,
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
            <span>${task.name} - ${task.dueDate} - ${task.priority} - ${task.status}</span>
            <div id="button-container">
                <button onclick="editTask(${index})">Edit</button>
                <img src="./images/trash.png" onclick="deleteTask(${index})" alt="Delete">
            </div>
        `;
        taskListDiv.appendChild(taskDiv);
    });

    // Update task counts and display
    updateTaskCounts();
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

function updateTaskCounts() {
    const todoCount = tasks.filter(task => task.status.toLowerCase() === 'to-do').length;
    const inProgressCount = tasks.filter(task => task.status.toLowerCase() === 'in progress').length;
    const doneCount = tasks.filter(task => task.status.toLowerCase() === 'done').length;

    document.getElementById('todoCount').innerText = todoCount;
    document.getElementById('inProgressCount').innerText = inProgressCount;
    document.getElementById('doneCount').innerText = doneCount;
}

function filterTasks() {
    const statusFilter = document.getElementById('statusFilter').value.toLowerCase();
    const priorityFilter = document.getElementById('priorityFilter').value.toLowerCase();

    const filteredTasks = tasks.filter(task => {
        const taskStatus = task.status.toLowerCase();
        const taskPriority = task.priority.toLowerCase();

        return (statusFilter === 'all' || taskStatus === statusFilter) &&
               (priorityFilter === 'all' || taskPriority === priorityFilter);
    });

    // Display the filtered tasks
    displayFilteredTasks(filteredTasks);

    // Update task counts and display
    updateTaskCounts();
}

function displayFilteredTasks(filteredTasks) {
    const taskListDiv = document.getElementById('taskList');
    taskListDiv.innerHTML = ''; // Clear previous content

    filteredTasks.forEach((task, index) => {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');
        taskDiv.innerHTML = `
            <span>${task.name} - ${task.dueDate} - ${task.priority} - ${task.status}</span>
            <div id="button-container">
                <button onclick="editTask(${index})">Edit</button>
                <img src="./images/trash.png" onclick="deleteTask(${index})" alt="Delete">
            </div>
        `;
        taskListDiv.appendChild(taskDiv);
    });
}

function searchTasks() {
    const prioritySearch = document.getElementById('prioritySearch').value.toLowerCase();

    const filteredTasks = tasks.filter(task => {
        const taskPriority = task.priority.toLowerCase();
        return taskPriority.includes(prioritySearch);
    });

    // Display the filtered tasks
    displayFilteredTasks(filteredTasks);

    // Update task counts and display
    updateTaskCounts();
}
// Initialize the task list display
displayTasks();