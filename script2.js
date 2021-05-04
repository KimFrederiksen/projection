var gridX = 192;             // grid divisions
var gridY = 157;
var SP = 0;             // canvas border
var DT = 0.1;
var EPS = 0.00000001;
var DAMPING = 0.05;
var DELTA = 40;
var KGrid = 10.0;
var KClick = 15.0;

var	sDT = 0.22;         // softness
var	sDAMPING = 0.1;
var	sDelta = 20;
var	sKGrid = 10.0;
var	sKClick = 35.0;

var zonex = 100;
var zoney = 100;

let img;

function preload() {
	img = loadImage('https://raw.githubusercontent.com/KimFrederiksen/projection/main/embroidery_bitmap2.png');
}

function spring_force(ax, ay, bx, by, k) {
    var xx = ax - bx;
    var yy = ay - by;
    var d = dist(xx,yy,0,0);
    var nx = xx/(d+EPS);
    var ny = yy/(d+EPS);
    var f = k*d;
    var fx = f*nx;
    var fy = f*ny;
    return createVector(fx,fy);
}

class Dot{
	constructor(i, j, color){
		this.vx = 0;
		this.vy = 0;
		this.x = map(i, 0, gridX-1, SP, width-SP);
		this.y = map(j, 0, gridY-1, SP, height-SP);
        this.x0 = this.x;
		this.y0 = this.y;
		this.color = color;
	}
  
	update(){
		let d = dist(zonex, zoney, this.x, this.y);
		let delta = sDelta;
		let intensity = sKClick*exp(-d*d/(delta*delta));
		let res = createVector(0, 0);
		res.add(spring_force(zonex, zoney, this.x, this.y, intensity));
		
		res.add(spring_force(this.x0, this.y0, this.x, this.y, sKGrid));

		this.vx += sDT*res.x;
		this.vy += sDT*res.y;
		
		this.vx *= sDAMPING;
		this.vy *= sDAMPING;

		this.x += sDT*this.vx;
		this.y += sDT*this.vy;
	}
}

function draw_pixel(d1) {
	fill(d1.color);
	rect(d1.x, d1.y, 1, 1);
}

function draw_connection(d1){
	strokeWeight(0);
	fill(d1.color);
	rect(d1.x, d1.y, 1, 1);
}


function setup() {
	pixelDensity(1);
	var cnv = createCanvas(gridX, gridY);
	frameRate(25);
	noStroke();
	api.tracking.connect();
    background(0);

	image(img, 0, 0, width, height);

	loadPixels();
	let myimage = gridX * gridY;
	
  	array = new Array(gridX);
	for(let i=0;i<gridX;i++){
		array[i] = new Array(gridY);
	}
  
	for(let i=0;i<gridX;i++){
		for(let j=0;j<gridY;j++){
			let mypixel = ((j*gridX) + i) * 4;
			array[i][j] = new Dot(i, j, pixels[mypixel]);
		}
	}
}

function draw() {
	background(0);
	push();

	var blobs = api.tracking.getBlobs();
	for (var i = 0; i < blobs.length; i++) {
		zonex = blobs[0].x;
		zoney = blobs[0].y;
	}

	for(let i=0; i<gridX; i++) {
		for(let j=0;j<gridY;j++){
			array[i][j].update();
		}
	}
  
	for(let i=0;i<gridX-1;i++){
		for(let j=0;j<gridY-1;j++){
			let d1 = array[i][j];
			let d2 = array[i+1][j];
			let d3 = array[i][j+1];
			draw_connection(d1);
		}
	}
	
	pop();		
}


