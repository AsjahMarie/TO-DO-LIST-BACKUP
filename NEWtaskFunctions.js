// TASK FUNCTIONS

document.addEventListener('DOMContentLoaded', function(){
    const divSection = document.getElementById('divSection');
    const taskList = document.getElementById('tasks');
    divSection.style.display = 'none';
});

function composeEmail(event){
    event.preventDefault();

    /*Subtask inputs and variables*/
    const subInput = document.getElementById('subtaskInput');
    const subDate = document.getElementById('subtaskdueDateInput').value;
    const subDueDate = formatDate(subDate);
    const subTask = document.getElementById('subTask');
    /*main task inputs and variables*/
    const date = document.getElementById('dueDateInput').value;
    const dueDate = formatDate(date);
    const emailAddress = document.getElementById('emailAddress').value;
    const task = document.getElementById('taskInput');
    if(subTask.checked){
        const subject = "Sharing my tasks with you!";
        const encodedSubject = encodeURIComponent(subject);

        const subInputValue = subInput.value;
        const taskValue = task.value;
        const body = "my task: '"+ taskValue + "'' is due on: " + dueDate + " and my subtask: '" + subInputValue + "'' is due on: " + subDueDate;
        window.open(`mailto:${emailAddress}?subject=${encodedSubject}&body=${body}`);
    } else {
        const subject = "Sharing my task with you!";
        const encodedSubject = encodeURIComponent(subject);
        const taskValue = task.value;

        const body = "my task: "+ taskValue + "  is due on: " + dueDate;
        window.open(`mailto:${emailAddress}?subject=${encodedSubject}&body=${body}`);
    }


}

