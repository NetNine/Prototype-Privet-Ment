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
        try {
            const email = atob(user.email);
            const row = document.createElement("tr");
            row.innerHTML = `
                <td><input type="checkbox" data-index="${index}"></td>
                <td>${email}</td>
                <td>${user.name}</td>
                <td><button onclick="removeUser(${index})">Remove</button></td>
            `;
            userTableBody.appendChild(row);
        } catch (error) {
            console.error("Error decoding email: ", error);
        }
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

    if (!email || !password) {
        alert("Email and password are required!");
        return;
    }

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

function addUserDataManually() {
    const users = [
        { name: 'Dewmith', email: 'dewmrd930@gmail.com' },
        { name: 'Deepal Weerasuriya', email: 'deepal.suranga29@gmail.com' },
        { name: 'Tharusha Dilmin', email: 'dilmin23456@gmail.com' },
        { name: 'Yusuf Hakeem', email: 'yusufhakeem503@gmail.com' },
        { name: 'Lalanka Vishmika', email: 'mczayne123@gmail.com' },
        { name: 'Sujani Nisansala', email: 'sujaninisansala01@gmail.com' },
        { name: 'Methsitha Ratnayake', email: 'flexytraders.crypto@gmail.com' },
        { name: 'Viduranga Tharaka', email: 'vidurangatharakafx@gmail.com' },
        { name: 'Tharusha Sachin', email: 'tharushajayathissa924@gmail.com' },
        { name: 'Roshan Kulathunga', email: 'roshankulathunga34@gmail.com' },
        { name: 'Nalin Chandika', email: 'nalinsilva73@gmail.com' },
        { name: 'M I Hashim', email: 'mohashmaark16@gmail.com' },
        { name: 'Yohan Madushanka', email: 'kmym95m@gmail.com' },
        { name: 'Nadeesha Yasasmi', email: 'kavideshan2001@gmail.com' },
        { name: 'IFLAAL', email: 'mhdiflaal2005@gmail.com' },
        { name: 'W. Prasad Fernando', email: 'Airdog.omega@gmail.com' },
        { name: 'Pasindu Ashan', email: 'pasinduashan15@gmail.com' },
        { name: 'Hasitha Madushan', email: 'hasitha1234nokzcrew@gmail.com' },
        { name: 'Himansa', email: 'himansaviboda849@gmail.com' },
        { name: 'Nadeeshan Ranathunga', email: 'nadeeshanranathunga@gmail.com' },
        { name: 'Dinesh Punchihewa', email: 'ppriyankara446@gmail.com' },
        { name: 'Sampath Wickramarathna', email: 'sampathwick1988@gmail.com' },
        { name: 'Sahan Vimantha Fernando', email: 'Sahanvf943@gmail.com' },
        { name: 'Vihanga Ravihara Senevirathna Delvita Bandara', email: 'vihangasenevirathnaop@gmail.com' },
        { name: 'Yehan Nethkalum', email: 'yehanevos@gmail.com' },
        { name: 'Dinuka Bandara', email: 'dinukadwc@gmail.com' },
        { name: 'Gangasara Pahansith', email: 'gangasarapahansith@gmail.com' },
        { name: 'Ishan', email: 'ishanmalindhaims@gmail.com' },
        { name: 'Prasad', email: 'prasadweerasinghe607@gmail.com' },
        { name: 'Pahansith Herath', email: 'pahansithherath@gmail.com' }
    ];

    const commonPassword = btoa('oUiTjyjE#GB#ment');

    const storedUsers = users.map(user => ({
        email: btoa(user.email),
        password: commonPassword,
        name: user.name
    }));

    localStorage.setItem("users", JSON.stringify(storedUsers));
    populateUserTable();
}

function loadUserData() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    console.log('User data loaded:', users);
    populateUserTable();
}

document.addEventListener("DOMContentLoaded", () => {
    loadUserData();
    document.getElementById("remove-users").addEventListener("click", removeSelectedUsers);
});

document.addEventListener('storage', (event) => {
    if (event.key === 'users') {
        loadUserData();
    }
});
