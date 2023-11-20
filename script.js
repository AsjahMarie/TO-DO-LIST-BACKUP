const calendar = document.querySelector(".calendar"),
  date = document.querySelector(".date"),
  daysContainer = document.querySelector(".days"),
  prev = document.querySelector(".prev"),
  next = document.querySelector(".next"),
  todayBtn = document.querySelector(".today-btn"),
  gotoBtn = document.querySelector(".goto-btn"),
  dateInput = document.querySelector(".date-input"),
  taskDay = document.querySelector(".task-day"),
  taskDate = document.querySelector(".task-date"),
  tasksContainer = document.querySelector(".tasks"),
  addTaskBtn = document.querySelector(".add-task"),
  addTaskWrapper = document.querySelector(".add-task-wrapper "),
  addTaskCloseBtn = document.querySelector(".close "),
  addTaskTitle = document.querySelector(".task-name "),
  addTaskFrom = document.querySelector(".task-time-from "),
  addTaskTo = document.querySelector(".task-time-to "),
  addTaskSubmit = document.querySelector(".add-task-btn ");

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const tasksArr = [];
getTasks();
console.log(tasksArr);

//function to add days in days with class day and prev-date next-date on previous month and next month days and active on today
function initCalendar() {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  const day = firstDay.getDay();
  const nextDays = 7 - lastDay.getDay() - 1;

  date.innerHTML = months[month] + " " + year;

  let days = "";

  for (let x = day; x > 0; x--) {
    days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDate; i++) {
    //check if task is present on that day
    let task = false;
    tasksArr.forEach((taskObj) => {
      if (
        taskObj.day === i &&
        taskObj.month === month + 1 &&
        taskObj.year === year
      ) {
        task = true;
      }
    });
    if (
      i === new Date().getDate() &&
      year === new Date().getFullYear() &&
      month === new Date().getMonth()
    ) {
      activeDay = i;
      getActiveDay(i);
      updateTasks(i);
      if (task) {
        days += `<div class="day today active task">${i}</div>`;
      } else {
        days += `<div class="day today active">${i}</div>`;
      }
    } else {
      if (task) {
        days += `<div class="day task">${i}</div>`;
      } else {
        days += `<div class="day ">${i}</div>`;
      }
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date">${j}</div>`;
  }
  daysContainer.innerHTML = days;
  addListner();
}

//function to add month and year on prev and next button
function prevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  initCalendar();
}

function nextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  initCalendar();
}

prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

initCalendar();

