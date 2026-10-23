(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
console.log('[Motion] prefers-reduced-motion:', reduced.matches);
// Force animations for demo regardless of user preference
if (reduced.matches) {
  console.warn('[Motion] Reduced motion preference detected – overriding for demo.');
  reduced.matches = false;
}

  function initAnimations() {
    if (reduced.matches) {
      document.querySelectorAll('.lazy-section').forEach(s => s.classList.add('is-loaded'));
      return;
    }

    if (window.gsap) {
      if (window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
      }

      // 1. Navigation entrance GSAP animation
      if (document.querySelector('header')) {
        gsap.from('header .brand', { opacity: 0, x: -20, duration: 0.6, ease: 'power2.out', clearProps: 'all' });
        gsap.from('header nav a', {
          opacity: 0,
          y: -10,
          stagger: 0.05,
          duration: 0.45,
          ease: 'power2.out',
          delay: 0.08,
          clearProps: 'all'
        });
        gsap.from('header .language', { opacity: 0, x: 20, duration: 0.6, ease: 'power2.out', delay: 0.15, clearProps: 'all' });
      }

      // 2. Hero Entrance Animation
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      if (document.querySelector('.hero h1')) {
        heroTl.from('.hero .eyebrow', { opacity: 0, y: -20, duration: 0.6 })
              .from('.hero h1', { opacity: 0, y: 30, duration: 0.8 }, '-=0.4')
              .from('.hero .intro', { opacity: 0, y: 20, duration: 0.7 }, '-=0.5')
              .from('.hero .actions .button', { opacity: 0, y: 20, stagger: 0.15, duration: 0.6 }, '-=0.4')
              .from('.hero-art', { opacity: 0, scale: 0.95, duration: 0.9 }, '-=0.7')
              .from('.hero-art .floating', { opacity: 0, y: 25, duration: 0.7 }, '-=0.3');
      }

      // Page intro header animation on multipages
      if (document.querySelector('.page-intro h1')) {
        gsap.from('.page-intro h1', { opacity: 0, y: 25, duration: 0.8, ease: 'power3.out' });
        gsap.from('.page-intro p', { opacity: 0, y: 15, duration: 0.8, delay: 0.2, ease: 'power3.out' });
        gsap.from('.page-index', { opacity: 0, scale: 0.8, duration: 1, ease: 'back.out(1.2)' });
      }

      // 3. Continuous GSAP Micro-Animations
      if (document.querySelector('.hero-art .sun')) {
        gsap.to('.hero-art .sun', {
          y: -10,
          scale: 1.05,
          duration: 3.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      }
      if (document.querySelector('.hero-art .floating')) {
        gsap.to('.hero-art .floating', {
          y: -8,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 0.5
        });
      }

      // Continuous animated floating badge SVGs
      document.querySelectorAll('.svg-float-soft').forEach((el, idx) => {
        gsap.to(el, {
          y: -6,
          duration: 2.8 + (idx * 0.4),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      });

      // 4. ScrollTrigger batch reveal animations for sections & cards
      if (window.ScrollTrigger) {
        // Benefit badges
        if (document.querySelector('.benefits')) {
          gsap.from('.benefits > div', {
            scrollTrigger: {
              trigger: '.benefits',
              start: 'top 88%'
            },
            opacity: 0,
            y: 25,
            stagger: 0.15,
            duration: 0.7,
            ease: 'power2.out'
          });
        }

        // Journey Steps
        if (document.querySelector('.steps')) {
          gsap.from('.steps article', {
            scrollTrigger: {
              trigger: '.steps',
              start: 'top 82%'
            },
            opacity: 0,
            x: -30,
            stagger: 0.2,
            duration: 0.8,
            ease: 'power3.out'
          });
        }

        // Landscape banner parallax feel
        if (document.querySelector('.landscape-banner')) {
          gsap.from('.landscape-banner h2, .landscape-banner p', {
            scrollTrigger: {
              trigger: '.landscape-banner',
              start: 'top 80%'
            },
            opacity: 0,
            y: 35,
            stagger: 0.2,
            duration: 0.9,
            ease: 'power3.out'
          });
          gsap.to('.landscape-lines', {
            scrollTrigger: {
              trigger: '.landscape-banner',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1
            },
            rotation: 15,
            scale: 1.08
          });
        }

        // Feature grid (Resilience section)
        if (document.querySelectorAll('.feature-grid article').length) {
          gsap.from('.feature-grid article', {
            scrollTrigger: {
              trigger: '.feature-grid',
              start: 'top 82%'
            },
            opacity: 0,
            y: 30,
            stagger: 0.18,
            duration: 0.75,
            ease: 'power2.out'
          });
        }

        // FAQ accordion elements
        if (document.querySelectorAll('details').length && document.querySelector('.faq')) {
          gsap.from('details', {
            scrollTrigger: {
              trigger: '.faq',
              start: 'top 85%'
            },
            opacity: 0,
            y: 20,
            stagger: 0.1,
            duration: 0.6,
            ease: 'power2.out'
          });
        }
      }

      // Hover micro-animations on interactive cards & buttons
      document.querySelectorAll('.button, .resource-card, .business-card, .feature-grid article').forEach(el => {
        el.addEventListener('mouseenter', () => {
          gsap.to(el, { scale: 1.02, duration: 0.25, ease: 'power1.out' });
        });
        el.addEventListener('mouseleave', () => {
          gsap.to(el, { scale: 1.0, duration: 0.25, ease: 'power1.out' });
        });
      });
    }

    // 5. Lazy loading for small sections using IntersectionObserver
    initLazyLoading();
  }

  function initLazyLoading() {
    const lazySections = document.querySelectorAll('.lazy-section');
    if (!lazySections.length) return;

    if ('IntersectionObserver' in window) {
      const lazyObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const target = entry.target;
            target.classList.add('is-loaded');
            
            // If GSAP is active, add extra stagger reveal for children of lazy section
            if (window.gsap && !reduced.matches) {
              const children = target.querySelectorAll('h2, h3, p, .button, form, .hub, article');
              if (children.length > 0) {
                gsap.from(children, {
                  opacity: 0,
                  y: 18,
                  stagger: 0.08,
                  duration: 0.6,
                  ease: 'power2.out',
                  overwrite: 'auto'
                });
              }
            }
            obs.unobserve(target);
          }
        });
      }, {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.12
      });

      lazySections.forEach(sec => lazyObserver.observe(sec));
    } else {
      // Fallback
      lazySections.forEach(sec => sec.classList.add('is-loaded'));
    }
  }

  // Smooth scroll progress indicator with GSAP if available
  let scheduled = false;
  function progress() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      const max = document.documentElement.scrollHeight - innerHeight;
      const pct = max > 0 ? Math.min(100, (scrollY / max) * 100) : 0;
      const bar = document.querySelector('.scroll-progress');
      if (bar) {
        if (window.gsap) {
          gsap.to(bar, { width: pct + '%', duration: 0.1, ease: 'none' });
        } else {
          bar.style.width = pct + '%';
        }
      }
      scheduled = false;
    });
  }

  addEventListener('scroll', progress, { passive: true });
  addEventListener('resize', progress);

  // When DOM is loaded or dynamic items change
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
  } else {
    initAnimations();
  }

  // Re-observe dynamic business or resource additions safely
  const mainEl = document.querySelector('main');
  if (mainEl) {
    let animTimer;
    new MutationObserver(() => {
      clearTimeout(animTimer);
      animTimer = setTimeout(() => {
        if (window.gsap && !reduced.matches) {
          const targets = document.querySelectorAll('.resource-card:not([data-animated]), .business-card:not([data-animated])');
          if (targets.length > 0) {
            gsap.from(targets, {
              opacity: 0,
              y: 20,
              stagger: 0.08,
              duration: 0.5,
              ease: 'power2.out',
              onComplete() {
                targets.forEach(c => c.setAttribute('data-animated', 'true'));
              }
            });
          }
        }
      }, 60);
    }).observe(mainEl, { childList: true, subtree: true });
  }
})();