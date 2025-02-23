document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;

    // Create FAB button
    const fab = document.createElement('button');
    fab.className = 'menu-fab';
    fab.innerHTML = '<i class="fas fa-bars"></i>';
    body.appendChild(fab);

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'mobile-menu-overlay';
    body.appendChild(overlay);

    // Toggle menu
    fab.addEventListener('click', () => {
        overlay.classList.toggle('active');
    });

    // Close menu when clicking overlay
    overlay.addEventListener('click', () => {
        overlay.classList.remove('active');
    });

    // Close menu when resizing to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            overlay.classList.remove('active');
        }
    });
});
