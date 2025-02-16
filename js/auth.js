// Import Firebase authentication module
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth-compat.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQKqhvjYopzGCcsCXQfdQqabjFGThnaCg",
  authDomain: "prototype-privet-ment.firebaseapp.com",
  projectId: "prototype-privet-ment",
  storageBucket: "prototype-privet-ment.firebasestorage.app",
  messagingSenderId: "484800808348",
  appId: "1:484800808348:web:112dcca093ea1dde5e7459",
  measurementId: "G-RMX9E72SQX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Firebase sign-in
function signInUser(email, password) {
    const errorMessage = document.getElementById("errorMessage"); // Get the error message element

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("User logged in:", user);

        // Write user data to the Realtime Database
        set(ref(db, 'users/' + user.uid), {
            email: user.email,
            userId: user.uid
        }).then(() => {
            console.log('User data saved to database.');
        }).catch((error) => {
            console.error('Error saving user data to database:', error);
        });
         const userSession = { email: email, name: 'User', loginTime: new Date().toISOString()};

        // Redirect to content page
        window.location.href = 'content.html';
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessageText = error.message;
        console.error("Login error:", errorCode, errorMessageText);
        errorMessage.textContent = 'Invalid Credentials!' ;
        errorMessage.style.display = 'block';

    });
}

// Logout function
function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'login.html';
}



