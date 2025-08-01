// 109ichiki.com Style Animations for Data Analyst Portfolio

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Set initial states
    gsap.set(['.hero-text-ichiki', '.hero-image-ichiki'], { opacity: 0 });
    gsap.set('.nav-ichiki', { y: -100 });
    
    // Navigation entrance animation
    gsap.to('.nav-ichiki', {
        y: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2
    });
    
    // Hero section animations - 109ichiki.com style
    const heroTl = gsap.timeline({ delay: 0.5 });
    
    heroTl.to('.hero-text-ichiki', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out"
    })
    .to('.hero-image-ichiki', {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "back.out(1.7)"
    }, "-=0.6")
    .from('.hero-label', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
    }, "-=1")
    .from('.hero-title-ichiki', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    }, "-=0.6")
    .from('.hero-subtitle-ichiki', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
    }, "-=0.4")
    .from('.hero-buttons-ichiki .btn-ichiki', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
    }, "-=0.3")
    .from('.social-links-ichiki .social-link-ichiki', {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)"
    }, "-=0.2");
    
    // Floating elements animation
    gsap.to('.floating-element', {
        y: '-20px',
        rotation: 360,
        duration: 6,
        ease: "none",
        repeat: -1,
        yoyo: true,
        stagger: {
            each: 2,
            repeat: -1
        }
    });
    
    // Section reveal animations - 109ichiki.com style
    gsap.utils.toArray('.section').forEach((section, index) => {
        const sectionHeader = section.querySelector('.section-header-ichiki');
        const sectionContent = section.querySelectorAll('.about-content-ichiki, .works-grid-ichiki, .skills-categories-ichiki, .experience-timeline-ichiki, .contact-content-ichiki');
        
        if (sectionHeader) {
            gsap.fromTo(sectionHeader.querySelector('.section-number'), {
                scale: 0,
                opacity: 0
            }, {
                scale: 1,
                opacity: 1,
                duration: 0.6,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: sectionHeader,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });
            
            gsap.fromTo(sectionHeader.querySelector('.section-title-ichiki'), {
                y: 50,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionHeader,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });
            
            gsap.fromTo(sectionHeader.querySelector('.section-subtitle-ichiki'), {
                y: 30,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power2.out",
                delay: 0.2,
                scrollTrigger: {
                    trigger: sectionHeader,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });
        }
        
        sectionContent.forEach(content => {
            gsap.fromTo(content, {
                y: 80,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: content,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });
        });
    });
    
    // About stats animation
    gsap.utils.toArray('.stat-card-ichiki').forEach((card, index) => {
        const number = card.querySelector('.stat-number');
        if (number) {
            const finalNumber = number.textContent;
            
            gsap.fromTo(card, {
                y: 50,
                opacity: 0,
                scale: 0.8
            }, {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                delay: index * 0.1,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });
            
            // Animate numbers counting up
            gsap.fromTo(number, {
                textContent: 0
            }, {
                textContent: finalNumber,
                duration: 2,
                ease: "power2.out",
                snap: { textContent: 1 },
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });
        }
    });
    
    // Works grid animation - 109ichiki.com style
    gsap.utils.toArray('.work-item-ichiki').forEach((item, index) => {
        gsap.fromTo(item, {
            y: 100,
            opacity: 0,
            scale: 0.8
        }, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            delay: index * 0.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: item,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });
    
    // Skills cards animation
    gsap.utils.toArray('.skill-card-ichiki').forEach((card, index) => {
        gsap.fromTo(card, {
            y: 60,
            opacity: 0,
            scale: 0.5
        }, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: index * 0.05,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none reverse"
            }
        });
    });
    
    // Timeline animation - 109ichiki.com style
    gsap.utils.toArray('.timeline-item-ichiki').forEach((item, index) => {
        const isEven = index % 2 === 0;
        
        gsap.fromTo(item, {
            x: isEven ? -100 : 100,
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            duration: 1,
            delay: index * 0.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: item,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });
    
    // Contact animation orbits
    gsap.utils.toArray('.data-orbit').forEach((orbit, index) => {
        gsap.to(orbit, {
            rotation: 360,
            duration: 4 + (index * 2),
            ease: "none",
            repeat: -1,
            transformOrigin: "center center"
        });
    });
    
    // Contact methods animation
    gsap.utils.toArray('.contact-method-ichiki').forEach((method, index) => {
        gsap.fromTo(method, {
            x: -50,
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: method,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });
    
    // Navigation scroll effect
    ScrollTrigger.create({
        start: "top -80",
        end: 99999,
        toggleClass: {className: "scrolled", targets: ".nav-ichiki"}
    });
    
    // Parallax effect for hero image
    gsap.to('.hero-image-container', {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
            trigger: '.hero-ichiki',
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });
    
    // Text reveal animation for hero title
    const heroTitle = document.querySelector('.hero-title-ichiki');
    if (heroTitle) {
        const chars = heroTitle.textContent.split('');
        heroTitle.innerHTML = chars.map(char => 
            char === ' ' ? ' ' : `<span class="char">${char}</span>`
        ).join('');
        
        gsap.fromTo('.hero-title-ichiki .char', {
            y: 100,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.03,
            ease: "power3.out",
            delay: 1
        });
    }
    
    // Magnetic effect for buttons
    document.querySelectorAll('.btn-ichiki, .social-link-ichiki').forEach(btn => {
        btn.addEventListener('mouseenter', function(e) {
            gsap.to(this, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        btn.addEventListener('mouseleave', function(e) {
            gsap.to(this, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        btn.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(this, {
                x: x * 0.1,
                y: y * 0.1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
    
    // Scroll-triggered text animations
    gsap.utils.toArray('.about-heading').forEach(heading => {
        gsap.fromTo(heading, {
            x: -50,
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: heading,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });
    
    // Loading screen animation (if exists)
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        gsap.to(loadingScreen, {
            opacity: 0,
            duration: 1,
            delay: 2,
            ease: "power2.out",
            onComplete: () => {
                loadingScreen.style.display = 'none';
            }
        });
    }
    
    // Cursor follow effect for work items
    document.querySelectorAll('.work-item-ichiki').forEach(item => {
        const overlay = item.querySelector('.work-overlay-ichiki');
        
        item.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            if (overlay) {
                gsap.to(overlay, {
                    background: `radial-gradient(circle at ${x}% ${y}%, rgba(0, 123, 255, 0.9) 0%, rgba(108, 92, 231, 0.9) 100%)`,
                    duration: 0.3
                });
            }
        });
    });
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                gsap.to(window, {
                    duration: 1.5,
                    scrollTo: {
                        y: targetElement,
                        offsetY: 80
                    },
                    ease: "power3.inOut"
                });
            }
        });
    });
    
    // Footer reveal animation
    gsap.fromTo('.footer-ichiki', {
        y: 100,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: '.footer-ichiki',
            start: "top 90%",
            toggleActions: "play none none reverse"
        }
    });
    
    // Performance optimization - refresh ScrollTrigger
    ScrollTrigger.refresh();
});

// Additional interactive animations
function initInteractiveAnimations() {
    // Skill card hover effects
    document.querySelectorAll('.skill-card-ichiki').forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this, {
                y: -10,
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });
            
            const icon = this.querySelector('.skill-icon-ichiki');
            if (icon) {
                gsap.to(icon, {
                    scale: 1.2,
                    rotation: 360,
                    duration: 0.5,
                    ease: "power2.out"
                });
            }
        });
        
        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                y: 0,
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
            
            const icon = this.querySelector('.skill-icon-ichiki');
            if (icon) {
                gsap.to(icon, {
                    scale: 1,
                    rotation: 0,
                    duration: 0.5,
                    ease: "power2.out"
                });
            }
        });
    });
    
    // Work item hover effects
    document.querySelectorAll('.work-item-ichiki').forEach(item => {
        item.addEventListener('mouseenter', function() {
            gsap.to(this, {
                y: -15,
                scale: 1.02,
                duration: 0.4,
                ease: "power2.out"
            });
        });
        
        item.addEventListener('mouseleave', function() {
            gsap.to(this, {
                y: 0,
                scale: 1,
                duration: 0.4,
                ease: "power2.out"
            });
        });
    });
    
    // Contact method hover effects
    document.querySelectorAll('.contact-method-ichiki').forEach(method => {
        method.addEventListener('mouseenter', function() {
            gsap.to(this, {
                x: 10,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        method.addEventListener('mouseleave', function() {
            gsap.to(this, {
                x: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
}

// Initialize interactive animations
document.addEventListener('DOMContentLoaded', initInteractiveAnimations);

// Text typing effect for hero subtitle
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect
setTimeout(() => {
    const heroSubtitle = document.querySelector('.hero-subtitle-ichiki');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        typeWriter(heroSubtitle, originalText, 30);
    }
}, 2000);

// Mouse cursor trail effect
function initCursorTrail() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-trail';
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: "power2.out"
        });
    });
    
    // Add cursor styles
    const cursorStyles = `
        .cursor-trail {
            position: fixed;
            width: 20px;
            height: 20px;
            background: rgba(0, 123, 255, 0.3);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: difference;
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = cursorStyles;
    document.head.appendChild(styleSheet);
}

// Initialize cursor trail
document.addEventListener('DOMContentLoaded', initCursorTrail);

// Add scroll-based parallax for background elements
function initScrollParallax() {
    gsap.utils.toArray('.floating-element').forEach((element, index) => {
        gsap.to(element, {
            yPercent: -50 * (index + 1),
            ease: "none",
            scrollTrigger: {
                trigger: element,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });
}

// Initialize scroll parallax
document.addEventListener('DOMContentLoaded', initScrollParallax);
