// Update navigation based on authentication status
function updateNavigation() {
    const user = JSON.parse(localStorage.getItem('user'));
    const navList = document.querySelector('.glass-nav ul');
    
    if (!navList) return;

    // Remove existing login/logout button if any
    const existingAuthButton = navList.querySelector('.auth-btn');
    if (existingAuthButton) {
        existingAuthButton.remove();
    }

    // Create new list item
    const authItem = document.createElement('li');
    
    if (user) {
        // User is logged in - show logout button with user name
        authItem.innerHTML = `
            <div class="user-menu">
                <span class="user-name">Welcome, ${user.displayName}</span>
                <a href="javascript:void(0)" onclick="logout()" class="auth-btn logout-btn">
                    <i class="fas fa-sign-out-alt"></i> Logout
                </a>
            </div>
        `;
    } else {
        // User is not logged in - show login button
        authItem.innerHTML = `
            <a href="login.html" class="auth-btn login-btn">
                <i class="fas fa-sign-in-alt"></i> Login
            </a>
        `;
    }
    
    navList.appendChild(authItem);
}

// Initialize navigation
document.addEventListener('DOMContentLoaded', updateNavigation);
