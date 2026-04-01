// Enhanced JavaScript for NGO Website

// Initialize Animate on Scroll
document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS (Animate on Scroll)
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  });

  // Initialize Bootstrap tooltips
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Initialize Bootstrap popovers
  var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
  var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Form submission handling
  document.querySelectorAll('form').forEach(function(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Show loading state
      const submitBtn = this.querySelector('button[type="submit"]');
      if (submitBtn) {
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Processing...';
        
        // Simulate form submission (in a real app, this would be an AJAX call)
        setTimeout(() => {
          // Reset form
          this.reset();
          
          // Show success message
          const formId = this.id;
          let successMessage = 'Thank you for your submission!';
          
          if (formId === 'donation-form') {
            successMessage = 'Thank you for your generous donation!';
          } else if (formId === 'volunteer-form') {
            successMessage = 'Thank you for volunteering! We will contact you soon.';
          } else if (formId === 'contact-form') {
            successMessage = 'Thank you for your message! We will get back to you shortly.';
          }
          
          // Create alert
          const alertDiv = document.createElement('div');
          alertDiv.className = 'alert alert-success alert-dismissible fade show mt-3';
          alertDiv.setAttribute('role', 'alert');
          alertDiv.innerHTML = `
            <strong>Success!</strong> ${successMessage}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          `;
          
          // Insert alert after form
          this.parentNode.insertBefore(alertDiv, this.nextSibling);
          
          // Reset button
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          
          // Auto-dismiss alert after 5 seconds
          setTimeout(() => {
            const bsAlert = new bootstrap.Alert(alertDiv);
            bsAlert.close();
          }, 5000);
        }, 1500);
      }
    });
  });

  // Volunteer application form handling
  const volunteerApplicationForm = document.getElementById('volunteer-application-form');
  if (volunteerApplicationForm) {
    volunteerApplicationForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const firstName = document.getElementById('firstName').value;
      const lastName = document.getElementById('lastName').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      
      // Get areas of interest
      const interests = [];
      if (document.getElementById('communityOutreach').checked) interests.push('Community Outreach');
      if (document.getElementById('eventOrganizer').checked) interests.push('Event Organizer');
      if (document.getElementById('educationMentor').checked) interests.push('Education Mentor');
      if (document.getElementById('healthServices').checked) interests.push('Health Services Support');
      if (document.getElementById('digitalSkills').checked) interests.push('Digital Skills Coach');
      if (document.getElementById('advocacy').checked) interests.push('Advocacy & Outreach');
      
      // Get availability
      const availability = [];
      if (document.getElementById('weekdays').checked) availability.push('Weekdays');
      if (document.getElementById('evenings').checked) availability.push('Evenings');
      if (document.getElementById('weekends').checked) availability.push('Weekends');
      
      const skills = document.getElementById('skills').value;
      const motivation = document.getElementById('motivation').value;
      
      // Create application data object
      const applicationData = {
        firstName,
        lastName,
        email,
        phone,
        interests,
        availability,
        skills,
        motivation
      };
      
      // Here you would typically send this data to a server
      console.log('Processing volunteer application:', applicationData);
      
      // Show success message
      volunteerApplicationForm.innerHTML = `
        <div class="text-center py-5">
          <i class="fas fa-check-circle text-success" style="font-size: 4rem;"></i>
          <h3 class="mt-4">Application Submitted!</h3>
          <p class="lead">Thank you for your interest in volunteering with ChangeMakers.</p>
          <p>We've received your application and will contact you at ${email} within 3-5 business days to discuss next steps.</p>
          <div class="mt-4">
            <a href="volunteer.html" class="btn btn-primary-custom">Back to Volunteer Page</a>
          </div>
        </div>
      `;
    });
  }
  
  // Event registration form handling
  const eventRegistrationForm = document.getElementById('event-registration-form');
  if (eventRegistrationForm) {
    eventRegistrationForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const firstName = document.getElementById('firstName').value;
      const lastName = document.getElementById('lastName').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const eventSelect = document.getElementById('eventSelect');
      const selectedEvent = eventSelect.options[eventSelect.selectedIndex].text;
      const participationType = document.querySelector('input[name="participationType"]:checked').value;
      const additionalInfo = document.getElementById('additionalInfo').value;
      const newsletter = document.getElementById('newsletter').checked;
      
      // Create registration data object
      const registrationData = {
        firstName,
        lastName,
        email,
        phone,
        event: selectedEvent,
        participationType,
        additionalInfo,
        newsletter
      };
      
      // Here you would typically send this data to a server
      console.log('Processing event registration:', registrationData);
      
      // Show success message
      eventRegistrationForm.innerHTML = `
        <div class="text-center py-5">
          <i class="fas fa-check-circle text-success" style="font-size: 4rem;"></i>
          <h3 class="mt-4">Registration Successful!</h3>
          <p class="lead">Thank you for registering for ${selectedEvent}.</p>
          <p>We've sent a confirmation email to ${email} with all the details.</p>
          <div class="mt-4">
            <a href="events.html" class="btn btn-primary-custom">Back to Events</a>
          </div>
        </div>
      `;
    });
  }

  // Donation amount selection
  const donationAmountBtns = document.querySelectorAll('.donation-amount-btn');
  const customAmountInput = document.getElementById('customAmount');
  
  if (donationAmountBtns.length > 0 && customAmountInput) {
    donationAmountBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        // Remove active class from all buttons
        donationAmountBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Set the amount in the custom input
        const amount = this.getAttribute('data-amount');
        customAmountInput.value = amount;
      });
    });
  }

  // Countdown timer for upcoming events
  const countdownElements = document.querySelectorAll('.countdown-timer');
  
  if (countdownElements.length > 0) {
    countdownElements.forEach(element => {
      const targetDate = new Date(element.getAttribute('data-target-date')).getTime();
      
      // Update countdown every second
      const countdownInterval = setInterval(function() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        // Time calculations
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Display countdown
        element.innerHTML = `
          <div class="countdown-item"><span class="countdown-value">${days}</span><span class="countdown-label">Days</span></div>
          <div class="countdown-item"><span class="countdown-value">${hours}</span><span class="countdown-label">Hours</span></div>
          <div class="countdown-item"><span class="countdown-value">${minutes}</span><span class="countdown-label">Minutes</span></div>
          <div class="countdown-item"><span class="countdown-value">${seconds}</span><span class="countdown-label">Seconds</span></div>
        `;
        
        // If countdown is finished
        if (distance < 0) {
          clearInterval(countdownInterval);
          element.innerHTML = "<span class='badge bg-danger'>Event Started</span>";
        }
      }, 1000);
    });
  }

  // Testimonial carousel autoplay
  const testimonialCarousel = document.getElementById('testimonialCarousel');
  if (testimonialCarousel) {
    const carousel = new bootstrap.Carousel(testimonialCarousel, {
      interval: 5000,
      wrap: true
    });
  }

  // Animated counter for statistics
  const counterElements = document.querySelectorAll('.counter');
  
  if (counterElements.length > 0) {
    const countUp = (target, start, end, duration) => {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        target.innerText = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    };
    
    const handleIntersection = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const endValue = parseInt(target.getAttribute('data-count'));
          countUp(target, 0, endValue, 2000);
          observer.unobserve(target);
        }
      });
    };
    
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5
    });
    
    counterElements.forEach(counter => {
      observer.observe(counter);
    });
  }

  // Mobile navigation toggle
  const mobileNavToggle = document.querySelector('.navbar-toggler');
  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', function() {
      document.body.classList.toggle('mobile-nav-active');
    });
  }

  // Back to top button
  const backToTopBtn = document.querySelector('.back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('active');
      } else {
        backToTopBtn.classList.remove('active');
      }
    });
    
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});

