const canvas = document.getElementById("artCanvas");
const ctx = canvas.getContext("2d");
const overlay = document.getElementById("overlay"); // Select the overlay element
const keysPressed = document.getElementById("keysPressed");

// Hide the overlay after the first key press
window.addEventListener("keypress", function handler(event) {
  overlay.style.display = "none"; // Hide the overlay
  window.removeEventListener("keypress", handler); // Remove this event listener
});

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

  // Set the fill style to white
  ctx.fillStyle = "white";

  // Fill the entire canvas with the fill style
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  requestAnimationFrame(animate);
}

animate();

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
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 50,
      speed: 0.05, // Adjust speed for a smoother rotation
      angle: 0,
    };

    function drawSquare() {
      ctx.save(); // Save the current state of the context
      ctx.translate(square.x + square.size / 2, square.y + square.size / 2); // Move the origin to the center of the square
      ctx.rotate(square.angle); // Rotate the context
      ctx.fillStyle = `hsl(${(square.x + square.y) % 360}, 100%, 50%)`;
      ctx.clearRect(
        -square.size / 2,
        -square.size / 2,
        square.size,
        square.size
      ); // Clear the area where the square is
      ctx.fillRect(
        -square.size / 2,
        -square.size / 2,
        square.size,
        square.size
      ); // Draw the square centered on the new origin

      square.angle += square.speed; // Increase the angle for the next frame

      ctx.restore(); // Restore the context to its original state

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
      ctx.strokeStyle = `hsl(${(line.x + line.y) % 360}, 100%, 50%)`;
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
    const speed = -0.05;
    const radius = 111;
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
      ctx.lineTo(
        triangle.x + triangle.size * Math.cos(triangle.angle),
        triangle.y + triangle.size * Math.sin(triangle.angle)
      );
      ctx.lineTo(
        triangle.x +
          triangle.size * Math.cos(triangle.angle + (2 / 3) * Math.PI),
        triangle.y +
          triangle.size * Math.sin(triangle.angle + (2 / 3) * Math.PI)
      );
      ctx.lineTo(
        triangle.x +
          triangle.size * Math.cos(triangle.angle + (4 / 3) * Math.PI),
        triangle.y +
          triangle.size * Math.sin(triangle.angle + (4 / 3) * Math.PI)
      );
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
    let radius = 50;
    let growing = true;
    const maxRadius = 200; // Increased max radius
    const minRadius = 20; // Added min radius
    const speed = 2; // Increased speed
    const x = canvas.width / 2;
    const y = canvas.height / 2;
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
    const speed = 0.25;
    const radius = 150; // Increased radius
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
      x: canvas.width, // Start at the top right
      y: Math.random() * canvas.height, // Random starting y
      width: 50,
      height: 100,
      speed: 5,
      xDirection: -1, // Move left
      yDirection: Math.random() > 0.5 ? 1 : -1, // Random direction
    };

    function drawMovingRectangle() {
      ctx.fillStyle = "brown";
      ctx.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);

      rectangle.x += rectangle.speed * rectangle.xDirection;
      rectangle.y += rectangle.speed * rectangle.yDirection;

      if (rectangle.x + rectangle.width > canvas.width) {
        rectangle.x = canvas.width - rectangle.width;
        rectangle.xDirection *= -1; // Reverse direction
      } else if (rectangle.x < 0) {
        rectangle.x = 0;
        rectangle.xDirection *= -1; // Reverse direction
      }

      if (rectangle.y + rectangle.height > canvas.height) {
        rectangle.y = canvas.height - rectangle.height;
        rectangle.yDirection *= -1; // Reverse direction
      } else if (rectangle.y < 0) {
        rectangle.y = 0;
        rectangle.yDirection *= -1; // Reverse direction
      }

      requestAnimationFrame(drawMovingRectangle);
    }

    drawMovingRectangle();
  },

  k: (key) => {
    let angle = 0;
    const speed = -0.05;
    const radius = 275; // Decreased radius
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    function drawRotatingHexagon() {
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      ctx.fillStyle = "lightblue";
      ctx.beginPath();
      ctx.moveTo(x, y);
      for (let i = 1; i <= 6; i++) {
        ctx.lineTo(
          x + 20 * Math.cos((i * Math.PI) / 3),
          y + 20 * Math.sin((i * Math.PI) / 3)
        );
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
      ctx.lineTo(
        line.x + line.length * Math.cos(line.angle),
        line.y + line.length * Math.sin(line.angle)
      );
      ctx.stroke();

      line.angle += line.speed;

      requestAnimationFrame(drawRotatingLine);
    }

    drawRotatingLine();
  },

  m: (key) => {
    const diamond = {
      x: canvas.width / 2,
      y: 0,
      speed: 5,
      yDirection: 1,
    };

    function drawMovingDiamond() {
      ctx.fillStyle = "green";
      ctx.beginPath();
      ctx.moveTo(diamond.x, diamond.y);
      ctx.lineTo(diamond.x + 10, diamond.y + 20);
      ctx.lineTo(diamond.x, diamond.y + 40);
      ctx.lineTo(diamond.x - 10, diamond.y + 20);
      ctx.closePath();
      ctx.fill();

      diamond.y += diamond.speed * diamond.yDirection;

      if (diamond.y + 40 > canvas.height || diamond.y < 0) {
        diamond.yDirection *= -1; // Reverse direction
      }

      requestAnimationFrame(drawMovingDiamond);
    }

    drawMovingDiamond();
  },

  n: (key) => {
    const star = {
      x: 0,
      y: 0,
      speed: 5,
      xDirection: 1,
      yDirection: 1,
    };

    function drawMovingStar() {
      ctx.fillStyle = `hsl(${(star.x + star.y) % 360}, 100%, 50%)`;
      ctx.beginPath();
      ctx.moveTo(star.x, star.y);
      for (let i = 1; i <= 5; i++) {
        ctx.lineTo(
          star.x + 20 * Math.cos((i * 2 * Math.PI) / 5),
          star.y + 20 * Math.sin((i * 2 * Math.PI) / 5)
        );
      }
      ctx.closePath();
      ctx.fill();

      star.x += star.speed * star.xDirection;
      star.y += star.speed * star.yDirection;

      if (star.x + 20 > canvas.width || star.x < 0) {
        star.xDirection *= -1; // Reverse direction
      }

      if (star.y + 20 > canvas.height || star.y < 0) {
        star.yDirection *= -1; // Reverse direction
      }

      requestAnimationFrame(drawMovingStar);
    }

    drawMovingStar();
  },

  o: (key) => {
    let angle = 0;
    const speed = 0.05;
    const radius = 275;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    function drawRotatingPentagon() {
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      ctx.fillStyle = "purple";
      ctx.beginPath();
      ctx.moveTo(x, y);
      for (let i = 1; i <= 5; i++) {
        ctx.lineTo(
          x + 20 * Math.cos((i * 2 * Math.PI) / 5),
          y + 20 * Math.sin((i * 2 * Math.PI) / 5)
        );
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
      for (let i = 1; i <= 8; i++) {
        ctx.lineTo(
          x + 20 * Math.cos((i * Math.PI) / 4),
          y + 20 * Math.sin((i * Math.PI) / 4)
        );
      }
      ctx.closePath();
      ctx.fill();

      angle += speed;

      requestAnimationFrame(drawRotatingOctagon);
    }

    drawRotatingOctagon();
  },

  r: (key) => {
    const line = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      length: 100,
      angle: 0,
      speed: 0.01,
      lengthSpeed: 1,
    };

    function drawPulsatingLine() {
      // Change the color based on the length
      ctx.strokeStyle = `hsl(${line.length % 360}, 100%, 50%)`;
      ctx.beginPath();
      ctx.moveTo(line.x, line.y);
      ctx.lineTo(
        line.x + line.length * Math.cos(line.angle),
        line.y + line.length * Math.sin(line.angle)
      );
      ctx.stroke();

      line.angle += line.speed;
      line.length += line.lengthSpeed;

      // Reverse the length direction when the line reaches a certain length
      if (line.length > 200 || line.length < 50) {
        line.lengthSpeed *= -1;
      }

      requestAnimationFrame(drawPulsatingLine);
    }

    drawPulsatingLine();
  },

  s: (key) => {
    let angle = 0;
    const speed = (Math.random() < 0.5 ? -1 : 1) * 0.005;
    const radius = 175;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    function drawRotatingSquare() {
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      ctx.fillStyle = "red";
      ctx.fillRect(x, y, 20, 20);

      angle += speed;

      requestAnimationFrame(drawRotatingSquare);
    }

    drawRotatingSquare();
  },

  t: (key) => {
    const heart = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      speed: 5,
      xDirection: Math.random() > 0.5 ? 1 : -1, // Random direction
      yDirection: Math.random() > 0.5 ? 1 : -1, // Random direction
    };

    function drawMovingHeart() {
      ctx.fillStyle = "pink";
      ctx.beginPath();
      ctx.moveTo(heart.x, heart.y);
      ctx.bezierCurveTo(
        heart.x,
        heart.y - 3,
        heart.x - 5,
        heart.y - 15,
        heart.x - 25,
        heart.y - 15
      );
      ctx.bezierCurveTo(
        heart.x - 55,
        heart.y - 15,
        heart.x - 55,
        heart.y + 22.5,
        heart.x - 55,
        heart.y + 22.5
      );
      ctx.bezierCurveTo(
        heart.x - 55,
        heart.y + 40,
        heart.x - 35,
        heart.y + 62,
        heart.x,
        heart.y + 80
      );
      ctx.bezierCurveTo(
        heart.x + 35,
        heart.y + 62,
        heart.x + 55,
        heart.y + 40,
        heart.x + 55,
        heart.y + 22.5
      );
      ctx.bezierCurveTo(
        heart.x + 55,
        heart.y + 22.5,
        heart.x + 55,
        heart.y - 15,
        heart.x + 25,
        heart.y - 15
      );
      ctx.bezierCurveTo(
        heart.x + 10,
        heart.y - 15,
        heart.x,
        heart.y - 3,
        heart.x,
        heart.y
      );
      ctx.fill();

      heart.x += heart.speed * heart.xDirection;
      heart.y += heart.speed * heart.yDirection;

      // Ensure the heart stays within the canvas
      if (heart.x + 55 > canvas.width) {
        heart.x = canvas.width - 55;
        heart.xDirection *= -1; // Reverse direction
      } else if (heart.x - 55 < 0) {
        heart.x = 55;
        heart.xDirection *= -1; // Reverse direction
      }

      if (heart.y + 80 > canvas.height) {
        heart.y = canvas.height - 80;
        heart.yDirection *= -1; // Reverse direction
      } else if (heart.y - 15 < 0) {
        heart.y = 15;
        heart.yDirection *= -1; // Reverse direction
      }

      requestAnimationFrame(drawMovingHeart);
    }

    drawMovingHeart();
  },

  u: (key) => {
    let angle = 0;
    const speed = 0.05;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    function drawRotatingTriangle() {
      const radius = 100 + 50 * Math.sin(angle); // Spiral pattern
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      ctx.fillStyle = "blue";
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + 20, y + 40);
      ctx.lineTo(x - 20, y + 40);
      ctx.closePath();
      ctx.fill();

      angle += speed;

      requestAnimationFrame(drawRotatingTriangle);
    }

    drawRotatingTriangle();
  },

  v: (key) => {
    const triangle = {
      x: 0,
      y: 0,
      size: 50,
      speed: 5,
      xDirection: 1,
      yDirection: 1,
    };

    function drawMovingTriangle() {
      ctx.fillStyle = "purple";
      ctx.beginPath();
      ctx.moveTo(triangle.x, triangle.y);
      ctx.lineTo(triangle.x + triangle.size, triangle.y);
      ctx.lineTo(triangle.x + triangle.size / 2, triangle.y + triangle.size);
      ctx.closePath();
      ctx.fill();

      triangle.x += triangle.speed * triangle.xDirection;
      triangle.y += triangle.speed * triangle.yDirection;

      if (triangle.x + triangle.size > canvas.width || triangle.x < 0) {
        triangle.xDirection *= -1; // Reverse direction
      }

      if (triangle.y + triangle.size > canvas.height || triangle.y < 0) {
        triangle.yDirection *= -1; // Reverse direction
      }

      requestAnimationFrame(drawMovingTriangle);
    }

    drawMovingTriangle();
  },

  w: (key) => {
    let angle = 0;
    const speed = 0.05;
    const radius = 100;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    function drawRotatingStar() {
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      ctx.fillStyle = "orange";
      ctx.beginPath();
      ctx.moveTo(x, y);
      for (let i = 1; i <= 5; i++) {
        ctx.lineTo(
          x + 20 * Math.cos((i * 2 * Math.PI) / 5),
          y + 20 * Math.sin((i * 2 * Math.PI) / 5)
        );
      }
      ctx.closePath();
      ctx.fill();

      angle += speed;

      requestAnimationFrame(drawRotatingStar);
    }

    drawRotatingStar();
  },

  x: (key) => {
    const cross = {
      x: 0,
      y: 0,
      size: 50,
      speed: 5,
      xDirection: 1,
      yDirection: 1,
    };

    function drawMovingCross() {
      ctx.fillStyle = "cyan";
      ctx.fillRect(
        cross.x,
        cross.y + cross.size / 3,
        cross.size,
        cross.size / 3
      );
      ctx.fillRect(
        cross.x + cross.size / 3,
        cross.y,
        cross.size / 3,
        cross.size
      );

      cross.x += cross.speed * cross.xDirection;
      cross.y += cross.speed * cross.yDirection;

      if (cross.x + cross.size > canvas.width || cross.x < 0) {
        cross.xDirection *= -1; // Reverse direction
      }

      if (cross.y + cross.size > canvas.height || cross.y < 0) {
        cross.yDirection *= -1; // Reverse direction
      }

      requestAnimationFrame(drawMovingCross);
    }

    drawMovingCross();
  },

  y: (key) => {
    let angle = 0;
    const speed = 0.05;
    const radius = 100;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    function drawRotatingRectangle() {
      const x = centerX + radius * Math.cos(angle) * Math.sin(angle); // Figure-eight pattern
      const y = centerY + radius * Math.sin(angle) * Math.cos(angle); // Figure-eight pattern

      ctx.fillStyle = "purple";
      ctx.fillRect(x, y, 20, 40);

      angle += speed;

      requestAnimationFrame(drawRotatingRectangle);
    }

    drawRotatingRectangle();
  },

  z: (key) => {
    const zigzag = {
      angle: 0,
      speed: 0.05,
      radius: 100,
      size: 50,
    };

    function drawMovingZigzag() {
      // Calculate the position based on a circular path
      zigzag.x = canvas.width / 2 + zigzag.radius * Math.cos(zigzag.angle);
      zigzag.y = canvas.height / 2 + zigzag.radius * Math.sin(zigzag.angle);

      // Change the color based on the position
      ctx.fillStyle = `hsl(${(zigzag.x + zigzag.y) % 360}, 100%, 50%)`;

      ctx.beginPath();
      ctx.moveTo(zigzag.x, zigzag.y);
      for (let i = 0; i < 4; i++) {
        ctx.lineTo(
          zigzag.x + i * zigzag.size,
          zigzag.y + (i % 2) * zigzag.size
        );
      }
      ctx.lineTo(zigzag.x + 4 * zigzag.size, zigzag.y);
      ctx.stroke();

      zigzag.angle += zigzag.speed;

      requestAnimationFrame(drawMovingZigzag);
    }

    drawMovingZigzag();
  },
};

window.onload = function () {
  const clearButton = document.getElementById("clearButton");
  clearButton.addEventListener("click", () => {
    location.reload();
  });
};
