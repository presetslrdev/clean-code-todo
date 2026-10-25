const newTaskInput = document.getElementById("new-task");
const addTaskButton = document.querySelector(".task-row-wrapper button");
const incompleteTasksList = document.getElementById("incompleteTasks");
const completedTasksList = document.getElementById("completed-tasks");

const createTaskElement = function (taskTitle) {
  const taskItem = document.createElement("li");
  const checkBox = document.createElement("input");
  const label = document.createElement("label");
  const taskTextInput = document.createElement("input");
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");
  const deleteButtonImg = document.createElement("img");

  label.innerText = taskTitle;
  label.className = "task";

  checkBox.type = "checkbox";
  taskTextInput.type = "text";
  taskTextInput.className = "task";

  editButton.innerText = "Edit";
  editButton.className = "edit";

  deleteButton.className = "delete";
  deleteButtonImg.src = "./remove.svg";
  deleteButton.appendChild(deleteButtonImg);

  taskItem.appendChild(checkBox);
  taskItem.appendChild(label);
  taskItem.appendChild(taskTextInput);
  taskItem.appendChild(editButton);
  taskItem.appendChild(deleteButton);

  return taskItem;
};

const addTask = function () {
  if (!newTaskInput.value) return;
  const taskItem = createTaskElement(newTaskInput.value);

  incompleteTasksList.appendChild(taskItem);
  bindTaskEvents(taskItem);

  newTaskInput.value = "";
};

const editTask = function () {
  const taskItem = this.parentNode;
  const taskTextInput = taskItem.querySelector("input[type=text]");
  const label = taskItem.querySelector("label");
  const editButton = taskItem.querySelector(".edit");
  const isEditMode = taskItem.classList.contains("editMode");

  if (isEditMode) {
    label.innerText = taskTextInput.value;
    editButton.innerText = "Edit";
  } else {
    taskTextInput.value = label.innerText;
    editButton.innerText = "Save";
  }

  taskItem.classList.toggle("editMode");
};

const deleteTask = function () {
  const taskItem = this.parentNode;
  const taskList = taskItem.parentNode;
  taskList.removeChild(taskItem);
};

const toggleTaskStatus = function () {
  const taskItem = this.parentNode;
  const targetList = this.checked ? completedTasksList : incompleteTasksList;
  targetList.appendChild(taskItem);
};

addTaskButton.addEventListener("click", addTask);

const bindTaskEvents = function (taskItem) {
  const checkBox = taskItem.querySelector("input[type=checkbox]");
  const editButton = taskItem.querySelector("button.edit");
  const deleteButton = taskItem.querySelector("button.delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = toggleTaskStatus;
};

for (let i = 0; i < incompleteTasksList.children.length; i++) {
  bindTaskEvents(incompleteTasksList.children[i]);
}

for (let i = 0; i < completedTasksList.children.length; i++) {
  bindTaskEvents(completedTasksList.children[i]);
}
