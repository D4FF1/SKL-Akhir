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

        // Tic Tac Toe Game
        let ticTacToeBoard = ['', '', '', '', '', '', '', '', '']
        let currentPlayer = 'X'
        let gameActive = true

        function initTicTacToe() {
          const board = document.getElementById("ticTacToeBoard")
          board.innerHTML = ""
          ticTacToeBoard = ['', '', '', '', '', '', '', '', '']
          currentPlayer = 'X'
          gameActive = true
          document.getElementById("currentPlayer").textContent = currentPlayer
          document.getElementById("tictactoeStats").style.display = "none"

          for (let i = 0; i < 9; i++) {
            const cell = document.createElement("div")
            cell.className = "tic-tac-toe-cell"
            cell.setAttribute("data-index", i)
            cell.onclick = () => handleTicTacToeClick(i, cell)
            board.appendChild(cell)
          }
        }

        function handleTicTacToeClick(index, cell) {
          if (ticTacToeBoard[index] !== '' || !gameActive) return

          ticTacToeBoard[index] = currentPlayer
          cell.textContent = currentPlayer
          cell.classList.add(currentPlayer.toLowerCase())

          if (checkTicTacToeWinner()) {
            document.getElementById("tictactoeStats").style.display = "block"
            document.getElementById("tictactoeResult").textContent = `Player ${currentPlayer} wins! 🎉`
            gameActive = false
            return
          }

          if (ticTacToeBoard.every(cell => cell !== '')) {
            document.getElementById("tictactoeStats").style.display = "block"
            document.getElementById("tictactoeResult").textContent = "It's a tie! 🤝"
            gameActive = false
            return
          }

          currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
          document.getElementById("currentPlayer").textContent = currentPlayer
        }

        function checkTicTacToeWinner() {
          const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6] // diagonals
          ]

          return winPatterns.some(pattern => {
            const [a, b, c] = pattern
            return ticTacToeBoard[a] !== '' && 
                   ticTacToeBoard[a] === ticTacToeBoard[b] && 
                   ticTacToeBoard[a] === ticTacToeBoard[c]
          })
        }

        function resetTicTacToe() {
          initTicTacToe()
        }

        // Typing Test
        let typingTimer = null
        let typingTimeLeft = 60
        let typingScore = 0
        let typingTestActive = false
        const typingTexts = [
          "The quick brown fox jumps over the lazy dog. This sentence contains all the letters in the English alphabet.",
          "Programming is the process of creating a set of instructions that tell a computer how to perform a task.",
          "JavaScript is a versatile programming language that is primarily used for web development and creating interactive websites.",
          "Technology events bring together like-minded individuals to share knowledge, network, and explore new innovations.",
          "Practice makes perfect when it comes to improving your typing speed and accuracy over time."
        ]

        function startTypingTest() {
          if (typingTestActive) return
          
          typingTestActive = true
          typingTimeLeft = 60
          typingScore = 0
          document.getElementById("typingTime").textContent = typingTimeLeft
          document.getElementById("typingScore").textContent = typingScore
          document.getElementById("typingStats").style.display = "none"
          document.getElementById("typingInput").value = ""
          document.getElementById("typingInput").disabled = false
          document.getElementById("typingInput").focus()
          
          // Select random text
          const randomIndex = Math.floor(Math.random() * typingTexts.length)
          document.getElementById("typingText").textContent = typingTexts[randomIndex]
          
          // Start timer
          typingTimer = setInterval(() => {
            typingTimeLeft--
            document.getElementById("typingTime").textContent = typingTimeLeft
            
            if (typingTimeLeft <= 0) {
              endTypingTest()
            }
          }, 1000)
        }

        function checkTypingProgress() {
          if (!typingTestActive) return
          
          const input = document.getElementById("typingInput").value
          const text = document.getElementById("typingText").textContent
          
          // Calculate score based on words typed
          const wordsTyped = input.trim().split(/\s+/).length
          typingScore = wordsTyped
          document.getElementById("typingScore").textContent = typingScore
        }

        function endTypingTest() {
          clearInterval(typingTimer)
          typingTestActive = false
          document.getElementById("typingInput").disabled = true
          
          const input = document.getElementById("typingInput").value
          const text = document.getElementById("typingText").textContent
          
          // Calculate WPM and accuracy
          const wordsTyped = input.trim().split(/\s+/).length
          const wpm = Math.round(wordsTyped)
          
          // Simple accuracy calculation
          let correctChars = 0
          const minLength = Math.min(input.length, text.length)
          for (let i = 0; i < minLength; i++) {
            if (input[i] === text[i]) correctChars++
          }
          const accuracy = minLength > 0 ? Math.round((correctChars / minLength) * 100) : 0
          
          document.getElementById("typingStats").style.display = "block"
          document.getElementById("typingWPM").textContent = wpm
          document.getElementById("typingAccuracy").textContent = accuracy
        }

        // Math Challenge
        let mathTimer = null
        let mathTimeLeft = 60
        let mathScore = 0
        let mathCorrect = 0
        let mathTotal = 0
        let mathChallengeActive = false

        function startMathChallenge() {
          if (mathChallengeActive) return
          
          mathChallengeActive = true
          mathTimeLeft = 60
          mathScore = 0
          mathCorrect = 0
          mathTotal = 0
          document.getElementById("mathTime").textContent = mathTimeLeft
          document.getElementById("mathScore").textContent = mathScore
          document.getElementById("mathStats").style.display = "none"
          
          // Start timer
          mathTimer = setInterval(() => {
            mathTimeLeft--
            document.getElementById("mathTime").textContent = mathTimeLeft
            
            if (mathTimeLeft <= 0) {
              endMathChallenge()
            }
          }, 1000)
          
          generateMathProblem()
        }

        function generateMathProblem() {
          if (!mathChallengeActive) return
          
          const operations = ['+', '-', '*']
          const operation = operations[Math.floor(Math.random() * operations.length)]
          let num1, num2, answer
          
          switch(operation) {
            case '+':
              num1 = Math.floor(Math.random() * 50) + 1
              num2 = Math.floor(Math.random() * 50) + 1
              answer = num1 + num2
              break
            case '-':
              num1 = Math.floor(Math.random() * 50) + 1
              num2 = Math.floor(Math.random() * num1) + 1
              answer = num1 - num2
              break
            case '*':
              num1 = Math.floor(Math.random() * 12) + 1
              num2 = Math.floor(Math.random() * 12) + 1
              answer = num1 * num2
              break
          }
          
          document.getElementById("mathProblem").textContent = `${num1} ${operation} ${num2} = ?`
          
          // Generate options
          const options = [answer]
          while (options.length < 4) {
            const randomOption = Math.floor(Math.random() * 100) + 1
            if (!options.includes(randomOption)) {
              options.push(randomOption)
            }
          }
          
          // Shuffle options
          options.sort(() => Math.random() - 0.5)
          
          const optionsContainer = document.getElementById("mathOptions")
          optionsContainer.innerHTML = ""
          
          options.forEach(option => {
            const optionElement = document.createElement("div")
            optionElement.className = "math-option"
            optionElement.textContent = option
            optionElement.onclick = () => checkMathAnswer(option, answer)
            optionsContainer.appendChild(optionElement)
          })
        }

        function checkMathAnswer(selected, correct) {
          if (!mathChallengeActive) return
          
          mathTotal++
          const options = document.querySelectorAll(".math-option")
          
          if (selected === correct) {
            mathScore += 10
            mathCorrect++
            document.getElementById("mathScore").textContent = mathScore
            
            // Highlight correct answer
            options.forEach(option => {
              if (parseInt(option.textContent) === correct) {
                option.classList.add("correct")
              }
            })
          } else {
            // Highlight correct and incorrect answers
            options.forEach(option => {
              const value = parseInt(option.textContent)
              if (value === correct) {
                option.classList.add("correct")
              } else if (value === selected) {
                option.classList.add("incorrect")
              }
            })
          }
          
          // Generate new problem after a short delay
          setTimeout(() => {
            if (mathChallengeActive) {
              generateMathProblem()
            }
          }, 1000)
        }

        function endMathChallenge() {
          clearInterval(mathTimer)
          mathChallengeActive = false
          
          document.getElementById("mathStats").style.display = "block"
          document.getElementById("finalMathScore").textContent = mathScore
          document.getElementById("mathCorrect").textContent = mathCorrect
          document.getElementById("mathTotal").textContent = mathTotal
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
          } else if (gameName === "tictactoe") {
            initTicTacToe()
          } else if (gameName === "typing") {
            document.getElementById("typingStats").style.display = "none"
          } else if (gameName === "math") {
            document.getElementById("mathStats").style.display = "none"
          }
        }

        function closeGame(gameName) {
          const modal = document.getElementById(gameName + "Modal")
          modal.classList.remove("active")
          
          // Stop any active timers
          if (gameName === "typing" && typingTestActive) {
            clearInterval(typingTimer)
            typingTestActive = false
          }
          
          if (gameName === "math" && mathChallengeActive) {
            clearInterval(mathTimer)
            mathChallengeActive = false
          }
        }

        // Close modal when clicking outside
        window.addEventListener("click", (e) => {
          const modals = document.querySelectorAll(".game-modal")
          modals.forEach((modal) => {
            if (e.target === modal) {
              modal.classList.remove("active")
              
              // Stop any active timers
              if (typingTestActive) {
                clearInterval(typingTimer)
                typingTestActive = false
              }
              
              if (mathChallengeActive) {
                clearInterval(mathTimer)
                mathChallengeActive = false
              }
            }
          })
        })