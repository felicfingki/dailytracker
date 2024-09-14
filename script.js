// Predefined list of daily tasks
// Updated structure with subtasks and time buckets
const dailyTasks = [
    {
        text: "Task 1",
        subtasks: [
            { text: "A", completed: false },
            { text: "B",  completed: false },
            { text: "C",  completed: false }
        ]
    },
    {
        text: "Task 2",
        subtasks: [
            { text: "D",  completed: false },
            { text: "E", completed: false },
            { text: "F", completed: false }
        ]
    },
    {
        text: "Task 3",
        subtasks: [
            { text: "G", completed: false },
            { text: "H", completed: false },
            { text: "I", completed: false }
        ]
    }
];


// Load tasks from localStorage or use the default dailyTasks
let taskList = JSON.parse(localStorage.getItem("tasks")) || dailyTasks;

// Function to render the tasks in the HTML
function renderTasks() {
    const taskListElement = document.getElementById("taskList");
    taskListElement.innerHTML = ""; // Clear current tasks

    taskList.forEach((task, taskIndex) => {
        const taskItem = document.createElement("li");

        // Display main task title
        const taskTitle = document.createElement("h3");
        taskTitle.textContent = task.text;
        taskItem.appendChild(taskTitle);

        // Subtask list
        const subtaskList = document.createElement("ul");
        
        task.subtasks.forEach((subtask, subIndex) => {
            const subtaskItem = document.createElement("li");

            // Subtask name (no time)
            const subtaskText = document.createTextNode(subtask.text);
            subtaskItem.appendChild(subtaskText);

            // Checkbox for completion
            const checkBox = document.createElement("input");
            checkBox.type = "checkbox";
            checkBox.checked = subtask.completed;
            checkBox.onclick = () => toggleSubtask(taskIndex, subIndex);
            subtaskItem.appendChild(checkBox);

            subtaskItem.classList.toggle("completed", subtask.completed);
            subtaskList.appendChild(subtaskItem);
        });

        taskItem.appendChild(subtaskList);
        taskListElement.appendChild(taskItem);
    });

    // Save tasks to localStorage after rendering
    localStorage.setItem("tasks", JSON.stringify(taskList));
}



// Function to toggle a task's completion
function toggleSubtask(taskIndex, subIndex) {
    taskList[taskIndex].subtasks[subIndex].completed = !taskList[taskIndex].subtasks[subIndex].completed;
    renderTasks();
}


// Function to reset tasks to default state for the day
function resetTasks() {
    taskList = dailyTasks.map(task => ({
        ...task,
        subtasks: task.subtasks.map(subtask => ({ ...subtask, completed: false }))
    }));
    renderTasks();
}


// Initial render when the page loads
renderTasks();
