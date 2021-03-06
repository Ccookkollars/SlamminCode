

webSocket = new WebSocket("ws://" + window.location.host + "/sockets/events/");
webSocket.onmessage = function(event){
	var msg = event.data;
	if (typeof msg === "string"){
		messageReceive(msg);
	}else{
		console.log(event);
	}
}
function messageReceive(msg){
	console.log("trying to parse received message as JSON: " + msg);
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
var ctx = canvas.getContext('2d');

function trackKeys(keys) {
	let down = Object.create(null);
	function track(event) {
		if (keys.includes(event.key)) {
			if (event.type == "keydown" && !down[event.key]){
				webSocket.send(event.key);
				console.log("key: " + event.key);
			}
			down[event.key] = event.type == "keydown";
			event.preventDefault();
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
	ctx.webkitImageSmoothingEnabled = false;
	ctx.msImageSmoothingEnabled = false;
	ctx.imageSmoothingEnabled = false;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (const [color, dino] of Object.entries(dinos)) {
		dino.draw();
	}
}, 200);

setInterval(() => {
	console.log("WebSocket readyState: " + webSocket.readyState);
}, 10000);
setTimeout(() => {
	messageReceive("{\"x\":50, \"y\":10}");
}, 700);
setTimeout(() => {
	messageReceive("{\"color\":\"red\", \"x\":325, \"y\":318}");
}, 1500);


document.getElementsByTagName("h1")[0].innerHTML ="Hello";
const arrowKeys = trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp", "w", "a", "s", "d", "W", "A", "S", "D"]);
console.log("Javascript initial setup complete");