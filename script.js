const game = document.getElementById("game");
const player = document.getElementById("player");
const scoreDisplay = document.getElementById("score");
let playerX = 180;
let score = 0;
let gameInterval;

// Set initial player position
player.style.left = playerX + "px";

// 🟢 Drag-to-Move on Touchscreens
let isDragging = false;

game.addEventListener("touchstart", (e) => {
  isDragging = true;
  moveToTouch(e);
});

game.addEventListener("touchmove", (e) => {
  if (isDragging) moveToTouch(e);
});

game.addEventListener("touchend", () => {
  isDragging = false;
});

function moveToTouch(e) {
  const gameRect = game.getBoundingClientRect();
  const touchX = e.touches[0].clientX - gameRect.left;

  let newX = touchX - player.offsetWidth / 2;
  newX = Math.max(0, Math.min(game.offsetWidth - player.offsetWidth, newX));

  playerX = newX;
  player.style.left = playerX + "px";
}

// 🪨 Asteroid Generator
function createAsteroid() {
  const asteroid = document.createElement("div");
  asteroid.classList.add("asteroid");
  asteroid.style.left = Math.floor(Math.random() * 360) + "px";
  game.appendChild(asteroid);

  let asteroidY = 0;
  const fallInterval = setInterval(() => {
    asteroidY += 5;
    asteroid.style.top = asteroidY + "px";

    // 💥 Collision Detection
    if (
      asteroidY > 520 &&
      parseInt(asteroid.style.left) > playerX - 30 &&
      parseInt(asteroid.style.left) < playerX + 40
    ) {
      clearInterval(fallInterval);
      alert("Game Over! Your score: " + score);
      location.reload();
    }

    // Remove asteroid when it goes out of screen
    if (asteroidY > 600) {
      clearInterval(fallInterval);
      asteroid.remove();
    }
  }, 30);
}

// 🔢 Score Updater
function updateScore() {
  score++;
  scoreDisplay.textContent = "Score: " + score;
}

// 🕹 Start the Game
gameInterval = setInterval(() => {
  createAsteroid();
  updateScore();
}, 800);
