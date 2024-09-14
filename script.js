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

        // Set the width dynamically based on progress
        progressFill.style.width = `${progress}%`;

        // Step 4: Reset animation before applying the new width
        progressFill.style.animation = 'none'; // Clear previous animation
        setTimeout(() => {
            progressFill.style.animation = 'progressFill 1s ease-in-out'; // Reapply animation
        }, 10); // Short delay to ensure reset occurs

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
