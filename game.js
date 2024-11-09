const gameArea = document.getElementById("game");
const ball = document.getElementById("ball");
const hoop = document.getElementById("hoop");
const scoreDisplay = document.getElementById("score");
const messageDisplay = document.getElementById("message");

let score = 0;
let shooting = false;

// Shoot the ball
ball.addEventListener("click", () => {
  if (!shooting) {
    shooting = true;
    messageDisplay.textContent = "";  // Clear any previous message
    shootBall();
  }
});

// Function to animate the ball shoot
function shootBall() {
  let ballPosition = 560;  // Starting position of the ball
  let ballLeft = parseInt(ball.style.left);

  const shootInterval = setInterval(() => {
    ballPosition -= 8;
    ball.style.top = ballPosition + "px";

    // Check if the ball is near the hoop
    if (ballPosition <= 100 && ballLeft > 140 && ballLeft < 220) {
      score += 1;
      scoreDisplay.textContent = score;
      displayMessage("Nice Shot!", "green");
      resetBall();
      clearInterval(shootInterval);
    }

    // If the ball misses the hoop
    if (ballPosition <= 0) {
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
  ball.style.top = "560px";
  shooting = false;
}

// Allow player to move the ball left and right
document.addEventListener("keydown", (event) => {
  let ballLeft = parseInt(ball.style.left);

  if (event.key === "ArrowLeft" && ballLeft > 0) {
    ball.style.left = (ballLeft - 20) + "px";
  } else if (event.key === "ArrowRight" && ballLeft < 360) {
    ball.style.left = (ballLeft + 20) + "px";
  }
});
