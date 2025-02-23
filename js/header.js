document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const slideMenu = document.getElementById('slideMenu');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const menuBackdrop = document.getElementById('menuBackdrop');
    const menuLinks = document.querySelectorAll('.menu-item');

    // Toggle menu function with enhanced animation
    function toggleMenu(show = true) {
        const hamburgerBtn = document.getElementById('hamburgerBtn');
        
        if (show) {
            document.body.classList.add('menu-open');
            menuBackdrop.style.display = 'block';
            hamburgerBtn?.classList.add('active');
            setTimeout(() => {
                slideMenu?.classList.add('active');
                menuBackdrop?.classList.add('active');
            }, 50);
        } else {
            slideMenu?.classList.remove('active');
            menuBackdrop?.classList.remove('active');
            hamburgerBtn?.classList.remove('active');
            setTimeout(() => {
                menuBackdrop.style.display = 'none';
                document.body.classList.remove('menu-open');
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

    // Handle swipe to close with enhanced touch handling
    let touchStartX = 0;
    let touchStartY = 0;

    slideMenu?.addEventListener('touchstart', e => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    });

    slideMenu?.addEventListener('touchmove', e => {
        if (!slideMenu.classList.contains('active')) return;
        
        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;
        const deltaX = touchStartX - touchX;
        const deltaY = Math.abs(touchStartY - touchY);

        // Only close if horizontal swipe is greater than vertical movement
        if (deltaX > 50 && deltaX > deltaY) {
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
        const protectedPages = ['content.html',];
        return protectedPages.includes(getActivePage());
    }

    // Handle logout with proper redirection
    function handleLogout() {
        localStorage.removeItem('user');
        window.location.href = `${basePath}login.html`;
    }

    // Set page type for content-specific elements
    function setPageType() {
        const currentPage = getActivePage();
        document.body.setAttribute('data-page', currentPage.replace('.html', ''));
    }

    // Initialize
    setPageType();
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

    // Handle bottom navigation active state
    const navItems = document.querySelectorAll('.nav-item');
    const currentPath = window.location.pathname;

    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href && currentPath.includes(href)) {
            item.classList.add('active');
        }
        
        // Add ripple effect on click
        item.addEventListener('click', function(e) {
            if (!this.classList.contains('center-item')) {
                const ripple = document.createElement('div');
                ripple.classList.add('ripple');
                this.appendChild(ripple);
                
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                ripple.style.width = ripple.style.height = `${size}px`;
                
                const x = e.clientX - rect.left - size/2;
                const y = e.clientY - rect.top - size/2;
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                
                setTimeout(() => ripple.remove(), 600);
            }
        });
    });

    // Center button action
    const centerButton = document.querySelector('.center-button');
    if (centerButton) {
        centerButton.addEventListener('click', function(e) {
            e.preventDefault();
            // Add your action here
            this.classList.add('pulse');
            setTimeout(() => this.classList.remove('pulse'), 300);
        });
    }

    // Add scroll effect for bottom navbar
    const bottomNav = document.querySelector('.bottom-navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            bottomNav?.classList.add('scrolled');
        } else {
            bottomNav?.classList.remove('scrolled');
        }
    });

    // Add ripple effect to nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            ripple.style.left = `${e.clientX - rect.left}px`;
            ripple.style.top = `${e.clientY - rect.top}px`;
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
});
