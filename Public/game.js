/** TO DO:
 *      View handled here, ground speed (stop when fighting), gameLoop, canvas, sprites, etc.
 */
document.addEventListener("DOMContentLoaded", function () {
  const signinForm = document.getElementById("signin-form");
  const errorMessage = document.getElementById("error-message");
  const signinContainer = document.getElementById("signin-container");
  const canvasWrapper = document.querySelector(".canvas-wrapper");
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");

  const GAME_WIDTH = 800;
  const GAME_HEIGHT = 350;

  let scaleRatio = null;
  let previousTime = null;
  let isAtCharacterSelect = true;

  function drawCanvas() {
    signinContainer.style.display = "none";
    canvasWrapper.style.display = "block";
    canvas.style.display = "block";
    setScreen();
  }

  function handleSignIn(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Will have to change once DB is configured etc.
    if (username === " " && password === " ") {
      drawCanvas();
    } else {
      errorMessage.textContent = "Invalid credentials. Please try again.";
    }
  }

  function setScreen() {
    scaleRatio = getScaleRatio();
    canvas.width = GAME_WIDTH * scaleRatio;
    canvas.height = GAME_HEIGHT * scaleRatio;
  }

  function showCharacterSelect() {
    const fontSize = 30 * scaleRatio;
    ctx.font = `${fontSize}px Roboto`;
    ctx.fillStyle = "black";
    const x = canvas.width / 4;
    const y = canvas.height / 6;
    ctx.fillText("Select one of your characters below!", x, y);
  }

  window.addEventListener("resize", () => setTimeout(setScreen, 500));

  if (screen.orientation) {
    screen.orientation.addEventListener("change", setScreen);
  }

  function getScaleRatio() {
    const screenHeight = Math.min(
      window.innerHeight,
      document.documentElement.clientHeight
    );

    const screenWidth = Math.min(
      window.innerWidth,
      document.documentElement.clientWidth
    );

    if (screenWidth / screenHeight < GAME_WIDTH / GAME_HEIGHT) {
      return screenWidth / GAME_WIDTH;
    } else {
      return screenHeight / GAME_HEIGHT;
    }
  }

  function clearScreen() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function gameLoop(currentTime) {
    if (previousTime === null) {
      previousTime = currentTime;
      requestAnimationFrame(gameLoop);
      return;
    }
    const frameTimeDelta = currentTime - previousTime;
    previousTime = currentTime;
    clearScreen();
    requestAnimationFrame(gameLoop);

    if (isAtCharacterSelect) {
      showCharacterSelect();
    }
  }

  signinForm.addEventListener("submit", handleSignIn);
  requestAnimationFrame(gameLoop);
});
