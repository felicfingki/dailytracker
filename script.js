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
        taskItem.classList.add("border", "border-gray-300", "rounded-lg", "shadow-md", "p-6", "bg-white", "transition-transform", "transform", "hover:scale-105");

        // Display main task title
        const taskTitle = document.createElement("h3");
        taskTitle.classList.add("text-lg", "font-bold", "text-indigo-500");
        taskTitle.textContent = task.text;
        taskItem.appendChild(taskTitle);

        // Calculate progress
        const completedSubtasks = task.subtasks.filter(subtask => subtask.completed).length;
        const totalSubtasks = task.subtasks.length;
        const progress = (completedSubtasks / totalSubtasks) * 100;

        // Display progress bar
        const progressBar = document.createElement("div");
        progressBar.classList.add("w-full", "bg-gray-200", "rounded-full", "h-4", "mt-2");

        const progressFill = document.createElement("div");
        progressFill.classList.add("bg-indigo-500", "h-full", "rounded-full");
        progressFill.style.width = `${progress}%`;

        progressBar.appendChild(progressFill);
        taskItem.appendChild(progressBar);

        // Subtask list
        const subtaskList = document.createElement("ul");
        subtaskList.classList.add("space-y-3", "pl-6", "mt-4");

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
            checkBox.classList.add("form-checkbox", "h-5", "w-5", "text-indigo-500");

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

const toggleDarkMode = document.getElementById("toggleDarkMode");

toggleDarkMode.onclick = () => {
    document.documentElement.classList.toggle("dark");
};


// Initial render when the page loads
renderTasks();
