let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksContainer = document.querySelector(".tasks");

let tasks = [];

// تحميل البيانات من Local Storage عند فتح الصفحة
if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
}

addTasksToPage(tasks);

// عند الضغط على زر Add
submit.onclick = function () {
  if (input.value.trim() !== "") {
    addTaskToArray(input.value);
    input.value = "";
  }
};

// إضافة مهمة جديدة
function addTaskToArray(taskText) {
  let task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };

  tasks.push(task);

  addTasksToPage(tasks);

  addDataToLocalStorage(tasks);
}

// رسم المهام داخل الصفحة
function addTasksToPage(tasksArray) {
  tasksContainer.innerHTML = "";

  tasksArray.forEach((task) => {
    let div = document.createElement("div");
    div.className = "task";
    div.setAttribute("data-id", task.id);

    div.appendChild(document.createTextNode(task.title));

    let span = document.createElement("span");
    span.className = "delete";
    span.appendChild(document.createTextNode("Delete"));

    div.appendChild(span);

    tasksContainer.appendChild(div);
  });
}

// حفظ البيانات
function addDataToLocalStorage(tasksArray) {
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
}

// حذف مهمة
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete")) {
    let taskId = Number(e.target.parentElement.dataset.id);

    tasks = tasks.filter((task) => task.id !== taskId);

    addTasksToPage(tasks);

    addDataToLocalStorage(tasks);
  }
});