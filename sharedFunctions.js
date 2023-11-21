// function createTask(){
//     // get ul for tasks
// }

// function saveArray(){
//     // get all li of #tasks and store to array
//     const taskArray = document.querySelectorAll('#tasks li');
//     console.log(taskArray);

//     // save array to localStorage
//     window.localStorage.setItem("array", JSON.stringify(taskArray));
// }

// function displayCalTasks(){

//     // set variable to value of selected calendar day
//     const dueNum = document.getElementById('active').innerHTML;
//     const dateLocation = getActiveDay(dueNum);
//     const currDay = dateLocation.innerHTML;

//     const tasks = window.localStorage.getItem("array");
//     const taskArray = JSON.parse(tasks);

//     const regex = /data-due-date=["']([^"']+)["']/;

//     // loop through array, see if any dates match the active date, if yes show task
//     console.log('i got this far');
//     taskArray.forEach(function(task) {
//         const regex = /data-due-date=["']([^"'])["']/;
//         console.log('in array function')
//         if(regex.test(task.outerHTML)){
//             var dueDateMatch = liElement.outerHTML.match(regex);
//             var dueDate = dueDateMatch && dueDateMatch[1];

//             console.log('dueDate:')
//             console.log(dueDate);

//             if(dueDate === currDay){
//                 console.log('i was here');
//                 const ul = document.createElement('ul');
//                 ul.appendChild(task);
//                 dateLocation.innerHTML += ul.outerHTML;
//             }
//         }
//     });

// };


function displayCalTasks(){

    // set variable to value of selected calendar day
    const dueNum = document.getElementById('active').innerHTML;
    const dateLocation = getActiveDay(dueNum);
    const currDay = dateLocation.innerHTML;

    const tasks = window.localStorage.getItem("tasks");
    console.log(tasks);

    var oldArray = tasks.split(/<\/?li>/);
    console.log(oldArray);

    const taskArray = oldArray.filter(function (task){
        return task.trim() !== '';
    })
    console.log(taskArray);

    var taskUl = document.createElement('ul');
    taskUl.setAttribute('id','tasks');

    for (i=0; i<taskArray.length; i++){
        taskUl.innerHTML += taskArray[i];
    }

    console.log(taskUl);

    for (i=0; i<taskArray.length; i++){
        if(taskUl.children[i].getAttribute('data-due-date') === currDay){
            const ul = document.createElement('ul');
            ul.setAttribute('id','tasks');
            ul.appendChild(taskUl.children[i]);
            dateLocation.innerHTML += ul.outerHTML;
        }
    }


};