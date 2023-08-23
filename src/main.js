let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: create,
    update: update
  },
};

let game = new Phaser.Game(config);
let dottedLines = [];
let roadTopY;


function preload() {
  // No assets to load for this basic separation
}

function drawDottedLines(scene, startY, endY, roadTopWidth, roadBottomWidth) {
  const numberOfDots = 11; // Adjusted to 11 dots
  const dotHeight = 10;
  const spaceBetweenDots = (endY - startY) / numberOfDots;

  for (let i = 0; i < numberOfDots; i++) {
    let currentY = startY + (i + 0.5) * spaceBetweenDots;

    // Calculate width at current Y (linear interpolation)
    let currentWidth =
      roadTopWidth +
      (roadBottomWidth - roadTopWidth) *
        ((currentY - startY) / (endY - startY));

    let startX = (scene.sys.game.config.width - currentWidth) / 2;
    let endX = (scene.sys.game.config.width + currentWidth) / 2;

    let middleX = (startX + endX) / 2;

    // Instead of creating a new graphics object each time, we'll create a rectangle sprite
    let line = scene.add.rectangle(middleX, currentY, 4, dotHeight, 0xffff00);
    dottedLines.push(line);
  }
}

function update() {
  const speed = 0.5;

  for (let line of dottedLines) {
    line.y += speed;

    if (line.y - line.height / 2 > this.sys.game.config.height) {
      line.y = roadTopY + line.height / 2;
    }
  }
}


function create() {
  this.add
    .text(400, 100, "Yabai Shiba!", { fontSize: "32px", fill: "#fff" })
    .setOrigin(0.5);
  // Set a blue background color for the entire game canvas
  this.cameras.main.setBackgroundColor("#87CEEB"); // Sky blue color

  // Draw the green ground. We'll use a graphics object for this.
  let ground = this.add.graphics({ fillStyle: { color: 0x00ff00 } }); // Green color
  ground.fillRect(
    0,
    this.sys.game.config.height - 250,
    this.sys.game.config.width,
    250
  ); // Drawing the ground at the bottom, 50 pixels high

  // Draw the road with perspective
  let roadTopWidth = 75; // Width of the road at the furthest (top) point
  let roadBottomWidth = 450; // Width of the road at the nearest (bottom) point
  roadTopY = this.sys.game.config.height - 250; // Y position of the top of the road
  let roadBottomY = this.sys.game.config.height; // Y position of the bottom of the road

  let road = this.add.graphics({ fillStyle: { color: 0x696969 } }); // Dark gray color for the road

  // The polygon method can be used to fill a shape with vertices.
  // We'll specify the vertices for our trapezoid-shaped road.
  road.fillPoints(
    [
      new Phaser.Geom.Point(
        (this.sys.game.config.width - roadTopWidth) / 2,
        roadTopY
      ),
      new Phaser.Geom.Point(
        (this.sys.game.config.width + roadTopWidth) / 2,
        roadTopY
      ),
      new Phaser.Geom.Point(
        (this.sys.game.config.width + roadBottomWidth) / 2,
        roadBottomY
      ),
      new Phaser.Geom.Point(
        (this.sys.game.config.width - roadBottomWidth) / 2,
        roadBottomY
      ),
    ],
    true
  );
  // Draw the dotted yellow lines on the road
  drawDottedLines(this, roadTopY, roadBottomY, roadTopWidth, roadBottomWidth);
}
