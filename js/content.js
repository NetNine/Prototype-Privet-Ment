// Core Content Videos
const coreContent = [
    {
        id: '8ViXsAPQWXk',
        title: 'Introduction to GB Book PART 01',
        description: 'Foundation concepts and introduction to the trading methodology.'
    },
    {
        id: 'DUOFx4FjP_E',
        title: 'CORE CONTENT ELEMENT TO THE TRADE SETUP',
        description: 'Essential elements for successful trade setup and execution.'
    },
    {
        id: '0vkmeT2u7TE',
        title: 'DAY 3 KILLZONES',
        description: 'Understanding and mastering day trading kill zones.'
    },
    {
        id: 'iul8KDahqas',
        title: 'CBDR BASICS',
        description: 'Core basics of CBDR trading methodology.'
    },
    {
        id: 'LsvsNtoUJ1M',
        title: 'CLASSIC DAY TEMPLATES',
        description: 'Understanding classic day trading templates.'
    },
    {
        id: 'oDGNGzhBUF4',
        title: 'DAY TEMPLATES PART 2',
        description: 'Advanced day trading templates and patterns.'
    },
    {
        id: 'gVoJ5XqBDg4',
        title: 'Delayed Protraction',
        description: 'Understanding delayed protraction in trading.'
    },
    {
        id: '3yB19cnAixQ',
        title: 'BUY SIDE SELL SIDE Liquidity',
        description: 'Understanding market liquidity dynamics.'
    },
    {
        id: 'ga02Iwod23k',
        title: 'Premium vs Discount',
        description: 'Understanding price levels and market valuation.'
    },
    {
        id: 'kUGp-nhJDEA',
        title: 'HRL AND LRL',
        description: 'High and Low Range Liquidity concepts.'
    },
    {
        id: 'sEx6TSHPv-Q',
        title: 'Retracement and Impulse',
        description: 'Understanding market movements and patterns.'
    },
    {
        id: '6oRNvyruZwE',
        title: 'Month 1 End',
        description: 'Month 1 summary and key learnings.'
    },
    {
        id: '93tlXu1_lyg',
        title: 'BREAK OUTS',
        description: 'Understanding and trading breakouts.'
    },
    {
        id: 'bklCvTWiRTI',
        title: 'OB',
        description: 'Order Blocks trading strategy.'
    },
    {
        id: 'bktBN1zFf40',
        title: 'MB, FVG',
        description: 'Mitigation Blocks and Fair Value Gaps.'
    },
    {
        id: 'wFyMa7hFjYM',
        title: 'PD Arrays Last',
        description: 'Understanding Price Delivery Arrays.'
    },
    {
        id: 'lFeRnXG-zrw',
        title: 'Multi Time Frame Alignment',
        description: 'Trading across multiple time frames.'
    },
    {
        id: '7tS8zdVWxMg',
        title: 'ORDER FLOW',
        description: 'Understanding market order flow.'
    },
    {
        id: 'xtrfmjj34SY',
        title: 'SMT Divergence',
        description: 'Smart Money Trading Divergence patterns.'
    },
    {
        id: 'HC02UmosClM',
        title: 'CE VS MT',
        description: 'Comparing different trading approaches.'
    },
    {
        id: 'wVP1BziyBOw',
        title: 'BONDS EF',
        description: 'Understanding bonds and their effects.'
    },
    {
        id: 'IG4EvnOHdP8',
        title: 'Q SHIFTS',
        description: 'Understanding market shifts and transitions.'
    },
    {
        id: 'g26D93pbm7Q',
        title: 'Open Float',
        description: 'Understanding market float concepts.'
    },
    {
        id: 'e1W9ILdnFtY',
        title: 'Seasonality',
        description: 'Trading with seasonal patterns and cycles.'
    },
    {
        id: 'r4g471Hd_0k',
        title: 'IPDA Data Range',
        description: 'Understanding and utilizing IPDA data ranges in trading.'
    },
    {
        id: '-Hu_wpZknm4',
        title: 'Liquidity Sweep and What is the Entry Model',
        description: 'Understanding liquidity sweeps and identifying entry models in trading.'
    },
    {
        id: 'b25Bp91gFoY',
        title: 'INTERNAL VS EXTERNAL',
        description: 'Understanding internal and external market structures.'
    },
    {
        id: 'B9P4hgn-WG0',
        title: 'ACCUMILATIONS',
        description: 'Understanding accumulation phases in trading.'
    },
    {
        id: 'hSRWH2pPzlY',
        title: 'Market Structure Shift',
        description: 'Identifying and understanding shifts in market structure.'
    }
];

