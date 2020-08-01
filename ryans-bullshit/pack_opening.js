cards = []
let pack
let selected_pack_image;
let t
let card_count = 10
function preload(){
    selected_pack_image = loadImage("https://i.imgur.com/8bnpR7y.jpeg")
    card_back = loadImage("https://vignette.wikia.nocookie.net/yugioh/images/9/94/Back-Anime-2.png/revision/latest?cb=20110624090942")
}


function setup() {
    createCanvas(windowWidth,windowHeight);
    pack = new Pack(selected_pack_image)
    t=0
    for (let i = 0; i < 10; i++){

    }
    // for (let i = 0; i < 10; i++){
    //     let x = random(width);
    //     let y = random(height);
    //     let r = random(20,60);
    //     let b = new Card(x,y,r);
    //     bubbles.push(b)
    // }
}

function mousePressed(){
    //end animation or quite i dont know
}


function draw() {
    background(255);
    fly_in_duration = 100;
    fly_out_duration = 300;

    if (t <= fly_in_duration){
        pack.fly_in(fly_in_duration)
    }else if (fly_in_duration < t <= fly_out_duration){
        pack.fly_out(fly_out_duration)
        pack.shake()
    }
    pack.show();
    // for (let i = 0; i < bubbles.length; i++) {
    //     bubbles[i].move();
    //     bubbles[i].show();
    // }
    t += 1;
}

class Pack{
    constructor(pack_image){
        this.img_width = pack_image.width //fix later
        this.img_height = pack_image.height // fix later
        this.fly_in_t = 0
        this.fly_out_t = 0
        this.pack_image = pack_image
        this.x = -width
        this.y = (height/2) 
        this.r = 0
    }
    fly_in(duration){
        let x_dest = (width/2) + this.img_width*2.5
        this.x = (t/duration) * (x_dest - this.x) - this.img_width
        this.r = (t/duration) * 2*PI
    }
    fly_out(duration){
        let x_dest = (width/2) + this.img_width*2.5
        if (duration/2 < t){
            console.log("aaa")
            this.x = this.x -10 * (1/(t/duration))
            this.r = this.r -PI * (1/(t/duration)) * 0.1
        }
    }
    shake(){
        translate(random(-5,5),random(-5,5) );
    }
    show(){
        translate(this.x,this.y)
        rotate(this.r,[1,1,0])
        imageMode(CENTER);
        image(this.pack_image, 0, 0)
    }
}

class Card{
    constructor(x,y,r){
        this.x = x;
        this.y = y;
        this.r = r;
        this.brightness = 0;
    }
    move(){
        this.x = this.x + random(-2, 2);
        this.y = this.y + random(-2, 2);
    }
    show(){
        image(selected_pack_image, this.x, this.y);
        // stroke(255);
        // strokeWeight(4);
        // fill(this.brightness,125);
        // ellipse(this.x,this.y,this.r * 2)
    }
}