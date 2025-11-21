const trendingEvents = [
    {
      id: 1,
      title: "Web Development Workshop",
      category: "Workshop",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop",
      date: "Nov 22, 2024",
      daysUntil: 2,
      location: "Jakarta",
      attendees: 245,
      rating: 4.9,
      featured: true,
      description: "Learn modern web development with React, Node.js, and databases",
    },
    {
      id: 2,
      title: "AI & Machine Learning Conference",
      category: "Conference",
      image: "https://images.unsplash.com/photo-1677442d019cecf3da2175e9f299f86db0a1f627?w=500&h=300&fit=crop",
      date: "Nov 28, 2024",
      daysUntil: 8,
      location: "Bandung",
      attendees: 512,
      rating: 4.8,
      featured: true,
      description: "Explore cutting-edge AI technologies and industry insights",
    },
    {
      id: 3,
      title: "Mobile App Hackathon",
      category: "Hackathon",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop",
      date: "Dec 5, 2024",
      daysUntil: 15,
      location: "Surabaya",
      attendees: 189,
      rating: 4.7,
      featured: false,
      description: "Build amazing mobile apps and compete for exciting prizes",
    },
    {
      id: 4,
      title: "Cloud Computing Seminar",
      category: "Workshop",
      image: "https://images.unsplash.com/photo-1667372459938-957e09e49767?w=500&h=300&fit=crop",
      date: "Dec 12, 2024",
      daysUntil: 22,
      location: "Medan",
      attendees: 156,
      rating: 4.6,
      featured: false,
      description: "Master cloud platforms and deployment strategies",
    },
    {
      id: 5,
      title: "Cybersecurity Workshop",
      category: "Workshop",
      image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=500&h=300&fit=crop",
      date: "Dec 19, 2024",
      daysUntil: 29,
      location: "Jakarta",
      attendees: 203,
      rating: 4.9,
      featured: false,
      description: "Secure your applications and infrastructure effectively",
    },
    {
      id: 6,
      title: "Data Science & Analytics",
      category: "Conference",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop",
      date: "Dec 26, 2024",
      daysUntil: 36,
      location: "Yogyakarta",
      attendees: 178,
      rating: 4.8,
      featured: false,
      description: "Advanced analytics techniques and real-world case studies",
    },
  ]
  
  function formatCountdown(days) {
    const weeks = Math.floor(days / 7)
    const remainingDays = days % 7
  
    const result = []
    if (weeks > 0) result.push(`${weeks}w`)
    if (remainingDays > 0) result.push(`${remainingDays}d`)
  
    return result.join(" ")
  }
  
  function createCountdownHTML(days) {
    const d = days
    const h = Math.floor(Math.random() * 24)
    const m = Math.floor(Math.random() * 60)
    const s = Math.floor(Math.random() * 60)
  
    return `
          <div class="countdown-label">Starts in</div>
          <div class="countdown-timer">
              <div class="countdown-unit">
                  <div class="countdown-number">${d}</div>
                  <div class="countdown-label-small">Days</div>
              </div>
              <div class="countdown-unit">
                  <div class="countdown-number">${String(h).padStart(2, "0")}</div>
                  <div class="countdown-label-small">Hours</div>
              </div>
              <div class="countdown-unit">
                  <div class="countdown-number">${String(m).padStart(2, "0")}</div>
                  <div class="countdown-label-small">Mins</div>
              </div>
              <div class="countdown-unit">
                  <div class="countdown-number">${String(s).padStart(2, "0")}</div>
                  <div class="countdown-label-small">Secs</div>
              </div>
          </div>
      `
  }
  
  function renderTrendingEvents(filter = "all") {
    const trendingGrid = document.getElementById("trendingGrid")
    trendingGrid.innerHTML = ""
  
    let filteredEvents = trendingEvents
    if (filter !== "all") {
      filteredEvents = trendingEvents.filter((e) => e.category.toLowerCase() === filter.toLowerCase())
    }
  
    filteredEvents.forEach((event, index) => {
      const card = document.createElement("div")
      card.className = "trending-card"
      card.style.animationDelay = `${index * 0.1}s`
  
      card.innerHTML = `
              <div style="position: relative;">
                  <img src="${event.image}" alt="${event.title}" class="trending-image">
                  ${event.featured ? '<div class="trending-badge">🔥 Featured</div>' : ""}
              </div>
              <div class="trending-content">
                  <div class="trending-category">${event.category}</div>
                  <h3 class="trending-title">${event.title}</h3>
                  <div class="trending-info">
                      <div class="trending-info-item">
                          <span>📅</span>
                          <span>${event.date}</span>
                      </div>
                      <div class="trending-info-item">
                          <span>📍</span>
                          <span>${event.location}</span>
                      </div>
                      <div class="trending-info-item">
                          <span>📝</span>
                          <span>${event.description}</span>
                      </div>
                  </div>
                  <div class="trending-attendance">
                      <div class="attendance-count">👥 ${event.attendees} attending</div>
                      <div style="color: var(--trending-primary); font-weight: 600;">⭐ ${event.rating}</div>
                  </div>
                  <div class="trending-countdown">
                      ${createCountdownHTML(event.daysUntil)}
                  </div>
                  <div class="trending-footer">
                      <button class="trending-btn primary" onclick="alert('Registered!')">Register Now</button>
                      <button class="trending-btn" onclick="alert('Shared!')">Share</button>
                  </div>
              </div>
          `
  
      trendingGrid.appendChild(card)
    })
  }
  
  // Filter button listeners
  document.querySelectorAll(".trending-filter-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".trending-filter-btn").forEach((b) => b.classList.remove("active"))
      this.classList.add("active")
      renderTrendingEvents(this.dataset.filter)
    })
  })
  
  // Initial render
  renderTrendingEvents()
  
  // Update countdown every second (optional - for real-time countdown)
  setInterval(() => {
    // This would update the countdown timers if you want real-time updates
  }, 1000)
  