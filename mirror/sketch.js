
let cols, rows, vScale;
let flowField;
let res= 25;
let z=100
let hairColors
function setup() {
createCanvas(windowWidth, windowHeight); // larger canvas to draw to

  if (width < height) {
    vScale = floor(width / res); // vScale tied to window width so it can work on phone and computer
    console.log("by width");

  } else {

    vScale = floor(height / res);
    console.log("by height");
  }
  pixelDensity(1);
  myvideo = createCapture(VIDEO);
  myvideo.size(width / vScale, height / vScale);
  myvideo.hide();
  // video dom element , the source, will be smaller by vScale which is 40 by 30 to improve performance
  frameRate(5);
   

  hairColors = [
  color(255, 245, 158), // Light Blonde
  color(237, 211, 133), // Medium Blonde
  color(204, 162, 89),  // Dark Blonde
  color(177, 133, 79),  // Light Brown
  color(138, 94, 56),   // Medium Brown
  color(96, 63, 32),    // Dark Brown
  color(60, 39, 17),    // Light Black
  color(43, 28, 12),    // Medium Black
  color(23, 15, 6)      // Dark Black
];
  
  //noiseSeed(0); // Optional: To keep the noise consistent
}

function draw() {
  background(0)
  // load the myvideo to pixel array
  myvideo.loadPixels(); // gets a pixes arry for video capture

  // loop through the small video capture  
  for (let y = 0; y < myvideo.height; y++) { // for each y there are some x's
    for (let x = 0; x < myvideo.width; x++) {

      //this mirrors the index for see note book
      let index = (myvideo.width - x - 1 + (y * myvideo.width)) * 4;
      let r = myvideo.pixels[index + 0];
      let g = myvideo.pixels[index + 1];
      let b = myvideo.pixels[index + 2];

      let bright = floor((r + g + b) / 3) // the brightness or greyscale 0-255 is the average of the rgb
      let angle = (map(bright,0,255,0,TWO_PI))
      //let angle = noise(x * 0.1, y * 0.1,z) * TWO_PI * 2;
      let v = p5.Vector.fromAngle(angle);
  
      
      // Draw hair strands
      let xPos = x * vScale;
      let yPos = y * vScale;
      let clr =floor(map(angle,0,TWO_PI,0,8))
      
      stroke(hairColors[clr])
      strokeWeight((0.6*angle)+(0.2*vScale)); // hair thickness tied to angle
      push();
      translate(xPos, yPos);
      rotate(v.heading());
      line(0, 0, vScale*2.4, 0);
      pop();
    }
    z+=0.001
  }

}
