// Import Firebase modules (Latest Version for Static Hosting)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithRedirect, getRedirectResult, GoogleAuthProvider, signOut, onAuthStateChanged } 
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// ✅ Firebase Configuration
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

// ✅ Function to Log in with Google (For GitHub Pages)
function signInWithGoogle() {
    signInWithRedirect(auth, provider); // 🔄 Redirect instead of Popup
}

// ✅ Handle Redirect After Google Login (For GitHub Pages)
getRedirectResult(auth)
    .then((result) => {
        if (result.user) {
            const user = result.user;
            localStorage.setItem('user', JSON.stringify({ displayName: user.displayName, email: user.email }));
            window.location.href = 'content.html'; // Redirect to content page
        }
    })
    .catch((error) => {
        console.error("Google Login error:", error.message);
        alert("Google login failed!");
    });

// ✅ Function to Log out and Redirect to Login Page
function logoutUser() {
    signOut(auth)
        .then(() => {
            localStorage.removeItem('user'); // Remove user session
            window.location.href = 'login.html'; // Redirect to login page
        })
        .catch((error) => {
            console.error("Logout error:", error.message);
            alert("Logout failed!");
        });
}

// ✅ Check if User is Logged In
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
    document.getElementById("logoutBtn")?.addEventListener("click", logoutUser);
});
