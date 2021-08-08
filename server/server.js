const { response } = require('express');
const express = require('express');
const app = express();
var firebase = require('firebase/app');
require('firebase/database');
require('firebase/auth')
var cors = require("cors");
var multer  = require('multer')
var upload = multer()

app.use(cors());


var firebaseConfig = {
    apiKey: "AIzaSyAvEtF-QiXGqJQ3JHxFAgGQCLiQ5IeTDNM",
    authDomain: "expenses-tracker-354c1.firebaseapp.com",
    databaseURL: "https://expenses-tracker-354c1-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "expenses-tracker-354c1",
    storageBucket: "expenses-tracker-354c1.appspot.com",
    messagingSenderId: "45006211683",
    appId: "1:45006211683:web:116b1dee03b3e285e1c656",
    measurementId: "G-FD1WZNNB85"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

var dbRef = firebase.database().ref();

function getUserData(uid, source){
  return new Promise((resolve, reject)=>{
    dbRef.child("users").child(uid).get().then(function(snapshot) {
    if (snapshot.exists()) {
      let userData = snapshot.val();
      userData['uid'] = uid;
      resolve(userData);
    } 
    else {
      console.log("No data available");
      reject();
    }
  }).catch((error) => {
    console.error(error);
  })
})
}

app.get('/', (request, response)=>{
    dbRef.child('user_expenses').get().then((snapshot)=>{
        if(snapshot.val()){
            response.send(snapshot.val());
        }
        else{
            response.send("No data found");
        }
    })
})

app.post('/sign-up', upload.none(), (req, resp)=>{
    firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password)
    .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    resp.send("user created");
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
    if(errorCode=="auth/email-already-in-use"){
      resp.sendStatus(500).send("This email is already in use. Please log in or use another email");
    }
    else if(errorCode=="auth/invalid-email"){
      resp.sendStatus(500).send("Please enter a valid email");
    }
    else if(errorCode=="auth/operation-not-allowed"){
      resp.sendStatus(500).send("Something is wrong with the server. Please try again later.");
    }
    else if(errorCode=="auth/weak-password"){
      resp.sendStatus(500).send("Password is too weak. Please try again with a stronger password.");
    }
  });
})

app.post('/sign-in', upload.none(), (req, resp)=>{
  firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    getUserData(user.uid, "login").then((userData)=>{
      console.log('we got some data');
      console.log(userData);
      resp.send(userData);
    }).catch((error)=>{
      console.log(error);
    })
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
    
    if(errorCode=="auth/invalid-email"){
      resp.sendStatus(500).send("Email address is not valid");
    }
    else if(errorCode=="auth/user-disabled"){
      resp.sendStatus(500).send("User corresponding to this email has been disabled.");
    }
    else if(errorCode=="auth/user-not-found"){
      resp.sendStatus(500).send("No such account found");
    }
    else if(errorCode=="auth/wrong-password"){
      resp.sendStatus(500).send("Invalid password");
    }
    else{
      resp.sendStatus(500).send(errorMessage);
    }
    
  });
}) 

function checkCurrentUserStatus(){
  return new Promise((resolve, reject)=>{
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        getUserData(user.uid, "status").then((userData)=>{
          resolve(userData);
        })
      } else {
        resolve(false);
      }
    });
  })
  
}


app.get('/sign-in-status', (req, resp)=>{
  console.log("status was asked for");
  checkCurrentUserStatus().then(userData =>{
    console.log(userData);
    resp.send(userData);
  })
  
})

app.post('/log-out', (req, resp)=>{
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
    resp.sendStatus(200);
    console.log("Successfully signed out");
  }).catch((error) => {
    resp.sendStatus(500);
    console.log(error);
  });
})

app.listen(8080);
console.log("Server now running")