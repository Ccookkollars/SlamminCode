

webSocket = new WebSocket("ws://localhost:8080/sockets/events/");
webSocket.onmessage = function(event){
	if (typeof event === "string"){
		messageReceive(event);
	}
}
function messageRecieve(msg){
	console.log("messageReceive: " + msg);
	document.getElementsByTagName("h1")[0].innerHTML = msg;
	dat = JSON.parse(msg);
	
	flag = false;
	if ("color" in dat){
		dinos[dat.color].x = dat.x;
		dinos[dat.color].y = dat.y;
	}
	else{
		dinos["blue"].x = dat.x;
		dinos["blue"].y = dat.y;
	}
}
var canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');

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
function Sprite(img, srcwidth, srcheight, width, height, positions){
  this.img = img;
  this.srcwidth = srcwidth;
  this.srcheight = srcheight;
  this.width = width;
  this.height = height;
  this.positions = positions;
}

Sprite.prototype = {
	draw: function(position, x, y){
		var pos = this.positions[position];
		ctx.drawImage(
				this.img,
				pos[0],
				pos[1],
				this.srcwidth,
				this.srcheight,
				x, y,
				this.width,
				this.height
		);
	}
};
function Dino(path, startframe, endframe, x = 0, y = 0){
	this.x = x;
	this.y = y;
	this.path = path;
	this.lastframe = startframe;
	this.startframe = startframe;
	this.endframe = endframe;
	this.img = new Image();
	this.img.src = path;
	var loc = []; 
	for(let i=this.startframe; i<this.endframe;i++){
	    loc[i] = [i*24, 0];
	}
	this.sprite = new Sprite(this.img, 24, 24, 48, 48, loc);
}

Dino.prototype = {
	draw: function(){
		this.sprite.draw(this.lastframe++, this.x, this.y);
		if (this.lastframe >= this.endframe){
			this.lastframe = this.startframe; 
		}
	}
}

dinos = {
	"blue": new Dino('res/sheets/DinoSprites - doux.png', 4, 10),
	"red": new Dino('res/sheets/DinoSprites - mort.png', 4, 10, 300, 300)
} 

setInterval(() => {
	ctx.mozImageSmoothingEnabled = false;
	ctx.webkitImageSmoothingEnabled = false;
	ctx.msImageSmoothingEnabled = false;
	ctx.imageSmoothingEnabled = false;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (const [color, dino] of Object.entries(dinos)) {
	  dino.draw();
	}
}, 200);

setTimeout(() => {
	messageRecieve("{\"x\":50, \"y\":10}");
}, 700);
setTimeout(() => {
	messageRecieve("{\"color\":\"red\", \"x\":325, \"y\":318}");
}, 1500);

document.getElementsByTagName("h1")[0].innerHTML ="Hello";
console.log("Init");
const arrowKeys = trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp", "w", "a", "s", "d", "W", "A", "S", "D"]);