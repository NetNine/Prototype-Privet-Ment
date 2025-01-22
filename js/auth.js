// Authentication state management
let currentAuthStep = 'password'; // 'password' or 'otp'
let currentEmail = ''; // Store email for OTP verification

// API Configuration
const API_URL = 'https://paint-strengthened-coneflower.glitch.me';

// Common fetch options
const fetchOptions = {
    mode: 'cors',
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
};

// DOM Elements
const loginForm = document.getElementById('loginForm');
const passwordSection = document.getElementById('passwordSection');
const otpSection = document.getElementById('otpSection');
const errorMessage = document.getElementById('errorMessage');
const submitButton = document.querySelector('button[type="submit"]');
const resendOtpButton = document.getElementById('resendOtp');

// Show error message
function showError(message) {
    console.log('Showing error:', message);
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 5000);
}

// Show OTP section
function showOtpSection() {
    passwordSection.style.display = 'none';
    otpSection.style.display = 'block';
    submitButton.textContent = 'Verify Code';
}

// Show password section
function showPasswordSection() {
    passwordSection.style.display = 'block';
    otpSection.style.display = 'none';
    submitButton.textContent = 'Login';
}

// Form validation
function validateEmail(email) {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(email);
}

function validatePassword(password) {
    return password && password.length >= 8;
}

function validateOTP(otp) {
    return /^\d{6}$/.test(otp);
}

// Handle form submission
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const otp = document.getElementById('otp')?.value;

    submitButton.disabled = true;
    
    try {
        if (otpSection.style.display === 'none') {
            // First step: Password verification
            console.log('Verifying password...');
            if (!email) {
                showError('Please enter your email address');
                submitButton.disabled = false;
                return;
            }

            if (!validateEmail(email)) {
                showError('Please enter a valid email address');
                submitButton.disabled = false;
                return;
            }

            if (!password) {
                showError('Please enter your password');
                submitButton.disabled = false;
                return;
            }

            if (!validatePassword(password)) {
                showError('Password must be at least 8 characters long');
                submitButton.disabled = false;
                return;
            }

            const response = await fetch(`${API_URL}/api/verify-password`, {
                ...fetchOptions,
                method: 'POST',
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Failed to verify password');
            }

            console.log('Password verified, OTP sent');
            currentEmail = email;
            showOtpSection();
            showError('Verification code sent to admin email');
        } else {
            // Second step: OTP verification
            console.log('Verifying OTP...');
            if (!otp) {
                showError('Please enter the verification code');
                submitButton.disabled = false;
                return;
            }

            if (!validateOTP(otp)) {
                showError('Please enter a valid 6-digit verification code');
                submitButton.disabled = false;
                return;
            }

            const response = await fetch(`${API_URL}/api/verify-otp`, {
                ...fetchOptions,
                method: 'POST',
                body: JSON.stringify({ email: currentEmail, otp })
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Failed to verify OTP');
            }

            console.log('Login successful');
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            window.location.href = 'content.html';
        }
    } catch (error) {
        console.error('Login error:', error);
        showError(error.message || 'An error occurred during login');
        if (error.message.includes('verification code')) {
            showOtpSection();
        }
    } finally {
        submitButton.disabled = false;
    }
});

// Handle resend OTP
resendOtpButton.addEventListener('click', async () => {
    if (!currentEmail) {
        showError('Please enter your email first');
        showPasswordSection();
        return;
    }

    resendOtpButton.disabled = true;
    
    try {
        console.log('Resending OTP...');
        const response = await fetch(`${API_URL}/api/resend-otp`, {
            ...fetchOptions,
            method: 'POST',
            body: JSON.stringify({ email: currentEmail })
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Failed to resend verification code');
        }

        showError('New verification code sent');
    } catch (error) {
        console.error('Resend OTP error:', error);
        showError(error.message || 'Failed to resend verification code');
    } finally {
        resendOtpButton.disabled = false;
        setTimeout(() => {
            resendOtpButton.disabled = false;
        }, 60000); // Enable after 1 minute
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
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    const loginBtn = document.querySelector('.login-btn');
    
    if (user?.name && token && loginBtn) {
        loginBtn.innerHTML = `<i class="fas fa-sign-out-alt"></i> Logout (${user.name})`;
        loginBtn.href = 'javascript:void(0)';
        loginBtn.onclick = logout;
    }
}

// Initialize auth checks
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    updateNavigation();
});
