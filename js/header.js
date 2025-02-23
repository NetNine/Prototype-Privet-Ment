document.addEventListener('DOMContentLoaded', function() {
    initializeHeader();
});

function initializeHeader() {
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const authBtn = document.getElementById('authBtn');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // Set active page
    setActivePage(currentPage);

    // Mobile menu toggle
    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }

    // Auth button handling
    if (authBtn) {
        updateAuthButton();
    }

    // Close mobile menu on link click
    document.querySelectorAll('.mobile-nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
}

function setActivePage(currentPage) {
    document.querySelectorAll('[data-page]').forEach(link => {
        if (link.getAttribute('data-page') === currentPage.replace('.html', '')) {
            link.classList.add('active');
        }
    });
}

function updateAuthButton() {
    const authBtn = document.getElementById('authBtn');
    const user = localStorage.getItem('user');

    if (user) {
        authBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i><span class="auth-text">Logout</span>';
        authBtn.addEventListener('click', handleLogout);
    } else {
        authBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i><span class="auth-text">Login</span>';
        authBtn.addEventListener('click', () => window.location.href = './login.html');
    }
}

function handleLogout() {
    localStorage.removeItem('user');
    window.location.href = './login.html';
}
