const gameArea = document.getElementById("game");
const ball = document.getElementById("ball");
const hoop = document.getElementById("hoop");
const scoreDisplay = document.getElementById("score");
const messageDisplay = document.getElementById("message");

let score = 0;
let shooting = false;
let ballPositionY = 560;  // Y position for the ball
let ballPositionX = 180;  // X position for the ball
const ballSpeed = 8;      // Speed of ball movement
const hoopRange = { left: 140, right: 220 }; // Range of hoop position

// Position ball initially
ball.style.top = `${ballPositionY}px`;
ball.style.left = `${ballPositionX}px`;

// Handle arrow and space bar controls
document.addEventListener("keydown", (event) => {
  if (shooting) return;  // Don't move ball while shooting

  if (event.key === "ArrowLeft" && ballPositionX > 0) {
    ballPositionX -= 20;
    ball.style.left = `${ballPositionX}px`;
  } else if (event.key === "ArrowRight" && ballPositionX < 360) {
    ballPositionX += 20;
    ball.style.left = `${ballPositionX}px`;
  } else if (event.key === " ") {  // Space bar to shoot
    if (!shooting) {
      shooting = true;
      messageDisplay.textContent = "";  // Clear any previous message
      shootBall();
    }
  }
});

// Function to animate the ball shoot
function shootBall() {
  let currentY = ballPositionY;

  const shootInterval = setInterval(() => {
    currentY -= ballSpeed;
    ball.style.top = currentY + "px";

    // Check if the ball is near the hoop for a successful shot
    if (currentY <= 100 && ballPositionX >= hoopRange.left && ballPositionX <= hoopRange.right) {
      score += 1;
      scoreDisplay.textContent = score;
      displayMessage("Nice Shot!", "green");
      resetBall();
      clearInterval(shootInterval);
    }

    // Check if the ball misses the hoop
    if (currentY <= 0) {
      score -= 1;
      scoreDisplay.textContent = score;
      displayMessage("OPPA", "red");
      resetBall();
      clearInterval(shootInterval);
    }
  }, 20);
}

// Display message for a shot
function displayMessage(text, color) {
  messageDisplay.textContent = text;
  messageDisplay.style.color = color;
}

// Reset the ball after each shot
function resetBall() {
  ballPositionY = 560;
  ball.style.top = ballPositionY + "px";
  shooting = false;
}

