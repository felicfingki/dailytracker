// Predefined list of daily tasks
// Updated structure with subtasks and time buckets
const dailyTasks = [
    {
        text: "Morning Routine",
        subtasks: [
            { text: "Exercise", time: "7:00 AM - 7:30 AM", completed: false },
            { text: "Breakfast", time: "7:30 AM - 8:00 AM", completed: false },
            { text: "Meditation", time: "8:00 AM - 8:15 AM", completed: false }
        ]
    },
    {
        text: "Work Tasks",
        subtasks: [
            { text: "Emails", time: "9:00 AM - 9:30 AM", completed: false },
            { text: "Meeting", time: "10:00 AM - 11:00 AM", completed: false },
            { text: "Code Review", time: "11:00 AM - 12:00 PM", completed: false }
        ]
    },
    {
        text: "Evening Routine",
        subtasks: [
            { text: "Reading", time: "7:00 PM - 7:30 PM", completed: false },
            { text: "Plan Tomorrow", time: "7:30 PM - 8:00 PM", completed: false },
            { text: "Relax", time: "8:00 PM - 9:00 PM", completed: false }
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

            // Subtask name and time
            const subtaskText = document.createTextNode(`${subtask.text} (${subtask.time})`);
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
