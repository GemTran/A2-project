
document.body.style.margin   = 0
document.body.style.overflow = `hidden`

// Glitch Audio
const cnv_0 = document.getElementById (`audio`)
cnv_0.width = cnv_0.parentNode.scrollWidth
cnv_0.height = cnv_0.width * 9 / 16

// Arrange layers
cnv_0.style.zIndex = 2
cnv_0.style.backgroundColor = 'transparent'
cnv_0.style.position = 'absolute'

// get and suspend audio context
const audio_context = new AudioContext ()
audio_context.suspend ()

// Define an array of notes 
const notes = [68, 50, 80];

// Function to play a note
function playNote(note, length) {
    // If the audio context is not running, resume it
    if (audio_context.state!= 'running') initAudio();

    // Create an oscillator
    const osc = audio_context.createOscillator();

    // Set the oscillator type to sine
    osc.type = 'sine';

    // Set the frequency of the oscillator
    osc.frequency.value = note;

    // Create an amp node
    const amp = audio_context.createGain();

    // Connect the oscillator to the amp and then to the audio output
    osc.connect(amp).connect(audio_context.destination);

    // Start the oscillator
    osc.start(audio_context.currentTime);

    // Stop the oscillator after the specified length
    osc.stop(audio_context.currentTime + length);
}

// Initialize the audio context
function initAudio() {
    audio_context.resume();
}

// Signal Audio
// Function to play a note and then call itself to play the next note
function playNoteSequence(startNote, numberOfNotes, currentNote = 0) {
    // Return condition: stop after playing the specified number of notes
    if (currentNote >= numberOfNotes) return;

    // Calculate the frequency of the current note
    const frequency = startNote + (currentNote * 100);

    // Play the note
    playNote(frequency, 0.5); // Play for 0.5 seconds

    // Wait for the note to finish playing before calling the next one
    setTimeout(() => {
        // Call the function recursively to play the next note
        playNoteSequence(startNote, numberOfNotes, currentNote + 1);
    }, 500); // Wait for 0.5 seconds before playing the next note
}

//Create a canvas for drawing text interaction
const canvas = document.getElementById('cnv_element');
canvas.width = canvas.parentNode.scrollWidth
canvas.height = canvas.width * 9 / 16

canvas.style.zIndex = 1
canvas.style.position = 'absolute'
canvas.style.backgroundColor = 'transparent'

const ctx = canvas.getContext('2d');

//Declare mouse coordinate - draw mouse
let mouseX = 0;
let mouseY = 0;

let x = 0;
let y = 0;

let stepSize = 5;
let letters = "What makes hUmAn a HuMaN?";
let fontSizeMin = 20;
let angleDistortion = Math.PI / 6;
let counter = 0;
let opacity = 1.0; // Start with full opacity

// Event listener for playNote initialising when mouse move
canvas.addEventListener('mousemove', (event) => {
    mouseX = event.clientX - canvas.getBoundingClientRect().left;
    mouseY = event.clientY - canvas.getBoundingClientRect().top;
    playNote(notes[Math.floor(Math.random() * notes.length)], 1); // Play a random note for 1 second
});

//Recursive draw Letter function
function drawLetter(ctx, text, x, y, size, depth, angle) {
    // Base case: stop recursion if the size is too small or the depth is too high
    if (size < 10 || depth > 5) return;

    // Draw the letters
    ctx.save();
    ctx.font = `${size}px Arial`;
    ctx.fillText(text, x, y);
    ctx.fillStyle = `rgba(${Math.floor(Math.random() * 256)}, 
                        ${Math.floor(Math.random() * 256)}, 
                        ${Math.floor(Math.random() * 256)})`;

    // Recursive calls to draw the text at smaller scales and different positions
    const scaleFactor = 0.4; // Scale factor for the next level of recursion
    const newSize = size * scaleFactor;
    const newDepth = depth + 1;

    //Call itself function
    drawLetter(ctx, text, x - size, y - size, newSize, newDepth,);
    drawLetter(ctx, text, x + size, y - size, newSize, newDepth,);
    drawLetter(ctx, text, x - size, y + size, newSize, newDepth,);
    drawLetter(ctx, text, x + size, y + size, newSize, newDepth,);

    ctx.restore();
}

