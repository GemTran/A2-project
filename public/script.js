document.body.style.margin   = 0
document.body.style.overflow = `hidden`

// const cnv_0 = document.getElementById (`audio`)
//     cnv_0.width = cnv_0.parentNode.scrollWidth
//     cnv_0.height = cnv_0.width * 9 / 16
//     cnv_0.style.backgroundColor = 'orange'

// // get and suspend audio context
// const audio_context = new AudioContext ()
// audio_context.suspend ()

// // define an async click handler function 
// async function init_audio () {

//     // wait for audio context to resume
//     await audio_context.resume ()
 
//  }

//  // define a function that plays a note
// function play_note (note, length) {

//     // if the audio context is not running, resume it
//     if (audio_context.state != 'running') init_audio ()
 
//     // create an oscillator
//     const osc = audio_context.createOscillator ()
 
//     // make it a triangle wave this time
//     osc.type            = 'triangle'
 
//     // set the value using the equation 
//     // for midi note to Hz
//     osc.frequency.value = 440 * 2 ** ((note - 69) / 12)
 
//     // create an amp node
//     const amp = audio_context.createGain ()
 
//     // connect the oscillator 
//     // to the amp
//     // to the audio out
//     osc.connect (amp).connect (audio_context.destination)
 
//     // the .currentTime property of the audio context
//     // contains a time value in seconds
//     const now = audio_context.currentTime
 
//     // make a gain envelope
//     // start at 0
//     amp.gain.setValueAtTime (0, now)
 
//     // take 0.02 seconds to go to 0.4, linearly
//     amp.gain.linearRampToValueAtTime (0.4, now + 0.02)
 
//     // this method does not like going to all the way to 0
//     // so take length seconds to go to 0.0001, exponentially
//     amp.gain.exponentialRampToValueAtTime (0.0001, now + length)
 
//     // start the oscillator now
//     osc.start (now)
 
//     // stop the oscillator 1 second from now
//     osc.stop  (now + length)
//  }

//     const notes = [ 62, 66, 69, 73, 74, 73, 69, 66 ]
//     let i = 0
//     let running = false
//     let period = 200
//     let len = 0

//     function next_note () {
//         play_note (notes[i++], len)
//         i %= notes.length
//     }

//     // const div_0  = document.getElementById ('resume_audio')
//     // div_0.width  = div_0.parentNode.scrollWidth
//     // div_0.style.height     = `${ div_0.width * 9 / 16 }px`



// // pass anonymous function to the .onclick property
//     // of the div element
//     div_0.onclick = _ => {

//       // if audio context is not running
//       if (audio_context.state != 'running') {
          
//           // call the async init audio function
//           init_audio ()
//       }
//   }

// // // store a new oscillator node in a variable
// // const osc_node = audio_context.createOscillator ()

// // // oscillators come in four flavours:
// // // sine, triangle, sawtooth, and square
// // // sonically, sine is the simplest
// // // giving a pure note with no harmonics
// // osc_node.type = 'sine'

// // // this is the oscillations per second
// // // or Hertz (Hz)
// // // of the oscillator
// // osc_node.frequency.value = 330

// // // store a new gain node in a variable
// // const amp_node = audio_context.createGain ()

// // // set the gain of that node to 0
// // // ie. don't let any sound through
// // amp_node.gain.value = 0

// // // connect the oscillator node
// // // to the gain node
// // osc_node.connect (amp_node)

// // // connect the gain node to
// // // the audio output device
// // // on the audio context
// // amp_node.connect (audio_context.destination)

// // // start the oscillator
// // osc_node.start ()


//     function note_player () {
//         next_note ()
//         if (running) setTimeout (note_player, period)
//     }

//     cnv_0.onpointerdown = e => {
//         running = true
//         note_player ()
//     }

//     cnv_0.onpointermove = e => {
//         len = 5 * e.offsetX / cnv_0.width
//         period = 20 + ((e.offsetY / cnv_0.height) ** 2) * 400
//     }

