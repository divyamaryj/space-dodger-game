const player = document.getElementById("player");
const asteroid = document.getElementById("asteroid");
const scoreElement = document.getElementById("score");
const game = document.getElementById("game");

let playerX = 180;
let asteroidY = -40;
let asteroidX = Math.floor(Math.random() * 360);
let score = 0;

// Initial positions
player.style.left = playerX + "px";
asteroid.style.left = asteroidX + "px";

// Touch controls: drag to move
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

// Update asteroid and check collisions
setInterval(() => {
  asteroidY += 3;
  asteroid.style.top = asteroidY + "px";

  if (asteroidY > game.offsetHeight) {
    score++;
    scoreElement.textContent = "Score: " + score;
    resetAsteroid();
  }

  if (checkCollision()) {
    alert("Game Over! Your score: " + score);
    location.reload();
  }
}, 20);

function resetAsteroid() {
  asteroidY = -40;
  asteroidX = Math.floor(Math.random() * (game.offsetWidth - 40));
  asteroid.style.left = asteroidX + "px";
  asteroid.style.top = asteroidY + "px";
}

function checkCollision() {
  const asteroidRect = asteroid.getBoundingClientRect();
  const playerRect = player.getBoundingClientRect();
  return !(
    asteroidRect.bottom < playerRect.top ||
    asteroidRect.top > playerRect.bottom ||
    asteroidRect.right < playerRect.left ||
    asteroidRect.left > playerRect.right
  );
}
