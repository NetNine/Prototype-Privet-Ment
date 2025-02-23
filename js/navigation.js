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

function initNavigation(isMobile) {
    if (isMobile) {
        setupMobileNavigation();
    } else {
        setupDesktopNavigation();
    }

    // Handle logout for both mobile and desktop
    setupLogoutHandlers();
}

function setupMobileNavigation() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileBackdrop = document.getElementById('mobileBackdrop');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => toggleMobileMenu(true));
        mobileBackdrop?.addEventListener('click', () => toggleMobileMenu(false));
    }

    // Setup bottom navigation
    setupBottomNav();
}

function setupDesktopNavigation() {
    // Set active state for current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.desktop-nav .nav-menu a').forEach(link => {
        if (link.getAttribute('href').includes(currentPage)) {
            link.classList.add('active');
        }
    });
}

function setupLogoutHandlers() {
    // Get both desktop and mobile logout buttons
    const logoutBtn = document.getElementById('logoutBtn');
    const mobileLogoutBtn = document.getElementById('mobileLogoutBtn');

    // Single handler function
    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('user');
        window.location.href = './login.html';
    };

    // Attach to both buttons
    logoutBtn?.addEventListener('click', handleLogout);
    mobileLogoutBtn?.addEventListener('click', handleLogout);
}

function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileOverlay = document.getElementById('mobileOverlay');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }

    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (mobileMenu?.classList.contains('active') &&
            !mobileMenu.contains(e.target) &&
            !mobileMenuBtn?.contains(e.target)) {
            toggleMobileMenu();
        }
    });
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const icon = document.querySelector('#mobileMenuBtn i');
    
    mobileMenu?.classList.toggle('active');
    
    if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    }
}

function updateAuthState() {
    const user = localStorage.getItem('user');
    const logoutBtns = document.querySelectorAll('.logout-btn');
    
    logoutBtns.forEach(btn => {
        btn.style.display = user ? 'block' : 'none';
        btn.addEventListener('click', handleLogout);
    });

    // Redirect if not authenticated
    if (!user && isProtectedPage()) {
        window.location.href = './login.html';
    }
}

function isProtectedPage() {
    const protectedPages = ['content.html', 'resources.html'];
    const currentPage = window.location.pathname.split('/').pop();
    return protectedPages.includes(currentPage);
}

function handleLogout() {
    localStorage.removeItem('user');
    window.location.href = './login.html';
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavigation);
} else {
    initNavigation();
}

function initMobileNavigation() {
    const menuTrigger = document.getElementById('mobileMenuTrigger');
    const mobileMenu = document.getElementById('mobileMenu');
    const backdrop = document.getElementById('mobileOverlay');
    const bottomNav = document.getElementById('bottomNav');

    // Set active bottom nav item
    if (bottomNav) {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const activeLink = bottomNav.querySelector(`[href="./${currentPage}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    // Handle menu trigger
    if (menuTrigger) {
        menuTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            toggleMobileMenu();
        });
    }

    // Handle backdrop click
    if (backdrop) {
        backdrop.addEventListener('click', toggleMobileMenu);
    }

    // Prevent body scroll when menu is open
    function toggleBodyScroll(disable) {
        document.body.style.overflow = disable ? 'hidden' : '';
    }

    // Enhanced menu toggle
    function toggleMobileMenu() {
        mobileMenu?.classList.toggle('active');
        backdrop?.classList.toggle('active');
        toggleBodyScroll(mobileMenu?.classList.contains('active'));
    }

    // Handle swipe to close menu
    let touchStartX = 0;
    if (mobileMenu) {
        mobileMenu.addEventListener('touchstart', e => {
            touchStartX = e.touches[0].clientX;
        });

        mobileMenu.addEventListener('touchmove', e => {
            if (!mobileMenu.classList.contains('active')) return;
            
            const touchX = e.touches[0].clientX;
            const diff = touchStartX - touchX;
            
            if (diff > 50) {
                toggleMobileMenu();
            }
        });
    }
}

// Add to existing initialization
document.addEventListener('DOMContentLoaded', () => {
    const isMobile = window.innerWidth <= 768;
    initNavigation(isMobile);
    initMobileNavigation();
});

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
});

function initializeNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Set active states
    setActiveNavItems(currentPage);
    
    // Setup mobile menu
    setupMobileMenu();
    
    // Handle authentication
    setupAuthHandlers();
}

function setActiveNavItems(currentPage) {
    const pageId = currentPage.replace('.html', '');
    
    // Set active class for all navigation items
    document.querySelectorAll('[data-page]').forEach(item => {
        if (item.getAttribute('data-page') === pageId) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeMenuBtn = document.getElementById('closeMenu');
    const mobileBackdrop = document.getElementById('mobileBackdrop');
    const mobileMenu = document.querySelector('.mobile-menu');

    // Toggle menu
    function toggleMenu(show) {
        document.body.classList.toggle('menu-open', show);
        mobileMenu?.classList.toggle('active', show);
        mobileBackdrop?.classList.toggle('active', show);
    }

    // Event listeners
    mobileMenuBtn?.addEventListener('click', () => toggleMenu(true));
    closeMenuBtn?.addEventListener('click', () => toggleMenu(false));
    mobileBackdrop?.addEventListener('click', () => toggleMenu(false));

    // Handle swipe gestures
    let touchStartX = 0;
    
    document.addEventListener('touchstart', e => {
        touchStartX = e.touches[0].clientX;
    });

    document.addEventListener('touchmove', e => {
        if (!mobileMenu?.classList.contains('active')) return;
        
        const touchX = e.touches[0].clientX;
        const diff = touchStartX - touchX;
        
        if (diff > 50) {
            toggleMenu(false);
        }
    });
}

function setupAuthHandlers() {
    const logoutBtns = document.querySelectorAll('.logout-btn');
    
    logoutBtns.forEach(btn => {
        btn.addEventListener('click', handleLogout);
    });

    // Check protected pages
    const protectedPages = ['content.html', 'resources.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    if (protectedPages.includes(currentPage) && !isAuthenticated()) {
        window.location.href = './login.html';
    }
}

function handleLogout() {
    localStorage.removeItem('user');
    window.location.href = './login.html';
}

function isAuthenticated() {
    return !!localStorage.getItem('user');
}
