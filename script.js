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

let buttonSave = document.querySelector('#save');
let buttonUpdate = document.querySelector('#update')
let taskInput = document.querySelector('#content-task');
let output = document.querySelector('.output ul');

buttonSave.addEventListener('click', () => {
    firebase.database().ref('tasks').push().set({
        task: taskInput.value,
        date: Date.now()
    })

})

function outputData(currentData, id) {
    let li = document.createElement('li');
    let p = document.createElement('p');
    p.innerHTML = currentData.task;
    p.style.display = 'inline'
    li.appendChild(p)
    output.appendChild(li)

    let btnUpdate = document.createElement('button');
    btnUpdate.innerHTML = 'Update';
    li.appendChild(btnUpdate);

    let btnDelete = document.createElement('button');
    btnDelete.innerHTML = 'Delete';
    li.appendChild(btnDelete);

    btnUpdate.addEventListener('click', (event) => {
        taskInput.value = currentData.task;
        taskInput.value = currentData.task;
        let activeLi = event.target.parentElement
        updateData(id, activeLi, currentData)
    })

    btnDelete.addEventListener('click', () => {
        firebase.database().ref('tasks').child(id).remove();
        li.parentNode.removeChild(li);
    })
}

function getData(callback) {
    firebase.database().ref('tasks').on('child_added', snap => {
        let val = snap.val();
        let key = snap.key;
        callback(val, key)
    })
}

getData(outputData);

function updateData(id, li) {
    buttonUpdate.addEventListener('click', () => {
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