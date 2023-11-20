document.addEventListener('DOMContentLoaded', function(){
    showTaskSection();
});

function showTaskSection(){
    // hide calendar section and show task section
    const showTaskBtn = document.getElementById('showTaskBtn');
    const showCalBtn = document.getElementById('showCalBtn');
    const taskSection = document.getElementById('taskSection');
    const calSection = document.getElementById('calendarSection');

    // change button styles for aesthetic
    showTaskBtn.classList.remove('showTaskBtn');
    showTaskBtn.classList.add('buttonFocus');
    showCalBtn.classList.remove('buttonFocus');
    showCalBtn.classList.add('showCalBtn');

    taskSection.classList.remove('hiddenElement');
    calSection.classList.add('hiddenElement');
}

function showCalSection(){
    // hide task section and show calendar section
    const showTaskBtn = document.getElementById('showTaskBtn');
    const showCalBtn = document.getElementById('showCalBtn');
    const taskSection = document.getElementById('taskSection');
    const calSection = document.getElementById('calendarSection');

    // change button styles for aesthetic
    showCalBtn.classList.remove('showCalBtn');
    showCalBtn.classList.add('buttonFocus');
    showTaskBtn.classList.remove('buttonFocus');
    showTaskBtn.classList.add('showTaskBtn');

    calSection.classList.remove('hiddenElement');
    taskSection.classList.add('hiddenElement');
}

// add task with calendar date function
function showTaskForm(){
    const divSection = document.getElementById('divSection');
    const calendar = document.getElementById('calendarSection');
    divSection.style.display = 'block';
    calendar.classList.remove('hiddenElement');
    // hide elements that aren't the calendar
}

function addTask(){

    const taskInput = document.getElementById('taskInput');
    const tasks = document.getElementById('tasks');
    const calTaskList = document.getElementById('calTasks');
    const taskColor = document.getElementById('taskColorPicker').value;
    
    // get value of due date from calendar
    const dueNum = document.getElementById('active').innerHTML;
    const parentMonth = document.getElementById('month');
    const dueMonth = parentMonth.querySelector('div').innerHTML;

    const dueDate = dueNum + " " + dueMonth;

    if (taskInput.value.trim() !== ''){
        const deleteBtn = "<button onclick='deleteTask(this)' id='deleteBtn'>complete & remove</button>";
        const editBtn = "<button onclick='editTask(this)' id='editBtn'>edit task</button>";
        const taskValue = taskInput.value;

        const li = document.createElement('li');
        li.textContent = taskValue + (dueDate ? ` (Due: ${dueDate})` : '');
        li.innerHTML += `${deleteBtn}`;
        li.innerHTML += `${editBtn}`;
        li.style.backgroundColor = taskColor;
        li.dataset.taskName = taskValue;
        li.dataset.taskColor = taskColor;
        li.dataset.dueDate = dueDate;
        tasks.appendChild(li);
        

        taskInput.value='';
        saveTasks();
        calTaskList.appendChild(li);
    } else {
        alert("please enter a task")
    }
    
    saveTasks();
    location.reload();

}

function saveTasks(){
    const tasks = document.getElementById('tasks');
    const calTaskList = document.getElementById('calTasks');
    window.localStorage.setItem("listTasks", tasks.innerHTML);
    window.localStorage.setItem("calTasks", calTaskList.innerHTML);
}

function displayTasks(){
    const tasks = document.getElementById('tasks');
    const calTaskList = document.getElementById('calTasks');
    tasks.innerHTML = window.localStorage.getItem("listTasks");
    calTaskList.innerHTML = window.localStorage.getItem("calTasks");
}

displayTasks();
