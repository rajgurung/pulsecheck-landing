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

    // Optimized scroll handler with throttling
    const header = document.querySelector('.header');
    const heroContent = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');
    const mockup = document.querySelector('.dashboard-mockup');
    
    let ticking = false;
    let lastScrollY = window.scrollY;

    function updateScrollEffects() {
        const currentScrollY = window.scrollY;
        const scrollProgress = Math.min(currentScrollY / 200, 1);
        
        // Header effects with CSS classes instead of inline styles
        if (currentScrollY > 100) {
            header.classList.add('scrolled');
            header.style.setProperty('--scroll-progress', scrollProgress);
        } else {
            header.classList.remove('scrolled');
        }

        // Optimized parallax with reduced calculations
        if (heroContent && heroVisual) {
            const parallaxOffset = currentScrollY * 0.15;
            heroContent.style.transform = `translate3d(0, ${parallaxOffset}px, 0)`;
            heroVisual.style.transform = `translate3d(0, ${parallaxOffset * 0.7}px, 0)`;
        }

        // Reduced mockup transforms
        if (mockup && currentScrollY < window.innerHeight) {
            const mockupOffset = currentScrollY * -0.1;
            mockup.style.transform = `translate3d(0, ${mockupOffset}px, 0)`;
        }

        lastScrollY = currentScrollY;
        ticking = false;
    }

    function requestScrollUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestScrollUpdate, { passive: true });

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

            // Open signup modal for relevant buttons
            const buttonText = this.textContent.trim();
            if (buttonText.includes('Join') || buttonText.includes('Get') || buttonText.includes('Request') || buttonText.includes('Start')) {
                setTimeout(() => {
                    openSignupModal();
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
            { text: 'services go down', isGradient: true }
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

    // Mobile detection for performance optimization
    const isMobile = window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

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

// Create optimized particle field
function createParticleField() {
    // Reduce particle count on mobile for better performance
    const particleCount = isMobile ? 8 : 20;
    const particles = document.createElement('div');
    particles.className = 'particle-field';
    
    if (isMobile) {
        particles.style.opacity = '0.3'; // Reduce visibility on mobile
    }
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (Math.random() * 5 + 15) + 's'; // Slower on mobile
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

// Modal and Form Functionality
function openSignupModal() {
    const modal = document.getElementById('signup-modal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Focus on email input after animation
    setTimeout(() => {
        document.getElementById('email').focus();
    }, 300);
}

function closeSignupModal() {
    const modal = document.getElementById('signup-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Reset form
    resetSignupForm();
}

function resetSignupForm() {
    const form = document.getElementById('signup-form');
    const successMessage = document.getElementById('success-message');
    
    form.style.display = 'flex';
    successMessage.style.display = 'none';
    form.reset();
    
    // Clear any error messages
    document.getElementById('email-error').style.display = 'none';
    document.getElementById('email-error').textContent = '';
}

// Email validation function
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(message) {
    const errorElement = document.getElementById('email-error');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    document.getElementById('email').style.borderColor = 'var(--error)';
}

function clearError() {
    const errorElement = document.getElementById('email-error');
    errorElement.style.display = 'none';
    errorElement.textContent = '';
    document.getElementById('email').style.borderColor = 'var(--border)';
}

// Form submission handler
document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form');
    
    signupForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        const plan = document.getElementById('plan').value;
        const submitButton = document.querySelector('.submit-button');
        const buttonText = submitButton.querySelector('span');
        const spinner = submitButton.querySelector('.loading-spinner');
        
        // Clear any previous errors
        clearError();
        
        // Validate email
        if (!email) {
            showError('Please enter your email address');
            return;
        }
        
        if (!validateEmail(email)) {
            showError('Please enter a valid email address');
            return;
        }
        
        if (!plan) {
            alert('Please select your interest level');
            return;
        }
        
        // Show loading state
        submitButton.disabled = true;
        buttonText.style.display = 'none';
        spinner.style.display = 'block';
        
        try {
            // Simulate API call (replace with actual endpoint)
            await submitSignup(email, plan);
            
            // Show success message
            document.getElementById('signup-form').style.display = 'none';
            document.getElementById('success-message').style.display = 'block';
            
            // Auto-close modal after 3 seconds
            setTimeout(() => {
                closeSignupModal();
            }, 3000);
            
        } catch (error) {
            console.error('Signup error:', error);
            showError('Something went wrong. Please try again.');
        } finally {
            // Reset button state
            submitButton.disabled = false;
            buttonText.style.display = 'block';
            spinner.style.display = 'none';
        }
    });
});

// Real API call to Vercel serverless function
async function submitSignup(email, plan) {
    const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            plan: plan
        })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
    }

    return data;
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('signup-modal');
    if (e.target === modal) {
        closeSignupModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('signup-modal');
        if (modal.style.display === 'flex') {
            closeSignupModal();
        }
    }
});

// FAQ Accordion Functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all other FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
});