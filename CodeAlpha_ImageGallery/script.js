// Sample images
let images = [
    { id: 1, src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400', title: 'Mountain View' },
    { id: 2, src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400', title: 'Nature Path' },
    { id: 3, src: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400', title: 'Forest Trail' },
    { id: 4, src: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400', title: 'Waterfall' },
    { id: 6, src: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400', title: 'Meadow' },
    { id: 7, src: 'images1.jpg', title: 'Parliament' },
    { id: 8, src: 'images2.jpg', title: 'Sati Logo' },
    { id: 9, src: 'images3.jpg', title: 'Money Heist' },
    { id: 10, src: 'images4.jpg', title: 'KV Barkuhi' },
    { id: 11, src: 'images5.jpg', title: 'Sati' },
];

let currentIndex = 0;
let zoom = 100;
let rotation = 0;

// Initialize gallery
function renderGallery(filter = '') {
    const grid = document.getElementById('galleryGrid');
    const filtered = images.filter(img => 
        img.title.toLowerCase().includes(filter.toLowerCase())
    );
    
    grid.innerHTML = filtered.map(img => `
        <div class="gallery-item" onclick="openViewer(${img.id})">
            <img src="${img.src}" alt="${img.title}">
            <div class="overlay">
                <span class="title">${img.title}</span>
            </div>
        </div>
    `).join('');
}

// Open image viewer
function openViewer(id) {
    currentIndex = images.findIndex(img => img.id === id);
    zoom = 100;
    rotation = 0;
    updateViewer();
    document.getElementById('viewer').classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close viewer
function closeViewer() {
    document.getElementById('viewer').classList.remove('active');
    document.body.style.overflow = '';
}

// Update viewer display
function updateViewer() {
    const img = images[currentIndex];
    const viewerImg = document.getElementById('viewerImage');
    viewerImg.src = img.src;
    viewerImg.style.transform = `scale(${zoom / 100}) rotate(${rotation}deg)`;
    
    document.getElementById('viewerTitle').textContent = img.title;
    document.getElementById('zoomSlider').value = zoom;
    document.getElementById('zoomValue').textContent = zoom + '%';
    
    // Update nav buttons
    document.getElementById('prevBtn').style.visibility = currentIndex === 0 ? 'hidden' : 'visible';
    document.getElementById('nextBtn').style.visibility = currentIndex === images.length - 1 ? 'hidden' : 'visible';
}

// Navigation
function navigatePrev() {
    if (currentIndex > 0) {
        currentIndex--;
        zoom = 100;
        rotation = 0;
        updateViewer();
    }
}

function navigateNext() {
    if (currentIndex < images.length - 1) {
        currentIndex++;
        zoom = 100;
        rotation = 0;
        updateViewer();
    }
}

// Zoom functions
function zoomIn() {
    if (zoom < 400) {
        zoom += 25;
        updateViewer();
    }
}

function zoomOut() {
    if (zoom > 25) {
        zoom -= 25;
        updateViewer();
    }
}

// Action handlers
function handleEdit() {
    showToast('Edit', 'Opening editor...');
}

function handleRotate() {
    rotation = (rotation + 90) % 360;
    updateViewer();
    showToast('Rotate', 'Rotated 90°');
}

function handleDelete() {
    const img = images[currentIndex];
    images = images.filter(i => i.id !== img.id);
    closeViewer();
    renderGallery();
    showToast('Delete', 'Image deleted');
}

function handleCopy() {
    showToast('Copy', 'Image URL copied!');
}

function toggleFullscreen() {
    const viewer = document.getElementById('viewer');
    if (!document.fullscreenElement) {
        viewer.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

// Toast notification
function showToast(title, desc) {
    const toast = document.getElementById('toast');
    document.getElementById('toastTitle').textContent = title;
    document.getElementById('toastDesc').textContent = desc;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
}

// Event listeners
document.getElementById('searchInput').addEventListener('input', (e) => {
    renderGallery(e.target.value);
});

document.getElementById('zoomSlider').addEventListener('input', (e) => {
    zoom = parseInt(e.target.value);
    updateViewer();
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    const viewer = document.getElementById('viewer');
    if (!viewer.classList.contains('active')) return;
    
    switch(e.key) {
        case 'Escape': closeViewer(); break;
        case 'ArrowLeft': navigatePrev(); break;
        case 'ArrowRight': navigateNext(); break;
        case '+':
        case '=': zoomIn(); break;
        case '-': zoomOut(); break;
    }
});

// Initial render
renderGallery();