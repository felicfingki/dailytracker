// Sample data: list of characters and their respective levels
const characters = [
    { name: 'Elesis', level: 74, tasks: ['Crucible', 'Sanctum Of Destruction', 'Wizard Labirynth','Berkas Lair'] },
    { name: 'Lire', level: 85, tasks: ['Crucible', 'Sanctum Of Destruction', 'Wizard Labirynth','Berkas Lair'] },
    { name: 'Arme', level: 85, tasks: ['Crucible', 'Sanctum Of Destruction', 'Wizard Labirynth','Berkas Lair'] },
    { name: 'Lass', level: 85, tasks: ['Crucible', 'Sanctum Of Destruction', 'Wizard Labirynth','Berkas Lair'] },
    { name: 'Ryan', level: 37, tasks: ['Crucible', 'Sanctum Of Destruction', 'Wizard Labirynth','Berkas Lair'] },
    { name: 'Ronan', level: 71, tasks: ['Crucible', 'Sanctum Of Destruction', 'Wizard Labirynth','Berkas Lair'] },
    { name: 'Amy', level: 37, tasks: ['Crucible', 'Sanctum Of Destruction', 'Wizard Labirynth','Berkas Lair'] },
    { name: 'Jin', level: 85, tasks: ['Crucible', 'Sanctum Of Destruction', 'Wizard Labirynth','Berkas Lair'] },
    { name: 'Sieghart', level: 85, tasks: ['Crucible', 'Sanctum Of Destruction', 'Wizard Labirynth','Berkas Lair'] },
    { name: 'Mari', level: 85, tasks: ['Crucible', 'Sanctum Of Destruction', 'Wizard Labirynth','Berkas Lair'] },
    { name: 'Dio', level: 85, tasks: ['Crucible', 'Sanctum Of Destruction', 'Wizard Labirynth','Berkas Lair'] },
    { name: 'Zero', level: 85, tasks: ['Crucible', 'Sanctum Of Destruction', 'Wizard Labirynth','Berkas Lair'] },
    { name: 'Ley', level: 85, tasks: ['Crucible', 'Sanctum Of Destruction', 'Wizard Labirynth','Berkas Lair'] },
    { name: 'Rufus', level: 85, tasks: ['Crucible', 'Sanctum Of Destruction', 'Wizard Labirynth','Berkas Lair'] },
    { name: 'Rin', level: 85, tasks: ['Crucible', 'Sanctum Of Destruction', 'Wizard Labirynth','Berkas Lair'] },
    { name: 'Asin', level: 39, tasks: ['Crucible', 'Sanctum Of Destruction', 'Wizard Labirynth','Berkas Lair'] },
    { name: 'Lime', level: 37, tasks: ['Crucible', 'Sanctum Of Destruction', 'Wizard Labirynth','Berkas Lair'] },
    { name: 'Edel', level: 85, tasks: ['Crucible', 'Sanctum Of Destruction', 'Wizard Labirynth','Berkas Lair'] },
    { name: 'Veigas', level: 53, tasks: ['Crucible', 'Sanctum Of Destruction', 'Wizard Labirynth','Berkas Lair'] },
    { name: 'Decanee', level: 85, tasks: ['Crucible', 'Sanctum Of Destruction', 'Wizard Labirynth','Berkas Lair'] },
    { name: 'Ai', level: 85, tasks: ['Crucible', 'Sanctum Of Destruction', 'Wizard Labirynth','Berkas Lair'] },
    { name: 'Kallia', level: 85, tasks: ['Crucible', 'Sanctum Of Destruction', 'Wizard Labirynth','Berkas Lair'] },
    { name: 'Uno', level: 85, tasks: ['Crucible', 'Sanctum Of Destruction', 'Wizard Labirynth','Berkas Lair'] },
    // Add other characters and levels
];

let filterLevel85 = false;

function renderTasks() {
    const taskListElement = document.getElementById("taskList");
    taskListElement.innerHTML = ""; // Clear current tasks

    characters.forEach((character, characterIndex) => {
        // Filter out characters if filter is on and level is below 85
        if (filterLevel85 && character.level < 85) return;

        const taskItem = document.createElement("li");
        taskItem.classList.add("task-item");

        // Header with character name and level
        const taskHeader = document.createElement("div");
        taskHeader.classList.add("task-header");

        const taskTitle = document.createElement("h3");
        taskTitle.textContent = `${character.name} (Lv. ${character.level})`;
        taskHeader.appendChild(taskTitle);

        // Progress bar to track completed tasks
        const progressBar = document.createElement("div");
        progressBar.classList.add("progress-bar");
        const progressFill = document.createElement("div");
        progressFill.classList.add("progress-fill");
        progressBar.appendChild(progressFill);

        let completedTasks = 0;

        // Subtask list
        const subtaskList = document.createElement("ul");
        subtaskList.classList.add("subtask-list");

        character.tasks.forEach((task, taskIndex) => {
            const subtaskItem = document.createElement("li");

            const checkBox = document.createElement("input");
            checkBox.type = "checkbox";
            checkBox.onclick = () => updateProgress(characterIndex);

            const taskLabel = document.createElement("label");
            taskLabel.textContent = task;

            subtaskItem.appendChild(checkBox);
            subtaskItem.appendChild(taskLabel);
            subtaskList.appendChild(subtaskItem);
        });

        taskItem.appendChild(taskHeader);
        taskItem.appendChild(subtaskList);
        taskItem.appendChild(progressBar);
        taskListElement.appendChild(taskItem);
    });
}

// Update progress bar when tasks are completed
function updateProgress(characterIndex) {
    const character = characters[characterIndex];
    const taskItem = document.querySelectorAll(".task-item")[characterIndex];
    const checkboxes = taskItem.querySelectorAll("input[type='checkbox']");
    const progressFill = taskItem.querySelector(".progress-fill");

    let completedTasks = 0;

    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) completedTasks++;
    });

    const totalTasks = character.tasks.length;
    const progress = (completedTasks / totalTasks) * 100;

    progressFill.style.width = `${progress}%`;
}

// Filter characters by level 85
document.getElementById("filterBtn").onclick = () => {
    filterLevel85 = !filterLevel85;
    renderTasks();
    document.getElementById("filterBtn").textContent = filterLevel85
        ? "Show All Characters"
        : "Show Only Level 85";
};

// Initial render
renderTasks();
