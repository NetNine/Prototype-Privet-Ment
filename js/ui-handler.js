document.addEventListener('DOMContentLoaded', function() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        initMobileUI();
    } else {
        initDesktopUI();
    }
});

function initMobileUI() {
    const body = document.querySelector('body');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const bottomNav = document.getElementById('bottomNav');

    // Handle mobile menu
    function toggleMobileMenu(show) {
        mobileMenu.classList.toggle('active', show);
        mobileOverlay.classList.toggle('active', show);
        body.classList.toggle('menu-open', show);
    }

    // Event listeners
    mobileMenuBtn?.addEventListener('click', () => toggleMobileMenu(true));
    mobileOverlay?.addEventListener('click', () => toggleMobileMenu(false));

    // Handle bottom navigation
    if (bottomNav) {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const activeLink = bottomNav.querySelector(`[href="./${currentPage}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    // Handle swipe gestures
    let touchStartX = 0;
    document.addEventListener('touchstart', e => {
        touchStartX = e.touches[0].clientX;
    });

    document.addEventListener('touchmove', e => {
        if (!mobileMenu.classList.contains('active')) return;
        
        const touchX = e.touches[0].clientX;
        const diff = touchStartX - touchX;
        
        if (diff > 50) {
            toggleMobileMenu(false);
        }
    });
}

function initDesktopUI() {
    // Remove any mobile-specific classes/elements
    document.querySelectorAll('.mobile-only').forEach(el => {
        el.style.display = 'none';
    });

    // Ensure desktop elements are visible
    document.querySelectorAll('.desktop-only').forEach(el => {
        el.style.display = '';
    });
}

// Handle resize events
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            initMobileUI();
        } else {
            initDesktopUI();
        }
    }, 250);
});
