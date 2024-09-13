let taskList = [];

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();
    
    if (taskText) {
        taskList.push({ text: taskText, completed: false });
        taskInput.value = ""; // Clear input field
        renderTasks();
    }
}

function toggleTask(index) {
    taskList[index].completed = !taskList[index].completed;
    renderTasks();
}

function deleteTask(index) {
    taskList.splice(index, 1);
    renderTasks();
}

function renderTasks() {
    const taskListElement = document.getElementById("taskList");
    taskListElement.innerHTML = ""; // Clear current tasks
    
    taskList.forEach((task, index) => {
        const taskItem = document.createElement("li");
        taskItem.classList.toggle("completed", task.completed);
        
        const taskText = document.createTextNode(task.text);
        taskItem.appendChild(taskText);
        
        const toggleButton = document.createElement("button");
        toggleButton.textContent = task.completed ? "Undo" : "Complete";
        toggleButton.onclick = () => toggleTask(index);
        taskItem.appendChild(toggleButton);
        
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => deleteTask(index);
        taskItem.appendChild(deleteButton);
        
        taskListElement.appendChild(taskItem);
    });
}
