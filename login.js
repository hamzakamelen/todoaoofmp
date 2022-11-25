 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
 import { 
   getAuth,
   signInWithEmailAndPassword,
 } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
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
  
  const auth = getAuth()

var email = document.getElementById('email')
var password = document.getElementById('password')
var model ={}
window.login = function (e){
    e.preventDefault();
    model.email = email.value
    model.password = password.value
    console.log(model)
    signInWithEmailAndPassword(auth, model.email, model.password)
    .then(function(success){
        console.log(success.user.uid)
        window.location.replace('home.html')
    })
    .catch(function(err){
        console.log(err)
    })
};