// Goldbach Content Videos
const goldbachContent = [
    {
        id: '8ViXsAPQWXk',
        title: 'Introduction to GB Book PART 01',
        description: 'Foundation concepts of Goldbach trading.'
    },
    {
        id: 'X7yCX4B5ruA',
        title: 'GB ALGO',
        description: 'Goldbach algorithmic trading strategy.'
    },
    {
        id: 'Lj-VWXc4nsM',
        title: 'ALGO 2',
        description: 'Advanced algorithmic trading concepts.'
    },
    {
        id: 'Dyf0jV10omc',
        title: 'GB HOPLA RANGES',
        description: 'Understanding Goldbach HOPLA trading ranges.'
    },
    {
        id: 'nMM9Bs9Aw2I',
        title: 'Setup Indicator',
        description: 'Setting up and using trading indicators.'
    },
    {
        id: '_9YCc0wiHrU',
        title: 'ALGO 1 EX TRADES',
        description: 'Example trades using Algo 1 strategy.'
    },
    {
        id: 'VtZvvuk7JU0',
        title: '2022 GB',
        description: '2022 Goldbach trading review and insights.'
    },
    {
        id: '6zyIgNpvbHA',
        title: 'Filling GB',
        description: 'Advanced Goldbach trading techniques.'
    }
];

let currentVideoIndex = 0;
let currentPlaylist = 'core';
const playlists = {
    core: coreContent,
    goldbach: goldbachContent
};

function createVideoList() {
    const coreList = document.getElementById('coreContentList');
    const goldbachList = document.getElementById('goldbachList');

    if (!coreList || !goldbachList) return;

    coreContent.forEach((video, index) => {
        const li = document.createElement('li');
        li.className = 'video-list-item';
        li.innerHTML = video.title;
        li.onclick = () => {
            currentPlaylist = 'core';
            currentVideoIndex = index;
            playVideo();
        };
        coreList.appendChild(li);
    });

    goldbachContent.forEach((video, index) => {
        const li = document.createElement('li');
        li.className = 'video-list-item';
        li.innerHTML = video.title;
        li.onclick = () => {
            currentPlaylist = 'goldbach';
            currentVideoIndex = index;
            playVideo();
        };
        goldbachList.appendChild(li);
    });
}

function updateVideoListHighlight() {
    const items = document.querySelectorAll('.video-list-item');
    items.forEach(item => item.classList.remove('active'));

    const activeList = currentPlaylist === 'core' ? 'coreContentList' : 'goldbachList';
    const activeItem = document.querySelector(`#${activeList} .video-list-item:nth-child(${currentVideoIndex + 1})`);
    if (activeItem) {
        activeItem.classList.add('active');
        activeItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// Error #1: Incorrect Blob URL usage
// Error #2: Missing error handling
// Error #3: Insecure iframe creation
// Error #4: No video loading state
function playVideo() {
    if (!checkAuth()) return; // Use new auth check

    const playlist = playlists[currentPlaylist];
    const video = playlist[currentVideoIndex];
    const videoContainer = document.getElementById('videoContainer');
    
    if (videoContainer && video) {
        try {
            // Show loading state
            videoContainer.innerHTML = '<div class="loading">Loading...</div>';

            // Create secure iframe
            const iframe = document.createElement('iframe');
            iframe.width = '100%';
            iframe.height = '100%';
            iframe.src = `https://www.youtube.com/embed/${video.id}?autoplay=1&modestbranding=1&rel=0&showinfo=0`;
            iframe.frameBorder = '0';
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            iframe.allowFullscreen = true;

            // Update container
            videoContainer.innerHTML = '';
            videoContainer.appendChild(iframe);

            // Update info
            document.getElementById('currentVideoTitle').textContent = video.title;
            document.getElementById('currentVideoDescription').textContent = video.description;
        } catch (error) {
            console.error('Error playing video:', error);
            videoContainer.innerHTML = '<div class="error">Error loading video</div>';
        }
    }

    updateNavigationButtons();
    updateVideoListHighlight();
}

// Security enhancements
navigator.mediaDevices.getDisplayMedia = function() {
    alert("Screen recording is disabled for security reasons.");
    return Promise.reject(new Error("Screen recording blocked."));
};

document.addEventListener("visibilitychange", function() {
    const videoContainer = document.getElementById("videoContainer");
    if (document.hidden) {
        videoContainer.style.filter = "blur(10px)";
    } else {
        videoContainer.style.filter = "none";
    }
});

// Prevent right-click
document.addEventListener('contextmenu', (e) => e.preventDefault());

// Prevent keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && 
        (e.key === 'p' || e.key === 's' || e.key === 'u' || 
         e.key === 'c' || e.key === 'i')) {
        e.preventDefault();
    }
});

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevVideo');
    const nextBtn = document.getElementById('nextVideo');
    const playlist = playlists[currentPlaylist];

    if (prevBtn) {
        prevBtn.disabled = currentVideoIndex === 0;
    }
    if (nextBtn) {
        nextBtn.disabled = currentVideoIndex === playlist.length - 1;
    }
}

