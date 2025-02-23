import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider, 
    signInWithEmailAndPassword, 
    signOut 
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

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
const googleProvider = new GoogleAuthProvider();

// Google Sign In
export async function signInWithGoogle() {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        localStorage.setItem('user', JSON.stringify({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName
        }));
        window.location.href = 'content.html';
    } catch (error) {
        showError('Google sign-in failed: ' + error.message);
    }
}

// Email Sign In
export async function signInWithEmail(email, password) {
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        const user = result.user;
        localStorage.setItem('user', JSON.stringify({
            uid: user.uid,
            email: user.email,
            displayName: user.email.split('@')[0]
        }));
        window.location.href = 'content.html';
    } catch (error) {
        showError('Email sign-in failed: ' + error.message);
    }
}

// Sign Out
export async function signOutUser() {
    try {
        await signOut(auth);
        localStorage.removeItem('user');
        window.location.href = 'login.html';
    } catch (error) {
        showError('Sign-out failed: ' + error.message);
    }
}

// Auth Check
export function isAuthenticated() {
    const user = localStorage.getItem('user');
    return user !== null;
}

// Error Display
function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        setTimeout(() => errorDiv.style.display = 'none', 5000);
    }
}

// Export auth instance
export { auth };

// Check if user is logged in
onAuthStateChanged(auth, (user) => {
    if (user) {
        localStorage.setItem('user', JSON.stringify({ displayName: user.displayName, email: user.email }));
        updateNavigation(); // Update UI
    } else {
        localStorage.removeItem('user');
        updateNavigation();
    }
});

// Attach Event Listeners for Login & Logout
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("googleLoginBtn")?.addEventListener("click", signInWithGoogle);
    document.getElementById("loginForm")?.addEventListener("submit", (event) => {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        signInWithEmail(email, password);
    });
    document.getElementById("logoutBtn")?.addEventListener("click", signOutUser);
});

function login(username, password) {
    // Simple login for demo - replace with your actual login logic
    if (username === "admin" && password === "password") {
        localStorage.setItem('user', username);
        return true;
    }
    return false;
}

function logout() {
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}

// Check authentication on page load
function checkAuth() {
    if (!isAuthenticated()) {
        window.location.replace('login.html');
        return false;
    }
    return true;
}
