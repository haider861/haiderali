
// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  
    // Preloader
    const preloader = document.createElement('div');
    preloader.classList.add('preloader');
    preloader.innerHTML = `
      <div class="loader">
        <svg viewBox="0 0 80 80">
          <circle id="loader-circle" cx="40" cy="40" r="32"></circle>
        </svg>
      </div>
      <div class="loading-text">Loading...</div>
    `;
    document.body.appendChild(preloader);
    
    // Hide preloader when page is loaded
    window.addEventListener('load', function() {
      setTimeout(function() {
        preloader.classList.add('preloader-hidden');
        setTimeout(function() {
          preloader.style.display = 'none';
        }, 500);
      }, 1000);
    });
    
    // Custom cursor
    const cursorDot = document.createElement('div');
    cursorDot.classList.add('cursor-dot');
    const cursorOutline = document.createElement('div');
    cursorOutline.classList.add('cursor-outline');
    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorOutline);
    
    // Update cursor position with smooth animation
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    document.addEventListener('mousemove', function(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    
    function animateCursor() {
      // Smooth animation using lerp (linear interpolation)
      const easing = 0.2;
      
      cursorX += (mouseX - cursorX) * easing;
      cursorY += (mouseY - cursorY) * easing;
      
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
      
      cursorOutline.style.left = cursorX + 'px';
      cursorOutline.style.top = cursorY + 'px';
      
      requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, .filter-btn, .social-link, .portfolio-item, input, textarea');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', function() {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorOutline.style.borderColor = 'rgba(44, 152, 240, 0.8)';
        cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
      });
      
      el.addEventListener('mouseleave', function() {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorOutline.style.borderColor = 'rgba(44, 152, 240, 0.5)';
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
      });
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseout', function(e) {
      if (e.relatedTarget === null) {
        cursorDot.style.opacity = '0';
        cursorOutline.style.opacity = '0';
      }
    });
    
    document.addEventListener('mouseover', function() {
      cursorDot.style.opacity = '1';
      cursorOutline.style.opacity = '1';
    });
    
    // Navigation menu toggle for mobile
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if(hamburger) {
      hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
      });
    }
    
    // Close mobile menu when a link is clicked
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
      item.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
    
    // Portfolio filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        const filterValue = this.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
          if (filterValue === 'all' || item.classList.contains(filterValue)) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
    
    // Testimonials slider
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    
    // Initialize testimonial slider
    function showSlide(index) {
      testimonialItems.forEach(item => item.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      
      testimonialItems[index].classList.add('active');
      dots[index].classList.add('active');
    }
    
    // Next slide
    function nextSlide() {
      currentSlide = (currentSlide + 1) % testimonialItems.length;
      showSlide(currentSlide);
    }
    
    // Previous slide
    function prevSlide() {
      currentSlide = (currentSlide - 1 + testimonialItems.length) % testimonialItems.length;
      showSlide(currentSlide);
    }
    
    // Event listeners for testimonial navigation
    if(prevBtn && nextBtn) {
      nextBtn.addEventListener('click', nextSlide);
      prevBtn.addEventListener('click', prevSlide);
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
      dot.addEventListener('click', function() {
        currentSlide = index;
        showSlide(currentSlide);
      });
    });
    
    // Auto slide every 5 seconds
    setInterval(nextSlide, 5000);
    
    // Typing effect for hero section
    const heroHeading = document.querySelector('.hero-content h1');
    
    if (heroHeading) {
      const originalText = heroHeading.innerHTML;
      const nameSpan = heroHeading.querySelector('span');
      const nameText = nameSpan.textContent;
      const firstPart = originalText.split('<span>')[0];
      const lastPart = '</span>';
      
      // Reset the content to empty
      heroHeading.innerHTML = '';
      let charIndex = 0;
      
      function typeWriter() {
        if (charIndex < firstPart.length) {
          heroHeading.innerHTML += firstPart.charAt(charIndex);
          charIndex++;
          setTimeout(typeWriter, 100);
        } else {
          heroHeading.innerHTML += '<span></span>';
          const nameSpan = heroHeading.querySelector('span');
          let nameIndex = 0;
          
          function typeName() {
            if (nameIndex < nameText.length) {
              nameSpan.textContent += nameText.charAt(nameIndex);
              nameIndex++;
              setTimeout(typeName, 150);
            }
          }
          
          typeName();
        }
      }
      
      // Start the typing effect with a short delay
      setTimeout(typeWriter, 500);
    }
    
    // Animate skills progress bars on scroll with counters
    const skillsSection = document.querySelector('.skills');
    const progressBars = document.querySelectorAll('.progress');
    const percentageTexts = document.querySelectorAll('.percentage');
    
    function animateSkills() {
      if(!skillsSection) return;
      
      const sectionPos = skillsSection.getBoundingClientRect().top;
      const screenPos = window.innerHeight / 1.3;
      
      if(sectionPos < screenPos) {
        progressBars.forEach((bar, index) => {
          const percentage = bar.getAttribute('style').split('width: ')[1].split('%')[0];
          const targetWidth = parseInt(percentage);
          
          // Animate the progress bar
          bar.style.width = '0%';
          let currentWidth = 0;
          
          const percentageText = percentageTexts[index];
          const originalPercentageText = percentageText.textContent;
          percentageText.textContent = '0%';
          
          // Create interval to animate width and percentage
          const interval = setInterval(function() {
            if (currentWidth >= targetWidth) {
              clearInterval(interval);
              percentageText.textContent = originalPercentageText;
            } else {
              currentWidth += 1;
              bar.style.width = currentWidth + '%';
              percentageText.textContent = currentWidth + '%';
            }
          }, 20);
        });
        
        // Remove scroll listener after animation is done
        window.removeEventListener('scroll', animateSkills);
      }
    }
    
    // Initial animation check
    animateSkills();
    
    // Animate on scroll
    window.addEventListener('scroll', animateSkills);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if(targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if(contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send the data to a server
        // For demonstration, we'll just log it and show an alert
        console.log('Form submitted:', { name, email, subject, message });
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        
        // Reset form
        contactForm.reset();
      });
    }
    
    // Fade in elements on scroll with staggered delay
    const fadeElements = document.querySelectorAll('.fade-in');
    
    function checkFade() {
      fadeElements.forEach((element, index) => {
        const elementPos = element.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.3;
        
        if(elementPos < screenPos) {
          // Add staggered delay based on index
          setTimeout(() => {
            element.classList.add('visible');
          }, index * 150);
        }
      });
    }
    
    // Check initially and on scroll
    window.addEventListener('scroll', checkFade);
    checkFade();
    
    // Counter animation for experience years
    function animateCounter(element, target, duration = 2000) {
      let start = 0;
      const increment = Math.ceil(target / (duration / 16)); // 16ms is roughly 60fps
      
      function updateCount() {
        start += increment;
        if (start >= target) {
          element.textContent = target;
          return;
        }
        element.textContent = start;
        requestAnimationFrame(updateCount);
      }
      
      updateCount();
    }
    
    // Find experience years element
    const experienceElements = document.querySelectorAll('.info-item p');
    experienceElements.forEach(element => {
      if (element.textContent.includes('4+')) {
        // Create a counter observer to animate when in view
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              // Split text to extract just the number
              const textParts = element.textContent.split('4+');
              element.innerHTML = `<span class="counter">0</span>+${textParts[1]}`;
              const counterElement = element.querySelector('.counter');
              
              animateCounter(counterElement, 4);
              observer.unobserve(element);
            }
          });
        }, {threshold: 0.5});
        
        observer.observe(element);
      }
    });
    
    // Dynamic color theme based on time of day
    function setDynamicColorTheme() {
      const hour = new Date().getHours();
      const root = document.documentElement;
      
      // Night theme (8 PM - 6 AM)
      if (hour >= 20 || hour < 6) {
        root.style.setProperty('--primary-color', '#2c98f0');
        root.style.setProperty('--secondary-color', '#f8b500');
      } 
      // Evening theme (5 PM - 8 PM)
      else if (hour >= 17 && hour < 20) {
        root.style.setProperty('--primary-color', '#8e44ad');
        root.style.setProperty('--secondary-color', '#e74c3c');
      }
      // Morning theme (6 AM - 11 AM)
      else if (hour >= 6 && hour < 11) {
        root.style.setProperty('--primary-color', '#2ecc71');
        root.style.setProperty('--secondary-color', '#f39c12');
      }
      // Afternoon theme (11 AM - 5 PM)
      else {
        root.style.setProperty('--primary-color', '#3498db');
        root.style.setProperty('--secondary-color', '#e67e22');
      }
    }
    
    // Set initial theme
    setDynamicColorTheme();
    
    // Theme switch button
    const themeButton = document.createElement('button');
    themeButton.classList.add('theme-toggle');
    themeButton.innerHTML = '<i class="fas fa-palette"></i>';
    document.body.appendChild(themeButton);
    
    const themes = [
      { primary: '#2c98f0', secondary: '#f8b500' },
      { primary: '#8e44ad', secondary: '#e74c3c' },
      { primary: '#2ecc71', secondary: '#f39c12' },
      { primary: '#3498db', secondary: '#e67e22' },
      { primary: '#e91e63', secondary: '#ffc107' }
    ];
    
    let currentTheme = 0;
    
    themeButton.addEventListener('click', function() {
      currentTheme = (currentTheme + 1) % themes.length;
      const root = document.documentElement;
      root.style.setProperty('--primary-color', themes[currentTheme].primary);
      root.style.setProperty('--secondary-color', themes[currentTheme].secondary);
      
      // Animation effect on theme change
      const ripple = document.createElement('div');
      ripple.classList.add('theme-ripple');
      document.body.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 1000);
    });
  });
  