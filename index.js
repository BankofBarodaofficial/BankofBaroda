document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');

    // ====== 1. DOWNLOAD BUTTONS ======
    const buttons = document.querySelectorAll('[data-download-url]');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const url = this.getAttribute('data-download-url');
            if (url) {
                const a = document.createElement('a');
                a.href = url;
                a.download = url.split('/').pop();
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }
        });
    });

    // ====== 2. SIDEBAR TOGGLE ======
    const menuIcon = document.querySelector('.menu-icon');
    const sidebar = document.getElementById('sidebar');

    if (menuIcon && sidebar) {
        console.log('Menu icon & sidebar found');

        // Create overlay if not exists
        let overlay = document.querySelector('.sidebar-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'sidebar-overlay';
            document.body.appendChild(overlay);
        }

        // Click on menu icon
        menuIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log('Menu icon clicked');
            toggleSidebar();
        });

        // Click on overlay
        overlay.addEventListener('click', function() {
            closeSidebar();
        });

        // Click outside
        document.addEventListener('click', function(event) {
            if (sidebar.classList.contains('active')) {
                const isSidebar = sidebar.contains(event.target);
                const isMenu = menuIcon.contains(event.target);
                if (!isSidebar && !isMenu) {
                    closeSidebar();
                }
            }
        });

        // Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                closeSidebar();
            }
        });

    } else {
        console.log('Menu icon or sidebar not found');
    }

    // ====== 3. GALLERY AUTO-SCROLL ======
    const strip = document.getElementById('imageStrip');
    if (strip) {
        const images = strip.querySelectorAll('img');
        let currentIndex = 0;

        // Clone first image for infinite loop effect
        if (images.length > 0) {
            const firstClone = images[0].cloneNode(true);
            strip.appendChild(firstClone);
        }

        const scrollToImage = (index) => {
            const allImages = strip.querySelectorAll('img');
            if (index < allImages.length) {
                const image = allImages[index];
                const offsetLeft = image.offsetLeft;
                strip.scrollTo({
                    left: offsetLeft,
                    behavior: 'smooth'
                });
            }
        };

        let autoScroll = setInterval(() => {
            currentIndex++;
            const allImages = strip.querySelectorAll('img');
            if (currentIndex >= allImages.length) {
                // Reset to first without animation
                strip.scrollTo({ left: 0, behavior: 'auto' });
                currentIndex = 0;
                // Then scroll to first
                setTimeout(() => scrollToImage(0), 100);
            } else {
                scrollToImage(currentIndex);
            }
        }, 3000);
    }

    // ====== 4. GLOBAL FUNCTIONS ======
    window.toggleSidebar = function() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.querySelector('.sidebar-overlay');
        if (sidebar) {
            sidebar.classList.toggle('active');
        }
        if (overlay) {
            overlay.classList.toggle('active');
        }
        document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : 'auto';
    };

    window.closeSidebar = function() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.querySelector('.sidebar-overlay');
        if (sidebar) sidebar.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    };
});
