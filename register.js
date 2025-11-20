// Event data (same as main page)
const events = [
    {
        id: 1,
        title: "Web Development Workshop",
        date: "2025-12-05",
        location: "Online",
        category: "Workshop",
        image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=800&q=80",
        description: "Master modern web development with hands-on projects using React, Next.js, and TypeScript."
    },
    {
        id: 2,
        title: "AI & Machine Learning Summit",
        date: "2025-12-10",
        location: "Jakarta",
        category: "Conference",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
        description: "Explore cutting-edge AI technologies with leading researchers and practitioners."
    },
    {
        id: 3,
        title: "Mobile App Hackathon",
        date: "2025-12-15",
        location: "Bandung",
        category: "Hackathon",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
        description: "Join 24-hour intensive hackathon to build innovative mobile applications."
    },
    {
        id: 4,
        title: "Cloud Computing Bootcamp",
        date: "2025-12-20",
        location: "Online",
        category: "Bootcamp",
        image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80",
        description: "Comprehensive bootcamp covering AWS, Azure, and Google Cloud Platform."
    },
    {
        id: 5,
        title: "Cybersecurity Workshop",
        date: "2025-12-22",
        location: "Surabaya",
        category: "Workshop",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
        description: "Understand security vulnerabilities and protection strategies."
    },
    {
        id: 6,
        title: "Data Science Conference",
        date: "2025-12-25",
        location: "Bali",
        category: "Conference",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        description: "Discover the latest trends in data science, analytics, and visualization."
    },
    {
        id: 7,
        title: "ReactJS Advanced Course",
        date: "2026-01-05",
        location: "Online",
        category: "Course",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
        description: "Advanced React patterns including hooks, context API, and performance optimization."
    },
    {
        id: 8,
        title: "Flutter App Development Jam",
        date: "2026-01-10",
        location: "Yogyakarta",
        category: "Hackathon",
        image: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=800&q=80",
        description: "Build beautiful cross-platform apps with Flutter."
    },
    {
        id: 9,
        title: "Blockchain Technology Seminar",
        date: "2026-01-15",
        location: "Online",
        category: "Seminar",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
        description: "Deep dive into blockchain fundamentals, smart contracts, and DeFi."
    },
    {
        id: 10,
        title: "Kotlin for Android Workshop",
        date: "2026-01-20",
        location: "Jakarta",
        category: "Workshop",
        image: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=800&q=80",
        description: "Master Android development with Kotlin and Jetpack Compose."
    }
];

// DOM Elements
const eventSelect = document.getElementById('eventSelect');
const selectedEventCard = document.getElementById('selectedEventCard');
const registrationForm = document.getElementById('registrationForm');
const successModal = document.getElementById('successModal');

// Populate event dropdown with only upcoming events
const upcomingEvents = events.filter(e => new Date(e.date) >= new Date());
upcomingEvents.forEach(event => {
    const option = document.createElement('option');
    option.value = event.id;
    const dateObj = new Date(event.date);
    const formattedDate = dateObj.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
    option.textContent = `${event.title} - ${formattedDate} (${event.location})`;
    eventSelect.appendChild(option);
});

// Handle event selection with smooth animation
eventSelect.addEventListener('change', function() {
    const selectedId = parseInt(this.value);
    
    if (selectedId) {
        const event = events.find(e => e.id === selectedId);
        if (event) {
            // Update card content
            document.getElementById('selectedEventImage').src = event.image;
            document.getElementById('selectedEventTitle').textContent = event.title;
            
            const dateObj = new Date(event.date);
            const formattedDate = dateObj.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
            
            document.getElementById('selectedEventDate').textContent = formattedDate;
            document.getElementById('selectedEventLocation').textContent = event.location;
            document.getElementById('selectedEventCategory').textContent = event.category;
            
            // Show card with animation
            selectedEventCard.classList.remove('hidden');
            selectedEventCard.style.opacity = '0';
            selectedEventCard.style.transform = 'translateY(-10px)';
            
            setTimeout(() => {
                selectedEventCard.style.transition = 'all 0.4s ease';
                selectedEventCard.style.opacity = '1';
                selectedEventCard.style.transform = 'translateY(0)';
            }, 10);
        }
    } else {
        // Hide card with animation
        selectedEventCard.style.opacity = '0';
        selectedEventCard.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            selectedEventCard.classList.add('hidden');
        }, 400);
    }
});

