// Get the canvas and context
const canvas = document.getElementById('cnv_element');
const ctx = canvas.getContext('2d');

// Set canvas size to match window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Variables
let x = 0;
let y = 0;
let mouseX = 0;
let mouseY = 0;
let stepSize = 5.0;
let letters = "What we were never able to tell our parents.";
let fontSizeMin = 3;
let angleDistortion = 0.0;
let counter = 0;

// Setup
function setup() {
 ctx.fillStyle = 'white';
 ctx.fillRect(0, 0, canvas.width, canvas.height);
 ctx.textAlign = 'left';
 ctx.fillStyle = 'rgb(188, 188, 188)';
}

// Draw function
function draw() {
 if (mouseIsPressed) {
    let d = Math.sqrt(Math.pow(mouseX - x, 2) + Math.pow(mouseY - y, 2));
    ctx.font = `${fontSizeMin + d / 2}px Courier New`;
    let newLetter = letters.charAt(counter);
    stepSize = ctx.measureText(newLetter).width;

    if (d > stepSize) {
      let angle = Math.atan2(mouseY - y, mouseX - x);

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle + Math.random() * angleDistortion);
      ctx.fillText(newLetter, 0, 0);
      ctx.restore();

      counter++;
      if (counter > letters.length - 1) counter = 0;

      x = x + Math.cos(angle) * stepSize;
      y = y + Math.sin(angle) * stepSize;
    }
 }
}

// Mouse event handlers
let mouseIsPressed = false;

canvas.addEventListener('mousedown', function(e) {
 mouseIsPressed = true;
 x = e.clientX;
 y = e.clientY;
});

canvas.addEventListener('mousemove', function(e) {
 if (mouseIsPressed) {
    draw();
 }
});

canvas.addEventListener('mouseup', function(e) {
 mouseIsPressed = false;
});

// Initial setup
setup();

// Animation loop
function animate() {
 requestAnimationFrame(animate);
 draw();
}

animate();