//     cnv_0.onpointerup = e => {
//         running = false
//     }

//     const draw_frame = () => {
//       ctx.fillStyle = `turquoise`
//       ctx.fillRect (0, 0, innerWidth, innerHeight)
   
//       requestAnimationFrame (draw_frame)
//    }
   
//    draw_frame ()

// let x = 0
// let y = 0
// let stepSize = 5.0;
// let letters =
//   "What we were never able to tell our parents.";
// let fontSizeMin = 3;
// let angleDistortion = 0.0;
// let counter = 0;

// function setup() {
//   // use full screen size
//   createCanvas(windowWidth, windowHeight);
//   background(255);
//   smooth();
//   cursor(CROSS);

//   x = mouseX;
//   y = mouseY;

//   textAlign(LEFT);
//   fill(188, 188, 188);
// }

// function draw() {
//   if (mouseOver) {
//     var d = dist(x, y, mouseX, mouseY);
//     textFont("Courier New");
//     textSize(fontSizeMin + d / 2);
//     var newLetter = letters.charAt(counter);
//     stepSize = textWidth(newLetter);

//     if (d > stepSize) {
//       var angle = atan2(mouseY - y, mouseX - x);

//       push();
//       translate(x, y);
//       rotate(angle + random(angleDistortion));
//       text(newLetter, 0, 0);
//       pop();

//       counter++;
//       if (counter > letters.length - 1) counter = 0;

//       x = x + cos(angle) * stepSize;
//       y = y + sin(angle) * stepSize;
//     }
//   }
// }

// function mouseOver() {
//   x = mouseX;
//   y = mouseY;
// }

const canvas = document.getElementById('cnv_element');
canvas.style.zIndex = 1
canvas.width = canvas.parentNode.scrollWidth
canvas.height = canvas.width * 9 / 16
const ctx = canvas.getContext('2d');
//canvas.style.backgroundColor = 'green'

let mouseX = 0;
let mouseY = 0;

// Function to draw the text at the current mouse position
function drawText() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    ctx.font = '20px Arial'; // Set the font size and style
    ctx.fillText(`What we were never able to tell our parents.`, mouseX, mouseY);
    // ctx.fillStyle = 'green'
}

// Event listener for mouse movement
canvas.addEventListener('mousemove', (event) => {
    mouseX = event.clientX - canvas.getBoundingClientRect().left;
    mouseY = event.clientY - canvas.getBoundingClientRect().top;
    drawText();
});

//heavily inspired by https://codepen.io/boytchev/pen/QWzjOMx?editors=1010 

import * as THREE from '/three.module.js';
import { OrbitControls } from "/OrbitControls.js";

// general setup, boring, skip to the next comment

console.clear( );
//Create a scene
var scene = new THREE.Scene();
scene.background = new THREE.Color( 0xff0000 );
// scene.style.zIndex = -1
// renderer.setClearColor( 0xffffff, 0 );

//Create a camera
var camera = new THREE.PerspectiveCamera( 30, innerWidth/innerHeight );
    camera.position.set( 0, 0, 10 );
    camera.lookAt( scene.position );

//Create a renderer
var renderer = new THREE.WebGLRenderer( {antialias: true} );
    renderer.setSize( innerWidth, innerHeight );
    renderer.setAnimationLoop( animationLoop );
    // console.dir (renderer.domElement)
    renderer.domElement.style.position = `absolute`
    renderer.domElement.style.top = 0
    renderer.domElement.style.zIndex = -1

    document.body.appendChild( renderer.domElement );

    // Add OrbitControls
var controls = new OrbitControls(camera, renderer.domElement);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Update OrbitControls
    renderer.render(scene, camera);
    drawText();
}
animate();

window.addEventListener( "resize", (event) => {
    camera.aspect = innerWidth/innerHeight;
    camera.updateProjectionMatrix( );
    renderer.setSize( innerWidth, innerHeight );
});


