class VideoPlayer {
    constructor(containerId) {
        this.containerId = containerId;
        this.container = document.getElementById(containerId);
        this.initPlayer();
    }

    initPlayer() {
        if (!this.container) return;
        this.addSecurityFeatures();
    }

    loadVideo(videoId, title, description) {
        if (!this.container) return;

        try {
            // Show loading state
            this.container.innerHTML = '<div class="loading">Loading...</div>';

            // Create secure iframe
            const iframe = document.createElement('iframe');
            iframe.width = '100%';
            iframe.height = '100%';
            iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0&showinfo=0`;
            iframe.frameBorder = '0';
            iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
            iframe.allowFullscreen = true;

            // Update container
            this.container.innerHTML = '';
            this.container.appendChild(iframe);

            // Update info
            document.getElementById('currentVideoTitle').textContent = title;
            document.getElementById('currentVideoDescription').textContent = description;
        } catch (error) {
            console.error('Error loading video:', error);
            this.container.innerHTML = '<div class="error">Error loading video</div>';
        }
    }

    addSecurityFeatures() {
        // Prevent screen capture
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.container.style.filter = 'blur(20px)';
            } else {
                this.container.style.filter = 'none';
            }
        });

        // Block right-click
        this.container.addEventListener('contextmenu', e => e.preventDefault());

        // Block keyboard shortcuts
        document.addEventListener('keydown', e => {
            if ((e.ctrlKey || e.metaKey) && 
                ['s', 'u', 'p', 'c', 'i', 'j'].includes(e.key.toLowerCase())) {
                e.preventDefault();
                return false;
            }
        });
    }

    destroy() {
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
}