let timer;
let timeLeft = 1500; // 25 minutes in seconds
let running = false;
const display = document.getElementById("time-display");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");

function updateDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    display.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function startTimer() {
    if (!running) {
        running = true;
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            } else {
                clearInterval(timer);
                running = false;
            }
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timer);
    running = false;
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 1500;
    updateDisplay();
    running = false;
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

updateDisplay();
document
  .getElementById('userForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();
    document.querySelector('.success-message').style.display = 'block';
    this.reset();
  });

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskValue = taskInput.value.trim();

  if (taskValue === '') {
    alert('Please enter a task.');
    return;
  }

  const li = document.createElement('li');
  li.className =
    'list-group-item d-flex justify-content-between align-items-center';
  li.innerHTML = `
        <span>${taskValue}</span>
        <div>
            <button class="btn btn-warning btn-sm me-1" onclick="moveTask(this, 'inProgress')">In Progress</button>
            <button class="btn btn-success btn-sm me-1" onclick="moveTask(this, 'done')">Done</button>
            <button class="btn btn-danger btn-sm" onclick="deleteTask(this)">Delete</button>
        </div>
    `;

  // Add the task to the To-Do list
  document.getElementById('todoList').appendChild(li);
  taskInput.value = '';

  saveTasksToLocalStorage();
}

function moveTask(button, targetListId) {
  const li = button.closest('li');

  let targetList;

  if (targetListId === 'inProgress') {
    targetList = document.getElementById('inProgressList');
  } else if (targetListId === 'done') {
    targetList = document.getElementById('doneList');
  } else {
    targetList = document.getElementById('todoList');
  }

  targetList.appendChild(li);

  saveTasksToLocalStorage();
}

function deleteTask(button) {
  const confirmDelete = confirm('Are you sure you want to delete this task?');
  if (confirmDelete) {
    saveTasksToLocalStorage();
    button.closest('li').remove();
  }
}

function saveTasksToLocalStorage() {
  const getListItems = (listId) => {
    return Array.from(document.getElementById(listId).children).map(
      (li) => li.querySelector('span').textContent
    );
  };

  const tasks = {
    todo: getListItems('todoList'),
    inProgress: getListItems('inProgressList'),
    done: getListItems('doneList'),
  };

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
  const stored = localStorage.getItem('tasks');
  if (!stored) return;

  const tasks = JSON.parse(stored);

  const createTaskItem = (text, listId) => {
    const li = document.createElement('li');
    li.className =
      'list-group-item d-flex justify-content-between align-items-center';
    li.innerHTML = `
            <span>${text}</span>
            <div>
                <button class="btn btn-warning btn-sm me-1" onclick="moveTask(this, 'inProgress')">In Progress</button>
                <button class="btn btn-success btn-sm me-1" onclick="moveTask(this, 'done')">Done</button>
                <button class="btn btn-danger btn-sm" onclick="deleteTask(this)">Delete</button>
            </div>
        `;
    document.getElementById(listId).appendChild(li);
  };

  tasks.todo.forEach((task) => createTaskItem(task, 'todoList'));
  tasks.inProgress.forEach((task) => createTaskItem(task, 'inProgressList'));
  tasks.done.forEach((task) => createTaskItem(task, 'doneList'));
}

loadTasksFromLocalStorage();
