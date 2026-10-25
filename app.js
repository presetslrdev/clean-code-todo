const newTaskInput = document.getElementById("new-task"); //Add a new task.
const addTaskButton = document.querySelector(".task-row-wrapper button"); //first button
const incompleteTasksList = document.getElementById("incompleteTasks"); //taskList of #incompleteTasks
const completedTasksList = document.getElementById("completed-tasks"); //completed-tasks

//New task list item
const createTaskElement = function (taskTitle) {
  const taskItem = document.createElement("li");

  //input (checkbox)
  const checkBox = document.createElement("input"); //checkbx
  //label
  const label = document.createElement("label"); //label
  //input (text)
  const taskTextInput = document.createElement("input"); //text
  //button.edit
  const editButton = document.createElement("button"); //edit button

  //button.delete
  const deleteButton = document.createElement("button"); //delete button
  const deleteButtonImg = document.createElement("img"); //delete button image

  label.innerText = taskTitle;
  label.className = "task";

  //Each elements, needs appending
  checkBox.type = "checkbox";
  taskTextInput.type = "text";
  taskTextInput.className = "task";

  editButton.innerText = "Edit"; //innerText encodes special characters, HTML does not.
  editButton.className = "edit";

  deleteButton.className = "delete";
  deleteButtonImg.src = "./remove.svg";
  deleteButton.appendChild(deleteButtonImg);

  //and appending.
  taskItem.appendChild(checkBox);
  taskItem.appendChild(label);
  taskItem.appendChild(taskTextInput);
  taskItem.appendChild(editButton);
  taskItem.appendChild(deleteButton);
  return taskItem;
};

const addTask = function () {
  //Create a new list item with the text from the #new-task:
  if (!newTaskInput.value) return;
  const taskItem = createTaskElement(newTaskInput.value);

  //Append taskItem to incompleteTasksList
  incompleteTasksList.appendChild(taskItem);
  bindTaskEvents(taskItem);

  newTaskInput.value = "";
};

//Edit an existing task.

const editTask = function () {
  const taskItem = this.parentNode;

  const taskTextInput = taskItem.querySelector("input[type=text]");
  const label = taskItem.querySelector("label");
  const editButton = taskItem.querySelector(".edit");
  const isEditMode = taskItem.classList.contains("editMode");
  //If class of the parent is .editmode
  if (isEditMode) {
    //switch to .editmode
    //label becomes the inputs value.
    label.innerText = taskTextInput.value;
    editButton.innerText = "Edit";
  } else {
    taskTextInput.value = label.innerText;
    editButton.innerText = "Save";
  }

  //toggle .editmode on the parent.
  taskItem.classList.toggle("editMode");
};

//Delete task.
const deleteTask = function () {
  const taskItem = this.parentNode;
  const taskList = taskItem.parentNode;
  //Remove the parent list item from the taskList.
  taskList.removeChild(taskItem);
};

const toggleTaskStatus = function () {
  const taskItem = this.parentNode;
  const targetHolder = this.checked ? completedTasksList : incompleteTasksList;
  targetHolder.appendChild(taskItem);
};

addTaskButton.addEventListener("click", addTask);

const bindTaskEvents = function (taskItem) {
  //select ListItems children
  const checkBox = taskItem.querySelector("input[type=checkbox]");
  const editButton = taskItem.querySelector("button.edit");
  const deleteButton = taskItem.querySelector("button.delete");

  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind toggleTaskStatus to checkbox.
  checkBox.onchange = toggleTaskStatus;
};

//cycle over incompleteTasksList taskList list items
//for each list item
for (let i = 0; i < incompleteTasksList.children.length; i++) {
  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(incompleteTasksList.children[i]);
}

//cycle over completedTasksList taskList list items
for (let i = 0; i < completedTasksList.children.length; i++) {
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksList.children[i]);
}
