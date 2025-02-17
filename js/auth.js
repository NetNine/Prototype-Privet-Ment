// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } 
    from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

// Firebase configuration
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
const provider = new GoogleAuthProvider();

// Function to handle login with Google
function signInWithGoogle() {
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            localStorage.setItem('user', JSON.stringify({
                email: user.email, 
                userId: user.uid, 
                displayName: user.displayName
            }));
            window.location.href = 'content.html'; // Redirect to content page
        })
        .catch((error) => {
            console.error("Google Login error:", error.message);
            alert("Google login failed!");
        });
}

// Function to log in with email & password
function signInUser(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            localStorage.setItem('user', JSON.stringify({
                email: user.email, 
                userId: user.uid, 
                displayName: user.displayName
            }));
            window.location.href = 'content.html'; // Redirect to content page
        })
        .catch((error) => {
            console.error("Login error:", error.message);
            alert("Invalid Email or Password!");
        });
}

// Function to handle logout
function logoutUser() {
    signOut(auth)
        .then(() => {
            localStorage.removeItem('user');
            updateNavigation();
            window.location.href = 'login.html'; // Redirect to login page
        })
        .catch((error) => {
            console.error("Logout error:", error.message);
            alert("Logout failed!");
        });
}

// Function to check authentication state
onAuthStateChanged(auth, (user) => {
    if (user) {
        localStorage.setItem('user', JSON.stringify({
            email: user.email, 
            userId: user.uid, 
            displayName: user.displayName
        }));
    } else {
        localStorage.removeItem('user');
    }
    updateNavigation();
});

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("googleLoginBtn")?.addEventListener("click", signInWithGoogle);
    document.getElementById("loginForm")?.addEventListener("submit", (event) => {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        signInUser(email, password);
    });
    document.getElementById("logoutBtn")?.addEventListener("click", logoutUser);
});
