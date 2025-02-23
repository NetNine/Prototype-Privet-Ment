document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const slideMenu = document.getElementById('slideMenu');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const menuBackdrop = document.getElementById('menuBackdrop');
    const menuLinks = document.querySelectorAll('.menu-item');

    // Toggle menu function with animation delay
    function toggleMenu(show = true) {
        if (show) {
            menuBackdrop.style.display = 'block';
            setTimeout(() => {
                hamburgerBtn?.classList.add('active');
                slideMenu?.classList.add('active');
                menuBackdrop?.classList.add('active');
                document.body.classList.add('menu-open');
            }, 50);
        } else {
            hamburgerBtn?.classList.remove('active');
            slideMenu?.classList.remove('active');
            menuBackdrop?.classList.remove('active');
            document.body.classList.remove('menu-open');
            setTimeout(() => {
                menuBackdrop.style.display = 'none';
            }, 300);
        }
    }

    // Event Listeners
    hamburgerBtn?.addEventListener('click', () => toggleMenu(true));
    closeMenuBtn?.addEventListener('click', () => toggleMenu(false));
    menuBackdrop?.addEventListener('click', () => toggleMenu(false));

    // Close menu when clicking links
    menuLinks.forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });

    // Handle swipe to close
    let touchStartX = 0;
    slideMenu?.addEventListener('touchstart', e => {
        touchStartX = e.touches[0].clientX;
    });

    slideMenu?.addEventListener('touchmove', e => {
        if (!slideMenu.classList.contains('active')) return;
        const touchX = e.touches[0].clientX;
        const diff = touchStartX - touchX;
        
        if (diff > 50) { // Swipe left to close
            toggleMenu(false);
        }
    });

    // GitHub Pages path compatibility
    const basePath = '/Prototype-Privet-Ment/';
    
    // Update active page detection for GitHub Pages
    function getActivePage() {
        const path = window.location.pathname;
        const page = path.replace(basePath, '').split('/').pop() || 'index.html';
        return page;
    }

    // Set active menu item with GitHub Pages support
    function setActiveMenuItem() {
        const currentPage = getActivePage();
        const menuLinks = document.querySelectorAll('.menu-item, .nav-links a');
        
        menuLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href.includes(currentPage)) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Update navigation for GitHub Pages
    function updateNavigation() {
        setActiveMenuItem();
        const isAuthenticated = !!localStorage.getItem('user');
        
        if (!isAuthenticated && isProtectedPage()) {
            window.location.href = `${basePath}login.html`;
        }
    }

    // Check if current page is protected
    function isProtectedPage() {
        const protectedPages = ['content.html', 'resources.html'];
        return protectedPages.includes(getActivePage());
    }

    // Handle logout with proper redirection
    function handleLogout() {
        localStorage.removeItem('user');
        window.location.href = `${basePath}login.html`;
    }

    // Initialize
    updateNavigation();
    setActiveMenuItem();

    // Event Listeners
    const logoutButtons = document.querySelectorAll('#logoutBtn, #mobileLogoutBtn');
    logoutButtons.forEach(btn => {
        btn.addEventListener('click', handleLogout);
    });

    // Handle escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && slideMenu?.classList.contains('active')) {
            toggleMenu(false);
        }
    });
});
