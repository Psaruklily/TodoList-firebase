var firebaseConfig = {
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

let buttonSave = document.querySelector('#insert');
let taskInput = document.querySelector('#namebox');
let output = document.querySelector('.output ul');

let ref = firebase.database().ref('tasks');

buttonSave.addEventListener('click', function() {
    let newRef = ref.push();
    newRef.set(taskInput.value);
})

function outputData(text) {
    let li = document.createElement('li');
    li.innerHTML = text;
    output.appendChild(li)
}

ref.on('child_added', function(snapOfNewChild) {
    let val = snapOfNewChild.val()
    console.log(val)
    outputData(val);
})