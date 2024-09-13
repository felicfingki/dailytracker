// Predefined list of daily tasks
const dailyTasks = [
    { text: "Morning Exercise", completed: false },
    { text: "Meditation", completed: false },
    { text: "Check Emails", completed: false },
    { text: "Work on Project", completed: false },
    { text: "Read for 30 minutes", completed: false },
    { text: "Plan Tomorrow's Schedule", completed: false },
];

// Load tasks from localStorage or use the default dailyTasks
let taskList = JSON.parse(localStorage.getItem("tasks")) || dailyTasks;

// Function to render the tasks in the HTML
function renderTasks() {
    const taskListElement = document.getElementById("taskList");
    taskListElement.innerHTML = ""; // Clear current tasks

    taskList.forEach((task, index) => {
        const taskItem = document.createElement("li");
        taskItem.classList.toggle("completed", task.completed);

        const taskText = document.createTextNode(task.text);
        taskItem.appendChild(taskText);

        const checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.checked = task.completed;
        checkBox.onclick = () => toggleTask(index);
        taskItem.appendChild(checkBox);

        taskListElement.appendChild(taskItem);
    });

    // Save tasks to localStorage after rendering
    localStorage.setItem("tasks", JSON.stringify(taskList));
}

// Function to toggle a task's completion
function toggleTask(index) {
    taskList[index].completed = !taskList[index].completed;
    renderTasks();
}

// Function to reset tasks to default state for the day
function resetTasks() {
    taskList = dailyTasks.map(task => ({ ...task, completed: false }));
    renderTasks();
}

// Initial render when the page loads
renderTasks();
