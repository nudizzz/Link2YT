// ========================================
// Sample Data - Replace with your own links
// ========================================

// Video Links Data
// Add your video links here with: url, thumbnail, title, and description
const videoLinks = [
    {
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        thumbnail: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=640&q=80",
        title: "Sample Video 1",
        description: "This is a sample video description. Click to watch in a new tab."
    },
    {
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        thumbnail: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=640&q=80",
        title: "Sample Video 2",
        description: "Another sample video with a brief description of what it contains."
    },
    {
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        thumbnail: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=640&q=80",
        title: "Sample Video 3",
        description: "Short description for this video link that will open in a new tab."
    },
    {
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=640&q=80",
        title: "Sample Video 4",
        description: "Click this card to be redirected to watch this video."
    },
    {
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        thumbnail: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=640&q=80",
        title: "Sample Video 5",
        description: "A compelling video that you might want to check out."
    },
    {
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        thumbnail: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=640&q=80",
        title: "Sample Video 6",
        description: "The last sample video in our collection for demonstration."
    }
];

// Pictures/GIFs Data (Used on Pictures page)
// Add your images here with: src and title
const pictures = [
    {
        src: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=640&q=80",
        title: "Mountain Landscape"
    },
    {
        src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=640&q=80",
        title: "Foggy Forest"
    },
    {
        src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=640&q=80",
        title: "Valley View"
    },
    {
        src: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=640&q=80",
        title: "Forest Path"
    },
    {
        src: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=640&q=80",
        title: "Waterfall"
    },
    {
        src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=640&q=80",
        title: "Lake Reflection"
    },
    {
        src: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=640&q=80",
        title: "Ocean Waves"
    },
    {
        src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=640&q=80",
        title: "Beach Sunset"
    }
];

// ========================================
// Video Grid Rendering (Homepage)
// ========================================
function renderVideoGrid() {
    const videoGrid = document.getElementById('videoGrid');
    if (!videoGrid) return;

    if (videoLinks.length === 0) {
        videoGrid.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🎬</div>
                <p class="empty-state-text">No videos added yet. Edit scripts.js to add your links!</p>
            </div>
        `;
        return;
    }

    videoGrid.innerHTML = videoLinks.map((video, index) => `
        <article class="video-card" onclick="openDetailModal('video', ${index})" style="animation-delay: ${index * 0.05}s">
            <div class="card-thumbnail">
                <img src="${video.thumbnail}" alt="${video.title}" loading="lazy">
                <div class="play-icon"></div>
            </div>
            <div class="card-content">
                <h3 class="card-title">${video.title}</h3>
                <p class="card-description">${video.description}</p>
            </div>
        </article>
    `).join('');
}

// ========================================
// Picture Grid Rendering (Pictures Page)
// ========================================
function renderPictureGrid() {
    const pictureGrid = document.getElementById('pictureGrid');
    if (!pictureGrid) return;

    if (pictures.length === 0) {
        pictureGrid.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🖼️</div>
                <p class="empty-state-text">No pictures added yet. Edit scripts.js to add your images!</p>
            </div>
        `;
        return;
    }

    pictureGrid.innerHTML = pictures.map((pic, index) => `
        <article class="picture-card" onclick="openDetailModal('picture', ${index})" style="animation-delay: ${index * 0.05}s">
            <div class="picture-wrapper">
                <img src="${pic.src}" alt="${pic.title}" loading="lazy">
            </div>
            <div class="picture-overlay">
                <span class="picture-title">${pic.title}</span>
            </div>
        </article>
    `).join('');
}

