document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');

    // Handle button clicks for downloads
    const buttons = document.querySelectorAll('[data-download-url]');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const url = this.getAttribute('data-download-url');
            const a = document.createElement('a');
            a.href = url;
            a.download = url.split('/').pop();
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });
    });

    // Add click event to menu icon
    const menuIcon = document.querySelector('.menu-icon');
    if (menuIcon) {
        console.log('Menu icon found');
        menuIcon.addEventListener('click', function() {
            console.log('Menu icon clicked');
            toggleSidebar();
        });
    } else {
        console.log('Menu icon not found');
    }
});

// Sidebar toggle functionality
function toggleSidebar() {
    console.log('toggleSidebar called');
    const sidebar = document.getElementById('sidebar');

    if (!sidebar) {
        console.log('Sidebar not found');
        return;
    }

    console.log('Sidebar found, toggling...');

    let overlay = document.querySelector('.sidebar-overlay');

    if (!overlay) {
        // Create overlay if it doesn't exist
        overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        overlay.onclick = closeSidebar;
        document.body.appendChild(overlay);
        console.log('Overlay created');
    }

    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');

    console.log('Sidebar classes:', sidebar.className);

    // Prevent body scroll when sidebar is open
    if (sidebar.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
        console.log('Sidebar opened');
    } else {
        document.body.style.overflow = 'auto';
        console.log('Sidebar closed');
    }
}

function closeSidebar() {
    console.log('closeSidebar called');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.querySelector('.sidebar-overlay');

    if (sidebar) {
        sidebar.classList.remove('active');
    }
    if (overlay) {
        overlay.classList.remove('active');
    }
    document.body.style.overflow = 'auto';
}

// Close sidebar when clicking outside
document.addEventListener('click', function(event) {
    const sidebar = document.getElementById('sidebar');
    const menuIcon = document.querySelector('.menu-icon');

    if (sidebar && menuIcon && !sidebar.contains(event.target) && !menuIcon.contains(event.target)) {
        closeSidebar();
    }
});

// Handle escape key to close sidebar
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeSidebar();
    }
});