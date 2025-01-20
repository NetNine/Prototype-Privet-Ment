// Authorized users database
const authorizedUsers = [
    {
        email: 'user930@gmail.com',
        password: 'GTM2024#User',
        name: 'User'
    },
    {
        email: 'student1@gmail.com',
        password: 'TradingMentor2024!'
    },
    {
        email: 'student2@gmail.com',
        password: 'GoldbachTrader2024!'
    }
    // Add more authorized users as needed
];

// Store user credentials securely
const userCredentials = {
    'user930@gmail.com': {
        password: 'GTM2024#User',
        displayName: 'User'
    }
};

document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    
    const userCredential = userCredentials[email];
    
    if (userCredential && userCredential.password === password) {
        // Store authentication state
        localStorage.setItem('user', JSON.stringify({ 
            email: email,
            displayName: userCredential.displayName
        }));
        
        // Redirect to content library
        window.location.href = 'content.html';
    } else {
        errorMessage.style.display = 'block';
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 3000);
    }
});

// Check if user is already logged in
function checkAuth() {
    const user = localStorage.getItem('user');
    if (user && window.location.pathname.endsWith('login.html')) {
        window.location.href = 'content.html';
    }
}

// Logout function
function logout() {
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}

// Update navigation based on auth status
function updateNavigation() {
    const user = JSON.parse(localStorage.getItem('user'));
    const loginBtn = document.querySelector('.login-btn');
    
    if (user && loginBtn) {
        loginBtn.innerHTML = `<i class="fas fa-sign-out-alt"></i> Logout (${user.displayName})`;
        loginBtn.href = 'javascript:void(0)';
        loginBtn.onclick = logout;
    }
}

// Initialize auth checks
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    updateNavigation();
});
