let img;
let cnv;

var gridX = 192;
var gridY = 157;
var canvasBorder = 0;

var zoneX = 100;
var zoneY = 100;

var grid = 10.0

function preload() {
	img = loadImage('https://raw.githubusercontent.com/KimFrederiksen/projection/main/embroidery_bitmap2.png');
}


class Dot{
	constructor(i, j, r, g, b, a){
		this.x = i;
		this.y = j;
		this.r = r;
		this.g = g;
		this.b = b;
		this.a = a;
		// this.vx = 0;
		// this.vy = 0;
		// this.x = map(i, 0, gridX-1, canvasBorder, width-canvasBorder);
		// this.y = map(j, 0, gridY-1, canvasBorder, height-canvasBorder);
        // this.x0 = this.x;
		// this.y0 = this.y;
	}
  
	update(){
		// let d = dist(zoneX, zoneY, this.x, this.y);
		// let delta = sDelta;
		// let intensity = sKClick*exp(-d*d/(delta*delta));
		// let res = createVector(0, 0);
		// res.add(spring_force(zoneX, zoneY, this.x, this.y, intensity));
		
		// res.add(spring_force(this.x0, this.y0, this.x, this.y, grid));

		// this.vx += sDT*res.x;
		// this.vy += sDT*res.y;
		
		// this.vx *= sDAMPING;
		// this.vy *= sDAMPING;

		// this.x += sDT*this.vx;
		// this.y += sDT*this.vy;
	}
}

function draw_pixel(p1) {
	fill(p1.r, p1.g, p1.g, p1.a);
	rect(p1.x, p1.y, 1, 1);
}

function draw_connection(p1){
	strokeWeight(0);
	fill(p1.r, p1.g, p1.g, p1.a);
	rect(p1.x, p1.y, 12, 12);
}


function setup() {
	let d = pixelDensity(1);
	cnv = createCanvas(img.width, img.height);
	
	noStroke();
	
	image(img, 0, 0, gridX, gridY);

	loadPixels();
		
  	array = new Array(gridX);
	for(let i=0; i < gridX; i++){
		array[i] = new Array(gridY);
	}
  	for(let i=0; i < gridX; i++){
		for(let j=0; j < gridY; j++){
			let mypixel = ((j*gridX) + i) * 4;
			array[i][j] = new Dot(i, j, pixels[mypixel], pixels[mypixel+1], pixels[mypixel+2], pixels[mypixel+3]);
		}
	}

}


function draw() {
	background(0);
	push();

	for(let i=0; i < gridX; i++){
		for(let j=0; j < gridY; j++){
			let p1 = array[i][j];
			// let p2 = array[i+1][j];
			// let p3 = array[i][j+1];
			// draw_connection(p1);
			draw_pixel(p1);
		}
	}

	pop();
}


