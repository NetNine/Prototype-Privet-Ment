document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const slideMenu = document.getElementById('slideMenu');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const menuBackdrop = document.getElementById('menuBackdrop');
    const menuLinks = document.querySelectorAll('.menu-item');
    const menuTrigger = document.getElementById('menuTrigger');

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
    menuTrigger?.addEventListener('click', () => toggleMenu(true));
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

    // Set active menu item
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    menuLinks.forEach(link => {
        if (link.getAttribute('href').includes(currentPage)) {
            link.classList.add('active');
        }
    });

    // Handle escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && slideMenu?.classList.contains('active')) {
            toggleMenu(false);
        }
    });
});
