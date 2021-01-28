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

//ready data---------------------------------------------------------------

// let insertBtn = document.querySelector('#insert');
// let nameUser, roll, sec, gen

// function Ready() {
//     nameUser = document.querySelector('#namebox').value;
//     roll = document.querySelector('#rollbox').value;
//     sec = document.querySelector('#secbox').value;
//     gen = document.querySelector('#genbox').value;
// }

//Old version
// insertBtn.onclick = function() {
//     Ready();
//     let ref = firebase.database().ref('student/' + roll);
//     ref.set({
//             NameOfStudent: nameUser,
//             RollNo: roll,
//             Section: sec,
//             Gender: gen
//         })
// }


//===================================  new version
// insertBtn.onclick = function() {
//     Ready();
//     let ref = firebase.database().ref('student');
//     ref.push({
//         NameOfStudent: nameUser,
//         RollNo: roll,
//         Section: sec,
//         Gender: gen
//     })
// }

//=========================================================================================================================


let buttonSave = document.querySelector('#insert');
let taskInput = document.querySelector('#namebox');
let output = document.querySelector('.output');

let ref = firebase.database().ref('tasks');

buttonSave.addEventListener('click', function() {

    let newRef = ref.push(taskInput.value)
        // newRef.then(function(snap) {
        //     const key = snap.key;
        //     console.log(key)
        // })
})

ref.on('value', function(snapshot) {
    let data = snapshot.val();
    console.log(data)
    for (let key in data) {
        output.innerHTML += data[key] + '<br>'
    }
})