// ========================================
// Detail Modal Functions
// ========================================
function createDetailModal() {
    // Check if modal already exists
    if (document.getElementById('detailModal')) return;

    const modalHTML = `
        <div class="detail-modal" id="detailModal" onclick="handleModalBackdropClick(event)">
            <div class="detail-modal-content">
                <button class="detail-modal-close" onclick="closeDetailModal()" aria-label="Close modal">&times;</button>
                <div class="detail-modal-inner">
                    <div class="detail-modal-info" id="modalInfo">
                        <!-- Info content will be injected here -->
                    </div>
                    <div class="detail-modal-media" id="modalMedia">
                        <!-- Media content will be injected here -->
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function openDetailModal(type, index) {
    createDetailModal();
    
    const modal = document.getElementById('detailModal');
    const modalInfo = document.getElementById('modalInfo');
    const modalMedia = document.getElementById('modalMedia');

    if (type === 'video') {
        const video = videoLinks[index];
        modalInfo.innerHTML = `
            <span class="detail-modal-badge">Video</span>
            <h2 class="detail-modal-title">${video.title}</h2>
            <p class="detail-modal-description">${video.description}</p>
            <a href="${video.url}" target="_blank" rel="noopener noreferrer" class="detail-modal-link">
                <span>Watch Video</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
            </a>
        `;
        modalMedia.innerHTML = `
            <div class="detail-modal-image-wrapper">
                <img src="${video.thumbnail}" alt="${video.title}">
                <div class="detail-modal-play-overlay">
                    <div class="detail-modal-play-icon"></div>
                </div>
            </div>
        `;
    } else if (type === 'picture') {
        const picture = pictures[index];
        modalInfo.innerHTML = `
            <span class="detail-modal-badge">Picture</span>
            <h2 class="detail-modal-title">${picture.title}</h2>
            <p class="detail-modal-description">Click the image to view it in full size, or use the button below to open it in a new tab.</p>
            <a href="${picture.src}" target="_blank" rel="noopener noreferrer" class="detail-modal-link">
                <span>Open Full Size</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
            </a>
        `;
        modalMedia.innerHTML = `
            <div class="detail-modal-image-wrapper detail-modal-image-clickable" onclick="openFullImage('${picture.src}', '${picture.title}')">
                <img src="${picture.src}" alt="${picture.title}">
                <div class="detail-modal-zoom-overlay">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        <line x1="11" y1="8" x2="11" y2="14"></line>
                        <line x1="8" y1="11" x2="14" y2="11"></line>
                    </svg>
                </div>
            </div>
        `;
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeDetailModal() {
    const modal = document.getElementById('detailModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function handleModalBackdropClick(event) {
    if (event.target.classList.contains('detail-modal')) {
        closeDetailModal();
    }
}

function openFullImage(src, title) {
    // Stop event from closing the detail modal
    event.stopPropagation();
    openLightbox(src, title);
}

// ========================================
// Open Link in New Tab
// ========================================
function openLink(url) {
    window.open(url, '_blank', 'noopener,noreferrer');
}

// ========================================
// Lightbox Functions (for full-size image view)
// ========================================
function createLightbox() {
    if (document.getElementById('lightbox')) return;

    const lightboxHTML = `
        <div class="lightbox" id="lightbox" onclick="handleLightboxClick(event)">
            <div class="lightbox-content">
                <button class="lightbox-close" onclick="closeLightbox()" aria-label="Close">&times;</button>
                <img id="lightboxImg" src="" alt="">
                <p class="lightbox-title" id="lightboxTitle"></p>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);
}

function openLightbox(src, title) {
    createLightbox();
    
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxTitle = document.getElementById('lightboxTitle');

    if (lightbox && lightboxImg && lightboxTitle) {
        lightboxImg.src = src;
        lightboxImg.alt = title;
        lightboxTitle.textContent = title;
        lightbox.classList.add('active');
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
    }
}

function handleLightboxClick(event) {
    if (event.target.classList.contains('lightbox')) {
        closeLightbox();
    }
}

// Close modals on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
        closeDetailModal();
    }
});

// ========================================
// Initialize on DOM Load
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    renderVideoGrid();
    renderPictureGrid();
});
