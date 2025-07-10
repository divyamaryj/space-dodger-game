const game = document.getElementById("game");
const player = document.getElementById("player");
const scoreDisplay = document.getElementById("score");
let playerX = 180;
let score = 0;
let gameInterval;

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && playerX > 0) {
    playerX -= 20;
  } else if (e.key === "ArrowRight" && playerX < 360) {
    playerX += 20;
  }
  player.style.left = playerX + "px";
});

function createAsteroid() {
  const asteroid = document.createElement("div");
  asteroid.classList.add("asteroid");
  asteroid.style.left = Math.floor(Math.random() * 360) + "px";
  game.appendChild(asteroid);

  let asteroidY = 0;
  const fallInterval = setInterval(() => {
    asteroidY += 5;
    asteroid.style.top = asteroidY + "px";

    // Collision Detection
    if (
      asteroidY > 520 &&
      parseInt(asteroid.style.left) > playerX - 30 &&
      parseInt(asteroid.style.left) < playerX + 40
    ) {
      clearInterval(fallInterval);
      alert("Game Over! Your score: " + score);
      location.reload();
    }

    if (asteroidY > 600) {
      clearInterval(fallInterval);
      asteroid.remove();
    }
  }, 30);
}

function updateScore() {
  score++;
  scoreDisplay.textContent = "Score: " + score;
}

gameInterval = setInterval(() => {
  createAsteroid();
  updateScore();
}, 800);
