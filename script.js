// Countdown Timer Logic
const countdownElement = document.getElementById('countdown');
const previewButton = document.getElementById('preview-btn');
const previewMessage = document.getElementById('preview-msg');

//For Background animation
const bgCanvas = document.getElementById("backgroundFireworks");
const bgCtx = bgCanvas.getContext("2d");

function resizeCanvas() {
  bgCanvas.width = window.innerWidth;
  bgCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const fireworks = [];

class FireworkParticle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = color;
    this.opacity = 1;
    this.shrink = 0.96;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.size *= this.shrink;
    this.opacity -= 0.02;
  }

  draw() {
    bgCtx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
    bgCtx.beginPath();
    bgCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    bgCtx.fill();
  }
}

function createRandomFirework() {
  const colors = [
    "255, 99, 71", // Red
    "60, 179, 113", // Green
    "30, 144, 255", // Blue
    "238, 130, 238", // Purple
    "255, 215, 0", // Yellow
  ];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const x = Math.random() * bgCanvas.width;
  const y = Math.random() * bgCanvas.height;

  for (let i = 0; i < 50; i++) {
    fireworks.push(new FireworkParticle(x, y, color));
  }
}

function animateFireworks() {
  bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
  for (let i = 0; i < fireworks.length; i++) {
    fireworks[i].update();
    fireworks[i].draw();
    if (fireworks[i].opacity <= 0) {
      fireworks.splice(i, 1);
      i--;
    }
  }
  requestAnimationFrame(animateFireworks);
}

// Automatically create random fireworks every second
setInterval(createRandomFirework, 1000);

// Start animation
animateFireworks();


// Function to calculate time difference
function updateCountdown() {
  const currentDate = new Date();
  const newYear = new Date(currentDate.getFullYear() + 1, 0, 1);
  const timeLeft = newYear - currentDate;

  if (timeLeft <= 0) {
    clearInterval(timer);
    countdownElement.innerHTML = "<span>00</span>:<span>00</span>:<span>00</span>:<span>00</span>";
    previewMessage.classList.remove('hidden');
    return;
  }

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  // Animate each number update
  countdownElement.innerHTML = `
    <span>${days.toString().padStart(2, '0')}</span>:
    <span>${hours.toString().padStart(2, '0')}</span>:
    <span>${minutes.toString().padStart(2, '0')}</span>:
    <span>${seconds.toString().padStart(2, '0')}</span>
  `;
}

// Preview button action
previewButton.addEventListener('click', () => {
  previewMessage.classList.remove('hidden');
});

// Start the countdown timer
const timer = setInterval(updateCountdown, 1000);
updateCountdown();

