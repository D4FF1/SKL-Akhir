// Sample review data
const reviewsData = [
  {
    id: 1,
    name: "Ahmad Malik",
    avatar: "AM",
    event: "Web Development Workshop",
    rating: 5,
    text: "Absolutely amazing workshop! The instructors were knowledgeable and the hands-on projects really helped me understand modern web development. Highly recommended!",
    date: "2 days ago",
    helpful: 234,
  },
  {
    id: 2,
    name: "Siti Nurhaliza",
    avatar: "SN",
    event: "AI & Machine Learning Conference",
    rating: 4,
    text: "Great conference with excellent talks. Would have loved more networking time, but overall a very solid event. The keynote was inspiring!",
    date: "1 week ago",
    helpful: 189,
  },
  {
    id: 3,
    name: "Budi Santoso",
    avatar: "BS",
    event: "Mobile App Hackathon",
    rating: 5,
    text: "Best hackathon I've ever attended! The organization was flawless, prizes were generous, and the community was incredibly supportive. Can't wait for the next one!",
    date: "2 weeks ago",
    helpful: 456,
  },
  {
    id: 4,
    name: "Dewi Lestari",
    avatar: "DL",
    event: "Cloud Computing Seminar",
    rating: 4,
    text: "Informative seminar with practical insights. The demos were helpful, though I wish there was more time for Q&A. Still learned a lot!",
    date: "3 weeks ago",
    helpful: 145,
  },
  {
    id: 5,
    name: "Ricky Wijaya",
    avatar: "RW",
    event: "Cybersecurity Workshop",
    rating: 5,
    text: "Eye-opening workshop on the latest security threats. The instructor's real-world examples made everything crystal clear. Worth every minute!",
    date: "1 month ago",
    helpful: 312,
  },
  {
    id: 6,
    name: "Maya Kusuma",
    avatar: "MK",
    event: "Web Development Workshop",
    rating: 4,
    text: "Solid workshop with great content. Would have appreciated more advanced topics, but excellent for intermediate developers.",
    date: "1 month ago",
    helpful: 178,
  },
]

let currentRating = 0

function renderReviews(filter = "all") {
  const reviewsGrid = document.querySelector(".reviews-grid")
  reviewsGrid.innerHTML = ""

  let filteredReviews = reviewsData
  if (filter !== "all" && filter !== "1") {
    filteredReviews = reviewsData.filter((r) => r.rating === Number.parseInt(filter))
  }

  filteredReviews.forEach((review, index) => {
    const stars = Array(5)
      .fill(0)
      .map((_, i) => (i < review.rating ? '<span class="star filled">★</span>' : '<span class="star">★</span>'))
      .join("")

    const reviewCard = document.createElement("div")
    reviewCard.className = "review-card"
    reviewCard.style.animationDelay = `${index * 0.1}s`
    reviewCard.innerHTML = `
            <div class="review-header">
                <div class="reviewer-info">
                    <div class="reviewer-avatar">${review.avatar}</div>
                    <div class="reviewer-details">
                        <h3>${review.name}</h3>
                        <p>${review.date}</p>
                    </div>
                </div>
                <div class="review-rating">
                    ${stars}
                </div>
            </div>
            <div class="review-event">${review.event}</div>
            <div class="review-text">${review.text}</div>
            <div class="review-footer">
                <span class="review-date">Helpful: ${review.helpful} people</span>
                <div class="review-actions">
                    <button class="action-btn" title="Helpful">👍</button>
                    <button class="action-btn" title="Share">📤</button>
                </div>
            </div>
        `
    reviewsGrid.appendChild(reviewCard)
  })
}

// Filter button listeners
document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"))
    this.classList.add("active")
    renderReviews(this.dataset.filter)
  })
})

function openReviewModal() {
  document.getElementById("reviewModal").classList.add("active")
  document.body.style.overflow = "hidden"
}

function closeReviewModal() {
  document.getElementById("reviewModal").classList.remove("active")
  document.body.style.overflow = "auto"
  currentRating = 0
  document.querySelectorAll(".rating-input .star").forEach((star) => star.classList.remove("selected"))
}

function setRating(rating) {
  currentRating = rating
  document.querySelectorAll(".rating-input .star").forEach((star, index) => {
    if (index < rating) {
      star.classList.add("selected")
    } else {
      star.classList.remove("selected")
    }
  })
}

document.getElementById("reviewForm")?.addEventListener("submit", (e) => {
  e.preventDefault()
  alert("Thank you for your review! It will be displayed after moderation.")
  closeReviewModal()
})

// Click outside modal to close
document.getElementById("reviewModal")?.addEventListener("click", function (e) {
  if (e.target === this) {
    closeReviewModal()
  }
})

// Initial render
renderReviews()
