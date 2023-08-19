
let cols, rows;
let flowField;
let resolution = 20;
let z=100
let hairColors
function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = floor(width / resolution);
  rows = floor(height / resolution);
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
  frameRate(15)
}

function draw() {
  background(0)
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols;
      let angle = noise(x * 0.1, y * 0.1,z) * TWO_PI*1.36;
     
      let v = p5.Vector.fromAngle(angle);
  
      
      // Draw hair strands
      let xPos = x * resolution;
      let yPos = y * resolution;
      let clr =floor(map(angle,0,TWO_PI*1.36,0,8))
      
      stroke(hairColors[clr])
      strokeWeight((0.6*angle)+(0.2*resolution)); // hair thickness tied to angle
      push();
      translate(xPos, yPos);
      rotate(v.heading());
      line(0, 0, resolution * 2.4, 0);
      pop();
    }
    z+=0.002
  }

}
