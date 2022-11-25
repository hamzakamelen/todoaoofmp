// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
import {
  getAuth,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
  push,
  remove,
  onChildAdded,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQIt5fnShKXu3rzAwgBcExnBOwXMac4wc",
  authDomain: "todo16-bdfd6.firebaseapp.com",
  projectId: "todo16-bdfd6",
  storageBucket: "todo16-bdfd6.appspot.com",
  messagingSenderId: "942432581071",
  appId: "1:942432581071:web:37588db3a1bb582a144eba",
  measurementId: "G-3CPV8V44YG"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase();
const auth = getAuth()
window.logout = function () {
  signOut(auth)
    .then(function () {
      console.log("Logout Successfully")
      window.location.href = "login.html"
    })
}
var Inptask = document.getElementById('Inptask');
var listUL = document.getElementById('listUL');
var arr = []
window.addTask = function (e) {
  e.preventDefault()
  var obj = {
    task: Inptask.value,
    date: JSON.stringify(`${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`),
    time: JSON.stringify(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`),
  };
  if (Inptask.value == "") {
    alert("Please Fill The Task")
    return
  };
  const addID = ref(database, `TodoTask/`);
  // Push humain new id generate kr k dega
  obj.id = push(addID).key;
  console.log(obj.id)
  // Ye humain data base m add krdega
  const taskReference = ref(database, `TodoTask/${obj.id}/`);
  set(taskReference, obj)
  arr.push(obj);
  Inptask.value = ""
  listUl()
  // console.log(arr)
}

window.listUl=function() {
  listUL.innerHTML = ""
  for (var i = 0; i < arr.length; i++) {
    listUL.innerHTML +=
      `<li class = taskADD>${arr[i].task} 
      <span class="datetimeadd">Date: ${arr[i].date}</span>
      <span class="datetimeadd">Time: ${arr[i].time}</span>
      <button onclick ="deleteId('${arr[i].id}')" class="iconbtn">Delete</button>
      </li> <br/>`
  }
};
// DATA GET KRNY KA TAREEQa
window.getData = function () {
  // ye wahan se data lekr humain dega
  const taskReference = ref(database, `TodoTask/`)
  // jb jb child add hoga call hojaega
  onChildAdded(taskReference, function (data) {
    arr.push(data.val());
    console.log(arr);
    listUl()
  })
}
window.checkAuthentication=function() {
  onAuthStateChanged(auth, function (user) {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      // ...
    } else {
      // User is signed out
      // ...
      window.location.href = "login.html"
    }
  });
}
checkAuthentication()

window.deleteId= function(id){
  const taskRef = ref(database,`TodoTask/${id}`);
  remove(taskRef)
  .then(function (){
    // getData();
  })
  .catch(function (err){
    console.log(err)
  });
};