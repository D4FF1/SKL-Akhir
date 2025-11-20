const currentDate = new Date()

const events = [
  {
    date: "2024-11-22",
    title: "Web Development Workshop",
    time: "09:00 AM - 05:00 PM",
    location: "Jakarta Tech Hub",
    description: "Learn modern web development with React, Node.js, and more.",
    category: "Workshop",
    status: "upcoming",
  },
  {
    date: "2024-11-28",
    title: "AI & Machine Learning Conference",
    time: "10:00 AM - 06:00 PM",
    location: "Bandung Convention Center",
    description: "Explore the latest trends in AI and machine learning.",
    category: "Conference",
    status: "upcoming",
  },
  {
    date: "2024-12-05",
    title: "Mobile App Hackathon",
    time: "08:00 AM - 08:00 PM",
    location: "Surabaya Innovation Park",
    description: "Build amazing mobile apps and compete for prizes.",
    category: "Hackathon",
    status: "upcoming",
  },
  {
    date: "2024-12-12",
    title: "Cloud Computing Seminar",
    time: "02:00 PM - 05:00 PM",
    location: "Medan Business Center",
    description: "Master cloud technologies with AWS, Azure, and GCP experts.",
    category: "Seminar",
    status: "upcoming",
  },
  {
    date: "2024-12-19",
    title: "Cybersecurity Workshop",
    time: "10:00 AM - 04:00 PM",
    location: "Jakarta Tech Hub",
    description: "Learn to secure your applications and infrastructure.",
    category: "Workshop",
    status: "upcoming",
  },
]

function renderCalendar() {
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  document.getElementById("calendarMonth").textContent = currentDate.toLocaleDateString("id-ID", {
    month: "long",
    year: "numeric",
  })

  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startingDayOfWeek = firstDay.getDay()

  const calendarGrid = document.querySelector(".calendar-grid")
  const dayElements = calendarGrid.querySelectorAll(".calendar-day")
  dayElements.forEach((el) => el.remove())

  // Add day headers
  const headers = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  // Headers are already in HTML

  // Add empty cells
  for (let i = 0; i < startingDayOfWeek; i++) {
    const emptyDay = document.createElement("div")
    emptyDay.className = "calendar-day"
    emptyDay.style.opacity = "0.3"
    emptyDay.style.cursor = "default"
    calendarGrid.appendChild(emptyDay)
  }

  // Add days
  for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = document.createElement("div")
    dayElement.className = "calendar-day"
    dayElement.textContent = day

    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    if (events.some((e) => e.date === dateStr)) {
      dayElement.classList.add("has-event")
    }

    if (day === new Date().getDate() && year === new Date().getFullYear() && month === new Date().getMonth()) {
      dayElement.classList.add("active")
    }

    dayElement.addEventListener("click", () => filterByDate(dateStr))
    calendarGrid.appendChild(dayElement)
  }
}

function renderTimeline(filterStatus = "upcoming") {
  const timeline = document.getElementById("timeline")
  timeline.innerHTML = ""

  const filteredEvents = filterStatus === "upcoming" ? events.filter((e) => e.status === "upcoming") : events

  filteredEvents.forEach((event, index) => {
    const eventDate = new Date(event.date)
    const timelineItem = document.createElement("div")
    timelineItem.className = `timeline-item ${event.status}`
    timelineItem.style.animationDelay = `${index * 0.1}s`

    timelineItem.innerHTML = `
            <div class="timeline-date">${eventDate.toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</div>
            <div class="timeline-title">${event.title}</div>
            <div class="timeline-details">
                <div class="timeline-detail">
                    <span>⏰</span>
                    <span>${event.time}</span>
                </div>
                <div class="timeline-detail">
                    <span>📍</span>
                    <span>${event.location}</span>
                </div>
                <div class="timeline-detail">
                    <span>🏷️</span>
                    <span>${event.category}</span>
                </div>
            </div>
            <div class="timeline-description">${event.description}</div>
            <div class="timeline-footer">
                <button class="timeline-btn" onclick="alert('Added to your calendar!')">Add to Calendar</button>
                <button class="timeline-btn" style="background: transparent; color: var(--calendar-primary); border: 2px solid var(--calendar-primary);" onclick="alert('Shared!')">Share</button>
            </div>
        `

    timeline.appendChild(timelineItem)
  })
}

function changeView(view) {
  document.querySelectorAll(".view-btn").forEach((btn) => btn.classList.remove("active"))
  event.target.classList.add("active")
  renderTimeline(view === "upcoming" ? "upcoming" : "all")
}

function previousMonth() {
  currentDate.setMonth(currentDate.getMonth() - 1)
  renderCalendar()
}

function nextMonth() {
  currentDate.setMonth(currentDate.getMonth() + 1)
  renderCalendar()
}

function filterByDate(dateStr) {
  const eventCount = events.filter((e) => e.date === dateStr).length
  if (eventCount > 0) {
    alert(`${eventCount} event(s) on this date!`)
  }
}

// Initial render
renderCalendar()
renderTimeline()