// Handle form submission
registrationForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate event selection
    if (!eventSelect.value) {
        alert('Please select an event first!');
        eventSelect.focus();
        return;
    }
    
    // Get form data
    const formData = {
        eventId: eventSelect.value,
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        occupation: document.getElementById('occupation').value,
        company: document.getElementById('company').value,
        city: document.getElementById('city').value,
        skills: Array.from(document.querySelectorAll('.skill-checkbox input:checked')).map(cb => cb.value),
        motivation: document.getElementById('motivation').value,
        newsletter: document.getElementById('newsletter').checked
    };
    
    // Simulate form submission with loading animation
    const submitButton = registrationForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Processing...';
    
    // Simulate API call
    setTimeout(() => {
        console.log('Registration Data:', formData);
        
        // Reset button
        submitButton.disabled = false;
        submitButton.innerHTML = originalText;
        
        // Show success modal
        showSuccessModal();
        
        // Reset form
        registrationForm.reset();
        eventSelect.value = '';
        selectedEventCard.classList.add('hidden');
    }, 2000);
});

// Show success modal
function showSuccessModal() {
    successModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Add entrance animation
    const modalContent = successModal.querySelector('.success-modal');
    modalContent.style.transform = 'scale(0.9)';
    modalContent.style.opacity = '0';
    
    setTimeout(() => {
        modalContent.style.transition = 'all 0.4s ease';
        modalContent.style.transform = 'scale(1)';
        modalContent.style.opacity = '1';
    }, 10);
}

// Close success modal
function closeSuccessModal() {
    const modalContent = successModal.querySelector('.success-modal');
    modalContent.style.transform = 'scale(0.9)';
    modalContent.style.opacity = '0';
    
    setTimeout(() => {
        successModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
        window.location.href = 'index.html';
    }, 300);
}

// Add floating label effect to inputs
const formInputs = document.querySelectorAll('input, textarea, select');
formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});

// Skill checkbox styling
const skillCheckboxes = document.querySelectorAll('.skill-checkbox');
skillCheckboxes.forEach(label => {
    const checkbox = label.querySelector('input[type="checkbox"]');
    
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            label.style.background = 'linear-gradient(135deg, #2563eb, #06b6d4)';
            label.style.color = 'white';
            label.style.borderColor = '#2563eb';
        } else {
            label.style.background = 'white';
            label.style.color = '#374151';
            label.style.borderColor = '#e5e7eb';
        }
    });
});

// Auto-populate from URL params (if coming from event page)
const urlParams = new URLSearchParams(window.location.search);
const eventId = urlParams.get('eventId');
if (eventId) {
    eventSelect.value = eventId;
    eventSelect.dispatchEvent(new Event('change'));
}

// Add input validation feedback
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');

emailInput.addEventListener('blur', function() {
    if (this.value && !this.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        this.style.borderColor = '#ef4444';
        showValidationMessage(this, 'Please enter a valid email address');
    } else {
        this.style.borderColor = '#e5e7eb';
        hideValidationMessage(this);
    }
});

phoneInput.addEventListener('blur', function() {
    if (this.value && !this.value.match(/^[\d\s\+\-$$$$]+$/)) {
        this.style.borderColor = '#ef4444';
        showValidationMessage(this, 'Please enter a valid phone number');
    } else {
        this.style.borderColor = '#e5e7eb';
        hideValidationMessage(this);
    }
});

function showValidationMessage(input, message) {
    hideValidationMessage(input);
    
    const errorMsg = document.createElement('div');
    errorMsg.className = 'validation-error text-red-500 text-sm mt-1';
    errorMsg.textContent = message;
    input.parentElement.appendChild(errorMsg);
}

function hideValidationMessage(input) {
    const existingError = input.parentElement.querySelector('.validation-error');
    if (existingError) {
        existingError.remove();
    }
}
