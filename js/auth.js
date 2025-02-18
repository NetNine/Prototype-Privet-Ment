// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, signInWithEmailAndPassword, onAuthStateChanged } 
    from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

// 🔹 Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBUUbgNtZEa-IwPgHEkG7sFebKpwoazfZ4",
    authDomain: "prototype-privet-ment-ac201.firebaseapp.com",
    projectId: "prototype-privet-ment-ac201",
    storageBucket: "prototype-privet-ment-ac201.firebasestorage.app",
    messagingSenderId: "723271453521",
    appId: "1:723271453521:web:aa8a05f0d9285189c1e170",
    measurementId: "G-VVWXRMZTFQ"
};

// 🔹 Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// ✅ **Function to Log In with Google**
function signInWithGoogle() {
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            console.log("Google User logged in:", user.email);

            // Store user data in localStorage
            localStorage.setItem('user', JSON.stringify({ 
                email: user.email, 
                displayName: user.displayName, 
                userId: user.uid 
            }));

            // Redirect to content page
            window.location.href = 'content.html';
        })
        .catch((error) => {
            console.error("Google Login error:", error.message);
            alert("Google login failed!");
        });
}

// ✅ **Function to Log In with Email & Password**
function signInUser(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("User logged in:", user.email);

            // Store user data in localStorage
            localStorage.setItem('user', JSON.stringify({ 
                email: user.email, 
                displayName: user.email.split('@')[0], // Use email prefix if no display name
                userId: user.uid 
            }));

            // Redirect to content page
            window.location.href = 'content.html';
        })
        .catch((error) => {
            console.error("Login error:", error.message);
            document.getElementById("errorMessage").textContent = "Invalid Email or Password!";
            document.getElementById("errorMessage").style.display = "block";
        });
}

// ✅ **Function to Log Out**
function logoutUser() {
    signOut(auth)
        .then(() => {
            console.log("User logged out");
            localStorage.removeItem('user'); // Clear user data

            // Redirect to login page
            window.location.href = 'login.html';
        })
        .catch((error) => {
            console.error("Logout error:", error.message);
            alert("Logout failed!");
        });
}

// ✅ **Update UI Based on Authentication State**
function updateAuthButton() {
    const user = JSON.parse(localStorage.getItem('user'));
    const authButton = document.querySelector('.auth-btn');

    if (!authButton) return;

    if (user) {
        authButton.innerHTML = '<i class="fas fa-sign-out-alt"></i> Logout';
        authButton.classList.add('logout-btn');
        authButton.classList.remove('login-btn');
        authButton.onclick = logoutUser;
    } else {
        authButton.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login';
        authButton.classList.add('login-btn');
        authButton.classList.remove('logout-btn');
        authButton.onclick = () => window.location.href = 'login.html';
    }
}

// ✅ **Restrict Access to `content.html`**
if (window.location.pathname.includes("content.html")) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        window.location.href = 'login.html'; // Redirect if not logged in
    }
}

// ✅ **Attach Event Listeners When DOM Loads**
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("googleLoginBtn")?.addEventListener("click", signInWithGoogle);
    document.getElementById("loginForm")?.addEventListener("submit", (event) => {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        signInUser(email, password);
    });

    updateAuthButton(); // Update Navigation
});