function formatDate(date){

    // date is in YYYY-MM-DD format, want it to be 19 November 2023 to match Calendar 
    const separateDate = date.split('-');

    // now YYYY is in separateDate[0], MM is in separateDate[1], and DD is in separateDate[2]

    // month array
    const monArray = [
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
    // value of separateDate[1] is the month in monArray - 1 
    const monValue = separateDate[1] - 1;

    const dueDate = (separateDate[2] + " " + monArray[monValue] + " " + separateDate[0]);

    return dueDate;
}
const tasks = document.getElementById('tasks');
// add task to page as li within ul
function addTask(){

    // input variables
    const taskInput = document.getElementById('taskInput');
    const tasks = document.getElementById('tasks');
    const taskColor = document.getElementById('taskColorPicker').value;
    const date = document.getElementById('dueDateInput').value;
    const dueDate = formatDate(date);

    // if task is not empty
    if (taskInput.value.trim() !== ''){
        // remove and edit buttons to add to li
        const deleteBtn = "<button onclick='deleteTask(this)' id='deleteBtn'>complete & remove</button>";
        const editBtn = "<button onclick='editTask(this)' id='editBtn'>edit task</button>";
        const taskValue = taskInput.value;

        // add elements to li tag
        const li = document.createElement('li');
        li.textContent = taskValue + (dueDate ? ` (Due: ${dueDate})` : '');
        li.innerHTML += `${deleteBtn}`;
        li.innerHTML += `${editBtn}`;
        li.style.backgroundColor = taskColor;
        li.dataset.taskName = taskValue;
        li.dataset.taskColor = taskColor;
        li.dataset.dueDate = dueDate;
        // append li to ul
        tasks.appendChild(li);

        // reset taskInput value
        taskInput.value='';
        
    } else {
        alert("please enter a task")
    }

    // save page and reload to get rid of task form
    saveTasks();
    location.reload();
}

/*function that gets delete button's parent node (li) and deletes it from it's parent node (ul)*/
function deleteTask(dBtn){
    var taskListed = dBtn.parentNode;
    taskListed.parentNode.removeChild(taskListed);
    saveTasks();
}

function editTask(eBtn){
    // get parent of edit button -> li of task
    const taskListed = eBtn.parentNode;
    // show task form
    const divSection = document.getElementById('divSection');
    divSection.style.display = 'block';

    // first check if there is a subtask and add values from there
    // if not only add values from main task
    if(taskListed.querySelector('ul') !== null) {
        // show subtask form
        const subCheck = document.getElementById('subTask');
        const addTaskBtn = document.getElementById('taskButton');
        const subTaskForm = document.getElementById('subTaskForm');
        subTaskForm.classList.remove('hiddenElement');
        subTaskForm.classList.add('displayGrid');
        addTaskBtn.classList.add('hiddenElement');
        subCheck.checked = true;

        // get ul of task, then li of ul (subtask)
        const subList = taskListed.querySelector('ul');
        const subTask = subList.querySelector('li');

        // get values of saved subtask
        const subInput = subTask.getAttribute('data-task-name');
        const subColor = subTask.getAttribute('data-task-color');
        const subDate = subTask.getAttribute('data-due-date');
        // get input locations for subtask
        const subTaskInput = document.getElementById('subtaskInput');
        const subTaskColor = document.getElementById('subtaskColorPicker');
        const subDueDate = document.getElementById('subtaskdueDateInput');
        // fill in subtask input fields with saved subtask to edit
        subTaskInput.value = subInput;
        subTaskColor.value = subColor;
        subDueDate.value = subDate

        // get values of saved task
        const oldInput = taskListed.getAttribute('data-task-name');
        const oldColor = taskListed.getAttribute('data-task-color');
        const oldDate = taskListed.getAttribute('data-due-date');
        // get input locations for main task
        const taskInput = document.getElementById('taskInput');
        const taskColor = document.getElementById('taskColorPicker');
        const dueDate = document.getElementById('dueDateInput');
        // fill in input values with task to edit
        taskInput.value = oldInput;
        taskColor.value = oldColor;
        dueDate.value = oldDate;

        // remove old task and subtask and save
        taskListed.remove();

        // new edited tasks will be added with functions from task form
        // save task to remove old versions of tasks
        saveTasks();

    } else {
        // get values of saved task
        const oldInput = taskListed.getAttribute('data-task-name');
        const oldColor = taskListed.getAttribute('data-task-color');
        const oldDate = taskListed.getAttribute('data-due-date');
        // get input locations for main task
        const taskInput = document.getElementById('taskInput');
        const taskColor = document.getElementById('taskColorPicker');
        const dueDate = document.getElementById('dueDateInput');
        // fill in input values with task to edit
        taskInput.value = oldInput;
        taskColor.value = oldColor;
        dueDate.value = oldDate;

        // remove old task and save
        taskListed.remove();
        saveTasks();
    }
    

}

// save tasks to local storage
function saveTasks(){
    window.localStorage.setItem("tasks", tasks.innerHTML)

    //location.reload();
}

// get tasks from local storage 
function displayTasks(){
    if(tasks){
        tasks.innerHTML = window.localStorage.getItem("tasks");
    }
    
}

// erase tasks from localStorage
function clearAll(){
    window.localStorage.removeItem("tasks");
    location.reload();
}

// call function to show tasks
displayTasks();

function submitForm(){
    const checkBox = document.getElementById('collaborate');
    const subTask = document.getElementById('subTask');

    if (subTask.checked && checkBox.checked){
        composeEmail(event);
        console.log('i went to the submit place');
        addSubtaskTask();
        location.reload();
    } else if(checkBox.checked){
        composeEmail(event);
        addTask();
        location.reload();
    } else {
        addTask();
        location.reload();
    }
}

function displayHidden(){
    const checkBox = document.getElementById('collaborate');
    const subBox = document.getElementById('subTask');
    const shareForm = document.getElementById('shareForm');
    const addTaskBtn = document.getElementById('taskButton');
    const addSubBtn = document.getElementById('subtaskButton');

    if(checkBox.checked){
        shareForm.classList.remove('hiddenElement');
        shareForm.classList.add('displayGrid');
        addTaskBtn.classList.add('hiddenElement');
        addSubBtn.classList.add('hiddenElement');
    } else if (!checkBox.checked && subBox.checked){
        addTaskBtn.classList.add('hiddenElement');
        shareForm.classList.add('hiddenElement');
        addSubBtn.classList.remove('hiddenElement');
    } else {
        shareForm.classList.add('hiddenElement');
        shareForm.classList.remove('displayGrid');
        addTaskBtn.classList.remove('hiddenElement');
        addSubBtn.classList.remove('hiddenElement');
    }
}

function removeTaskFromCalendar(taskName) {
    const taskData = {
        type: 'removeTask',
        name: taskName
    };
    window.postMessage(taskData, '*');
}

function goToAddTaskPage() {
    window.location.href = 'addTaskPage.html';
}

function showSubtaskForm(){
    const subCheck = document.getElementById('subTask');
    const addTaskBtn = document.getElementById('taskButton');
    const subTaskForm = document.getElementById('subTaskForm');

    if(subCheck.checked){
        subTaskForm.classList.remove('hiddenElement');
        subTaskForm.classList.add('displayGrid');
        addTaskBtn.classList.add('hiddenElement');
    } else {
        subTaskForm.classList.add('hiddenElement');
        subTaskForm.classList.remove('displayGrid');
        addTaskBtn.classList.remove('hiddenElement');
    }
}

function addSubtaskTask(){
    /*Main task variables*/
    const taskInput = document.getElementById('taskInput');
    const tasks = document.getElementById('tasks');
    const taskColor = document.getElementById('taskColorPicker').value;
    const date = document.getElementById('dueDateInput').value;
    const dueDate = formatDate(date);
    const li = document.createElement('li');
    /*Sub task variables*/
    const subInput = document.getElementById('subtaskInput');
    const subColor = document.getElementById('subtaskColorPicker').value;
    const subDate = document.getElementById('subtaskdueDateInput').value;
    const subDueDate = formatDate(subDate);

    if (taskInput.value.trim() !== '' && subInput.value.trim() !== ''){
        const deleteBtn = "<button onclick='deleteTask(this)' id='deleteBtn'>complete & remove</button>";
        const editBtn = "<button onclick='editTask(this)' id='editBtn'>edit task</button>";
        const taskValue = taskInput.value;
        const subValue = subInput.value;

        li.textContent = taskValue + (dueDate ? ` (Due: ${dueDate})` : '');
        li.innerHTML += `${deleteBtn}`;
        li.innerHTML += `${editBtn}`;
        li.style.backgroundColor = taskColor;
        li.dataset.taskName = taskValue;
        li.dataset.taskColor = taskColor;
        li.dataset.dueDate = dueDate;

        const subul = document.createElement('ul');
        const subli = document.createElement('li');
        subli.textContent = subValue + (subDueDate ? ` (Due: ${subDueDate})` : '');
        subli.innerHTML += `${deleteBtn}`;
        subli.style.backgroundColor = subColor;
        subli.dataset.taskName = subValue;
        subli.dataset.taskColor = subColor;
        subli.dataset.dueDate = subDueDate;
        subul.appendChild(subli);
        li.appendChild(subul);
        tasks.appendChild(li);

        taskInput.value='';
        subInput.value='';
        saveTasks();
    
    } else {
        alert("please enter a task")
    }

    saveTasks();
    location.reload();

}

function showTaskForm(){
    const divSection = document.getElementById('divSection');
    divSection.style.display = 'block';
}