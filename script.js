const dino = document.getElementById("dino");
const gameContainer = document.querySelector(".game-container");
const scoreDisplay = document.getElementById("score");

let isJumping = false;
let dinoBottom = 0;
let velocity = 0;
let gravity = 1;
let score = 0;
let speed = 5;
let gameOver = false;

// zrychlené a plynulé skákání
function jump() {
  if (isJumping) return;
  isJumping = true;

  let jumpPeak = dinoBottom + 80; // skočí o 80px nahoru
  let upInterval = setInterval(() => {
    if (dinoBottom >= jumpPeak) {
      clearInterval(upInterval);

      // Padání
      let downInterval = setInterval(() => {
        if (dinoBottom <= 0) {
          dinoBottom = 0;
          dino.style.bottom = dinoBottom + "px";
          clearInterval(downInterval);
          isJumping = false;
        } else {
          dinoBottom -= 10;
          dino.style.bottom = dinoBottom + "px";
        }
      }, 20);
    } else {
      dinoBottom += 10;
      dino.style.bottom = dinoBottom + "px";
    }
  }, 20);
}

document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && !gameOver) {
    jump();
  }
});

function createObstacle() {
  const obstacle = document.createElement("div");
  obstacle.classList.add("obstacle");

  // náhodná velikost stromu
  let height = 30 + Math.random() * 50;
  let width = 20 + Math.random() * 30;
  obstacle.style.height = height + "px";
  obstacle.style.width = width + "px";

  let obstacleLeft = window.innerWidth;
  obstacle.style.left = obstacleLeft + "px";
  gameContainer.appendChild(obstacle);

  let moveInterval = setInterval(() => {
    if (gameOver) {
      clearInterval(moveInterval);
      return;
    }

    obstacleLeft -= speed;
    obstacle.style.left = obstacleLeft + "px";

    // kolize
    if (
      obstacleLeft < 100 &&
      obstacleLeft + width > 50 &&
      dinoBottom < height
    ) {
      clearInterval(moveInterval);
      gameOver = true;
      alert("💥 GAME OVER! Tvoje skóre: " + score);
      location.reload();
    }

    // odstranění a skóre
    if (obstacleLeft < -width) {
      clearInterval(moveInterval);
      gameContainer.removeChild(obstacle);
      score++;
      scoreDisplay.innerText = "Skóre: " + score;
      if (score % 3 === 0 && speed < 20) speed += 0.5;
    }
  }, 20);
}

setInterval(() => {
  if (!gameOver) createObstacle();
}, 1500);
