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
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    submitButton.disabled = true;
    
    try {
        // Validate inputs
        if (!email) {
            showError('Please enter your email address');
            return;
        }

        if (!validateEmail(email)) {
            showError('Please enter a valid email address');
            return;
        }

        if (!password) {
            showError('Please enter your password');
            return;
        }

        if (!validatePassword(password)) {
            showError('Password must be at least 8 characters long');
            return;
        }

        // Check credentials
        if (email === VALID_CREDENTIALS.email && password === VALID_CREDENTIALS.password) {
            // Store auth data
            const user = { email, name: 'User' };
            const token = btoa(JSON.stringify({ email, timestamp: Date.now() })); // Simple token for demo
            
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            
            // Redirect to content page
            window.location.href = 'content.html';
        } else {
            throw new Error('Invalid email or password');
        }
    } catch (error) {
        showError(error.message || 'An error occurred during login');
    } finally {
        submitButton.disabled = false;
    }
});

// Check if user is already logged in
function checkAuth() {
    const token = localStorage.getItem('token');
    if (token && window.location.pathname.endsWith('login.html')) {
        window.location.href = 'content.html';
    }
}

// Logout function
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}

// Update navigation based on auth status
function updateNavigation() {
    const token = localStorage.getItem('token');
    const loginBtn = document.querySelector('.login-btn');
    if (loginBtn) {
        if (token) {
            loginBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i> Logout';
            loginBtn.href = 'javascript:void(0)';
            loginBtn.onclick = logout;
        } else {
            loginBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login';
        }
    }
}

// Initialize auth checks
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    updateNavigation();
});
