let eyeLeftX, eyeRightX, noseY, mouthY, titleSize;
let eyeLeftSpeed, eyeRightSpeed, noseSpeed, mouthSpeed, diagonalSpeed;
let diagonalX, diagonalY;

function setup() {
  createCanvas(400, 400);
  background(255);
  eyeLeftX = 110;
  eyeRightX = 290;
  noseY = 200;
  mouthY = 255;
  titleSize = 32;
  eyeLeftSpeed = random(1, 3);
  eyeRightSpeed = random(1, 3);
  noseSpeed = random(1, 3);
  mouthSpeed = random(1, 3);
  diagonalSpeed = random(1, 3);
  diagonalX = 200;
  diagonalY = 130;
}

function draw() {
  background(255);
  fill(213, 187, 161);
  noStroke();
  ellipse(eyeLeftX, 200, 30, 60);
  ellipse(eyeRightX, 200, 30, 60);
  eyeLeftX += eyeLeftSpeed;
  eyeRightX += eyeRightSpeed;
  if (eyeLeftX > 400 || eyeLeftX < 0) eyeLeftSpeed *= -1;
  if (eyeRightX > 400 || eyeRightX < 0) eyeRightSpeed *= -1;
  fill(213, 187, 161);
  ellipse(200, noseY, 30, 60); 
  noseY += noseSpeed;
  if (noseY > 300 || noseY < 100) noseSpeed *= -1;
  fill(240, 147, 161);
  ellipse(200, mouthY, 150, 30);
  mouthY += mouthSpeed;
  if (mouthY > 300 || mouthY < 250) mouthSpeed *= -1;
  fill(109, 39, 0);
  ellipse(diagonalX, diagonalY, 120, 70);
  diagonalX += diagonalSpeed;
  diagonalY += diagonalSpeed;
  if (diagonalX > 400 || diagonalX < 0) diagonalSpeed *= -1;
  if (diagonalY > 400 || diagonalY < 0) diagonalSpeed *= -1;
  fill(0);
  textSize(titleSize);
  textAlign(CENTER, TOP);
  text("SELF PORTRAIT", width / 2, height / 10);
  if (frameCount % 60 == 0) { 
    if (titleSize < 160) {
      titleSize += 8;
    } else {
      titleSize -= 8;
    }
  }
}
