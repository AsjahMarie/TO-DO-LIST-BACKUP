// TASK LIST FUNCTIONS

document.addEventListener('DOMContentLoaded', function(){
    const divSection = document.getElementById('divSection');
    const taskList = document.getElementById('tasks');
    divSection.style.display = 'none';
});

// const taskInput = document.getElementById('taskInput');
// const tasks = document.getElementById('tasks');
// const taskColor = document.getElementById('taskColorPicker').value;

function composeEmail(event){
    event.preventDefault();

    /*Subtask inputs and variables*/
    const subInput = document.getElementById('subtaskInput');
    const subTask = document.getElementById('subTask');
    /*main task inputs and variables*/
    const dueDate = document.getElementById('dueDateInput').value;
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

// function addTask(){

//     const taskInput = document.getElementById('taskInput');
//     const tasks = document.getElementById('tasks');
//     const taskColor = document.getElementById('taskColorPicker').value;
//     const dueDate = document.getElementById('dueDateInput').value;

//     if (taskInput.value.trim() !== ''){
//         const deleteBtn = "<button onclick='deleteTask(this)' id='deleteBtn'>complete & remove</button>";
//         const editBtn = "<button onclick='editTask(this)' id='editBtn'>edit task</button>";
//         const taskValue = taskInput.value;

//         const li = document.createElement('li');
//         li.textContent = taskValue + (dueDate ? ` (Due: ${dueDate})` : '');
//         li.innerHTML += `${deleteBtn}`;
//         li.innerHTML += `${editBtn}`;
//         li.style.backgroundColor = taskColor;
//         li.dataset.taskName = taskValue;
//         li.dataset.taskColor = taskColor;
//         li.dataset.dueDate = dueDate;
//         tasks.appendChild(li);

//         taskInput.value='';
//         saveTasks();
        
//     } else {
//         alert("please enter a task")
//     }
//     saveTasks();
//     location.reload();
// }

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
        console.log('i went to the if statement');
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
        console.log('i went to the else');
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

// function saveTasks(){
//     window.localStorage.setItem("tasks", tasks.innerHTML)
// }

// function displayTasks(){
//     tasks.innerHTML = window.localStorage.getItem("tasks");
// }

function clearAll(){
    window.localStorage.clear();
    location.reload();
}

//displayTasks();

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
    const shareForm = document.getElementById('shareForm');
    const addTaskBtn = document.getElementById('taskButton');
    const addSubBtn = document.getElementById('subtaskButton');

    if(checkBox.checked){
        shareForm.classList.remove('hiddenElement');
        shareForm.classList.add('displayGrid');
        addTaskBtn.classList.add('hiddenElement');
        addSubBtn.classList.add('hiddenElement');
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
    const dueDate = document.getElementById('dueDateInput').value;
    const li = document.createElement('li');
    /*Sub task variables*/
    const subInput = document.getElementById('subtaskInput');
    const subDueDate = document.getElementById('subtaskdueDateInput').value;
    const subColor = document.getElementById('subtaskColorPicker').value;
    const subCheck = document.getElementById('subTask');

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