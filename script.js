const dino = document.getElementById("dino");
const gameContainer = document.querySelector(".game-container");
const scoreDisplay = document.getElementById("score");

let isJumping = false;
let dinoBottom = 0;
let gravity = 0.9;
let score = 0;
let speed = 5;
let gameOver = false;

function jump() {
  if (isJumping) return;
  isJumping = true;
  let velocity = 20;
  
  let upInterval = setInterval(() => {
    if (velocity <= 0) {
      clearInterval(upInterval);
      let downInterval = setInterval(() => {
        if (dinoBottom <= 0) {
          clearInterval(downInterval);
          dinoBottom = 0;
          dino.style.bottom = dinoBottom + "px";
          isJumping = false;
        } else {
          velocity -= 1;
          dinoBottom -= velocity;
          dino.style.bottom = dinoBottom + "px";
        }
      }, 20);
    } else {
      dinoBottom += velocity;
      velocity -= 1;
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

    // Collision detection
    if (
      obstacleLeft < 100 &&
      obstacleLeft + width > 50 &&
      dinoBottom < height
    ) {
      clearInterval(moveInterval);
      alert("💥 GAME OVER! Tvoje skóre: " + score);
      gameOver = true;
      location.reload();
    }

    if (obstacleLeft < -width) {
      clearInterval(moveInterval);
      gameContainer.removeChild(obstacle);
      score++;
      scoreDisplay.innerText = "Skóre: " + score;

      // zrychlení každých 3 překážky
      if (score % 3 === 0 && speed < 20) {
        speed += 0.5;
      }
    }
  }, 20);
}

// Začne házet stromy
setInterval(() => {
  if (!gameOver) createObstacle();
}, 1500);
