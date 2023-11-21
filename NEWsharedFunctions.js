// function to display the list of tasks on the calendar page
// calls task list from storage and puts it into array of li elements
// compares the due date stored to the current date that is 'active' 
// on the screen in li form

function displayCalTasks(){

    // set variable to value of selected calendar day
    const dueNum = document.getElementById('active').innerHTML;
    const dateLocation = getActiveDay(dueNum);
    const currDay = dateLocation.innerHTML;

    const tasks = window.localStorage.getItem("tasks");
    console.log(tasks);

    // split oldArray where there is an "li" element 
    if(tasks === null){
        //do nothing
    } else {
        var oldArray = tasks.split(/<\/?li>/);
        console.log(oldArray);

        // get rid of any empty values in array and add to new taskArray
        const taskArray = oldArray.filter(function (task){
            return task.trim() !== '';
        })
        console.log(taskArray);

        // create new ul element to hold tasks for calendar screen page
        var taskUl = document.createElement('ul');
        taskUl.setAttribute('id','tasks');

        // add li elements from array to ul to access attributes in later code
        for (i=0; i<taskArray.length; i++){
            taskUl.innerHTML += taskArray[i];
        }


        console.log(taskUl);

        // loop through ul and get dueDate attribute for each task, if it equals the active day display it on the screen
        for (i=0; i<taskArray.length; i++){
            if(taskUl.children[i].getAttribute('data-due-date') === currDay){
                const ul = document.createElement('ul');
                ul.setAttribute('id','tasks');
                ul.appendChild(taskUl.children[i]);
                dateLocation.innerHTML += ul.outerHTML;
            }
        }
    }


};