document.addEventListener('DOMContentLoaded', function () {
    const videoContainer = document.getElementById('videoContainer');
    const userId = localStorage.getItem('user') || "Guest";

    // Load Secure Video
    function loadSecureVideo() {
        const videoBlob = base64ToBlob(videoData, 'video/mp4');
        const videoUrl = URL.createObjectURL(videoBlob);

        const videoElement = document.createElement('video');
        videoElement.id = 'secureVideo';
        videoElement.src = videoUrl;
        videoElement.controls = false;
        videoElement.autoplay = true;
        videoElement.style.width = '100%';

        const watermark = document.createElement('div');
        watermark.id = 'dynamicWatermark';
        watermark.className = 'watermark';

        videoContainer.appendChild(videoElement);
        videoContainer.appendChild(watermark);

        applySecurityMeasures(videoElement, watermark);
        addVideoControls(videoElement);
    }

    // Convert base64 to Blob
    function base64ToBlob(base64, mime) {
        const byteCharacters = atob(base64.split(',')[1]);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: mime });
    }

    // Apply Security Measures
    function applySecurityMeasures(videoElement, watermark) {
        // Dynamic Watermark to Prevent Screen Recording
        setInterval(() => {
            watermark.textContent = `${userId} - ${new Date().toISOString()}`;
            watermark.style.top = `${Math.random() * 90}%`;
            watermark.style.left = `${Math.random() * 90}%`;
        }, 3000);

        // Prevent Right-Click & Copy
        document.addEventListener('contextmenu', function (e) {
            e.preventDefault();
        });

        document.addEventListener('keydown', function (e) {
            if (
                (e.ctrlKey && ['s', 'u', 'p', 'i', 'j'].includes(e.key.toLowerCase())) || 
                e.key === 'F12'
            ) {
                alert("🔒 Inspecting is disabled for security reasons.");
                e.preventDefault();
            }
        });

        // Prevent Screen Recording (Blur Video When Suspicious)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                videoElement.style.filter = 'blur(30px)';
                videoElement.pause();
            } else {
                videoElement.style.filter = 'none';
                videoElement.play();
            }
        });

        // Block IDM & Video Download Extensions
        detectIDM();
        detectDownloadExtensions();
        detectMaliciousExtensions();
    }

    // Block IDM & Video Download Extensions
    function detectIDM() {
        let idmDetected = false;

        // Fake Request to Trigger IDM Detection
        const fakeRequest = new XMLHttpRequest();
        fakeRequest.open('HEAD', 'https://fake-url-to-trigger-idm.com/test.mp4', true);
        fakeRequest.onreadystatechange = function () {
            if (fakeRequest.readyState === 4 && fakeRequest.status === 200) {
                idmDetected = true;
                alert("🚨 IDM or a download extension detected! Please disable it to access the content.");
                document.body.innerHTML = "<h1>🚫 Access Denied: Disable Download Extensions</h1>";
            }
        };
        fakeRequest.send();

        // Detect Browser Extensions
        setInterval(() => {
            const detectedExtensions = ['idm', 'video downloader', 'download manager', 'video capture'];
            const installedExtensions = navigator.plugins;
            for (let i = 0; i < installedExtensions.length; i++) {
                let plugin = installedExtensions[i].name.toLowerCase();
                detectedExtensions.forEach(ext => {
                    if (plugin.includes(ext)) {
                        idmDetected = true;
                    }
                });
            }
            if (idmDetected) {
                alert("⚠️ Please disable IDM or any download extensions.");
                document.body.innerHTML = "<h1>🚫 Downloading is blocked</h1>";
            }
        }, 5000);
    }

    // Detect Extensions Trying to Modify Video Elements
    function detectDownloadExtensions() {
        setInterval(() => {
            let suspiciousElements = document.querySelectorAll('[download], [id*="download"], [class*="download"]');
            if (suspiciousElements.length > 0) {
                alert("🚫 Download attempt detected! Disabling access.");
                document.body.innerHTML = "<h1>⚠️ Downloading is not allowed</h1>";
            }
        }, 2000);
    }

    // Block known video download extensions by checking injected scripts
    function detectMaliciousExtensions() {
        setInterval(() => {
            let extensions = ['idm', 'download', 'video saver', 'video downloader', 'capture', 'record'];
            let scripts = document.querySelectorAll('script[src]');
            scripts.forEach(script => {
                extensions.forEach(ext => {
                    if (script.src.toLowerCase().includes(ext)) {
                        alert("⚠️ A download extension was detected. Please disable it.");
                        document.body.innerHTML = "<h1>⚠️ Unauthorized extension detected</h1>";
                    }
                });
            });
        }, 5000);
    }

    // Add video controls
    function addVideoControls(videoElement) {
        const controls = `
            <div class="video-controls">
                <button id="playPauseBtn">Play/Pause</button>
                <button id="muteBtn">Mute/Unmute</button>
                <button id="skipBackBtn">-10s</button>
                <button id="skipForwardBtn">+10s</button>
                <label for="speedControl">Speed:</label>
                <select id="speedControl">
                    <option value="0.5">0.5x</option>
                    <option value="1" selected>1x</option>
                    <option value="1.5">1.5x</option>
                    <option value="2">2x</option>
                </select>
                <input type="range" id="volumeControl" min="0" max="1" step="0.1" value="1">
                <input type="range" id="seekBar" value="0">
            </div>
        `;
        videoContainer.insertAdjacentHTML('beforeend', controls);

        const playPauseBtn = document.getElementById('playPauseBtn');
        const muteBtn = document.getElementById('muteBtn');
        const skipBackBtn = document.getElementById('skipBackBtn');
        const skipForwardBtn = document.getElementById('skipForwardBtn');
        const speedControl = document.getElementById('speedControl');
        const volumeControl = document.getElementById('volumeControl');
        const seekBar = document.getElementById('seekBar');

        playPauseBtn.addEventListener('click', () => {
            if (videoElement.paused) {
                videoElement.play();
            } else {
                videoElement.pause();
            }
        });

        muteBtn.addEventListener('click', () => {
            videoElement.muted = !videoElement.muted;
        });

        skipBackBtn.addEventListener('click', () => {
            videoElement.currentTime -= 10;
        });

        skipForwardBtn.addEventListener('click', () => {
            videoElement.currentTime += 10;
        });

        speedControl.addEventListener('change', () => {
            videoElement.playbackRate = speedControl.value;
        });

        volumeControl.addEventListener('input', () => {
            videoElement.volume = volumeControl.value;
        });

        seekBar.addEventListener('input', () => {
            videoElement.currentTime = seekBar.value;
        });

        // Update seek bar as video plays
        videoElement.addEventListener('timeupdate', () => {
            seekBar.value = videoElement.currentTime;
            seekBar.max = videoElement.duration;
        });
    }

    // Initialize Security Features
    loadSecureVideo();
});
