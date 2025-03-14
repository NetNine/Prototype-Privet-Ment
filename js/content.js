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

// Enhanced video player function
function playVideo() {
    if (!isAuthenticated()) {
        window.location.href = 'login.html';
        return;
    }

    const playlist = playlists[currentPlaylist];
    const video = playlist[currentVideoIndex];
    const videoContainer = document.getElementById('videoContainer');
    
    if (videoContainer && video) {
        const securePlayerTemplate = `
            <div class="video-shield" id="secureWrapper">
                <div class="video-frame">
                    <iframe 
                        id="protectedVideo"
                        src="https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&modestbranding=1&rel=0&enablejsapi=1&origin=${window.location.origin}&controls=1&disablekb=1"
                        allow="encrypted-media; accelerometer; gyroscope"
                        sandbox="allow-same-origin allow-scripts allow-presentation"
                        loading="lazy"
                        oncontextmenu="return false;"
                    ></iframe>
                </div>
                <div class="multi-layer-watermark">
                    <div class="watermark-primary" id="dynamicWatermark"></div>
                </div>
            </div>
        `;
        
        videoContainer.innerHTML = securePlayerTemplate;
        applyAdvancedProtection();
    }
    
    updateVideoInfo(video);
    updateNavigationButtons();
    updateVideoListHighlight();
}

function applyAdvancedProtection() {
    const wrapper = document.getElementById('secureWrapper');
    const iframe = document.getElementById('protectedVideo');
    const userId = localStorage.getItem('user');

    // Frame busting code
    if (window.top !== window.self) {
        window.top.location.href = window.self.location.href;
    }

    // Advanced watermarking
    const applyWatermark = () => {
        const watermark = document.getElementById('dynamicWatermark');
        
        setInterval(() => {
            const timestamp = new Date().toISOString();
            const position = `${Math.random() * 90}% ${Math.random() * 90}%`;
            watermark.textContent = `${userId} | ${timestamp}`;
            watermark.style.transform = `translate(${position}) rotate(${Math.random() * 360}deg)`;
        }, 1000);
    };

    // Block video download attempts
    const blockDownloads = () => {
        const preventAction = (e) => {
            e.preventDefault();
            e.stopPropagation();
            return false;
        };

        wrapper.addEventListener('contextmenu', preventAction, true);
        wrapper.addEventListener('dragstart', preventAction, true);
        wrapper.addEventListener('selectstart', preventAction, true);
        wrapper.addEventListener('copy', preventAction, true);
        
        // Block common download key combinations
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && 
                ['s', 'u', 'p', 'a', 'i', 'c'].includes(e.key.toLowerCase())) {
                preventAction(e);
            }
        }, true);
    };

    // Initialize all protections
    applyWatermark();
    blockDownloads();
}

function updateVideoInfo(video) {
    const titleElement = document.getElementById('currentVideoTitle');
    const descElement = document.getElementById('currentVideoDescription');
    
    if (titleElement) titleElement.textContent = video.title;
    if (descElement) descElement.textContent = video.description;
}

function applyVideoProtection() {
    // Add dynamic watermark
    const watermark = document.getElementById('dynamicWatermark');
    const userId = localStorage.getItem('user');
    if (watermark && userId) {
        setInterval(() => {
            watermark.textContent = `${userId} - ${new Date().toISOString()}`;
            watermark.style.top = `${Math.random() * 90}%`;
            watermark.style.left = `${Math.random() * 90}%`;
        }, 3000);
    }

    // Add protection layer
    const wrapper = document.getElementById('videoWrapper');
    if (wrapper) {
        wrapper.addEventListener('selectstart', e => e.preventDefault());
        wrapper.addEventListener('dragstart', e => e.preventDefault());
        wrapper.addEventListener('keydown', e => {
            if (e.ctrlKey || e.metaKey) e.preventDefault();
        });
    }
}

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

document.addEventListener('DOMContentLoaded', function() {
    // Initialize standard navigation
    initializeNavigation();
    
    // Content page specific code
    setupVideoPlayer();
    createVideoList(); // Ensure video list is created after DOM is loaded
    playVideo(); // Play first video
});

function initializeNavigation() {
    // Set active menu item
    const menuItems = document.querySelectorAll('.nav-menu a, .mobile-links a');
    menuItems.forEach(item => {
        if (item.getAttribute('href').includes('content.html')) {
            item.classList.add('active');
        }
    });

    // Setup auth state
    updateAuthState();
}

document.addEventListener('DOMContentLoaded', () => {
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

function isAuthenticated() {
    return localStorage.getItem('user') !== null;
}

// Security Enhancements
function initializeSecurityMeasures() {
    // Disable right-click
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
    });

    // Disable keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Prevent common shortcuts
        if ((e.ctrlKey || e.metaKey) && 
            ['s', 'u', 'p', 'a', 'i'].includes(e.key.toLowerCase())) {
            e.preventDefault();
            return false;
        }
    });

    // Block screen recording
    if (navigator.mediaDevices) {
        navigator.mediaDevices.getDisplayMedia = () => {
            throw new Error('Screen recording is not allowed');
        };
    }

    // Block downloads
    document.addEventListener('dragstart', (e) => e.preventDefault());
    document.addEventListener('drop', (e) => e.preventDefault());
    
    // Add video protection
    const videoContainer = document.getElementById('videoContainer');
    if (videoContainer) {
        // Blur video when tab is not focused
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                videoContainer.style.filter = 'blur(20px)';
            } else {
                videoContainer.style.filter = 'none';
            }
        });

        // Add video encryption layer
        videoContainer.innerHTML = `
            <div class="video-protection-layer">
                <iframe 
                    id="protectedVideo"
                    allowfullscreen
                    allow="encrypted-media"
                    sandbox="allow-same-origin allow-scripts"
                    loading="lazy"
                ></iframe>
            </div>
        `;
    }
}

// Initialize security when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    initializeSecurityMeasures();
});
