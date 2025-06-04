const dino = document.getElementById("dino");
const obstacle = document.getElementById("obstacle");

let isJumping = false;
let gravity = 0.9;
let dinoBottom = 0;

function jump() {
  if (isJumping) return;
  isJumping = true;
  let jumpHeight = 0;
  let upInterval = setInterval(() => {
    if (jumpHeight >= 150) {
      clearInterval(upInterval);
      let downInterval = setInterval(() => {
        if (jumpHeight <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        }
        jumpHeight -= 5;
        dinoBottom = jumpHeight;
        dino.style.bottom = dinoBottom + "px";
      }, 20);
    }
    jumpHeight += 5;
    dinoBottom = jumpHeight;
    dino.style.bottom = dinoBottom + "px";
  }, 20);
}

document.addEventListener("keydown", e => {
  if (e.code === "Space") {
    jump();
  }
});

function moveObstacle() {
  let obstacleLeft = window.innerWidth;
  obstacle.style.left = obstacleLeft + "px";

  let timerId = setInterval(() => {
    if (obstacleLeft < 50 && obstacleLeft > 0 && dinoBottom < 50) {
      alert("💥 GAME OVER!");
      clearInterval(timerId);
      location.reload();
    }
    obstacleLeft -= 5;
    obstacle.style.left = obstacleLeft + "px";
  }, 20);
}

setInterval(moveObstacle, 2000);
