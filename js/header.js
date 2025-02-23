document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const slideMenu = document.getElementById('slideMenu');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const menuBackdrop = document.getElementById('menuBackdrop');
    const menuItems = document.querySelectorAll('.menu-item');

    // Toggle menu function
    function toggleMenu(show = true) {
        hamburgerBtn.classList.toggle('active', show);
        slideMenu.classList.toggle('active', show);
        menuBackdrop.classList.toggle('active', show);
        document.body.classList.toggle('menu-open', show);
    }

    // Event listeners
    hamburgerBtn?.addEventListener('click', () => toggleMenu(true));
    closeMenuBtn?.addEventListener('click', () => toggleMenu(false));
    menuBackdrop?.addEventListener('click', () => toggleMenu(false));

    // Close menu when clicking menu items
    menuItems.forEach(item => {
        item.addEventListener('click', () => toggleMenu(false));
    });

    // Set active menu item
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    menuItems.forEach(item => {
        if (item.getAttribute('href').includes(currentPage)) {
            item.classList.add('active');
        }
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
        
        if (diff < -50) {
            toggleMenu(false);
        }
    });
});
