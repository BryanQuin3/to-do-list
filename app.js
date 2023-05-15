// Constants
const inputTask = $("#input");
const taskBox = $("#task-box");
const btnAddTask = $("#btn");
const noTaskMsg = $("#no-task");
const messageContainer = $("#message-container");
// Variables
let id = 0;
let taskExists = false;

// Add task to task box
function addTask(tarea) {
  id++;
  const taskDiv = $("<div>")
    .addClass("flex justify-between items-center mt-5 px-7 md:px-10 lg:px-14")
    .attr("data-id", id);
  const taskSpan = $("<span>").addClass("text-white text-lg").text(tarea);
  taskDiv.append(taskSpan);

  const icons = ["./img/trash.svg", "./img/check.svg"];
  const iconSection = $("<section>")
    .addClass("flex gap-3")
    .append(
      // Add icons to the div
      icons.map((icon) => {
        const iconDiv = $("<div>").addClass(
          "flex justify-center items-center bg-gray-800 rounded-full p-2 hover:bg-gray-700 cursor-pointer"
        );
        const iconImg = $("<img>").attr("src", icon).addClass("h-7");
        if (icon === icons[0]) {
          iconDiv.addClass("delete");
        } else {
          iconDiv.addClass("check");
        }
        return iconDiv.append(iconImg);
      })
    );
  taskDiv.append(iconSection);
  const hr = $("<hr>")
    .addClass("h-px w-11/12 my-4 mx-auto")
    .attr("data-id", id);
  if (!taskExists) {
    taskBox.empty().append(taskDiv, hr);
    taskExists = true;
  } else {
    taskBox.append(taskDiv, hr);
  }
}

// Check if input task is valid
function handleClick() {
  const task = inputTask.val().trim();
  if (task !== "") {
    addTask(task);
    // Save to localStorage
    localStorage.setItem(`task ${id}`, task);
    inputTask.val("");
  }
}

btnAddTask.on("click", handleClick);

// Delete task
taskBox.on("click", ".delete", function () {
  // Get the task to delete
  const taskToDelete = $(this).closest("[data-id]");
  taskToDelete.next("hr").remove();
  taskToDelete.remove();
  // Get the id of the task to delete
  const taskId = taskToDelete.attr("data-id");
  // Remove task from localStorage
  localStorage.removeItem(`task ${taskId}`);
  if (taskBox.children().length === 0) {
    taskExists = false;
    localStorage.clear();
    taskBox.append(
      messageContainer,
      $("<hr>").addClass("h-px w-11/12 my-4 mx-auto")
    );
  }
});

// Mark task as completed
taskBox.on("click", ".check", function () {
  const completedTask = $(this).closest("[data-id]");
  const hr = completedTask.next("hr");
  const taskSpan = completedTask.find("span");
  // If already completed then do nothing
  if (taskSpan.hasClass("line-through")) {
    return;
  } else {
    taskSpan.addClass("line-through");
    completedTask.next("hr").remove();
    completedTask.appendTo(taskBox);
    hr.appendTo(taskBox);
  }
});

// Get task from localStorage
$(document).ready(function () {
  let storageSize = localStorage.length;
  for (let i = 0; i < storageSize; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('task ')) { 
      addTask(localStorage.getItem(key));
    }
  }
});

