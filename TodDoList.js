


document.addEventListener('DOMContentLoaded',function(){
    let ToDoButton=document.getElementById('ToDoList-BTN');
    let NoteBox=document.getElementById('Note-Box');
    let centerHome=document.getElementById('center-Home');
    let home=document.getElementById('Home');
    let history=document.getElementById('History');
    let ToDoHistory=document.getElementById('ToDo-History');

    ToDoButton.addEventListener('click',function(){
        if(NoteBox.style.display==="none"){
            NoteBox.style.display="block";
            centerHome.style.display="none"
            ToDoHistory.style.display="none"

            
        } else{
            NoteBox.style.display="none";
            centerHome.style.display="flex"
            ToDoHistory.style.display="none"
        }
    });

    home.addEventListener('click' , function(){
            NoteBox.style.display="none"
            centerHome.style.display="flex"
            ToDoHistory.style.display="none"
        
    });
    

    history.addEventListener('click',function(){
        NoteBox.style.display="none"
            centerHome.style.display="none"
            ToDoHistory.style.display="block"
    })

});



// ToDo Containor


    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const addTaskButton = document.getElementById('addTaskButton');
    let NoteBox=document.getElementById('Note-Box');
    let ToDoHistory=document.getElementById('ToDo-History');
    window.onload = function() {
        loadTasks();
    };

    // Function to load tasks from local storage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            addTaskToList(task);
        });
    }

    // Function to add a task to the list
    function addTaskToList(task) {
        const li = document.createElement('li');
        const textarea = document.createElement('textarea');
        textarea.value = task.text;
        textarea.className = 'editable-textarea';
        textarea.disabled = true;

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'edit-button';

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-button';


        // Event listener for edit button
        editButton.addEventListener('click', function() {
            ToDoHistory.style.display="none";
            NoteBox.style.display="block";
            taskInput.value = task; 
            editingTaskIndex = [...taskList.children].indexOf(li);
        });

        // Event listener for delete button
        deleteButton.addEventListener('click', function() {
            if (task) {
                li.remove();
                removeTaskFromLocalStorage(task);
            } 
        });

        li.appendChild(textarea);
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    }

    // Add event listener for button click
    addTaskButton.addEventListener('click', function() {
        const taskValue = taskInput.value.trim();
        if (taskValue !== '') {
            const newTask = { text: taskValue, isCompleted: false };
            addTaskToList(newTask);
            saveTaskToLocalStorage(newTask);
            taskInput.value = '';
        }
    });

    // Function to save tasks to local storage
    function saveTaskToLocalStorage(task) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to remove task from local storage
    function removeTaskFromLocalStorage(taskToRemove) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const updatedTasks = tasks.filter(task => task.text !== taskToRemove.text);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    // Function to update task in local storage
    function updateTaskInLocalStorage(oldTask, newTaskText) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const updatedTasks = tasks.map(task => (task.text === oldTask.text ? { ...task, text: newTaskText } : task));
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
