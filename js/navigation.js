// Function to update the navigation bar dynamically
function updateNavigation() {
    const user = JSON.parse(localStorage.getItem('user'));
    const navList = document.querySelector('.nav-menu');

    if (!navList) return;

    // Remove existing auth buttons to avoid duplicates
    const existingAuthButtons = navList.querySelectorAll('.auth-btn');
    existingAuthButtons.forEach(btn => btn.remove());

    // Create authentication button
    const authItem = document.createElement('li');

    if (user) {
        // User is logged in - Show logout button
        authItem.innerHTML = `
            <div class="user-menu">
                <span class="user-name">Welcome, ${user.displayName || "User"}</span>
                <a href="javascript:void(0)" onclick="logoutUser()" class="auth-btn logout-btn">
                    <i class="fas fa-sign-out-alt"></i> Logout
                </a>
            </div>
        `;
    } else {
        // User is logged out - Show login button
        authItem.innerHTML = `
            <a href="login.html" class="auth-btn login-btn">
                <i class="fas fa-sign-in-alt"></i> Login
            </a>
        `;
    }

    navList.appendChild(authItem);
}

// Function to log out the user and redirect to the login page
function logoutUser() {
    localStorage.removeItem('user');
    updateNavigation();
    window.location.href = 'login.html'; // Redirect to login page after logout
}

// Restrict access to `content.html`
if (window.location.pathname.includes("content.html")) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        window.location.href = 'login.html'; // Redirect to login if not logged in
    }
}

// Run navigation update on page load
document.addEventListener('DOMContentLoaded', updateNavigation);
