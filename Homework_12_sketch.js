let player;
let obstacles = [];
let exit;
let isWin = false;

function setup() {
  createCanvas(600, 400);
  
  // Create player at the center of the canvas //
  player = createPlayer(width / 2, height / 2);
  
  // Generate multiple obstacles with random positions, sizes, and colors
  obstacles.push(createObstacle(100, 400, 40, 40, color(255, 0, 0)));
  obstacles.push(createObstacle(400, 200, 60, 60, color(0, 255, 0)));
  
  // Generate the exit at a random position //
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
  
  // Draw the "You win" message if the player reaches the exit //
  if (isWin) {
    displayWinMessage();
  }
}

function createPlayer(x, y) {
  return { x: x, y: y, size: 20 };
}

function drawPlayer(player) {
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
  if (dist(player.x, player.y, exit.x, exit.y) < player.size + 10) {
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
  text("YAY! You Win!", width / 2, height / 2);
}

function mousePressed() {
  // Create an object where and when mousie is clicked //
  obstacles.push(createObstacle(mouseX, mouseY, random(30, 70), random(30, 70), color(random(255), random(255), random(255))));
}
