// Import Firebase authentication modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js";
import { getAuth, signInWithEmailAndPassword, signOut } 
    from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth-compat.js";

// Firebase configuration (Replace with your Firebase config)
const firebaseConfig = {
    apiKey: "AIzaSyBUUbgNtZEa-IwPgHEkG7sFebKpwoazfZ4",
    authDomain: "prototype-privet-ment-ac201.firebaseapp.com",
    projectId: "prototype-privet-ment-ac201",
    storageBucket: "prototype-privet-ment-ac201.firebasestorage.app",
    messagingSenderId: "723271453521",
    appId: "1:723271453521:web:aa8a05f0d9285189c1e170",
    measurementId: "G-VVWXRMZTFQ"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Function to log in user
function signInUser(email, password) {
    const errorMessage = document.getElementById("errorMessage");

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("User logged in:", user.email);

            // Store session in localStorage
            localStorage.setItem('user', JSON.stringify({ email: user.email, userId: user.uid }));
            localStorage.setItem('isLoggedIn', 'true');

            // Redirect to content page
            window.location.href = 'content.html';
        })
        .catch((error) => {
            console.error("Login error:", error.code, error.message);
            errorMessage.textContent = "Invalid Email or Password. Try again.";
            errorMessage.style.display = 'block';
        });
}

// Add event listener for login
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            signInUser(email, password);
        });
    }
});
