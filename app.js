const newTaskInput = document.getElementById("new-task");
const addTaskButton = document.querySelector(".task-row-wrapper button");
const incompleteTasksList = document.getElementById("incompleteTasks");
const completedTasksList = document.getElementById("completed-tasks");

const createDeleteButton = () => {
  const deleteButton = document.createElement("button");
  const deleteIcon = document.createElement("img");

  deleteButton.className = "delete";
  deleteIcon.src = "./remove.svg";
  deleteButton.appendChild(deleteIcon);

  return deleteButton;
};

const createTaskElement = (taskTitle) => {
  const taskItem = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const label = document.createElement("label");
  label.className = "task";
  label.textContent = taskTitle;

  const textInput = document.createElement("input");
  textInput.type = "text";
  textInput.className = "task";

  const editButton = document.createElement("button");
  editButton.className = "edit";
  editButton.textContent = "Edit";

  const deleteButton = createDeleteButton();

  taskItem.appendChild(checkbox);
  taskItem.appendChild(label);
  taskItem.appendChild(textInput);
  taskItem.appendChild(editButton);
  taskItem.appendChild(deleteButton);

  return taskItem;
};

const addTask = () => {
  const taskTitle = newTaskInput.value.trim();
  if (!taskTitle) return;

  const taskItem = createTaskElement(taskTitle);
  incompleteTasksList.appendChild(taskItem);
  bindTaskEvents(taskItem);

  newTaskInput.value = "";
};

const editTask = function () {
  const taskItem = this.parentNode;
  const textInput = taskItem.querySelector("input[type=text]");
  const label = taskItem.querySelector("label");
  const editButton = taskItem.querySelector(".edit");
  const isEditMode = taskItem.classList.contains("editMode");

  if (isEditMode) {
    label.textContent = textInput.value;
    editButton.textContent = "Edit";
  } else {
    textInput.value = label.textContent;
    editButton.textContent = "Save";
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

const bindTaskEvents = (taskItem) => {
  const checkbox = taskItem.querySelector("input[type=checkbox]");
  const editButton = taskItem.querySelector("button.edit");
  const deleteButton = taskItem.querySelector("button.delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkbox.onchange = toggleTaskStatus;
};

addTaskButton.addEventListener("click", addTask);

for (let i = 0; i < incompleteTasksList.children.length; i++) {
  bindTaskEvents(incompleteTasksList.children[i]);
}

for (let i = 0; i < completedTasksList.children.length; i++) {
  bindTaskEvents(completedTasksList.children[i]);
}
