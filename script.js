document.getElementById("userForm").addEventListener("submit", function(event) {
    event.preventDefault();
    document.querySelector(".success-message").style.display = "block";
    this.reset();
});

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskValue = taskInput.value.trim();
    if (taskValue !== "") {
        let taskList = document.getElementById("taskList");
        let li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `${taskValue} <button class='btn btn-danger btn-sm' onclick='removeTask(this)'>Delete</button>`;
        taskList.appendChild(li);
        taskInput.value = "";
    }
}

function removeTask(button) {
    button.parentElement.remove();
}