// Function to draw the text at the current mouse position
function drawText() {
    // Set the font size and style
    ctx.font =  fontSizeMin + 'px Arial'; 

    // Set fill color of the text to a random RGB color.
    ctx.fillStyle = `rgba(${Math.floor(Math.random() * 256)}, 
                        ${Math.floor(Math.random() * 256)}, 
                        ${Math.floor(Math.random() * 256)})`; 

    // Calculate the distance between the current text position (x, y) and the mouse position                    
    const d = Math.sqrt(Math.pow(mouseX - x, 2) + Math.pow(mouseY - y, 2));
    // Based on the current counter value, simulate typing out a message letter by letter.
    const newLetter = letters.charAt(counter);
    stepSize = ctx.measureText(newLetter).width;

    // If distance between mouse and current text position is greater than the width of the new letter
    if (d > stepSize) {
        const angle = Math.atan2(mouseY - y, mouseX - x);
        
        ctx.save();
        ctx.translate(x, y);
        // Random distortion
        ctx.rotate(angle + Math.random() * angleDistortion * 2 - angleDistortion); 
        ctx.fillText(newLetter, 0, 0);
        ctx.restore();
        
        counter++;
        if (counter >= letters.length) counter = 0;
        
        // Update text's position
        x += Math.cos(angle) * stepSize;
        y += Math.sin(angle) * stepSize;
    }
}

const textsArray = ["H", "u", "M", "A", "n"];
let currentTextIndex = 0; // Keep track of the current text index

canvas.addEventListener('click', (event) => {
    const mouseX = event.clientX - canvas.getBoundingClientRect().left;
    const mouseY = event.clientY - canvas.getBoundingClientRect().top;
    playNoteSequence(440, 5);

    // Cycle through the texts array
    const currentText = textsArray[currentTextIndex];
    // Call the draw letter function
    drawLetter(ctx, currentText, mouseX, mouseY, 100, 0,);
    
    // Increment the index and wrap around if it exceeds the array length
    currentTextIndex = (currentTextIndex + 1) % textsArray.length;
});


// Inspired by Voronoi c2 library created by Ren Yuan

const renderer = new c2.Renderer(document.getElementById('c2'));
resize();

renderer.background('black');
let random = new c2.Random();

// Arrange layers
document.getElementById('c2').style.position = `absolute`
document.getElementById('c2').style.left = 0
document.getElementById('c2').style.zIndex = -1

let image = new Image();
image.src = "Art.jpeg"; //Add image path

// Declare variable to make image as pattern for drawing shapes
let pattern;
image.onload = () => {
    pattern = renderer.context.createPattern(image,"repeat");
};

class Agent extends c2.Cell{
    constructor() {
        let x = random.next(renderer.width);
        let y = random.next(renderer.height);
        let r = random.next(renderer.width / 40, renderer.width / 15);
        super(x, y, r);

        this.vx = random.next(-2, 2);
        this.vy = random.next(-2, 2);
        
        this.color = c2.Color.hsl(random.next(0, 30), random.next(30, 60), random.next(20, 100));
    }

    update(){
        this.p.x += this.vx;
        this.p.y += this.vy;

        if (this.p.x < 0) {
            this.p.x = 0;
            this.vx *= -1;
        } else if (this.p.x > renderer.width) {
            this.p.x = renderer.width;
            this.vx *= -1;
        }
        if (this.p.y < 0) {
            this.p.y = 0;
            this.vy *= -1;
        } else if (this.p.y > renderer.height) {
            this.p.y = renderer.height;
            this.vy *= -1;
        }
    }

    display() {
        if (this.state != 2) {
            renderer.stroke(c2.Color.rgb(0, .2));
            renderer.lineWidth(1);

            if (pattern) {
                renderer.fill(pattern);
                } else {
                renderer.fill(this.color);
                }
            renderer.polygon(this.polygon(4));
            renderer.stroke('transparent');
            renderer.lineWidth(1);
            renderer.point(this.p.x, this.p.y);
            
            // Generate a random color for the overlay 
            let overlayColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.5)`;
            
    
            // Draw a low opacity rectangle over the pattern as the overlay 
            renderer.fill(overlayColor);
            renderer.polygon(this.polygon(4));
        }
    }    
}

let agents = new Array(15);
for (let i = 0; i < agents.length; i++) {
    agents[i] = new Agent();
}

renderer.draw(() => {
    let voronoi = new c2.LimitedVoronoi();
    voronoi.compute(agents);

    for (let i = 0; i < agents.length; i++) {
        agents[i].display();
        agents[i].update();
        drawText();
    }
});

function resize() {
    let parent = renderer.canvas.parentElement;
    renderer.size(parent.clientWidth, parent.clientWidth / 16 * 9);
}