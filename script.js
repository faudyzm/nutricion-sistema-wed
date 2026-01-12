// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {

    // --- Hero Animations ---
    const heroTimeline = gsap.timeline();

    heroTimeline.from('.hero-content .hero-title', {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.2
    })
        .from('.hero-content .hero-subtitle', {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.5')
        .from('.hero-buttons a', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'back.out(1.7)'
        }, '-=0.5')
        .from('.stat-item', {
            scale: 0.8,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'elastic.out(1, 0.5)'
        }, '-=0.6');

    // --- Scroll Animations for Sections ---

    // Services Cards Stagger (Core + List)
    gsap.from('.core-service-card', {
        scrollTrigger: {
            trigger: '.core-services-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out'
    });

    // Process Steps
    gsap.from('.step-card', {
        scrollTrigger: {
            trigger: '.process-steps',
            start: 'top 85%'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.7)'
    });

    // Pricing Cards Animation
    // Pricing Cards Animation
    gsap.from('.pricing-card', {
        scrollTrigger: {
            trigger: '.pricing-grid',
            start: 'top 95%', // Trigger almost immediately when in view
            toggleActions: 'play none none none' // Do not reverse (hide) on scroll up
        },
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        clearProps: 'all' // Clear inline styles after animation to prevent conflicts
    });

    // About Section
    gsap.from('.about-image-wrapper', {
        scrollTrigger: {
            trigger: '.about-container',
            start: 'top 75%'
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    gsap.from('.about-content', {
        scrollTrigger: {
            trigger: '.about-container',
            start: 'top 75%'
        },
        x: 100,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out'
    });

    // Testimonials (WhatsApp Wall)
    gsap.from('.whatsapp-card', {
        scrollTrigger: {
            trigger: '.whatsapp-wall',
            start: 'top 85%'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out'
    });

    // Blog Cards
    gsap.from('.blog-card', {
        scrollTrigger: {
            trigger: '.blog-grid',
            start: 'top 85%'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out'
    });

    // --- Interactive Mouse Effect for Blobs ---
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;

        // Gentle parallax for blobs
        gsap.to('.blob-1', {
            x: x * 0.05,
            y: y * 0.05,
            duration: 2,
            ease: 'power1.out'
        });

        gsap.to('.blob-2', {
            x: x * -0.05,
            y: y * -0.05,
            duration: 2.5,
            ease: 'power1.out'
        });

        gsap.to('.blob-3', {
            x: x * 0.02,
            y: y * 0.02,
            duration: 3,
            ease: 'power1.out'
        });
    });

    // --- Count Up Animation for Stats ---
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const rawValue = stat.innerText;
        // Removing non-numeric chars for counting
        const endValue = parseInt(rawValue.replace(/\D/g, ''));
        const suffix = rawValue.replace(/[0-9]/g, '');

        ScrollTrigger.create({
            trigger: stat,
            start: 'top 85%',
            once: true,
            onEnter: () => {
                let obj = { count: 0 };
                gsap.to(obj, {
                    count: endValue,
                    duration: 2,
                    ease: 'power2.out',
                    onUpdate: function () {
                        stat.innerText = Math.floor(obj.count) + suffix;
                    }
                });
            }
        });
    });

    // Original Nav logic
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Smooth scroll fix
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    const icon = mobileBtn.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }

                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});
