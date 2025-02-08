// Authentication state management
let currentAuthStep = 'password'; // 'password' or 'otp'
let currentEmail = ''; // Store email for OTP verification

// Hardcoded credentials (for demo purposes only)
const VALID_CREDENTIALS = {
    email: 'user930@gmail.com',
    password: 'GTM2024#User'
};

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
    return password && password.length >= 8;
}

// Handle form submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    submitButton.disabled = true;
    
    try {
        // Basic validation
        if (!email || !validateEmail(email)) {
            showError('Please enter a valid email address');
            return;
        }

        if (!password || !validatePassword(password)) {
            showError('Password must be at least 8 characters long');
            return;
        }

        // Simple credential check
        if (email === VALID_CREDENTIALS.email && password === VALID_CREDENTIALS.password) {
            // Create user session
            const user = { 
                email,
                name: 'User',
                loginTime: new Date().toISOString()
            };
            
            // Store in localStorage
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('isLoggedIn', 'true');
            
            // Redirect to content page
            window.location.href = 'content.html';
        } else {
            showError('Invalid email or password');
        }
    } catch (error) {
        showError('An error occurred during login');
        console.error('Login error:', error);
    } finally {
        submitButton.disabled = false;
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
