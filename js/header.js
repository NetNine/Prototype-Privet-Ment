document.addEventListener('DOMContentLoaded', function() {
    const menuTrigger = document.getElementById('menuTrigger');
    const sideMenu = document.getElementById('sideMenu');
    const closeMenu = document.getElementById('closeMenu');
    const menuBackdrop = document.getElementById('menuBackdrop');
    const logoutBtns = document.querySelectorAll('.logout-btn');

    // Toggle menu function
    function toggleMenu() {
        menuTrigger.classList.toggle('active');
        sideMenu.classList.toggle('active');
        menuBackdrop.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }

    // Event listeners
    menuTrigger?.addEventListener('click', toggleMenu);
    closeMenu?.addEventListener('click', toggleMenu);
    menuBackdrop?.addEventListener('click', toggleMenu);

    // Close menu when clicking menu items
    document.querySelectorAll('.menu-links a').forEach(link => {
        link.addEventListener('click', () => {
            toggleMenu();
        });
    });

    // Handle logout
    logoutBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            localStorage.removeItem('user');
            window.location.href = './login.html';
        });
    });

    // Set active states
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('[data-page]').forEach(link => {
        if (link.getAttribute('data-page') === currentPage.replace('.html', '')) {
            link.classList.add('active');
        }
    });
});
