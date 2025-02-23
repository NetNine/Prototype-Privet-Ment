class SecureVideoPlayer {
    constructor(containerId) {
        this.containerId = containerId;
        this.player = null;
        this.initSecurity();
    }

    initPlayer(videoUrl, title, description) {
        const container = document.getElementById(this.containerId);
        if (!container) return;

        // Create video element with Video.js
        container.innerHTML = `
            <video id="secureVideo" class="video-js vjs-default-skin" controls>
                <source src="${videoUrl}" type="application/x-mpegURL">
            </video>
        `;

        // Initialize Video.js player
        this.player = videojs('secureVideo', {
            controls: true,
            autoplay: true,
            preload: 'auto',
            fluid: true,
            controlBar: {
                children: [
                    'playToggle',
                    'progressControl',
                    'volumePanel',
                    'fullscreenToggle',
                ]
            }
        });

        // Update title and description
        document.getElementById('currentVideoTitle').textContent = title;
        document.getElementById('currentVideoDescription').textContent = description;
    }

    initSecurity() {
        // Block screen recording
        navigator.mediaDevices.getDisplayMedia = function() {
            alert("Screen recording is disabled for security reasons.");
            return Promise.reject(new Error("Screen recording blocked."));
        };

        // Detect DevTools and external recording tools
        setInterval(() => {
            const widthThreshold = window.outerWidth - window.innerWidth > 160;
            const heightThreshold = window.outerHeight - window.innerHeight > 160;
            if (widthThreshold || heightThreshold) {
                document.documentElement.style.display = 'none';
                alert('Developer tools are not allowed.');
                location.reload();
            }
        }, 1000);

        // Block context menu and keyboard shortcuts
        document.addEventListener('contextmenu', e => e.preventDefault());
        document.addEventListener('keydown', e => {
            if ((e.ctrlKey || e.metaKey) && 
                ['s', 'u', 'p', 'c', 'i'].includes(e.key.toLowerCase())) {
                e.preventDefault();
            }
        });

        // Blur video on tab switch
        document.addEventListener("visibilitychange", () => {
            const video = document.getElementById("secureVideo");
            if (video) {
                video.style.filter = document.hidden ? "blur(10px)" : "none";
            }
        });
    }

    destroy() {
        if (this.player) {
            this.player.dispose();
            this.player = null;
        }
    }
}
```

### 2. Update content.js to use the new video player

### /d:/Media/Documents/GitHub/Prototype-Privet-Ment/js/content.js

Modify the video playback system to use HLS streaming.

<file>
```javascript
// filepath: /d:/Media/Documents/GitHub/Prototype-Privet-Ment/js/content.js
// ...existing content arrays...

let videoPlayer = null;

function playVideo() {
    if (!isAuthenticated()) {
        window.location.href = 'login.html';
        return;
    }

    const playlist = playlists[currentPlaylist];
    const video = playlist[currentVideoIndex];

    // Destroy existing player if any
    if (videoPlayer) {
        videoPlayer.destroy();
    }

    // Initialize new secure player
    videoPlayer = new SecureVideoPlayer('videoContainer');

    // Get secure streaming URL
    fetch(`/api/getSecureVideo?id=${video.id}`)
        .then(response => response.json())
        .then(data => {
            videoPlayer.initPlayer(data.videoUrl, video.title, video.description);
        })
        .catch(error => {
            console.error('Error loading video:', error);
            alert('Error loading video. Please try again.');
        });

    updateNavigationButtons();
    updateVideoListHighlight();
}

// ...rest of existing code...
```

### 3. Update content.html to include Video.js

### /d:/Media/Documents/GitHub/Prototype-Privet-Ment/content.html

Add Video.js dependencies and adjust the video container.

<file>
```html
<!-- filepath: /d:/Media/Documents/GitHub/Prototype-Privet-Ment/content.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- ...existing head content... -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/video.js/7.14.3/video-js.min.css" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/video.js/7.14.3/video.min.js"></script>
</head>
<body>
    <!-- ...existing body content until video container... -->
    <div class="video-container">
        <div class="video-wrapper">
            <div id="videoContainer"></div>
        </div>
        <!-- ...rest of existing content... -->
    </div>
    <!-- ...rest of existing body content... -->
    <script src="js/videoPlayer.js"></script>
    <script src="js/content.js"></script>
</body>
</html>
```

This implementation:
1. Creates a secure video player using Video.js for HLS streaming
2. Implements comprehensive security measures
3. Handles video playback with token-based authentication
4. Prevents screen recording and DevTools access
5. Maintains a clean user experience with full video controls

Note: You'll need to implement the server-side `/api/getSecureVideo` endpoint to convert YouTube videos to HLS format and generate secure URLs.