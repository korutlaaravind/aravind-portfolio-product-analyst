// 109ichiki.com Style Scroll Effects

document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scroll behavior
    const smoothScroll = {
        init() {
            this.bindEvents();
        },
        
        bindEvents() {
            // Update active navigation on scroll
            window.addEventListener('scroll', this.updateActiveNav.bind(this));
            
            // Parallax effects
            window.addEventListener('scroll', this.parallaxEffects.bind(this));
            
            // Progress indicator
            window.addEventListener('scroll', this.updateProgressIndicator.bind(this));
        },
        
        updateActiveNav() {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-link');
            
            let current = '';
            const scrollY = window.pageYOffset;
            
            sections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop - 100;
                const sectionId = section.getAttribute('id');
                
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    current = sectionId;
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        },
        
        parallaxEffects() {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('[data-parallax]');
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.parallax || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        },
        
        updateProgressIndicator() {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            
            const progressBar = document.querySelector('.scroll-progress');
            if (progressBar) {
                progressBar.style.width = scrolled + '%';
            }
        }
    };
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                
                // Trigger specific animations based on class
                if (entry.target.classList.contains('stat-card-ichiki')) {
                    animateCounter(entry.target);
                }
                
                if (entry.target.classList.contains('skill-card-ichiki')) {
                    animateSkillCard(entry.target);
                }
                
                if (entry.target.classList.contains('work-item-ichiki')) {
                    animateWorkItem(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.stat-card-ichiki, .skill-card-ichiki, .work-item-ichiki, .timeline-item-ichiki, .contact-method-ichiki'
    );
    
    animatedElements.forEach(el => observer.observe(el));
    
    // Counter animation function
    function animateCounter(element) {
        const counter = element.querySelector('.stat-number');
        if (!counter || counter.dataset.animated) return;
        
        const target = parseInt(counter.textContent.replace(/[^0-9]/g, ''));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            const suffix = counter.textContent.replace(/[0-9]/g, '');
            counter.textContent = Math.floor(current) + suffix;
        }, 16);
        
        counter.dataset.animated = 'true';
    }
    
    // Skill card animation
    function animateSkillCard(element) {
        if (element.dataset.animated) return;
        
        gsap.fromTo(element, {
            scale: 0.8,
            opacity: 0,
            y: 30
        }, {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "back.out(1.7)"
        });
        
        element.dataset.animated = 'true';
    }
    
    // Work item animation
    function animateWorkItem(element) {
        if (element.dataset.animated) return;
        
        gsap.fromTo(element, {
            y: 50,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out"
        });
        
        element.dataset.animated = 'true';
    }
    
    // Scroll reveal effects
    const scrollReveal = {
        distance: '60px',
        duration: 2500,
        delay: 300,
        reset: false
    };
    
    // Text appear on scroll
    function revealText() {
        const textElements = document.querySelectorAll('.reveal-text');
        
        textElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
    
    // Custom scroll animations for specific elements
    function customScrollAnimations() {
        const scrollY = window.pageYOffset;
        
        // Hero image rotation
        const heroImage = document.querySelector('.hero-image-container');
        if (heroImage) {
            const rotation = scrollY * 0.1;
            heroImage.style.transform = `rotate(${rotation}deg)`;
        }
        
        // Floating elements movement
        const floatingElements = document.querySelectorAll('.floating-element');
        floatingElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.2);
            const yPos = scrollY * speed;
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        // Data orbits in contact section
        const dataOrbits = document.querySelectorAll('.data-orbit');
        dataOrbits.forEach((orbit, index) => {
            const speed = 0.3 + (index * 0.1);
            const rotation = scrollY * speed;
            orbit.style.transform = `rotate(${rotation}deg)`;
        });
    }
    
    // Mouse cursor effects
    function initCursorEffects() {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);
        
        const cursorDot = document.createElement('div');
        cursorDot.className = 'cursor-dot';
        document.body.appendChild(cursorDot);
        
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        function animateCursor() {
            const diffX = mouseX - cursorX;
            const diffY = mouseY - cursorY;
            
            cursorX += diffX * 0.1;
            cursorY += diffY * 0.1;
            
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
            
            requestAnimationFrame(animateCursor);
        }
        
        animateCursor();
        
        // Cursor hover effects
        const hoverElements = document.querySelectorAll('a, button, .btn-ichiki, .work-item-ichiki, .skill-card-ichiki');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-hover');
                cursorDot.classList.add('cursor-hover');
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-hover');
                cursorDot.classList.remove('cursor-hover');
            });
        });
    }
    
    // Scroll direction detection
    let lastScrollTop = 0;
    function detectScrollDirection() {
        const st = window.pageYOffset || document.documentElement.scrollTop;
        const nav = document.querySelector('.nav-ichiki');
        
        if (st > lastScrollTop && st > 100) {
            // Scrolling down
            nav.classList.add('nav-hidden');
        } else {
            // Scrolling up
            nav.classList.remove('nav-hidden');
        }
        
        lastScrollTop = st <= 0 ? 0 : st;
    }
    
    // Viewport animations
    function animateOnScroll() {
        const animatedElements = document.querySelectorAll('[data-animate]');
        
        animatedElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible && !element.classList.contains('animated')) {
                const animationType = element.dataset.animate;
                
                switch (animationType) {
                    case 'fadeIn':
                        gsap.fromTo(element, { opacity: 0 }, { opacity: 1, duration: 1 });
                        break;
                    case 'slideUp':
                        gsap.fromTo(element, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 });
                        break;
                    case 'slideLeft':
                        gsap.fromTo(element, { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8 });
                        break;
                    case 'slideRight':
                        gsap.fromTo(element, { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8 });
                        break;
                    case 'scale':
                        gsap.fromTo(element, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8 });
                        break;
                }
                
                element.classList.add('animated');
            }
        });
    }
    
    // Throttled scroll event
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(() => {
                customScrollAnimations();
                revealText();
                detectScrollDirection();
                animateOnScroll();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    // Event listeners
    window.addEventListener('scroll', requestTick);
    window.addEventListener('resize', () => {
        ScrollTrigger.refresh();
    });
    
    // Initialize all scroll effects
    smoothScroll.init();
    initCursorEffects();
    
    // CSS for cursor effects
    const cursorStyles = `
        .custom-cursor {
            position: fixed;
            width: 20px;
            height: 20px;
            border: 2px solid var(--color-primary);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
        }
        
        .cursor-dot {
            position: fixed;
            width: 4px;
            height: 4px;
            background: var(--color-primary);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
        }
        
        .cursor-hover {
            transform: scale(1.5);
        }
        
        .nav-hidden {
            transform: translateY(-100%);
        }
        
        .reveal-text {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .reveal-text.active {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = cursorStyles;
    document.head.appendChild(styleSheet);
});