// Gallery lightbox functionality
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('gallery-item')) {
    const src = e.target.getAttribute('src');
    const caption = e.target.getAttribute('alt');
    
    // Create modal elements
    const modal = document.createElement('div');
    modal.classList.add('gallery-modal');
    
    const modalContent = document.createElement('div');
    modalContent.classList.add('gallery-modal-content');
    
    const closeBtn = document.createElement('span');
    closeBtn.classList.add('gallery-modal-close');
    closeBtn.innerHTML = '&times;';
    
    const img = document.createElement('img');
    img.setAttribute('src', src);
    
    const captionText = document.createElement('div');
    captionText.classList.add('gallery-modal-caption');
    captionText.textContent = caption;
    
    // Append elements
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(img);
    modalContent.appendChild(captionText);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Add open class to show modal
    setTimeout(() => {
      modal.classList.add('open');
    }, 10);
    
    // Close modal when clicking close button or outside the modal
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeModal();
      }
    });
    
    function closeModal() {
      modal.classList.remove('open');
      setTimeout(() => {
        document.body.removeChild(modal);
      }, 300);
    }
  }
});

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
  const parallaxElements = document.querySelectorAll('.parallax');
  
  parallaxElements.forEach(element => {
    const speed = element.getAttribute('data-speed') || 0.5;
    const yPos = -(window.pageYOffset * speed);
    element.style.transform = `translateY(${yPos}px)`;
  });
});
