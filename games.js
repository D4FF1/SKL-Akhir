// Memory Game
const memoryEmojis = ["🎮", "🎮", "🎯", "🎯", "🎪", "🎪", "🎨", "🎨", "🎭", "🎭", "🎬", "🎬", "🎤", "🎤", "🎸", "🎸"]
let memoryCards = []
let flippedCards = []
let matchedPairs = 0
let moves = 0

function initMemoryGame() {
  const memoryGrid = document.getElementById("memoryGrid")
  memoryGrid.innerHTML = ""
  memoryCards = memoryEmojis.sort(() => Math.random() - 0.5)
  moves = 0
  matchedPairs = 0
  flippedCards = []
  document.getElementById("moves").textContent = moves
  document.getElementById("memoryStats").style.display = "none"

  memoryCards.forEach((emoji, index) => {
    const card = document.createElement("div")
    card.className = "memory-card"
    card.textContent = ""
    card.onclick = () => flipMemoryCard(index, card, emoji)
    memoryGrid.appendChild(card)
  })
}

function flipMemoryCard(index, card, emoji) {
  if (flippedCards.length >= 2 || flippedCards.includes(index) || card.classList.contains("matched")) return

  card.classList.add("flipped")
  card.textContent = emoji
  flippedCards.push(index)

  if (flippedCards.length === 2) {
    moves++
    document.getElementById("moves").textContent = moves

    const [first, second] = flippedCards
    if (memoryCards[first] === memoryCards[second]) {
      matchedPairs++
      document.querySelectorAll(".memory-card")[first].classList.add("matched")
      document.querySelectorAll(".memory-card")[second].classList.add("matched")
      flippedCards = []

      if (matchedPairs === 8) {
        setTimeout(() => {
          document.getElementById("memoryStats").style.display = "block"
          document.getElementById("finalMoves").textContent = moves
        }, 300)
      }
    } else {
      setTimeout(() => {
        document.querySelectorAll(".memory-card")[first].classList.remove("flipped")
        document.querySelectorAll(".memory-card")[second].classList.remove("flipped")
        document.querySelectorAll(".memory-card")[first].textContent = ""
        document.querySelectorAll(".memory-card")[second].textContent = ""
        flippedCards = []
      }, 600)
    }
  }
}

function resetMemoryGame() {
  initMemoryGame()
}

// Spinning Wheel
const prizes = [
  "Free Event Pass",
  "Premium Ticket",
  "VIP Access",
  "Early Bird Discount",
  "Exclusive Merchandise",
  "Meet & Greet",
]
let isSpinning = false

function spinWheel() {
  if (isSpinning) return
  isSpinning = true

  const wheel = document.getElementById("wheel")
  const spins = 10 + Math.random() * 5
  const randomPrizeIndex = Math.floor(Math.random() * prizes.length)
  const rotation = spins * 360 + randomPrizeIndex * (360 / 6)

  wheel.style.transform = `rotate(${rotation}deg)`

  setTimeout(() => {
    document.getElementById("wheelResult").style.display = "block"
    document.getElementById("wheelPrize").textContent = prizes[randomPrizeIndex]
    isSpinning = false
  }, 4000)
}

// Reaction Game
let reactionStartTime = 0
let reactionStarted = false

function startReactionTest() {
  const reactionBox = document.getElementById("reactionBox")
  document.getElementById("reactionResult").style.display = "none"
  reactionBox.className = "reaction-box ready"
  reactionBox.textContent = "Wait..."
  reactionStarted = false

  const randomDelay = 2000 + Math.random() * 3000
  setTimeout(() => {
    reactionBox.className = "reaction-box go"
    reactionBox.textContent = "GO!"
    reactionStartTime = Date.now()
    reactionStarted = true
  }, randomDelay)
}

function handleReactionClick() {
  if (reactionStarted) {
    const reactionTime = Date.now() - reactionStartTime
    document.getElementById("reactionResult").style.display = "block"
    document.getElementById("reactionTime").textContent = reactionTime + "ms"
    document.getElementById("reactionBox").className = "reaction-box ready"
    document.getElementById("reactionBox").textContent = "Test Complete!"
    reactionStarted = false
  }
}

// Modal Management
function openGame(gameName) {
  const modal = document.getElementById(gameName + "Modal")
  modal.classList.add("active")

  if (gameName === "memory") {
    initMemoryGame()
  } else if (gameName === "wheel") {
    document.getElementById("wheelResult").style.display = "none"
  } else if (gameName === "reaction") {
    document.getElementById("reactionResult").style.display = "none"
  }
}

function closeGame(gameName) {
  const modal = document.getElementById(gameName + "Modal")
  modal.classList.remove("active")
}

// Close modal when clicking outside
window.addEventListener("click", (e) => {
  const modals = document.querySelectorAll(".game-modal")
  modals.forEach((modal) => {
    if (e.target === modal) {
      modal.classList.remove("active")
    }
  })
})
