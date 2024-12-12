let player;
let characters = [];
let goal;
let follower1, follower2;
let timer = 30;
let gameOver = false;
let gameWon = false;
let gameStarted = true;

function setup() {
  createCanvas(600, 400);
  
  // Create player //
  player = new Player();
  
  // Create random characters //
  for (let i = 0; i < 3; i++) {
    characters.push(new Character());
  }
   
  // Create a goal //
  goal = new Goal();
  
  // Create two characters that follow the player //
  follower1 = new Follower(player);
  follower2 = new Follower(player);
  
  // Start the timer //
  setInterval(updateTimer, 1000);
}

function draw() {
  background(220);
  
  if (gameOver) {
    // Display the message when game is over //
    if (gameWon) {
      textSize(32);
      fill(0, 255, 0);
      text("Yay! Success!", width / 2 - 100, height / 2);
    } else {
      textSize(32);
      fill(255, 0, 0);
      text("Game Over!", width / 2 - 100, height / 2);
    }
    return;
  }

  // Display timer //
  textSize(24);
  fill(0);
  text("Time: " + timer, 20, 30);
  
  // Move player //
  player.update();
  player.display();
  
  // Move random characters //
  for (let c of characters) {
    c.update();
    c.display();
    
    // Check for collision with player //
    if (dist(player.x, player.y, c.x, c.y) < (player.size / 2 + c.size / 2)) {
      c.changeSize();
    }
  }

  // Move and display following characters //
  follower1.update();
  follower1.display();
  
  follower2.update();
  follower2.display();
  
  // Check if the follower characters collide with the player //
  if (dist(player.x, player.y, follower1.x, follower1.y) < (player.size / 2 + follower1.size / 2) ||
      dist(player.x, player.y, follower2.x, follower2.y) < (player.size / 2 + follower2.size / 2)) {
    gameOver = true;
    gameStarted = false;
  }

  // Display and check goal //
  goal.display();
  if (dist(player.x, player.y, goal.x, goal.y) < (player.size / 2 + goal.size / 2)) {
    gameWon = true;
    gameOver = true;
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    player.xSpeed = -5;
  } else if (keyCode === RIGHT_ARROW) {
    player.xSpeed = 5;
  } else if (keyCode === UP_ARROW) {
    player.ySpeed = -5;
  } else if (keyCode === DOWN_ARROW) {
    player.ySpeed = 5;
  }
}

function keyReleased() {
  if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
    player.xSpeed = 0;
  }
  if (keyCode === UP_ARROW || keyCode === DOWN_ARROW) {
    player.ySpeed = 0;
  }
}

// Update timer every second //
function updateTimer() {
  if (timer > 0 && !gameOver) {
    timer--;
  } else if (timer === 0 && !gameOver) {
    gameOver = true;
  }
}

// Reset the game state //
function resetGame() {
  player = new Player();
  characters = [];
  for (let i = 0; i < 3; i++) {
    characters.push(new Character());
  }
  follower1 = new Follower(player);
  follower2 = new Follower(player);
  goal = new Goal();
  timer = 30;
  gameOver = false;
  gameWon = false;
  gameStarted = true;
}

// Player class //
class Player {
  constructor() {
    this.x = width / 2;
    this.y = height - 30;
    this.size = 30;
    this.xSpeed = 0;
    this.ySpeed = 0;
  }
  
  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    
    // Prevent going off screen //
    this.x = constrain(this.x, this.size / 2, width - this.size / 2);
    this.y = constrain(this.y, this.size / 2, height - this.size / 2);
  }
  
  display() {
    fill(0, 0, 255);
    noStroke();
    ellipse(this.x, this.y, this.size);
  }
}

// Character class //
class Character {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(20, 50);
  }
  
  update() {
    // Characters can move randomly (for demonstration) //
    this.x += random(-2, 2);
    this.y += random(-2, 2);
    
    // Keep characters within canvas //
    this.x = constrain(this.x, this.size / 2, width - this.size / 2);
    this.y = constrain(this.y, this.size / 2, height - this.size / 2);
  }
  
  display() {
    fill(255, 0, 0);
    noStroke();
    rect(this.x, this.y, this.size, this.size);
  }
  
  // grow in size when player collides //
  changeSize() {
    this.size = random(20, 50);
  }
}

// Goal class
class Goal {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = 40;
  }
  
  display() {
    fill(0, 255, 0);
    noStroke();
    ellipse(this.x, this.y, this.size);
  }
}

// Follower class ??
class Follower {
  constructor(player) {
    this.x = random(width);
    this.y = random(height);
    this.size = 30;
    this.speed = 2;
    this.player = player;
  }
  
  update() {
    // Move towards Player 1 //
    let angle = atan2(this.player.y - this.y, this.player.x - this.x);
    this.x += this.speed * cos(angle);
    this.y += this.speed * sin(angle);
  }
  
  display() {
    fill(255, 165, 0);  // Color for followers (Orange)
    noStroke();
    ellipse(this.x, this.y, this.size);
  }
}