// next comment

const N = 20; // number of vertices in a line
const L = 150; // number of lines

var colors = [],
		color = new THREE.Color();
for( var i=0; i<N; i++ )
{
		color.setHSL( 0.8, 1, (1-i/(N-1))**4 );
		colors.push( color.r, color.g, color.b );
}

var material = new THREE.LineBasicMaterial( {
				vertexColors: true,
				blending: THREE.AdditiveBlending,
		} );

var geometry, line, lines = [];

for( var i=0; i<L; i++ )
{
		geometry = new THREE.BufferGeometry();
		geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( colors, 3 ));
		geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ));

		line = new THREE.Line( geometry, material );
		line.pos = geometry.getAttribute( 'position' );
		line.rnd = Math.random();
	
		lines.push( line );
}
scene.add( ...lines );


function path( buf, t, i, rnd )
{
		t += 40*rnd;
	
		var x = (0.1+3*rnd)*Math.sin(t+13*rnd) + 2*rnd*Math.cos(3.2*t+3);
		var y = (3-3*rnd)*Math.cos(t) + 2*rnd*Math.cos(4.5*t-7*rnd);
		var z = (3*rnd**2)*Math.sin(2.7*t-4*rnd);
		buf.setXYZ( i, x, y, z );
}


function animationLoop( t )
{
		
		for( var line of lines )
		{
				for( var i=0; i<N; i++ )
                //based on the current time t and the loop index i. 
					path( line.pos, t/2000-i/50+10, i, line.rnd );
			
				line.pos.needsUpdate = true;
		}

    renderer.render( scene, camera );
}

//    window.onresize = () => {
//       cnv_0.width = innerWidth
//       cnv_0.height = innerHeight   
//    }

// // Set up the canvas
// var canvas = document.createElement('canvas');
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
// document.body.appendChild(canvas);
// var ctx = canvas.getContext('2d')

// //Drawing mouse
// var x = 0,
//   y = 0;
// var stepSize = 5.0;
// var letters =
//   "What we were never able to tell our parents.";
// var fontSizeMin = 3;
// var angleDistortion = 0.0;
// var counter = 0;
// // Mouse event handlers
// canvas.addEventListener('mousemove', function(event) {
//   x = event.clientX;
//   y = event.clientY;
// });

// // Draw function
// function draw() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   ctx.font = fontSizeMin + "px Courier New";
//   ctx.fillStyle = "rgba(188, 188, 188, 1)";
//   ctx.textAlign = "left";
//   ctx.fillText(letters.charAt(counter), x, y);
//   counter++;
//   if (counter > letters.length - 1) counter = 0;
// }

// function draw() {
//   if (mouseOver) {
//     var d = dist(x, y, mouseX, mouseY);
//     textFont("Courier New");
//     textSize(fontSizeMin + d / 2);
//     var newLetter = letters.charAt(counter);
//     stepSize = textWidth(newLetter);

//     if (d > stepSize) {
//       var angle = atan2(mouseY - y, mouseX - x);

//       push();
//       translate(x, y);
//       rotate(angle + random(angleDistortion));
//       text(newLetter, 0, 0);
//       pop();

//       counter++;
//       if (counter > letters.length - 1) counter = 0;

//       x = x + cos(angle) * stepSize;
//       y = y + sin(angle) * stepSize;
//     }
//   }
// }

// function mouseOver() {
//   x = mouseX;
//   y = mouseY;
// }

// function keyTyped() {
//   if (key == "s" || key == "S") save("P_2_3_3_01.png");
// }

// function keyPressed() {
//   // angleDistortion ctrls arrowkeys up/down
//   if (keyCode == DELETE || keyCode == BACKSPACE) background(255);
//   if (keyCode == UP_ARROW) angleDistortion += 0.1;
//   if (keyCode == DOWN_ARROW) angleDistortion -= 0.1;
// }