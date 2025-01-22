// Authentication state management
let currentAuthStep = 'password'; // 'password' or 'otp'
let currentEmail = ''; // Store email for OTP verification

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

function showError(message) {
    const errorMessage = document.getElementById('errorMessage');
    if (errorMessage) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 5000);
    }
}

// Form submission handler
document.getElementById('loginForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const otpInput = document.getElementById('otp');
    const otpSection = document.getElementById('otpSection');
    const passwordSection = document.getElementById('passwordSection');
    
    try {
        if (currentAuthStep === 'password') {
            // Validate email and password
            if (!emailInput?.value) {
                showError('Please enter your email address');
                emailInput?.focus();
                return;
            }

            if (!validateEmail(emailInput.value)) {
                showError('Please enter a valid email address');
                emailInput?.focus();
                return;
            }

            if (!passwordInput?.value) {
                showError('Please enter your password');
                passwordInput?.focus();
                return;
            }

            if (!validatePassword(passwordInput.value)) {
                showError('Password must be at least 8 characters long');
                passwordInput?.focus();
                return;
            }

            const response = await fetch('/api/verify-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    email: emailInput.value,
                    password: passwordInput.value
                })
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Invalid email or password');
            }
            
            // Store email for OTP verification
            currentEmail = emailInput.value;
            
            // Show OTP section
            currentAuthStep = 'otp';
            passwordSection.style.display = 'none';
            otpSection.style.display = 'block';
            
            // Clear password field
            passwordInput.value = '';

            // Show OTP in development mode
            if (data.devOtp) {
                console.log('Development OTP:', data.devOtp);
            }
        } else {
            // Validate OTP
            if (!otpInput?.value) {
                showError('Please enter the verification code');
                otpInput?.focus();
                return;
            }

            if (!validateOTP(otpInput.value)) {
                showError('Please enter a valid 6-digit verification code');
                otpInput?.focus();
                return;
            }

            const response = await fetch('/api/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    email: currentEmail,
                    otp: otpInput.value
                })
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Invalid verification code');
            }
            
            // Store authentication data
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            // Redirect to content library
            window.location.href = 'content.html';
        }
    } catch (error) {
        showError(error.message);
        console.error('Login error:', error);
    }
});

// Resend OTP button handler
document.getElementById('resendOtp')?.addEventListener('click', async function() {
    try {
        if (!currentEmail) {
            showError('Please start the login process again');
            setTimeout(() => window.location.reload(), 2000);
            return;
        }

        const response = await fetch('/api/resend-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: currentEmail })
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Failed to resend verification code');
        }
        
        showError('New verification code sent');
        
        // Show OTP in development mode
        if (data.devOtp) {
            console.log('Development OTP:', data.devOtp);
        }
    } catch (error) {
        showError(error.message);
        console.error('Resend OTP error:', error);
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
