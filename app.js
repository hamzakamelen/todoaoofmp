  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
  import { 
    getAuth,
    createUserWithEmailAndPassword,
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

var firstname = document.getElementById('firstname');
var lastname = document.getElementById('lastname');
var email = document.getElementById('email');
var password = document.getElementById('password');
window.signup=function(e){
e.preventDefault()
var obj = {
  displayName: firstname.value + lastname.value,
    // firstname: firstname.value,
    // lastname: lastname.value,
    email: email.value,
    password: password.value,
};
createUserWithEmailAndPassword(auth, obj.email, obj.password)
.then(function(success){
    console.log(success.user.uid)
    window.location.replace('login.html')
})
.catch(function(err){
  console.log(err)
})
};