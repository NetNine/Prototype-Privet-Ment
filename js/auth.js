// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, signOut, onAuthStateChanged } 
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// ✅ Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBUUbgNtZEa-IwPgHEkG7sFebKpwoazfZ4",
    authDomain: "prototype-privet-ment-ac201.firebaseapp.com",
    projectId: "prototype-privet-ment-ac201",
    storageBucket: "prototype-privet-ment-ac201.firebasestorage.app",
    messagingSenderId: "723271453521",
    appId: "1:723271453521:web:aa8a05f0d9285189c1e170",
    measurementId: "G-VVWXRMZTFQ"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// ✅ Function to log in with Google
function signInWithGoogle() {
    signInWithPopup(auth, provider)
        .then((result) => {
            if (result.user) {
                const user = result.user;
                localStorage.setItem('user', JSON.stringify({ displayName: user.displayName, email: user.email }));
                console.log("Google Login Successful:", user.email);
                window.location.href = 'content.html'; // Redirect to content page after login
            } else {
                console.error("No user data returned from Google.");
                alert("Google login failed!");
            }
        })
        .catch((error) => {
            console.error("Google Login error:", error.message);
            alert("Google login failed!");
        });
}

// ✅ Function to log in with Email & Password
function signInUser(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            if (userCredential.user) {
                const user = userCredential.user;
                localStorage.setItem('user', JSON.stringify({ displayName: user.displayName, email: user.email }));
                console.log("Email Login Successful:", user.email);
                window.location.href = 'content.html'; // Redirect to content page
            } else {
                console.error("No user data returned from email login.");
                alert("Login failed!");
            }
        })
        .catch((error) => {
            console.error("Login error:", error.message);
            alert("Invalid Email or Password!");
        });
}

// ✅ Function to log out and redirect to login page
function logoutUser() {
    signOut(auth)
        .then(() => {
            console.log("User Logged Out");
            localStorage.removeItem('user'); // Remove user session
            window.location.href = 'login.html'; // Redirect to login page after logout
        })
        .catch((error) => {
            console.error("Logout error:", error.message);
            alert("Logout failed!");
        });
}

// ✅ Check if user is logged in
onAuthStateChanged(auth, (user) => {
    if (user) {
        localStorage.setItem('user', JSON.stringify({ displayName: user.displayName, email: user.email }));
        updateNavigation(); // Update UI
    } else {
        localStorage.removeItem('user');
        updateNavigation();
    }
});

// ✅ Attach Event Listeners for Login & Logout
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("googleLoginBtn")?.addEventListener("click", signInWithGoogle);
    document.getElementById("loginForm")?.addEventListener("submit", signInUser);
    document.getElementById("logoutBtn")?.addEventListener("click", logoutUser);
});

function checkAuth() {
    const user = localStorage.getItem('user');
    if (!user) {
        window.location.replace('login.html');
        return false;
    }
    return true;
}

function login(username, password) {
    // Simple authentication - replace with your actual auth logic
    if (username === 'admin' && password === 'password') {
        localStorage.setItem('user', username);
        window.location.replace('content.html');
        return true;
    }
    return false;
}

function logout() {
    localStorage.removeItem('user');
    window.location.replace('login.html');
}

function isAuthenticated() {
    return localStorage.getItem('user') !== null;
}

// Export functions
window.checkAuth = checkAuth;
window.login = login;
window.logout = logout;
window.isAuthenticated = isAuthenticated;

// Prevent direct URL access
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
});
