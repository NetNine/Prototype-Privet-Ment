// Authentication state management
let currentAuthStep = 'password'; // 'password' or 'otp'
let currentEmail = ''; // Store email for OTP verification

// Simple encryption (for demo purposes only)
function encrypt(text) {
    return btoa(text);
}

function decrypt(text) {
    return atob(text);
}

// Encrypted credentials (for demo purposes only)
const encryptedEmail = encrypt('user930@gmail.com');
const encryptedPassword = encrypt('GTM2024#User');

// DOM Elements
const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');
const submitButton = document.querySelector('button[type="submit"]');

// Show error message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 5000);
}

// Form validation
function validateEmail(email) {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(email);
}

function validatePassword(password) {
    return password && password.length > 8;
}

// Handle form submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(user => user.email === encrypt(email) && user.password === encrypt(password));

    if (user) {
        // Create user session
        const userSession = { 
            email: decrypt(user.email),
            name: 'User',
            loginTime: new Date().toISOString()
        };
        
        // Store in localStorage
        localStorage.setItem('user', JSON.stringify(userSession));
        localStorage.setItem('isLoggedIn', 'true');
        
        // Redirect to content page
        window.location.href = 'content.html';
    } else {
        showError("Invalid Credentials!");
    }
});

// Check if user is already logged in
function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn && window.location.pathname.endsWith('login.html')) {
        window.location.href = 'content.html';
    }
}

// Logout function
function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'login.html';
}

// Update navigation based on auth status
function updateNavigation() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const loginBtn = document.querySelector('.login-btn');
    
    if (loginBtn) {
        if (isLoggedIn) {
            loginBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i> Logout';
            loginBtn.href = 'javascript:void(0)';
            loginBtn.onclick = logout;
        } else {
            loginBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login';
            loginBtn.href = 'login.html';
            loginBtn.onclick = null;
        }
    }
}

// Initialize auth checks
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    updateNavigation();
});

// User management functions
function populateUserTable() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userTableBody = document.getElementById("user-table-body");

    userTableBody.innerHTML = "";

    users.forEach((user, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><input type="checkbox" data-index="${index}"></td>
            <td>${atob(user.email)}</td>
            <td>${user.name}</td>
            <td><button onclick="removeUser(${index})">Remove</button></td>
        `;
        userTableBody.appendChild(row);
    });
}

function removeUser(index) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(users));
    populateUserTable();
}

function removeSelectedUsers() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const checkboxes = document.querySelectorAll("#user-table-body input[type='checkbox']");

    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            const index = checkbox.getAttribute("data-index");
            users.splice(index, 1);
        }
    });

    localStorage.setItem("users", JSON.stringify(users));
    populateUserTable();
}

function addUser() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = {
        email: btoa(email),
        password: btoa(password),
        name: email.split('@')[0] // Example: use part of email as name
    };

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    populateUserTable();
    alert("User added successfully!");
}

function loginUser() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const encryptedEmail = btoa(email);
    const encryptedPassword = btoa(password);

    const user = users.find(u => u.email === encryptedEmail && u.password === encryptedPassword);

    if (user) {
        alert("Login successful!");
        // Redirect to appropriate page
    } else {
        alert("Invalid credentials!");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    populateUserTable();
    document.getElementById("remove-users").addEventListener("click", removeSelectedUsers);
});
