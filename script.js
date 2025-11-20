// Enhanced event data with real images
const events = [
    {
        id: 1,
        title: "Web Development Workshop",
        date: "2025-12-05",
        location: "Online",
        category: "Workshop",
        image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=800&q=80",
        description: "Master modern web development with hands-on projects using React, Next.js, and TypeScript. Build real-world applications and learn industry best practices from experienced developers."
    },
    {
        id: 2,
        title: "AI & Machine Learning Summit",
        date: "2025-12-10",
        location: "Jakarta",
        category: "Conference",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
        description: "Explore cutting-edge AI technologies with leading researchers and practitioners. Deep dive into neural networks, computer vision, and natural language processing."
    },
    {
        id: 3,
        title: "Mobile App Hackathon",
        date: "2025-12-15",
        location: "Bandung",
        category: "Hackathon",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
        description: "Join 24-hour intensive hackathon to build innovative mobile applications. Compete for prizes, network with developers, and bring your ideas to life."
    },
    {
        id: 4,
        title: "Cloud Computing Bootcamp",
        date: "2025-12-20",
        location: "Online",
        category: "Bootcamp",
        image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80",
        description: "Comprehensive bootcamp covering AWS, Azure, and Google Cloud Platform. Learn deployment strategies, microservices architecture, and DevOps practices."
    },
    {
        id: 5,
        title: "Cybersecurity Workshop",
        date: "2025-12-22",
        location: "Surabaya",
        category: "Workshop",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
        description: "Understand security vulnerabilities and protection strategies. Hands-on training in penetration testing, network security, and ethical hacking techniques."
    },
    {
        id: 6,
        title: "Data Science Conference",
        date: "2025-12-25",
        location: "Bali",
        category: "Conference",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        description: "Discover the latest trends in data science, analytics, and visualization. Learn from industry leaders about predictive modeling and big data technologies."
    },
    {
        id: 7,
        title: "ReactJS Advanced Course",
        date: "2026-01-05",
        location: "Online",
        category: "Course",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
        description: "Advanced React patterns including hooks, context API, performance optimization, and state management with Redux and Zustand."
    },
    {
        id: 8,
        title: "Flutter App Development Jam",
        date: "2026-01-10",
        location: "Yogyakarta",
        category: "Hackathon",
        image: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=800&q=80",
        description: "Build beautiful cross-platform apps with Flutter. Learn widgets, animations, and state management while competing in a friendly environment."
    },
    {
        id: 9,
        title: "Blockchain Technology Seminar",
        date: "2026-01-15",
        location: "Online",
        category: "Seminar",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
        description: "Deep dive into blockchain fundamentals, smart contracts, DeFi, and cryptocurrency. Understand the technology reshaping finance and digital trust."
    },
    {
        id: 10,
        title: "Kotlin for Android Workshop",
        date: "2026-01-20",
        location: "Jakarta",
        category: "Workshop",
        image: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=800&q=80",
        description: "Master Android development with Kotlin. Build modern Android apps with Jetpack Compose, MVVM architecture, and Material Design 3."
    }
];

// DOM Elements
const eventsContainer = document.getElementById("events-container");
const searchInput = document.getElementById("searchInput");
const locationFilter = document.getElementById("locationFilter");
const dateFilter = document.getElementById("dateFilter");
const eventModal = document.getElementById("eventModal");

// Stats elements
const statEvents = document.getElementById("statEvents");
const statParticipants = document.getElementById("statParticipants");
const statCities = document.getElementById("statCities");
const statSpeakers = document.getElementById("statSpeakers");

// Populate location filter
const locations = [...new Set(events.map(e => e.location))];
locations.forEach(loc => {
    const option = document.createElement("option");
    option.value = loc;
    option.textContent = loc;
    locationFilter.appendChild(option);
});

// Count-up animation function with easing
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const easeOutQuad = t => t * (2 - t);
    let startTime = null;
    
    function animate(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / duration;
        
        if (progress < 1) {
            current = target * easeOutQuad(progress);
            element.textContent = Math.floor(current) + '+';
            requestAnimationFrame(animate);
        } else {
            element.textContent = target + '+';
        }
    }
    
    requestAnimationFrame(animate);
}

// Initialize stats with animations
setTimeout(() => {
    animateCounter(statEvents, 500);
    animateCounter(statParticipants, 15000);
    animateCounter(statCities, 25);
    animateCounter(statSpeakers, 150);
}, 500);

