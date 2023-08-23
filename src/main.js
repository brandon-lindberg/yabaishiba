let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: create,
  },
};

let game = new Phaser.Game(config);

function preload() {
  // Load assets here
}

function create() {
  this.add
    .text(400, 300, "Hello Phaser!", { fontSize: "32px", fill: "#fff" })
    .setOrigin(0.5);
}