//function to add active on day
function addListner() {
  const days = document.querySelectorAll(".day");
  days.forEach((day) => {
    day.addEventListener("click", (e) => {
      getActiveDay(e.target.innerHTML);
      updateTasks(Number(e.target.innerHTML));
      activeDay = Number(e.target.innerHTML);
      //remove active
      days.forEach((day) => {
        day.classList.remove("active");
      });
      //if clicked prev-date or next-date switch to that month
      if (e.target.classList.contains("prev-date")) {
        prevMonth();
        //add active to clicked day afte month is change
        setTimeout(() => {
          //add active where no prev-date or next-date
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("prev-date") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else if (e.target.classList.contains("next-date")) {
        nextMonth();
        //add active to clicked day afte month is changed
        setTimeout(() => {
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("next-date") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else {
        e.target.classList.add("active");
      }
    });
  });
}

todayBtn.addEventListener("click", () => {
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  initCalendar();
});

dateInput.addEventListener("input", (e) => {
  dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
  if (dateInput.value.length === 2) {
    dateInput.value += "/";
  }
  if (dateInput.value.length > 7) {
    dateInput.value = dateInput.value.slice(0, 7);
  }
  if (e.inputType === "deleteContentBackward") {
    if (dateInput.value.length === 3) {
      dateInput.value = dateInput.value.slice(0, 2);
    }
  }
});

gotoBtn.addEventListener("click", gotoDate);

function gotoDate() {
  console.log("here");
  const dateArr = dateInput.value.split("/");
  if (dateArr.length === 2) {
    if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
      month = dateArr[0] - 1;
      year = dateArr[1];
      initCalendar();
      return;
    }
  }
  alert("Invalid Date");
}

//function get active day day name and date and update taskday taskdate
function getActiveDay(date) {
  const day = new Date(year, month, date);
  const dayName = day.toString().split(" ")[0];
  taskDay.innerHTML = dayName;
  taskDate.innerHTML = date + " " + months[month] + " " + year;
}

//function update tasks when a day is active
function updateTasks(date) {
  let tasks = "";
  tasksArr.forEach((task) => {
    if (
      date === task.day &&
      month + 1 === task.month &&
      year === task.year
    ) {
      task.tasks.forEach((task) => {
        tasks += `<div class="task">
            <div class="title">
              <i class="fas fa-circle"></i>
              <h3 class="task-title">${task.title}</h3>
            </div>
            <div class="task-time">
              <span class="task-time">${task.time}</span>
            </div>
        </div>`;
      });
    }
  });
  if (tasks === "") {
    tasks = `<div class="no-task">
            <h3>No Tasks</h3>
        </div>`;
  }
  tasksContainer.innerHTML = tasks;
  saveTasks();
}

//function to add task
addTaskBtn.addEventListener("click", () => {
  addTaskWrapper.classList.toggle("active");
});

addTaskCloseBtn.addEventListener("click", () => {
  addTaskWrapper.classList.remove("active");
});

document.addEventListener("click", (e) => {
  if (e.target !== addTaskBtn && !addTaskWrapper.contains(e.target)) {
    addTaskWrapper.classList.remove("active");
  }
});

//allow 50 chars in tasktitle
addTaskTitle.addEventListener("input", (e) => {
  addTaskTitle.value = addTaskTitle.value.slice(0, 60);
});

//allow only time in tasktime from and to
addTaskFrom.addEventListener("input", (e) => {
  addTaskFrom.value = addTaskFrom.value.replace(/[^0-9:]/g, "");
  if (addTaskFrom.value.length === 2) {
    addTaskFrom.value += ":";
  }
  if (addTaskFrom.value.length > 5) {
    addTaskFrom.value = addTaskFrom.value.slice(0, 5);
  }
});

addTaskTo.addEventListener("input", (e) => {
  addTaskTo.value = addTaskTo.value.replace(/[^0-9:]/g, "");
  if (addTaskTo.value.length === 2) {
    addTaskTo.value += ":";
  }
  if (addTaskTo.value.length > 5) {
    addTaskTo.value = addTaskTo.value.slice(0, 5);
  }
});

//function to add task to tasksArr
addTaskSubmit.addEventListener("click", () => {
  const taskTitle = addTaskTitle.value;
  const taskTimeFrom = addTaskFrom.value;
  const taskTimeTo = addTaskTo.value;
  if (taskTitle === "" || taskTimeFrom === "" || taskTimeTo === "") {
    alert("Please fill all the fields");
    return;
  }

  //check correct time format 24 hour
  const timeFromArr = taskTimeFrom.split(":");
  const timeToArr = taskTimeTo.split(":");
  if (
    timeFromArr.length !== 2 ||
    timeToArr.length !== 2 ||
    timeFromArr[0] > 23 ||
    timeFromArr[1] > 59 ||
    timeToArr[0] > 23 ||
    timeToArr[1] > 59
  ) {
    alert("Invalid Time Format");
    return;
  }

  const timeFrom = convertTime(taskTimeFrom);
  const timeTo = convertTime(taskTimeTo);

  //check if task is already added
  let taskExist = false;
  tasksArr.forEach((task) => {
    if (
      task.day === activeDay &&
      task.month === month + 1 &&
      task.year === year
    ) {
      task.tasks.forEach((task) => {
        if (task.title === taskTitle) {
          taskExist = true;
        }
      });
    }
  });
  if (taskExist) {
    alert("Task already added");
    return;
  }
  const newTask = {
    title: taskTitle,
    time: timeFrom + " - " + timeTo,
  };
  console.log(newTask);
  console.log(activeDay);
  let taskAdded = false;
  if (tasksArr.length > 0) {
    tasksArr.forEach((item) => {
      if (
        item.day === activeDay &&
        item.month === month + 1 &&
        item.year === year
      ) {
        item.tasks.push(newTask);
        taskAdded = true;
      }
    });
  }

  if (!taskAdded) {
    tasksArr.push({
      day: activeDay,
      month: month + 1,
      year: year,
      tasks: [newTask],
    });
  }

  console.log(tasksArr);
  addTaskWrapper.classList.remove("active");
  addTaskTitle.value = "";
  addTaskFrom.value = "";
  addTaskTo.value = "";
  updateTasks(activeDay);
  //select active day and add task class if not added
  const activeDayEl = document.querySelector(".day.active");
  if (!activeDayEl.classList.contains("task")) {
    activeDayEl.classList.add("task");
  }
});

//function to delete task when clicked on task
tasksContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("task")) {
    if (confirm("Are you sure you want to delete this task?")) {
      const taskTitle = e.target.children[0].children[1].innerHTML;
      tasksArr.forEach((task) => {
        if (
          task.day === activeDay &&
          task.month === month + 1 &&
          task.year === year
        ) {
          task.tasks.forEach((item, index) => {
            if (item.title === taskTitle) {
              task.tasks.splice(index, 1);
            }
          });
          //if no tasks left in a day then remove that day from tasksArr
          if (task.tasks.length === 0) {
            tasksArr.splice(tasksArr.indexOf(task), 1);
            //remove task class from day
            const activeDayEl = document.querySelector(".day.active");
            if (activeDayEl.classList.contains("task")) {
              activeDayEl.classList.remove("task");
            }
          }
        }
      });
      updateTasks(activeDay);
    }
  }
});

//function to save tasks in local storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasksArr));
}

//function to get tasks from local storage
function getTasks() {
  //check if tasks are already saved in local storage then return task else nothing
  if (localStorage.getItem("tasks") === null) {
    return;
  }
  tasksArr.push(...JSON.parse(localStorage.getItem("tasks")));
}

function convertTime(time) {
  //convert time to 24 hour format
  let timeArr = time.split(":");
  let timeHour = timeArr[0];
  let timeMin = timeArr[1];
  let timeFormat = timeHour >= 12 ? "PM" : "AM";
  timeHour = timeHour % 12 || 12;
  time = timeHour + ":" + timeMin + " " + timeFormat;
  return time;
}
