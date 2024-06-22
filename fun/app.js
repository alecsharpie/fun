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
    animations[key](key); // Pass the key to the animation function
  }
});

// Animation modules
const animations = {
  // Animation modules

  a: (key) => {
    const square = {
      x: 0,
      y: 0,
      size: 50,
      speed: 5,
      xDirection: 1,
      yDirection: 1,
    };

    function drawSquare() {
      ctx.fillStyle = "green";
      ctx.fillRect(square.x, square.y, square.size, square.size);

      square.x += square.speed * square.xDirection;
      square.y += square.speed * square.yDirection;

      if (square.x + square.size > canvas.width || square.x < 0) {
        square.xDirection *= -1; // Reverse direction
      }

      if (square.y + square.size > canvas.height || square.y < 0) {
        square.yDirection *= -1; // Reverse direction
      }

      requestAnimationFrame(drawSquare);
    }

    drawSquare();
  },

  b: (key) => {
    const ball = {
      x: Math.random() * canvas.width,
      y: 0,
      speed: 2 + Math.random() * 3,
      radius: 20,
      gravity: 0.5,
      damping: 0.9,
      yVel: 0,
    };

    function drawBall() {
      ctx.fillStyle = "blue";
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fill();

      ball.yVel += ball.gravity;
      ball.y += ball.yVel;

      if (ball.y + ball.radius > canvas.height) {
        ball.y = canvas.height - ball.radius;
        ball.yVel *= -ball.damping;
      }

      // Add this to make the ball bounce off the top of the canvas
      if (ball.y - ball.radius < 0) {
        ball.y = ball.radius;
        ball.yVel *= -ball.damping;
      }

      // Remove this condition to keep the animation running indefinitely
      requestAnimationFrame(drawBall);
    }

    drawBall();
  },
  c: (key) => {
    let radius = 0;
    let growing = true;
    const maxRadius = 100;
    const speed = 2;
    const x = canvas.width / 2;
    const y = canvas.height / 2;

    function drawCircle() {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
      ctx.fillStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();

      if (growing) {
        radius += speed;
        if (radius > maxRadius) {
          growing = false;
        }
      } else {
        radius -= speed;
        if (radius < 0) {
          growing = true;
        }
      }

      requestAnimationFrame(drawCircle);
    }

    drawCircle();
  },

  d: (key) => {
    const line = {
      x: 0,
      y: 0,
      speed: 5,
    };

    function drawLine() {
      ctx.strokeStyle = "red";
      ctx.beginPath();
      ctx.moveTo(line.x, line.y);
      ctx.lineTo(line.x + 10, line.y + 10);
      ctx.stroke();

      line.x += line.speed;
      line.y += line.speed;

      if (line.x + 10 > canvas.width || line.y + 10 > canvas.height) {
        line.x = 0;
        line.y = 0;
      }

      requestAnimationFrame(drawLine);
    }

    drawLine();
  },
};
