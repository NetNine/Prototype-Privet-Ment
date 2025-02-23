document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const slideMenu = document.getElementById('slideMenu');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const menuBackdrop = document.getElementById('menuBackdrop');
    const menuLinks = document.querySelectorAll('.menu-item');

    // Toggle menu function with animation delay and blur effect
    function toggleMenu(show = true) {
        if (show) {
            document.body.classList.add('menu-open');
            menuBackdrop.style.display = 'block';
            setTimeout(() => {
                slideMenu?.classList.add('active');
                menuBackdrop?.classList.add('active');
            }, 50);
        } else {
            slideMenu?.classList.remove('active');
            menuBackdrop?.classList.remove('active');
            setTimeout(() => {
                menuBackdrop.style.display = 'none';
                document.body.classList.remove('menu-open');
            }, 300);
        }
    }

    // Load header dynamically on all pages
    document.addEventListener("DOMContentLoaded", function () {
        fetch("components/header.html")
            .then(response => response.text())
            .then(data => {
                document.body.insertAdjacentHTML("afterbegin", data);
                setTimeout(() => {
                    const links = document.querySelectorAll(".nav-link");
                    const currentPath = window.location.pathname.split("/").pop();
    
                    links.forEach(link => {
                        if (link.getAttribute("href") === currentPath) {
                            link.classList.add("active-nav");
                        }
                    });
                }, 100); // Delay to ensure elements are loaded
            });
    });
    
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

    // Enhanced active menu handling
    function setActiveMenuItem() {
        const path = window.location.pathname;
        const currentPage = path.replace('/Prototype-Privet-Ment/', '').split('/').pop() || 'index.html';
        
        // Select all navigation links in both desktop and mobile menus
        const menuLinks = document.querySelectorAll('.nav-links a, .menu-item');
        
        menuLinks.forEach(link => {
            const href = link.getAttribute('href');
            const linkPage = href.split('/').pop();
            
            // Compare just the filenames
            if (linkPage === currentPage) {
                link.classList.add('active');
                // Also add active to parent li if exists
                const parentLi = link.closest('li');
                if (parentLi) parentLi.classList.add('active');
            } else {
                link.classList.remove('active');
                const parentLi = link.closest('li');
                if (parentLi) parentLi.classList.remove('active');
            }
        });
    }

    // Call setActiveMenuItem immediately and on page changes
    setActiveMenuItem();
    window.addEventListener('popstate', setActiveMenuItem);

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
        const protectedPages = ['content.html'];
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
});
