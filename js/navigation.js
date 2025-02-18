// Function to update the navigation bar dynamically
function updateNavigation() {
    const user = JSON.parse(localStorage.getItem('user'));
    const navList = document.querySelector('.glass-nav ul');

    if (!navList) return;

    // Remove duplicate auth button
    const existingAuthButtons = navList.querySelectorAll('.auth-btn');
    existingAuthButtons.forEach(button => button.remove());

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
        // Only show login button on `content.html`
        if (window.location.pathname.includes("content.html")) {
            authItem.innerHTML = `
                <a href="login.html" class="auth-btn login-btn">
                    <i class="fas fa-sign-in-alt"></i> Login
                </a>
            `;
        }
    }

    navList.appendChild(authItem);
}

// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    updateNavigation();

    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                navMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });
    }
});
