let tasks = [];

// Load tasks from localStorage on page load
window.onload = function () {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
  }
  renderTasks();
};

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

addBtn.addEventListener("click", addTask);

function addTask() {
  const text = taskInput.value.trim();
  if (text === "") {
    alert("Task cannot be empty!");
    return;
  }

  const newTask = {
    text: text,
    completed: false
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();
  taskInput.value = "";
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.completed) {
      li.classList.add("completed");
    }

    const span = document.createElement("span");
    span.textContent = task.text;

    const btnDiv = document.createElement("div");
    btnDiv.className = "task-buttons";

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "✔";
    completeBtn.onclick = function () {
      toggleComplete(index);
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑";
    deleteBtn.onclick = function () {
      deleteTask(index);
    };

    btnDiv.appendChild(completeBtn);
    btnDiv.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(btnDiv);

    taskList.appendChild(li);
  });
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}