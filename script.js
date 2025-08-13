// JARVIS-inspired interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Add holographic scan lines effect
    createScanLines();
    
    // Add floating particles background
    createParticleField();
    
    // Smooth scrolling for anchor links with holographic transition
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Add holographic transition effect
                document.body.style.filter = 'hue-rotate(30deg) brightness(1.1)';
                setTimeout(() => {
                    document.body.style.filter = 'none';
                }, 300);
                
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Enhanced header with holographic effects
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        const scrollProgress = Math.min(currentScrollY / 200, 1);
        
        if (currentScrollY > 100) {
            header.style.background = `rgba(0, 5, 16, ${0.85 + scrollProgress * 0.1})`;
            header.style.backdropFilter = 'blur(25px) saturate(180%)';
            header.style.borderBottom = `1px solid rgba(14, 165, 233, ${0.2 + scrollProgress * 0.2})`;
            header.style.boxShadow = `0 0 30px rgba(14, 165, 233, ${scrollProgress * 0.2})`;
        } else {
            header.style.background = 'transparent';
            header.style.backdropFilter = 'blur(20px) saturate(180%)';
            header.style.borderBottom = 'none';
            header.style.boxShadow = 'none';
        }

        // Add parallax effect to hero elements
        const heroElements = document.querySelectorAll('.hero-content, .hero-visual');
        heroElements.forEach((element, index) => {
            const speed = 0.5 + index * 0.2;
            element.style.transform = `translateY(${currentScrollY * speed * 0.3}px)`;
        });

        lastScrollY = currentScrollY;
    });

    // Enhanced animation with holographic reveals
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) rotateX(0deg)';
                    entry.target.style.filter = 'none';
                    
                    // Add holographic reveal effect
                    entry.target.style.animation = 'hologram-reveal 0.8s ease-out';
                }, index * 150);
            }
        });
    }, observerOptions);

    // Observe feature cards with enhanced holographic pre-state
    document.querySelectorAll('.feature-card, .pricing-card, .use-case').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px) rotateX(10deg)';
        card.style.filter = 'blur(5px) brightness(0.7)';
        card.style.transition = 'all 0.8s ease';
        observer.observe(card);
    });

    // Add click handlers for CTA buttons
    document.querySelectorAll('.primary-button, .cta-button, .plan-button').forEach(button => {
        button.addEventListener('click', function(e) {
            // Add ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);

            // Simulate action (replace with actual functionality)
            console.log('Button clicked:', this.textContent.trim());
            
            // For demo purposes, show a simple alert
            if (this.textContent.includes('Start') || this.textContent.includes('Join')) {
                setTimeout(() => {
                    alert('Thanks for your interest! This would redirect to the signup page.');
                }, 200);
            }
        });
    });

    // Enhanced holographic typing effect with proper HTML handling
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        // Parse the HTML content properly
        const originalHTML = heroTitle.innerHTML;
        const textParts = [
            { text: 'Stop guessing why your', isGradient: false },
            { text: 'background jobs fail', isGradient: true }
        ];
        
        heroTitle.innerHTML = '';
        heroTitle.style.opacity = '1';
        
        let currentPartIndex = 0;
        let currentCharIndex = 0;
        const typeSpeed = 80;
        
        function holographicTypeWriter() {
            if (currentPartIndex < textParts.length) {
                const currentPart = textParts[currentPartIndex];
                
                if (currentCharIndex < currentPart.text.length) {
                    const char = currentPart.text.charAt(currentCharIndex);
                    const span = document.createElement('span');
                    span.innerHTML = char;
                    span.style.animation = 'char-glow 0.5s ease-out';
                    span.style.textShadow = '0 0 10px rgba(14, 165, 233, 0.8)';
                    
                    // Apply gradient styling if this is the gradient part
                    if (currentPart.isGradient && currentCharIndex === 0) {
                        // Create a container for the gradient text
                        const gradientContainer = document.createElement('span');
                        gradientContainer.className = 'gradient-text';
                        heroTitle.appendChild(gradientContainer);
                    }
                    
                    // Add character to appropriate container
                    if (currentPart.isGradient) {
                        const gradientContainer = heroTitle.querySelector('.gradient-text');
                        gradientContainer.appendChild(span);
                    } else {
                        heroTitle.appendChild(span);
                    }
                    
                    // Add holographic flicker effect
                    if (Math.random() > 0.9) {
                        setTimeout(() => {
                            span.style.animation = 'holographic-glitch 0.3s ease-out';
                        }, 100);
                    }
                    
                    currentCharIndex++;
                } else {
                    // Move to next part
                    currentPartIndex++;
                    currentCharIndex = 0;
                    
                    // Add line break between parts
                    if (currentPartIndex === 1) {
                        heroTitle.appendChild(document.createElement('br'));
                    }
                }
                
                setTimeout(holographicTypeWriter, typeSpeed);
            }
        }
        
        setTimeout(holographicTypeWriter, 800);
    }

    // Enhanced parallax with 3D holographic transforms
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroVisual = document.querySelector('.hero-visual');
        const mockup = document.querySelector('.dashboard-mockup');
        
        if (heroVisual && mockup) {
            const rate = scrolled * -0.2;
            const rotationX = Math.min(scrolled * 0.02, 10);
            const rotationY = Math.sin(scrolled * 0.001) * 3;
            
            heroVisual.style.transform = `translateY(${rate}px)`;
            mockup.style.transform = `translateY(${rate * 0.5}px) rotateX(${rotationX}deg) rotateY(${rotationY}deg) perspective(1000px)`;
            
            // Add depth-based glow effect
            const glowIntensity = Math.min(scrolled * 0.001, 0.5);
            mockup.style.filter = `drop-shadow(0 0 ${20 + scrolled * 0.05}px rgba(14, 165, 233, ${0.3 + glowIntensity}))`;
        }
    });

    // Add hover effect to dashboard mockup status cards
    document.querySelectorAll('.status-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Mobile menu toggle (if needed in future)
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-open');
        });
    }

    // Enhanced holographic loading sequence
    document.body.style.opacity = '0';
    document.body.style.filter = 'blur(10px) hue-rotate(30deg)';
    document.body.style.transition = 'all 0.8s ease';
    
    // Simulate JARVIS boot sequence
    setTimeout(() => {
        document.body.style.opacity = '0.3';
        document.body.style.filter = 'blur(5px) hue-rotate(15deg)';
    }, 200);
    
    setTimeout(() => {
        document.body.style.opacity = '0.7';
        document.body.style.filter = 'blur(2px) hue-rotate(5deg)';
    }, 400);
    
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.filter = 'none';
        
        // Add system online effect
        showSystemOnlineNotification();
    }, 600);
});

// Create floating scan lines effect
function createScanLines() {
    const scanLines = document.createElement('div');
    scanLines.className = 'scan-lines';
    document.body.appendChild(scanLines);
}

// Create floating particle field
function createParticleField() {
    const particleCount = 30;
    const particles = document.createElement('div');
    particles.className = 'particle-field';
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particles.appendChild(particle);
    }
    
    document.body.appendChild(particles);
}

// Show system online notification
function showSystemOnlineNotification() {
    const notification = document.createElement('div');
    notification.className = 'system-notification';
    notification.innerHTML = 'SYSTEM ONLINE';
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 2000);
}

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .nav-links.mobile-open {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: var(--bg-secondary);
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        padding: var(--space-4);
        margin-top: var(--space-2);
    }
    
    @media (max-width: 768px) {
        .nav-links {
            display: none;
        }
        
        .mobile-menu-button {
            display: block;
            background: none;
            border: none;
            color: var(--text-primary);
            font-size: var(--font-size-xl);
            cursor: pointer;
        }
    }
`;
document.head.appendChild(style);