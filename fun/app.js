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

// Select the existing HTML element to display the keys pressed
const keysPressed = document.getElementById("keysPressed");

// Key press handler
window.addEventListener("keypress", (event) => {
  const key = event.key.toLowerCase();
  if (animations[key]) {
    animations[key](key); // Pass the key to the animation function
  }
  // Update the text content of the keysPressed element
  keysPressed.textContent += key + " ";
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
      // Removed the line that clears the entire canvas
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

  e: (key) => {
    let angle = 0;
    const speed = 0.05;
    const radius = 100;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    function drawSpiral() {
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      ctx.fillStyle = "purple";
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, Math.PI * 2);
      ctx.fill();

      angle += speed;

      requestAnimationFrame(drawSpiral);
    }

    drawSpiral();
  },

  f: (key) => {
    const triangle = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      size: 50,
      angle: 0,
      speed: 0.01,
    };

    function drawTriangle() {
      ctx.fillStyle = "orange";
      ctx.beginPath();
      ctx.moveTo(triangle.x, triangle.y);
      ctx.lineTo(triangle.x + triangle.size * Math.cos(triangle.angle), triangle.y + triangle.size * Math.sin(triangle.angle));
      ctx.lineTo(triangle.x + triangle.size * Math.cos(triangle.angle + 2/3 * Math.PI), triangle.y + triangle.size * Math.sin(triangle.angle + 2/3 * Math.PI));
      ctx.lineTo(triangle.x + triangle.size * Math.cos(triangle.angle + 4/3 * Math.PI), triangle.y + triangle.size * Math.sin(triangle.angle + 4/3 * Math.PI));
      ctx.closePath();
      ctx.fill();

      triangle.angle += triangle.speed;

      requestAnimationFrame(drawTriangle);
    }

    drawTriangle();
  },

  g: (key) => {
    let angle = 0;
    const speed = 0.05;
    const radius = 50;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    function drawRotatingSquare() {
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      ctx.fillStyle = "pink";
      ctx.fillRect(x, y, 20, 20);

      angle += speed;

      requestAnimationFrame(drawRotatingSquare);
    }

    drawRotatingSquare();
  },

  h: (key) => {
    const ellipse = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      xRadius: 50,
      yRadius: 100,
      angle: 0,
      speed: 0.01,
    };

    function drawEllipse() {
      const x = ellipse.x + ellipse.xRadius * Math.cos(ellipse.angle);
      const y = ellipse.y + ellipse.yRadius * Math.sin(ellipse.angle);

      ctx.fillStyle = "cyan";
      ctx.beginPath();
      ctx.ellipse(x, y, 10, 20, 0, 0, Math.PI * 2);
      ctx.fill();

      ellipse.angle += ellipse.speed;

      requestAnimationFrame(drawEllipse);
    }

    drawEllipse();
  },

  i: (key) => {
    let angle = 0;
    const speed = 0.05;
    const radius = 100;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    function drawRotatingStar() {
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      ctx.fillStyle = "yellow";
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + 10, y + 20);
      ctx.lineTo(x + 20, y);
      ctx.lineTo(x, y + 10);
      ctx.lineTo(x + 20, y + 10);
      ctx.closePath();
      ctx.fill();

      angle += speed;

      requestAnimationFrame(drawRotatingStar);
    }

    drawRotatingStar();
  },

  j: (key) => {
    const rectangle = {
      x: 0,
      y: 0,
      width: 50,
      height: 100,
      speed: 5,
      xDirection: 1,
      yDirection: 1,
    };

    function drawMovingRectangle() {
      ctx.fillStyle = "brown";
      ctx.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);

      rectangle.x += rectangle.speed * rectangle.xDirection;
      rectangle.y += rectangle.speed * rectangle.yDirection;

      if (rectangle.x + rectangle.width > canvas.width || rectangle.x < 0) {
        rectangle.xDirection *= -1; // Reverse direction
      }

      if (rectangle.y + rectangle.height > canvas.height || rectangle.y < 0) {
        rectangle.yDirection *= -1; // Reverse direction
      }

      requestAnimationFrame(drawMovingRectangle);
    }

    drawMovingRectangle();
  },

  k: (key) => {
    let angle = 0;
    const speed = 0.05;
    const radius = 100;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    function drawRotatingHexagon() {
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      ctx.fillStyle = "lightblue";
      ctx.beginPath();
      ctx.moveTo(x, y);
      for(let i = 1; i <= 6; i++) {
        ctx.lineTo(x + 20 * Math.cos(i * Math.PI / 3), y + 20 * Math.sin(i * Math.PI / 3));
      }
      ctx.closePath();
      ctx.fill();

      angle += speed;

      requestAnimationFrame(drawRotatingHexagon);
    }

    drawRotatingHexagon();
  },

  l: (key) => {
    const line = {
      x: 0,
      y: 0,
      length: 100,
      angle: 0,
      speed: 0.01,
    };

    function drawRotatingLine() {
      ctx.strokeStyle = "lime";
      ctx.beginPath();
      ctx.moveTo(line.x, line.y);
      ctx.lineTo(line.x + line.length * Math.cos(line.angle), line.y + line.length * Math.sin(line.angle));
      ctx.stroke();

      line.angle += line.speed;

      requestAnimationFrame(drawRotatingLine);
    }

    drawRotatingLine();
  },

  m: (key) => {
    let angle = 0;
    const speed = 0.05;
    const radius = 100;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    function drawRotatingHeart() {
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      ctx.fillStyle = "pink";
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.bezierCurveTo(x, y - 3, x - 5, y - 15, x - 25, y - 15);
      ctx.bezierCurveTo(x - 55, y - 15, x - 55, y + 22.5, x - 55, y + 22.5);
      ctx.bezierCurveTo(x - 55, y + 40, x - 35, y + 62, x, y + 80);
      ctx.bezierCurveTo(x + 35, y + 62, x + 55, y + 40, x + 55, y + 22.5);
      ctx.bezierCurveTo(x + 55, y + 22.5, x + 55, y - 15, x + 25, y - 15);
      ctx.bezierCurveTo(x + 10, y - 15, x, y - 3, x, y);
      ctx.fill();

      angle += speed;

      requestAnimationFrame(drawRotatingHeart);
    }

    drawRotatingHeart();
  },

  n: (key) => {
    const text = {
      x: 0,
      y: 0,
      speed: 5,
      xDirection: 1,
      yDirection: 1,
    };

    function drawMovingText() {
      ctx.fillStyle = "orange";
      ctx.font = "30px Arial";
      ctx.fillText("Hello!", text.x, text.y);

      text.x += text.speed * text.xDirection;
      text.y += text.speed * text.yDirection;

      if (text.x + ctx.measureText("Hello!").width > canvas.width || text.x < 0) {
        text.xDirection *= -1; // Reverse direction
      }

      if (text.y + 30 > canvas.height || text.y < 0) {
        text.yDirection *= -1; // Reverse direction
      }

      requestAnimationFrame(drawMovingText);
    }

    drawMovingText();
  },

  o: (key) => {
    let angle = 0;
    const speed = 0.05;
    const radius = 100;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    function drawRotatingPentagon() {
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      ctx.fillStyle = "purple";
      ctx.beginPath();
      ctx.moveTo(x, y);
      for(let i = 1; i <= 5; i++) {
        ctx.lineTo(x + 20 * Math.cos(i * 2 * Math.PI / 5), y + 20 * Math.sin(i * 2 * Math.PI / 5));
      }
      ctx.closePath();
      ctx.fill();

      angle += speed;

      requestAnimationFrame(drawRotatingPentagon);
    }

    drawRotatingPentagon();
  },

  p: (key) => {
    const point = {
      x: 0,
      y: 0,
      speed: 5,
      xDirection: 1,
      yDirection: 1,
    };

    function drawMovingPoint() {
      ctx.fillStyle = "red";
      ctx.fillRect(point.x, point.y, 2, 2);

      point.x += point.speed * point.xDirection;
      point.y += point.speed * point.yDirection;

      if (point.x > canvas.width || point.x < 0) {
        point.xDirection *= -1; // Reverse direction
      }

      if (point.y > canvas.height || point.y < 0) {
        point.yDirection *= -1; // Reverse direction
      }

      requestAnimationFrame(drawMovingPoint);
    }

    drawMovingPoint();
  },

  q: (key) => {
    let angle = 0;
    const speed = 0.05;
    const radius = 100;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    function drawRotatingOctagon() {
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      ctx.fillStyle = "green";
      ctx.beginPath();
      ctx.moveTo(x, y);
      for(let i = 1; i <= 8; i++) {
        ctx.lineTo(x + 20 * Math.cos(i * Math.PI / 4), y + 20 * Math.sin(i * Math.PI / 4));
      }
      ctx.closePath();
      ctx.fill();

      angle += speed;

      requestAnimationFrame(drawRotatingOctagon);
    }

    drawRotatingOctagon();
  },

  r: (key) => {
    const rectangle = {
      x: 0,
      y: 0,
      width: 100,
      height: 50,
      speed: 5,
      xDirection: 1,
      yDirection: 1,
    };

    function drawMovingRectangle() {
      ctx.fillStyle = "blue";
      ctx.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);

      rectangle.x += rectangle.speed * rectangle.xDirection;
      rectangle.y += rectangle.speed * rectangle.yDirection;

      if (rectangle.x + rectangle.width > canvas.width || rectangle.x < 0) {
        rectangle.xDirection *= -1; // Reverse direction
      }

      if (rectangle.y + rectangle.height > canvas.height || rectangle.y < 0) {
        rectangle.yDirection *= -1; // Reverse direction
      }

      requestAnimationFrame(drawMovingRectangle);
    }

    drawMovingRectangle();
  },

};
