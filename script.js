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
        taskItem.classList.add("border", "border-gray-300", "rounded-lg", "shadow-md", "p-6", "bg-white", "transition-transform", "transform", "hover:scale-105");

        // Display main task title with collapsible toggle
        const taskHeader = document.createElement("div");
        taskHeader.classList.add("flex", "justify-between", "items-center", "cursor-pointer");

        const taskTitle = document.createElement("h3");
        taskTitle.classList.add("text-lg", "font-bold", "text-indigo-500");
        taskTitle.textContent = task.text;

        const toggleIcon = document.createElement("span");
        toggleIcon.textContent = "+"; // Initial icon for expand
        toggleIcon.classList.add("text-gray-500", "ml-2");

        taskHeader.appendChild(taskTitle);
        taskHeader.appendChild(toggleIcon);
        taskItem.appendChild(taskHeader);

        // Subtask list container (hidden by default)
        const subtaskList = document.createElement("ul");
        subtaskList.classList.add("space-y-3", "pl-6", "mt-4", "hidden"); // Initially hidden

        task.subtasks.forEach((subtask, subIndex) => {
            const subtaskItem = document.createElement("li");
            subtaskItem.classList.add("flex", "justify-between", "items-center", "py-2", "px-3", "bg-gray-100", "rounded-lg");

            // Subtask name
            const subtaskLabel = document.createElement("span");
            subtaskLabel.textContent = subtask.text;
            if (subtask.completed) {
                subtaskLabel.classList.add("line-through", "text-gray-400");
            }

            // Checkbox for completion
            const checkBox = document.createElement("input");
            checkBox.type = "checkbox";
            checkBox.checked = subtask.completed;
            checkBox.onclick = () => toggleSubtask(taskIndex, subIndex);
            checkBox.classList.add("form-checkbox", "h-5", "w-5", "text-indigo-500");

            subtaskItem.appendChild(subtaskLabel);
            subtaskItem.appendChild(checkBox);
            subtaskList.appendChild(subtaskItem);
        });

        taskItem.appendChild(subtaskList);

        // Toggle subtasks on task header click
        taskHeader.onclick = () => {
            subtaskList.classList.toggle("hidden");
            toggleIcon.textContent = subtaskList.classList.contains("hidden") ? "+" : "-"; // Toggle icon
        };

        // Display progress bar
        const progressBar = document.createElement("div");
        progressBar.classList.add("w-full", "bg-gray-200", "rounded-full", "h-4", "mt-2");

        const progressFill = document.createElement("div");
        progressFill.classList.add("bg-indigo-500", "h-full", "rounded-full");

        // Calculate progress
        const completedSubtasks = task.subtasks.filter(subtask => subtask.completed).length;
        const totalSubtasks = task.subtasks.length;
        const progress = (completedSubtasks / totalSubtasks) * 100;

        // Set the width dynamically based on progress
        progressFill.style.width = `${progress}%`;

        // Reset animation before applying the new width
        progressFill.style.animation = 'none';
        setTimeout(() => {
            progressFill.style.animation = 'progressFill 1s ease-in-out';
        }, 10);

        progressBar.appendChild(progressFill);
        taskItem.appendChild(progressBar);

        // Append the task to the task list
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
