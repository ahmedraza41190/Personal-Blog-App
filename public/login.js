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

// logout automatically
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        window.location.href = "./all.html";
    }
});

// show Password
function showPassword(event) {
    event.target.className = "eye bi bi-eye-slash";
    event.target.previousElementSibling.type = "text";
    event.target.removeEventListener('click', showPassword);
    event.target.addEventListener('click', hidePassword);
}

// hide password
function hidePassword(event) {
    event.target.className = "eye bi bi-eye";
    event.target.previousElementSibling.type = "password";
    event.target.removeEventListener('click', hidePassword);
    event.target.addEventListener('click', showPassword);
}

function login(event) {
    event.preventDefault()
    let email = document.getElementById("email-login").value
    let password = document.getElementById("password-login").value
    let message = document.querySelector(".validationMessage");

    if (!(email.endsWith("@gmail.com"))) {
        message.innerText = `Invalid email address`;
        message.style.display = "block";
        message.style.color = "#e55865";
        return;
    }

    if (
        email.trim() === '' ||
        password.trim() === ''
        // || password.length > 8 || password.length < 4
    ) {
        message.innerText = `Please fill required fields`;
        message.style.display = "block";
        message.style.color = "#e55865";
        return;
    }

    // firebase

    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // console.log("Login successful");
            Swal.fire({
                icon: 'success',
                title: 'Logged In',
                text: 'Login Successfull',
                confirmButtonColor: "#0079ff"
            })
            window.location.href = "./index.html";
        })
        .catch((error) => {
            console.log("Login error:", error);
            Swal.fire({
                    icon: 'error',
                    title: 'Access Denied',
                    text: 'Invalid email or password. Please enter correct credentials',
                    confirmButtonColor: "#0079ff"
                })
                // alert("Invalid email or password. Please enter correct credentials.");
        });

    document.getElementById("email-login").value
    document.getElementById("password-login").value
}