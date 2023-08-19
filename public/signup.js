const firebaseConfig = {
    apiKey: "AIzaSyAzpav9KsTQ9_nr6gi4mInTp7JrsGHLHpA",
    authDomain: "quiz-app-65c3e.firebaseapp.com",
    projectId: "quiz-app-65c3e",
    storageBucket: "quiz-app-65c3e.appspot.com",
    messagingSenderId: "546653806160",
    appId: "1:546653806160:web:4590ef27bf891bf505bb55",
    measurementId: "G-HL5GZ85GPD"
  };
// initialize firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

// show Password
function showPassword(event) {
    event.target.className = "eye bi bi-eye";
    event.target.previousElementSibling.type = "text";
    event.target.removeEventListener('click', showPassword);
    event.target.addEventListener('click', hidePassword);
}

// hide password
function hidePassword(event) {
    event.target.className = "eye bi bi-eye-slash";
    event.target.previousElementSibling.type = "password";
    event.target.removeEventListener('click', hidePassword);
    event.target.addEventListener('click', showPassword);
}


function signup(event) {
    event.preventDefault();
    let firstName = document.getElementById("first-name").value;
    let lastName = document.getElementById("last-name").value;
    let email = document.getElementById("email-signup").value;
    let password = document.getElementById("password-signup").value;
    let confirmPassword = document.getElementById("password-signup-repeat").value;
    let message = document.querySelector(".validationMessage");

    if (!email.endsWith("@gmail.com")) {
        message.innerText = `Invalid email address`;
        message.style.display = "block";
        message.style.color = "#e55865";
        return;
    }

    function validatePassword(password) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return regex.test(password);
      }

    if(!validatePassword(password)){
        message.innerText = `Password Must Contain Small And Capital Aplhabets`;
        message.style.display = "block";
        message.style.color = "#e55865";
        return
    }

    if (
        firstName.trim() === '' ||
        lastName.trim() === '' ||
        email.trim() === '' ||
        password.trim() === '' ||
        confirmPassword.trim() === ''
    ) {
        message.innerText = `Please fill required fields`;
        message.style.display = "block";
        message.style.color = "#e55865";
        return;
    }

    if (password !== confirmPassword) {
        message.innerText = `Password doesn't match`;
        message.style.display = "block";
        message.style.color = "#e55865";
        return;
    }

    // firebase

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // After successful registration, set the photoURL
        const user = userCredential.user;
        user.updateProfile({
            photoURL: user.photoURL,
        }).then(() => {
            // Now the photoURL is set for the user
            window.location.href = "./index.html";
        }).catch((error) => {
            console.log("Error setting profile picture:", error);
        });
    })
    .catch((error) => {
        console.log("Error creating user:", error);
    });

    
    // Reset the input fields after successful signup
    document.getElementById("first-name").value = "";
    document.getElementById("last-name").value = "";
    document.getElementById("email-signup").value = "";
    document.getElementById("password-signup").value = "";
    document.getElementById("password-signup-repeat").value = "";
}

db.collection(`${email}`).doc("profile")
        .set({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
        })
        .then((docRef) => {
            //console.log("Document written with ID:", docRef.id);
        })
        .catch((error) => {
            //console.error("Error adding document:", error);
        });