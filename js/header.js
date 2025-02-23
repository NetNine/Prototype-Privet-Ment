document.addEventListener('DOMContentLoaded', function() {
    initHeader();
});

function initHeader() {
    setupMenuToggle();
    setupNavigation();
    setupLogout();
}

function setupMenuToggle() {
    const menuToggle = document.getElementById('menuToggle');
    const bottomMenuBtn = document.getElementById('bottomMenuBtn');
    const closeMenu = document.getElementById('closeMenu');
    const mobileMenu = document.getElementById('mobileMenu');

    function toggleMenu() {
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }

    menuToggle?.addEventListener('click', toggleMenu);
    bottomMenuBtn?.addEventListener('click', toggleMenu);
    closeMenu?.addEventListener('click', toggleMenu);

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenu?.classList.contains('active') &&
            !mobileMenu.contains(e.target) &&
            !menuToggle?.contains(e.target) &&
            !bottomMenuBtn?.contains(e.target)) {
            toggleMenu();
        }
    });
}

function setupNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // Set active states
    document.querySelectorAll('[data-page]').forEach(link => {
        if (link.getAttribute('data-page') === currentPage.replace('.html', '')) {
            link.classList.add('active');
        }
    });

    // Set active state for mobile nav
    document.querySelectorAll('.bottom-nav a').forEach(link => {
        if (link.getAttribute('href') === `./${currentPage}`) {
            link.classList.add('active');
        }
    });
}

function setupLogout() {
    const logoutBtns = document.querySelectorAll('#logoutBtn, #mobileLogoutBtn');
    
    logoutBtns.forEach(btn => {
        btn.addEventListener('click', handleLogout);
    });
}

function handleLogout() {
    localStorage.removeItem('user');
    window.location.href = './login.html';
}

// Handle auth state changes
function updateAuthState() {
    const isAuthenticated = !!localStorage.getItem('user');
    const protectedPages = ['content.html', 'resources.html'];
    const currentPage = window.location.pathname.split('/').pop();

    if (!isAuthenticated && protectedPages.includes(currentPage)) {
        window.location.href = './login.html';
    }
}
