// 109ichiki.com Style Portfolio Filter

document.addEventListener('DOMContentLoaded', function() {
    
    // Portfolio filter functionality
    const portfolioFilter = {
        init() {
            this.bindEvents();
            this.initIsotope();
        },
        
        bindEvents() {
            const filterButtons = document.querySelectorAll('.filter-btn');
            filterButtons.forEach(btn => {
                btn.addEventListener('click', this.handleFilterClick.bind(this));
            });
            
            // Mobile menu toggle
            const menuToggle = document.querySelector('.nav-menu-toggle');
            const navMenu = document.querySelector('.nav-menu');
            
            if (menuToggle && navMenu) {
                menuToggle.addEventListener('click', () => {
                    navMenu.classList.toggle('active');
                    menuToggle.classList.toggle('active');
                });
                
                // Close menu when clicking on links
                const navLinks = document.querySelectorAll('.nav-link');
                navLinks.forEach(link => {
                    link.addEventListener('click', () => {
                        navMenu.classList.remove('active');
                        menuToggle.classList.remove('active');
                    });
                });
            }
        },
        
        handleFilterClick(e) {
            const button = e.target;
            const filter = button.dataset.filter;
            
            // Update active button
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            button.classList.add('active');
            
            // Filter items
            this.filterItems(filter);
        },
        
        filterItems(filter) {
            const items = document.querySelectorAll('.work-item-ichiki');
            
            items.forEach((item, index) => {
                const categories = item.dataset.category ? item.dataset.category.split(' ') : [];
                const shouldShow = filter === 'all' || categories.includes(filter);
                
                if (shouldShow) {
                    // Show item with animation
                    gsap.fromTo(item, {
                        opacity: 0,
                        scale: 0.8,
                        y: 30
                    }, {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        duration: 0.6,
                        delay: index * 0.1,
                        ease: "back.out(1.7)"
                    });
                    item.style.display = 'block';
                } else {
                    // Hide item with animation
                    gsap.to(item, {
                        opacity: 0,
                        scale: 0.8,
                        y: -30,
                        duration: 0.3,
                        ease: "power2.in",
                        onComplete: () => {
                            item.style.display = 'none';
                        }
                    });
                }
            });
        },
        
        initIsotope() {
            // Fallback for browsers without modern grid support
            const grid = document.querySelector('.works-grid-ichiki');
            if (!grid) return;
            
            // Initial load animation
            gsap.fromTo('.work-item-ichiki', {
                opacity: 0,
                y: 50,
                scale: 0.8
            }, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
                delay: 0.5
            });
        }
    };
    
    // Skills interaction
    const skillsInteraction = {
        init() {
            this.bindEvents();
        },
        
        bindEvents() {
            const skillCards = document.querySelectorAll('.skill-card-ichiki');
            
            skillCards.forEach(card => {
                card.addEventListener('mouseenter', this.handleSkillHover.bind(this));
                card.addEventListener('mouseleave', this.handleSkillLeave.bind(this));
                card.addEventListener('click', this.handleSkillClick.bind(this));
            });
        },
        
        handleSkillHover(e) {
            const card = e.currentTarget;
            const icon = card.querySelector('.skill-icon-ichiki');
            
            gsap.to(card, {
                y: -10,
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });
            
            gsap.to(icon, {
                scale: 1.2,
                rotation: 360,
                duration: 0.5,
                ease: "power2.out"
            });
            
            // Add ripple effect
            this.createRipple(card, e);
        },
        
        handleSkillLeave(e) {
            const card = e.currentTarget;
            const icon = card.querySelector('.skill-icon-ichiki');
            
            gsap.to(card, {
                y: 0,
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
            
            gsap.to(icon, {
                scale: 1,
                rotation: 0,
                duration: 0.5,
                ease: "power2.out"
            });
        },
        
        handleSkillClick(e) {
            const card = e.currentTarget;
            const skillName = card.querySelector('.skill-name-ichiki').textContent;
            
            // Create click animation
            gsap.to(card, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: "power2.inOut"
            });
            
            // Show skill info (could be expanded to show more details)
            console.log(`Clicked on: ${skillName}`);
        },
        
        createRipple(element, event) {
            const ripple = document.createElement('div');
            const rect = element.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = event.clientX - rect.left - size / 2;
            const y = event.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(0, 123, 255, 0.3);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1;
            `;
            
            element.style.position = 'relative';
            element.appendChild(ripple);
            
            gsap.fromTo(ripple, {
                scale: 0,
                opacity: 1
            }, {
                scale: 1,
                opacity: 0,
                duration: 0.6,
                ease: "power2.out",
                onComplete: () => {
                    ripple.remove();
                }
            });
        }
    };
    
    // Form interactions
    const formInteractions = {
        init() {
            this.bindEvents();
        },
        
        bindEvents() {
            const contactMethods = document.querySelectorAll('.contact-method-ichiki');
            
            contactMethods.forEach(method => {
                method.addEventListener('click', this.handleContactClick.bind(this));
            });
        },
        
        handleContactClick(e) {
            const method = e.currentTarget;
            const href = method.getAttribute('href');
            
            // Animation before action
            gsap.to(method, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: "power2.inOut",
                onComplete: () => {
                    if (href.startsWith('mailto:') || href.startsWith('tel:')) {
                        window.location.href = href;
                    } else if (href.startsWith('http')) {
                        window.open(href, '_blank');
                    }
                }
            });
            
            e.preventDefault();
        }
    };
    
    // Scroll to section functionality
    const scrollToSection = {
        init() {
            this.bindEvents();
        },
        
        bindEvents() {
            const links = document.querySelectorAll('a[href^="#"]');
            
            links.forEach(link => {
                link.addEventListener('click', this.handleSmoothScroll.bind(this));
            });
        },
        
        handleSmoothScroll(e) {
            e.preventDefault();
            
            const targetId = e.currentTarget.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
                
                gsap.to(window, {
                    duration: 1.5,
                    scrollTo: {
                        y: offsetTop,
                        autoKill: false
                    },
                    ease: "power3.inOut"
                });
            }
        }
    };
    
    // Work item interactions
    const workInteractions = {
        init() {
            this.bindEvents();
        },
        
        bindEvents() {
            const workItems = document.querySelectorAll('.work-item-ichiki');
            
            workItems.forEach(item => {
                item.addEventListener('mouseenter', this.handleWorkHover.bind(this));
                item.addEventListener('mouseleave', this.handleWorkLeave.bind(this));
                item.addEventListener('click', this.handleWorkClick.bind(this));
            });
        },
        
        handleWorkHover(e) {
            const item = e.currentTarget;
            const overlay = item.querySelector('.work-overlay-ichiki');
            const info = item.querySelector('.work-info-ichiki');
            
            gsap.to(item, {
                y: -15,
                scale: 1.02,
                duration: 0.4,
                ease: "power2.out"
            });
            
            gsap.to(overlay, {
                opacity: 0.9,
                duration: 0.3,
                ease: "power2.out"
            });
            
            gsap.to(info, {
                y: 0,
                opacity: 1,
                duration: 0.3,
                delay: 0.1,
                ease: "power2.out"
            });
        },
        
        handleWorkLeave(e) {
            const item = e.currentTarget;
            const overlay = item.querySelector('.work-overlay-ichiki');
            const info = item.querySelector('.work-info-ichiki');
            
            gsap.to(item, {
                y: 0,
                scale: 1,
                duration: 0.4,
                ease: "power2.out"
            });
            
            gsap.to(overlay, {
                opacity: 0,
                duration: 0.3,
                ease: "power2.out"
            });
            
            gsap.to(info, {
                y: 20,
                opacity: 0,
                duration: 0.2,
                ease: "power2.out"
            });
        },
        
        handleWorkClick(e) {
            const item = e.currentTarget;
            const link = item.querySelector('.work-link');
            
            if (link) {
                const href = link.getAttribute('href');
                if (href && href !== '#') {
                    window.open(href, '_blank');
                }
            }
        }
    };
    
    // Loading screen
    const loadingScreen = {
        init() {
            this.createLoadingScreen();
            this.hideLoadingScreen();
        },
        
        createLoadingScreen() {
            const loading = document.createElement('div');
            loading.className = 'loading-screen-ichiki';
            loading.innerHTML = `
                <div class="loading-content">
                    <div class="loading-logo">AK</div>
                    <div class="loading-text">Loading Portfolio...</div>
                    <div class="loading-bar">
                        <div class="loading-progress"></div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(loading);
            
            // Add CSS
            const loadingStyles = `
                .loading-screen-ichiki {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: var(--color-bg-primary);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                }
                
                .loading-content {
                    text-align: center;
                }
                
                .loading-logo {
                    font-family: var(--font-family-heading);
                    font-size: 4rem;
                    font-weight: var(--font-weight-black);
                    background: var(--gradient-primary);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    margin-bottom: 1rem;
                    animation: pulse 2s infinite;
                }
                
                .loading-text {
                    font-family: var(--font-family-mono);
                    font-size: 1rem;
                    color: var(--color-text-secondary);
                    margin-bottom: 2rem;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                }
                
                .loading-bar {
                    width: 200px;
                    height: 4px;
                    background: var(--color-border);
                    border-radius: 2px;
                    overflow: hidden;
                    margin: 0 auto;
                }
                
                .loading-progress {
                    width: 0%;
                    height: 100%;
                    background: var(--gradient-primary);
                    animation: loadingProgress 2s ease-out forwards;
                }
                
                @keyframes loadingProgress {
                    to { width: 100%; }
                }
            `;
            
            const styleSheet = document.createElement('style');
            styleSheet.textContent = loadingStyles;
            document.head.appendChild(styleSheet);
        },
        
        hideLoadingScreen() {
            setTimeout(() => {
                const loadingScreen = document.querySelector('.loading-screen-ichiki');
                if (loadingScreen) {
                    gsap.to(loadingScreen, {
                        opacity: 0,
                        duration: 1,
                        ease: "power2.out",
                        onComplete: () => {
                            loadingScreen.remove();
                        }
                    });
                }
            }, 2500);
        }
    };
    
    // Initialize all interactions
    portfolioFilter.init();
    skillsInteraction.init();
    formInteractions.init();
    scrollToSection.init();
    workInteractions.init();
    loadingScreen.init();
    
    // Performance optimization
    window.addEventListener('load', () => {
        // Refresh ScrollTrigger after all images are loaded
        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 1000);
    });
});