function navigateVideo(direction) {
    const playlist = playlists[currentPlaylist];
    const newIndex = currentVideoIndex + direction;

    if (newIndex >= 0 && newIndex < playlist.length) {
        currentVideoIndex = newIndex;
        playVideo();
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    if (!checkAuth()) return; // Use new auth check
    
    createVideoList();
    playVideo(); // Play first video

    document.getElementById('prevVideo')?.addEventListener('click', () => navigateVideo(-1));
    document.getElementById('nextVideo')?.addEventListener('click', () => navigateVideo(1));

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            navigateVideo(-1);
        } else if (e.key === 'ArrowRight') {
            navigateVideo(1);
        }
    });

    // Prevent back navigation to content page after logout
    if (performance.navigation.type === 2) {
        window.location.href = 'login.html';
    }
});

// Error #8: Weak authentication check
function isAuthenticated() {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return user !== null && token !== null && validateToken(token);
}

// Error #9: Missing token validation
function validateToken(token) {
    try {
        // Add your token validation logic here
        return true;
    } catch {
        return false;
    }
}

// Enhanced security measures
const securityMeasures = {
    init() {
        this.preventDevTools();
        this.preventScreenshots();
        this.preventKeyboardShortcuts();
        this.preventExternalRecording();
        this.initCleanup();
    },

    preventDevTools() {
        setInterval(() => {
            const threshold = 160;
            if (window.outerWidth - window.innerWidth > threshold || 
                window.outerHeight - window.innerHeight > threshold) {
                document.body.innerHTML = 'Developer tools are not allowed.';
                location.reload();
            }
        }, 1000);
    },

    preventScreenshots() {
        document.addEventListener("visibilitychange", () => {
            const container = document.getElementById("videoContainer");
            if (document.hidden) {
                container.style.filter = "blur(20px)";
            } else {
                container.style.filter = "none";
            }
        });
    },

    preventKeyboardShortcuts() {
        document.addEventListener('keydown', e => {
            if ((e.ctrlKey || e.metaKey) && 
                ['s', 'u', 'p', 'c', 'i', 'j'].includes(e.key.toLowerCase())) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        }, true);
    },

    preventDownloads() {
        document.addEventListener('dragstart', e => e.preventDefault());
        document.addEventListener('selectstart', e => e.preventDefault());
        document.addEventListener('contextmenu', e => e.preventDefault());
    },

    preventContextMenu() {
        document.addEventListener('contextmenu', e => {
            e.preventDefault();
            return false;
        });
    },

    preventExternalRecording() {
        Object.defineProperty(navigator, 'mediaDevices', {
            value: Object.freeze({
                getUserMedia: async () => { throw new Error('Recording blocked'); },
                getDisplayMedia: async () => { throw new Error('Screen capture blocked'); }
            })
        });
    },

    initCleanup() {
        window.addEventListener('unload', () => {
            const container = document.getElementById('videoContainer');
            if (container) container.innerHTML = '';
        });
    }
};

// Error #7: Missing error boundaries
window.onerror = function(msg, url, line) {
    console.error('Error:', msg, 'at', url, ':', line);
    return false;
};
