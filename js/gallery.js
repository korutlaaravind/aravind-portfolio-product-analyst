// Gallery functionality - 109ichiki.com Style

document.addEventListener('DOMContentLoaded', function() {
    const galleryTabs = document.querySelectorAll('.gallery-tab');
    const galleryItems = document.querySelectorAll('.gallery-item-ichiki');
    const galleryModal = document.getElementById('galleryModal');
    const modalImage = document.querySelector('.modal-image-ichiki');
    const modalClose = document.querySelector('.modal-close-ichiki');
    const modalBackdrop = document.querySelector('.modal-backdrop-ichiki');
    const modalPrev = document.querySelector('.modal-prev-ichiki');
    const modalNext = document.querySelector('.modal-next-ichiki');
    
    let currentImageIndex = 0;
    let currentImages = [];
    
    // Tab filtering functionality
    galleryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Update active tab
            galleryTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Filter gallery items
            filterGalleryItems(category);
        });
    });
    
    function filterGalleryItems(category) {
        galleryItems.forEach((item, index) => {
            const itemCategory = item.dataset.category;
            const shouldShow = category === 'all' || itemCategory === category;
            
            if (shouldShow) {
                item.classList.remove('hidden');
                // Stagger animation
                setTimeout(() => {
                    item.style.animation = `galleryItemFadeIn 0.6s ease-out forwards`;
                }, index * 100);
            } else {
                item.classList.add('hidden');
            }
        });
        
        // Update current images array for modal navigation
        updateCurrentImages(category);
    }
    
    function updateCurrentImages(category) {
        currentImages = [];
        galleryItems.forEach(item => {
            const itemCategory = item.dataset.category;
            const shouldShow = category === 'all' || itemCategory === category;
            
            if (shouldShow) {
                const img = item.querySelector('img');
                currentImages.push(img.src);
            }
        });
    }
    
    // Modal functionality
    galleryItems.forEach((item, index) => {
        const zoomBtn = item.querySelector('.gallery-zoom');
        const img = item.querySelector('img');
        
        zoomBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            openModal(img.src, index);
        });
        
        // Also allow clicking on image to open modal
        img.addEventListener('click', function() {
            openModal(img.src, index);
        });
    });
    
    function openModal(imageSrc, index) {
        modalImage.src = imageSrc;
        galleryModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Set current index based on visible images
        const activeCategory = document.querySelector('.gallery-tab.active').dataset.category;
        updateCurrentImages(activeCategory);
        currentImageIndex = currentImages.indexOf(imageSrc);
    }
    
    function closeModal() {
        galleryModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function showPrevImage() {
        if (currentImages.length === 0) return;
        
        currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
        modalImage.src = currentImages[currentImageIndex];
        
        // Add transition effect
        modalImage.style.transform = 'scale(0.9)';
        setTimeout(() => {
            modalImage.style.transform = 'scale(1)';
        }, 150);
    }
    
    function showNextImage() {
        if (currentImages.length === 0) return;
        
        currentImageIndex = (currentImageIndex + 1) % currentImages.length;
        modalImage.src = currentImages[currentImageIndex];
        
        // Add transition effect
        modalImage.style.transform = 'scale(0.9)';
        setTimeout(() => {
            modalImage.style.transform = 'scale(1)';
        }, 150);
    }
    
    // Modal event listeners
    modalClose.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);
    modalPrev.addEventListener('click', showPrevImage);
    modalNext.addEventListener('click', showNextImage);
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (galleryModal.classList.contains('active')) {
            switch(e.key) {
                case 'Escape':
                    closeModal();
                    break;
                case 'ArrowLeft':
                    showPrevImage();
                    break;
                case 'ArrowRight':
                    showNextImage();
                    break;
            }
        }
    });
    
    // Initialize with all images
    updateCurrentImages('all');
    
    // GSAP animations for gallery items on scroll
    if (typeof gsap !== 'undefined' && gsap.utils) {
        gsap.utils.toArray('.gallery-item-ichiki').forEach((item, index) => {
            gsap.fromTo(item, {
                y: 50,
                opacity: 0,
                scale: 0.9
            }, {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                delay: index * 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: item,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });
        });
    }
});