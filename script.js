let firebaseConfig = {
    apiKey: "AIzaSyDx7UoyrQ_-dGqTUKJj3-7zKlR2hzXFL-w",
    authDomain: "todolist-94d94.firebaseapp.com",
    projectId: "todolist-94d94",
    storageBucket: "todolist-94d94.appspot.com",
    messagingSenderId: "439299067989",
    appId: "1:439299067989:web:e91079a185dc009f3dc4dc",
    measurementId: "G-FJG5MVGRHR"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();

const messageForm = document.querySelector('form');
let buttonSave = document.querySelector('.save-btn');
let buttonUpdate = document.querySelector('.update-btn')
let buttonCleanUp = document.querySelector('.сlean-up');
let taskInput = document.querySelector('[name = "message"]');
let output = document.querySelector('.list ul');

//Отримую дані з database
function getData(callback) {
    firebase.database().ref('tasks').on('child_added', snap => {
        let val = snap.val();
        let key = snap.key;
        callback(val, key)
    })
}
getData(outputData);

//Побудова конкретної таски
function outputData(currentData, id) {
    let li = document.createElement('li');
    let mainDiv = document.createElement('div');
    let task = document.createElement('div');
    let divForButn = document.createElement('div');
    let p = document.createElement('p');
    p.textContent = currentData.task;
    p.classList.add('task-text');
    mainDiv.classList.add('main-div-li');

    let checkbox = document.createElement('input')
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox')
    checkbox.onclick = function() {
        if (checkbox.checked == true) {
            p.style.textDecoration = 'line-through'
        } else {
            p.style.textDecoration = 'none'
        }
    }

    task.classList.add('task');
    task.appendChild(checkbox);
    task.appendChild(p);
    mainDiv.appendChild(task);

    let update = document.createElement('button');
    update.innerHTML = '<i class="fas fa-pencil-alt"></i>';
    update.style.color = '#fff';
    update.classList.add('update-small');

    let cancel = document.createElement('button');
    cancel.innerHTML = '<i class="fas fa-trash-alt"></i>';
    cancel.style.color = '#fff';
    cancel.classList.add('delete-small');

    divForButn.appendChild(update)
    divForButn.appendChild(cancel)

    mainDiv.appendChild(divForButn)

    li.appendChild(mainDiv)
    output.appendChild(li);
    let hr = document.createElement('hr')
    li.appendChild(hr);

    update.addEventListener('click', () => {
        buttonSave.classList.add('display-none');
        buttonUpdate.classList.remove('display-none');
        taskInput.value = currentData.task;
        updateData(id, li);
    })


    cancel.addEventListener('click', () => {
        firebase.database().ref('tasks').child(id).remove();
        li.parentNode.removeChild(li);
    })
}


messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    firebase.database().ref('tasks').push().set({
        task: taskInput.value,
        date: Date.now()
    })
    taskInput.value = '';
})


// MY --------------------------------------------------------------------------------------------------------
buttonSave.addEventListener('click', () => {
    firebase.database().ref('tasks').push().set({
        task: taskInput.value,
        date: Date.now()
    })
    taskInput.value = '';
})


function updateData(id, li) {
    buttonUpdate.addEventListener('click', () => {
        buttonUpdate.classList.add('display-none');
        buttonSave.classList.remove('display-none')
        firebase.database().ref('tasks').child(id).update({
            task: taskInput.value,
            date: Date.now(),
        });
        taskInput.value = null;
        id = null;
    })
    firebase.database().ref('tasks').on('child_changed', data => {
        let value = data.val()
        let contentOfNewTask = li.querySelector('p');
        contentOfNewTask.innerHTML = value.task
        firebase.database().ref('tasks').off('child_changed')
    })
}

// MY END--------------------------------------------------------------------------------------------------