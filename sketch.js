 // Players and variables //
let player;
let playerSpeed = 5;

// Obstacles //
let obstacles = [];
let obstacleCount = 2;

// Exits //
let exit;
let hasWon = false;

function setup() {
  createCanvas(600, 400);
  
  // Put player at the center of the canvas //
  player = new Player(width / 2, height / 2);
  
  // Create multiple obstacles with random sizes and colors //
  for (let i = 0; i < obstacleCount; i++) {
    obstacles.push(new Obstacle(random(width), random(height)));
  }
  
  // Exit Points //
  exit = new Exit(width - 50, height - 50);
}

function draw() {
  background(220);
  
  // Move player based on keyboard input //
  player.update();
  player.display();
  
  // Move and show obstacles //
  for (let obs of obstacles) {
    obs.update();
    obs.display();
  }
  
  // show the exit //
  exit.display();
  
  // Check if player reaches the exit //
  if (player.intersects(exit)) {
    hasWon = true;
  }
  
  // Display win message if player reached the exit //
  if (hasWon) {
    textSize(32);
    fill(0);
    text('You Won!', width / 2 - 80, height / 2);
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    player.setDirection(-1, 0);
  } else if (keyCode === RIGHT_ARROW) {
    player.setDirection(1, 0);
  } else if (keyCode === UP_ARROW) {
    player.setDirection(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    player.setDirection(0, 1);
  }
}

function keyReleased() {
  player.setDirection(0, 0);
}

function mousePressed() {
  // Add a new non-moving obstacle at the mouse position
  obstacles.push(new Obstacle(mouseX, mouseY, false));
}

// Player class //
class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 20;
    this.xSpeed = 0;
    this.ySpeed = 0;
  }
  
  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    
    // Keep player within canvas boundaries //
    if (this.x < 0) this.x = width;
    if (this.x > width) this.x = 0;
    if (this.y < 0) this.y = height;
    if (this.y > height) this.y = 0;
  }
  
  setDirection(x, y) {
    this.xSpeed = x * playerSpeed;
    this.ySpeed = y * playerSpeed;
  }
  
  intersects(exit) {
    let d = dist(this.x, this.y, exit.x, exit.y);
    return d < this.size + exit.size;
  }
  
  display() {
    fill(0, 0, 255);
    noStroke();
    ellipse(this.x, this.y, this.size, this.size);
  }
}

// Obstacle class //
class Obstacle {
  constructor(x, y, isMoving = true) {
    this.x = x;
    this.y = y;
    this.size = random(20, 50);
    this.color = color(random(255), random(255), random(255));
    this.isMoving = isMoving;
    this.speed = random(1, 3);
  }
  
  update() {
    if (this.isMoving) {
      this.x += random(-this.speed, this.speed);
      this.y += random(-this.speed, this.speed);
      
      // Wrap obstacles around the screen
      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;
    }
  }
  
  display() {
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.size, this.size);
  }
}

// Exit class
class Exit {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 30;
  }
  
  display() {
    fill(255, 0, 0);
    noStroke();
    rect(this.x, this.y, this.size, this.size);
  }
}