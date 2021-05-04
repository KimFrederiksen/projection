var N = 65;             // grid divisions
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
	// img = loadImage('https://raw.githubusercontent.com/KimFrederiksen/projection/main/template.png');
	img = loadImage('https://raw.githubusercontent.com/KimFrederiksen/projection/main/embroidery_bitmap.png');

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
		this.x = map(i, 0, 192-1, SP, width-SP);
		this.y = map(j, 0, 157-1, SP, height-SP);
        this.x0 = this.x;
		this.y0 = this.y;
		this.color = color;
	}
  
	update(){
		let d = dist(zonex, zoney, this.x, this.y);
		let delta = sDelta;
		
		let intensity = sKClick*exp(-d*d/(delta*delta));
		//float interp = 15*exp(-d/delta);
    
		let res = createVector(0, 0);
		// if(mouseIsPressed){
		res.add(spring_force(zonex, zoney, this.x, this.y, intensity));
		// }
		
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
	// stroke(255,125);
	strokeWeight(0);
	fill(d1.color);
	rect(d1.x, d1.y, 1, 1);
	// line(d1.x, d1.y, d2.x, d2.y);
}


function setup() {
	pixelDensity(1);
	var cnv = createCanvas(192, 157);
	frameRate(25);
	noStroke();
	api.tracking.connect();
	//cnv.style('width: 100%;margin: 0;justify-content: center;');
    background(0);

	image(img, 0, 0, width, height);

	// let halfImage = 4 * (width * d) * (height * d /2);

	loadPixels();
	let myimage = 192 * 157;

	// for (let i = 0; i < myimage; i++) {
	// 	pixels[i + myimage] = pixels[i];
	// }

	// updatePixels();

	
  	array = new Array(192);
	// array = pixels[];
	for(let i=0;i<192;i++){
		array[i] = new Array(157);
	}
  
	for(let i=0;i<192;i++){
		for(let j=0;j<157;j++){
			let mypixel = ((j*192) + i) * 4;
			array[i][j] = new Dot(i, j, pixels[mypixel]);
		}
	}
}

function draw() {
	background(0);
	push();

	var blobs = api.tracking.getBlobs();
	for (var i = 0; i < blobs.length; i++) {
		// rect(blobs[i].x, blobs[i].y, 22, 22);
		zonex = blobs[0].x;
		zoney = blobs[0].y;
	}
//	}

	// image(img, 0, 0);
	//updatePixels();
	for(let i=0; i<192; i++) {
		for(let j=0;j<157;j++){
			array[i][j].update();
		}
	}
  
	for(let i=0;i<192-1;i++){
		for(let j=0;j<157-1;j++){
			let d1 = array[i][j];
			let d2 = array[i+1][j];
			let d3 = array[i][j+1];
			draw_connection(d1);
			// draw_connection(d1, d2);
			// draw_connection(d1, d3);

			// draw_pixel(d1);

		}
	}
	
	// for(let i=0;i<192-1;i++){
	// 	let d1 = array[N-1][i];
	// 	let d2 = array[N-1][i+1];
	// 	let d3 = array[i][N-1];
	// 	let d4 = array[i+1][N-1];
	// 	draw_connection(d1, d2);
	// 	draw_connection(d3, d4);
	// }
	
	pop();		
}


