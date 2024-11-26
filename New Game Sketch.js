let player;
let obstacles = [];
let nonMovingObstacles = [];
let exit;
let isWin = false;

function setup() {
  createCanvas(600, 400);
  
  // Create player at the center of the canvas //
  player = createPlayer(width / 2, height / 2);
  
  // Generate multiple obstacles with random positions, sizes, and colors ??
  for (let i = 0; i < 5; i++) {
    obstacles.push(createObstacle(random(width), random(height), random(20, 50), random(20, 40), color(random(265), random(295), random(225))));
  }
  
  // Generate the exit at a random position --
  exit = createExit(random(width), random(height));
}

function draw() {
  background(220);
  
  // Display functions //
  drawBorder();
  movePlayer();
  drawPlayer(player);
  drawExit(exit);
  
  // Move obstacles around randomly //
  obstacles.forEach(obstacle => {
    moveObstacle(obstacle);
    drawObstacle(obstacle);
  });
  
  // Draw non-moving obstacles //
  nonMovingObstacles.forEach(obstacle => {
    drawObstacle(obstacle);
  });
  
  // Draw the "You win" message if the player reaches the exit //
  if (isWin) {
    displayWinMessage();
  }
}

function createPlayer(x, y) {
  return { x: x, y: y, size: 20 };
}

function drawPlayer(player) {
  fill(0);
  ellipse(player.x, player.y, player.size * 2);
}

function movePlayer() {
  if (keyIsDown(LEFT_ARROW)) {
    player.x -= 5;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    player.x += 5;
  }
  if (keyIsDown(UP_ARROW)) {
    player.y -= 5;
  }
  if (keyIsDown(DOWN_ARROW)) {
    player.y += 5;
  }
  
  // Check if player reaches the exit //
  if (dist(player.x, player.y, exit.x, exit.y) < player.size + 15) {
    isWin = true;
  }
}

function createObstacle(x, y, w, h, col) {
  return { x: x, y: y, width: w, height: h, color: col };
}

function drawObstacle(obstacle) {
  fill(obstacle.color);
  rect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
}

function moveObstacle(obstacle) {
  obstacle.x += random(-2, 2);
  obstacle.y += random(-2, 2);
  
  // Wrap obstacles around the screen //
  if (obstacle.x > width) obstacle.x = 0;
  if (obstacle.x < 0) obstacle.x = width;
  if (obstacle.y > height) obstacle.y = 0;
  if (obstacle.y < 0) obstacle.y = height;
}

function drawBorder() {
  noFill();
  stroke(0);
  rect(0, 0, width, height);
}

function createExit(x, y) {
  return { x: x, y: y, size: 30 };
}

function drawExit(exit) {
  fill(0, 255, 255);
  ellipse(exit.x, exit.y, exit.size * 2);
}

function displayWinMessage() {
  textSize(32);
  fill(0);
  textAlign(CENTER, CENTER);
  text("YAY! You Win!", width / 3, height / 3);
}

function mousePressed() {
  // Create a non-moving obstacle where and when the mouse is clicked //
  nonMovingObstacles.push(createObstacle(mouseX, mouseY, random(30, 70), random(30, 40), color(random(225), random(295), random(267))));
}