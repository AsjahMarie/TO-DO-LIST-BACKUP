const calendar = document.querySelector(".calendar"),
  date = document.querySelector(".date"),
  daysContainer = document.querySelector(".days"),
  prev = document.querySelector(".prev"),
  next = document.querySelector(".next"),
  todayBtn = document.querySelector(".today-btn"),
  gotoBtn = document.querySelector(".goto-btn"),
  dateInput = document.querySelector(".date-input"),
  eventDay = document.querySelector(".event-day"),
  eventDate = document.querySelector(".event-date"),
  eventsContainer = document.querySelector(".events"),
  addTaskBtn = document.querySelector(".add-event"), // Updated class name
  addTaskWrapper = document.querySelector(".add-event-wrapper "), // Updated class name
  addTaskCloseBtn = document.querySelector(".close "), // Updated class name
  addTaskTitle = document.querySelector(".task-name "), // Updated class name
  addTaskFrom = document.querySelector(".event-time-from "), // Updated class name
  addTaskTo = document.querySelector(".event-time-to "), // Updated class name
  addTaskSubmit = document.querySelector(".add-event-btn "); // Updated class name

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

const eventsArr = [];
getEvents();

// function to add days in days with class day and prev-date next-date on previous month and next month days and active on today
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
    let event = false;
    eventsArr.forEach((eventObj) => {
      if (
        eventObj.day === i &&
        eventObj.month === month + 1 &&
        eventObj.year === year
      ) {
        event = true;
      }
    });
    if (
      i === new Date().getDate() &&
      year === new Date().getFullYear() &&
      month === new Date().getMonth()
    ) {
      activeDay = i;
      getActiveDay(i);
      updateEvents(i);
      if (event) {
        days += `<div class="day today active event">${i}</div>`;
      } else {
        days += `<div class="day today active">${i}</div>`;
      }
    } else {
      if (event) {
        days += `<div class="day event">${i}</div>`;
      } else {
        days += `<div class="day">${i}</div>`;
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
      updateEvents(Number(e.target.innerHTML));
      activeDay = Number(e.target.innerHTML);
      //remove active
      days.forEach((day) => {
        day.classList.remove("active");
      });
      //if clicked prev-date or next-dateswitch to that month
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
            ) {  day.classList.add("active");
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
            } });
        }, 100);
      } else {
        e.target.classList.add("active");
      }
    });
  });
}

// function to add task
addTaskBtn.addEventListener("click", () => {
  addTaskWrapper.classList.toggle("active");
});

addTaskCloseBtn.addEventListener("click", () => {
  addTaskWrapper.classList.remove("active");
});

document.addEventListener("click", (e) => {
  if (
    e.target !== addTaskBtn &&
    !addTaskWrapper.contains(e.target)
  ) {
    addTaskWrapper.classList.remove("active");
  }
});

// allow 50 chars in task title
addTaskTitle.addEventListener("input", (e) => {
  addTaskTitle.value = addTaskTitle.value.slice(0, 60);
});

// function to add task to eventsArr
addTaskSubmit.addEventListener("click", () => {
  const taskName = addTaskTitle.value;
  const taskTimeFrom = addTaskFrom.value;
  const taskTimeTo = addTaskTo.value;

  if (taskName === "" || taskTimeFrom === "" || taskTimeTo === "") {
    alert("Please fill all the fields");
    return;
  }

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

  let taskExist = false;
  eventsArr.forEach((event) => {
    if (
      event.day === activeDay &&
      event.month === month + 1 &&
      event.year === year
    ) {
      event.events.forEach((item) => {
        if (item.title === taskName) {
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
    title: taskName,
    time: timeFrom + " - " + timeTo,
  };

  let taskAdded = false;
  if (eventsArr.length > 0) {
    eventsArr.forEach((item) => {
      if (
        item.day === activeDay &&
        item.month === month + 1 &&
        item.year === year
      ) {
        item.events.push(newTask);
        taskAdded = true;
      }
    });
  }

  if (!taskAdded) {
    eventsArr.push({
      day: activeDay,
      month: month + 1,
      year: year,
      events: [newTask],
    });
  }

  addTaskWrapper.classList.remove("active");
  addTaskTitle.value = "";
  addTaskFrom.value = "";
  addTaskTo.value = "";
  updateEvents(activeDay);

  const activeDayEl = document.querySelector(".day.active");
  if (!activeDayEl.classList.contains("event")) {
   
