

webSocket = new WebSocket("ws://98.110.200.185:8080/sockets/events/");

var canvas = document.getElementById('canvas');
context = canvas.getContext('2d');

function trackKeys(keys) {
  let down = Object.create(null);
  function track(event) {
    if (keys.includes(event.key)) {
      down[event.key] = event.type == "keydown";
      event.preventDefault();
      webSocket.send(event.key);
      console.log(event.key);
    }
  }
  window.addEventListener("keydown", track);
  window.addEventListener("keyup", track);

  return down;
}
function sendDat() {
  webSocket.send();
}
function Sprite(img, width, height, positions){
  this.img = img;
  this.width = width;
  this.height = height;
  this.positions = positions;
}
Sprite.prototype = {
  draw: function(position, x, y){
      var pos = this.positions[position];
      context.drawImage(
        this.img,
        pos[0],
        pos[1],
        this.width,
        this.height,
        x, y,
        this.width,
        this.height
      );
    }
};
var img = new Image();
img.src = 'https://davetayls.me/space-invaders/sprites.png';
var dino = new Sprite(img, 32, 16, [
    // specify a few sprite locations
[10, 523],  // green
[131, 523], // pink
[191, 523]  // hit
]);
sprite.draw(0, 10, 200);
sprite.draw(1, 50, 200);
sprite.draw(2, 90, 200);

	
document.getElementsByTagName("h1")[0].innerHTML ="Hello";
console.log("Init");
const arrowKeys =
  trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp", "w", "a", "s", "d", "W", "A", "S", "D"]);