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