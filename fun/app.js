// public/app.js

const canvas = document.getElementById("artCanvas");
const ctx = canvas.getContext("2d");

// Resize canvas to fill window
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Animation loop
function animate() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw animations here

  requestAnimationFrame(animate);
}

animate();

// Key press handler
window.addEventListener("keypress", (event) => {
  const key = event.key.toLowerCase();
  if (animations[key]) {
    animations[key]();
  }
});

// Animation modules
const animations = {
  a: () => {
    const star = {
      x: 0,
      y: Math.random() * canvas.height,
      speed: 5 + Math.random() * 5,
    };

    function drawStar() {
      ctx.fillStyle = "yellow";
      ctx.beginPath();
      ctx.arc(star.x, star.y, 5, 0, Math.PI * 2);
      ctx.fill();

      star.x += star.speed;

      if (star.x < canvas.width) {
        requestAnimationFrame(drawStar);
      }
    }

    drawStar();
  },

  b: () => {
    const squiggle = {
      points: [],
      color: "blue",
      width: 5,
    };

    for (let i = 0; i < 100; i++) {
      squiggle.points.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
      });
    }

    function drawSquiggle() {
      ctx.strokeStyle = squiggle.color;
      ctx.lineWidth = squiggle.width;
      ctx.beginPath();
      ctx.moveTo(squiggle.points[0].x, squiggle.points[0].y);

      for (let i = 1; i < squiggle.points.length; i++) {
        ctx.lineTo(squiggle.points[i].x, squiggle.points[i].y);
      }

      ctx.stroke();
    }

    drawSquiggle();
  },
  // Add more animations here as needed
};