// Render events with staggered animation
function renderEvents(filteredEvents = events) {
    eventsContainer.innerHTML = "";
    
    if (filteredEvents.length === 0) {
        eventsContainer.innerHTML = `
            <div class="col-span-full text-center py-16 no-events">
                <i class="fas fa-calendar-times text-6xl text-gray-300 mb-4"></i>
                <p class="text-xl text-gray-500 font-semibold">No events found matching your criteria</p>
                <p class="text-gray-400 mt-2">Try adjusting your filters</p>
            </div>
        `;
        return;
    }

    filteredEvents.forEach((event, index) => {
        const card = document.createElement("div");
        card.className = "event-card bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer";
        card.setAttribute("data-aos", "fade-up");
        card.setAttribute("data-aos-delay", (index % 3) * 100);

        const isUpcoming = new Date(event.date) >= new Date();
        const dateObj = new Date(event.date);
        const formattedDate = dateObj.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });

        card.innerHTML = `
            <div class="relative overflow-hidden h-48">
                <div class="badge-category">${event.category}</div>
                <img src="${event.image}" alt="${event.title}" class="w-full h-full object-cover">
                ${!isUpcoming ? '<div class="absolute inset-0 bg-black/50 flex items-center justify-center"><span class="bg-white text-gray-900 px-4 py-2 rounded-full font-bold">Event Ended</span></div>' : ''}
            </div>
            <div class="p-6">
                <h4 class="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition">${event.title}</h4>
                <div class="space-y-2 mb-4">
                    <div class="flex items-center text-gray-600">
                        <i class="fas fa-calendar-alt text-blue-600 w-5"></i>
                        <span class="text-sm font-semibold ml-2">${formattedDate}</span>
                    </div>
                    <div class="flex items-center text-gray-600">
                        <i class="fas fa-map-marker-alt text-blue-600 w-5"></i>
                        <span class="text-sm font-semibold ml-2">${event.location}</span>
                    </div>
                </div>
                <p class="text-gray-600 mb-4 line-clamp-2 text-sm leading-relaxed">${event.description}</p>
                <button onclick="showModal(${event.id})" class="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-3 rounded-xl font-bold hover:shadow-lg transition transform hover:-translate-y-1">
                    <i class="fas fa-info-circle mr-2"></i>View Details
                </button>
            </div>
        `;
        
        eventsContainer.appendChild(card);
    });

    // Reinitialize AOS for new elements
    AOS.refresh();
}

// Show modal with animation
function showModal(id) {
    const event = events.find(e => e.id === id);
    if (event) {
        const dateObj = new Date(event.date);
        const formattedDate = dateObj.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });

        document.getElementById('modalImage').src = event.image;
        document.getElementById('modalTitle').textContent = event.title;
        document.getElementById('modalDate').textContent = formattedDate;
        document.getElementById('modalLocation').textContent = event.location;
        document.getElementById('modalDescription').textContent = event.description;
        document.getElementById('modalCategory').textContent = event.category;
        
        const registerButton = document.getElementById('registerButton');
        registerButton.href = `register.html?eventId=${event.id}`;
        
        eventModal.classList.remove("hidden");
        document.body.style.overflow = 'hidden';
    }
}

// Close modal
function closeEventModal() {
    eventModal.classList.add("hidden");
    document.body.style.overflow = 'auto';
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !eventModal.classList.contains('hidden')) {
        closeEventModal();
    }
});

// Filter & search with smooth transition
function filterEvents() {
    let filtered = events;
    
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm) {
        filtered = filtered.filter(e => 
            e.title.toLowerCase().includes(searchTerm) ||
            e.description.toLowerCase().includes(searchTerm) ||
            e.category.toLowerCase().includes(searchTerm)
        );
    }
    
    const locValue = locationFilter.value;
    if (locValue) {
        filtered = filtered.filter(e => e.location === locValue);
    }
    
    const dateValue = dateFilter.value;
    if (dateValue === "upcoming") {
        filtered = filtered.filter(e => new Date(e.date) >= new Date());
    } else if (dateValue === "past") {
        filtered = filtered.filter(e => new Date(e.date) < new Date());
    }
    
    // Smooth transition
    eventsContainer.style.opacity = '0';
    setTimeout(() => {
        renderEvents(filtered);
        eventsContainer.style.opacity = '1';
    }, 200);
}

// Add transition style
eventsContainer.style.transition = 'opacity 0.3s ease';

// Event listeners with debounce for search
let searchTimeout;
searchInput.addEventListener("input", () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(filterEvents, 300);
});

locationFilter.addEventListener("change", filterEvents);
dateFilter.addEventListener("change", filterEvents);

// Initialize
renderEvents();

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        alert('Mobile menu functionality - you can expand this!');
    });
}

// Add ripple effect to buttons
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
        const button = e.target.tagName === 'BUTTON' ? e.target : e.target.closest('button');
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }
});

// Add ripple styles dynamically
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: rippleEffect 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
