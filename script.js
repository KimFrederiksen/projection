// Projection

let img;
let fr = 30;

function preload() {
	img = loadImage('https://raw.githubusercontent.com/KimFrederiksen/projection/main/embroidery_bitmap.png');
}

const particles = [];
const velocity = 2.7;
t=0;

function setup() {
    // createCanvas(window.innerWidth, window.innerHeight);
    createCanvas(w=192, h=157);
	frameRate(fr);
	noStroke(fill(255));
	// frameRate(25);
	colorMode(RGB, 255, 255, 255, 1);

	// const particlesLength = Math.floor(window.innerWidth / 33);
	const particlesLength = 30;
    for(let i = 0; i < particlesLength; i++) {
		p = new Particle();
		px = p.pos.x;
		py = p.pos.y;
		particles.push(p);
	}
}


function draw() {
    background(123, 12 , 23, 1);
    createCanvas(w=192, h=157);
	noStroke(fill(255));

	// image(img, 0, 0);

    particles.forEach((p, index) => {
	p.update();
	p.draw();
	p.checkParticles(particles.slice(index));
    });
}


class Particle {
    constructor() {
        this.pos = createVector(random(width), random(height));
		this.vel = createVector(random(-2*velocity, 2*velocity), random(-2*velocity, 2*velocity));
		this.size = 2;
    }

    // Update movement by adding velocity  ---------
    update() {
	this.pos.add(this.vel);
	this.edges();
    }

    // Draw single particle
    draw() {
	noStroke();
	fill('rgba(0, 12, 244, 1.0)');
	circle(this.pos.x, this.pos.y, this.size);
    }

    // Detect Edges -------------------------------------------
    edges() {
		
	if(this.pos.x >= 0 && this.pos.x <= 36) {
		if(this.pos.y < 32 || this.pos.y > height) {
			this.vel.y *=-1;			
		}
	}

	if(this.pos.x >= 36 && this.pos.x <= 72) {
		if(this.pos.y < 16 || this.pos.y > height) {
			this.vel.y *=-1;			
		}
	}

	if(this.pos.x >= 72 && this.pos.x <= 120) {
		if(this.pos.y < 0 || this.pos.y > height) {
			this.vel.y *=-1;			
		}
	}

	if(this.pos.x >= 120 && this.pos.x <= 156) {
		if(this.pos.y < 16 || this.pos.y > height) {
			this.vel.y *=-1;			
		}
	}

	if(this.pos.x >= 156 && this.pos.x <= width) {
		if(this.pos.y < 32 || this.pos.y > height) {
			this.vel.y *=-1;			
		}
	}

	
	if(this.pos.x < 0 || this.pos.x > width) {
	    this.vel.x *= -1;
	}
	if(this.pos.y < 0 || this.pos.y > height) {
	    this.vel.y *=-1;
	}


	// if(this.pos.y >= 0 && this.pos.y <= 16) {
	// 	if(this.pos.x < 72 || this.pos.y > 120) {
	// 		this.vel.x *=-1;
	// 	}
	// }

	// if(this.pos.y >= 16 && this.pos.y <= 32) {
	// 	if(this.pos.x < 36|| this.pos.y > 156) {
	// 		this.vel.x *=-1;
	// 	}
	// }

	// if(this.pos.y >= 36 && this.pos.y <= height) {
	// 	if(this.pos.x < 0 || this.pos.y > width) {
	// 		this.vel.x *=-1;
	// 	}
	// }

		
    }

    // Connect particles
    checkParticles(particles) {
	particles.forEach(particle => {
	    const d = dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
	    if(d < 60){
		stroke('rgba(0, 12, 144, 0.2)');
		line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
	    }
	});

    }
}


    // // const particlesLength = Math.floor(window.innerWidth / 33);
	// const particlesLength = 10;
    // for(let i = 0; i < particlesLength; i++) {
	// 	p = new Particle();
	// 	px = p.pos.x;
	// 	py = p.pos.y;
	// 	// only create particles that are withing the odd shape of the building facade
	// 	if (px >= 0 && px <= 36) {
	// 		if (py >= 32 && py <= height) {
	// 			particles.push(p);				
	// 		}
	// 	}
	// 	if (px > 36 && px <= 72) {
	// 		if (py >= 16 && py <= height) {
	// 			particles.push(p);				
	// 		}
	// 	}
	// 	if (px > 72 && px <= 120) {
	// 		if (py >= 0 && py <= height) {
	// 			particles.push(p);				
	// 		}
	// 	}
	// 	if (px > 120 && px <= 156) {
	// 		if (py >= 16 && py <= height) {
	// 			particles.push(p);				
	// 		}
	// 	}
	// 	if (px > 156 && px <= 192) {
	// 		if (py >= 32 && py <= height) {
	// 			particles.push(p);				
	// 		}
	// 	}
// }



// function draw(n){
// 	for(x+=.01,background(0),i=0;i<W;i+=s)
// 		for(j=0;j<H;j+=s)t=3+cos(9*x+(i+j)),
// 	textSize(t),text(r,4*cos(t)+i,4*sin(t)+j)}W=192,H=157,s=12,r="🎄",x=0;

// function setup() {
//     // canvas 192x157
//     createCanvas(windowWidth, windowHeight);
//     angleMode(DEGREES);
//     frameRate(25);
//     noStroke();
//     colorMode(HSB, 360, 100, 100);
//     rectMode(CENTER);
//     //api.tracking.connect();
//     //image(img, 0, 0);
//     //imageMode(CENTER);
// }

// function draw() {
//     background(0, 0, 30);
//     image(img, 0, 0);
    

//     var blobs = api.tracking.getBlobs();
//     for (var i = 0; i < blobs.length; i++) {
// 	fill(i * 100, 100, 100);
// 	rect(blobs[i].x,  blobs[i].y, 12, 25);
	
//     }
// }

