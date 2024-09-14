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

function renderTasks() {
    const taskListElement = document.getElementById("taskList");
    taskListElement.innerHTML = ""; // Clear current tasks

    taskList.forEach((task, taskIndex) => {
        const taskItem = document.createElement("li");
        taskItem.classList.add("border", "border-gray-300", "rounded-lg", "shadow-md", "p-6", "bg-white");

        // Display main task title
        const taskTitle = document.createElement("div");
        taskTitle.classList.add("flex", "justify-between", "cursor-pointer", "items-center");
        taskTitle.innerHTML = `<h3 class="text-lg font-bold text-indigo-500">${task.text}</h3>`;

        // Icon to show collapsibility
        const toggleIcon = document.createElement("span");
        toggleIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600 transition-transform transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" /></svg>`;

        taskTitle.appendChild(toggleIcon);
        taskItem.appendChild(taskTitle);

        // Subtask list container
        const subtaskList = document.createElement("ul");
        subtaskList.classList.add("space-y-3", "pl-6", "mt-4", "hidden"); // Default hidden

        task.subtasks.forEach((subtask, subIndex) => {
            const subtaskItem = document.createElement("li");
            subtaskItem.classList.add("flex", "justify-between", "items-center", "py-2", "px-3", "bg-gray-100", "rounded-lg");

            // Subtask text
            const subtaskText = document.createTextNode(subtask.text);
            const subtaskLabel = document.createElement("span");
            subtaskLabel.appendChild(subtaskText);

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

        // Toggle subtasks and rotate icon
        taskTitle.onclick = () => {
            subtaskList.classList.toggle("hidden");
            toggleIcon.classList.toggle("rotate-180"); // Rotate the arrow on toggle
        };
    });

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

// Dark mode toggle logic
const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
    const isDarkMode = document.documentElement.classList.contains('dark');
    localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
};

// Check if dark mode was enabled previously
const savedDarkMode = localStorage.getItem('darkMode');
if (savedDarkMode === 'enabled') {
    document.documentElement.classList.add('dark');
}

// Add event listener for dark mode toggle button
document.getElementById('toggleDarkMode').addEventListener('click', toggleDarkMode);



// Initial render when the page loads
renderTasks();
