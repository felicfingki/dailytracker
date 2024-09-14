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
        taskItem.classList.add("border", "border-gray-300", "rounded-lg", "p-4");

        // Display main task title
        const taskTitle = document.createElement("h3");
        taskTitle.classList.add("text-lg", "font-semibold", "text-blue-500", "mb-2");
        taskTitle.textContent = task.text;
        taskItem.appendChild(taskTitle);

        // Subtask list
        const subtaskList = document.createElement("ul");
        subtaskList.classList.add("space-y-2");
        
        task.subtasks.forEach((subtask, subIndex) => {
            const subtaskItem = document.createElement("li");
            subtaskItem.classList.add("flex", "justify-between", "items-center", "py-2", "px-3", "bg-gray-100", "rounded-lg");

            // Subtask name
            const subtaskText = document.createTextNode(subtask.text);
            const subtaskLabel = document.createElement("span");
            subtaskLabel.appendChild(subtaskText);

            // Add styling for completed subtasks
            if (subtask.completed) {
                subtaskLabel.classList.add("line-through", "text-gray-400");
            }

            subtaskItem.appendChild(subtaskLabel);

            // Checkbox for completion
            const checkBox = document.createElement("input");
            checkBox.type = "checkbox";
            checkBox.checked = subtask.completed;
            checkBox.onclick = () => toggleSubtask(taskIndex, subIndex);
            checkBox.classList.add("form-checkbox", "h-5", "w-5", "text-blue-500");

            subtaskItem.appendChild(checkBox);
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
