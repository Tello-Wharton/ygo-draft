cards = []
let pack
let selected_pack_image;
let t
let card_count = 10


function preload() {
    selected_pack_image = loadImage("../pack_imgs/pk_legend_of_blue_eyes_white_dragon.jpg")
    card_back = loadImage("../card_imgs/cd_back_clean.png")
}


function setup() {
    cards = []
    createCanvas(windowWidth,windowHeight);
    pack = new Pack(selected_pack_image,1.4)
    t=0
    for (let i = 0; i < card_count; i++){
        let card = new Card(card_back,0.9)
        cards.push(card)
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


var startAnimation = false;

function restart() {
    startAnimation = true
    setup()
}

function draw() {

    clear();

    if (!startAnimation) {
        return
    }

    fly_in_duration = 100;
    fly_out_duration = 300;

    if (t <= fly_in_duration){
        pack.fly_in(fly_in_duration)
    } else if (fly_in_duration < t && t <= fly_out_duration){
        console.log("YEadawdd")
        pack.fly_out(fly_out_duration)
        pack.shake()
        for (let i = 0; i < cards.length; i++) {
            cards[i].fly_out(fly_out_duration);
            cards[i].show();
        }
    } else {
        startAnimation = false;
    }

    pack.show();

    // for (let i = 0; i < bubbles.length; i++) {
    //     bubbles[i].move();
    //     bubbles[i].show();
    // }
    t += 1;
}

class Pack{
    constructor(pack_image, scale_factor){
        this.pack_image = pack_image
        this.img_width = pack_image.width * scale_factor
        this.img_height = pack_image.height * scale_factor
        this.fly_in_t = 0
        this.fly_out_t = 0
        this.x = -width
        this.y = (height/2) 
        this.r = 0
    }
    fly_in(duration){
        let x_dest = (width/2) + this.img_width*2
        this.x = (t/duration) * (x_dest - this.x) - this.img_width
        this.r = (t/duration) * 2*PI
    }
    fly_out(duration){
        let x_dest = (width/2) + this.img_width*2
        if (duration/2 < t){
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
        image(this.pack_image, 0, 0, this.img_width, this.img_height)
    }
}

class Card{
    constructor(card_image, scale_factor){
        this.card_image = card_image
        this.img_width = card_image.width * scale_factor
        this.img_height = card_image.height * scale_factor
        this.x = width/2 - this.img_width/2;
        this.y = height/2;
        this.r = 0
        this.y_change = random(-5, 5);
        this.delay = random(150,200)
    }
    fly_out(duration){
        if ((t+this.delay) > duration){
            this.x = this.x + 10* (1/(t/duration));
            this.y = this.y + this.y_change;
            this.r = this.r -PI * (1/(t/duration)) * 0.05
        }
    }
    show(){
        // translate(this.x,this.y)
        // rotate(this.r,[1,1,0])
        imageMode(CENTER);
        image(this.card_image, this.x, this.y, this.img_width, this.img_height)
    }
}