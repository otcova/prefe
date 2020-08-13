
let xiangScore = [
    { type: "star", score: 17 }
];

let fantaScore = [
    { type: "gomet", score: 3 },
    { type: "falta" }
];

let contentLen = 0;
let scrollY = 0;
let mMoved = false;

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(250, 20, 100);

    translate(0, scrollY);
    if (mMoved) {
        let wheel = 0;
        if (mouseY < 150) wheel = 150 - mouseY;
        else if (mouseY > height - 150) wheel = (height - 150) - mouseY;
        scrollY += wheel / 7;
        scrollY = min(0, max(height-300-contentLen, scrollY));
    }
    textAlign(CENTER, CENTER);
    textSize(50);
    stroke(0);
    strokeWeight(4);
    fill(255);
    text("¿QUI ÉS EL PREFE?", 0, 0, width, 150);

    noStroke();

    let w = width / 2;

    push();
    translate(0, 150);
    fill(100, 100, 240);
    rect(0, 0, w, height*100);

    fill(255);
    noStroke();
    textSize(40);
    text("XiangFeng", 0, 0, w, 100);
    let y = drawTotal(notes.draw(xiangScore, 100), w);
    if (contentLen < y) contentLen = y;

    pop();

    push();
    translate(w, 150);
    fill(100, 240, 100);
    rect(0, 0, w, height*100);

    fill(255);
    noStroke();
    textSize(40);
    text("Fanta", 0, 0, w, 100);
    y = drawTotal(notes.draw(fantaScore, 100), w);
    if (contentLen < y) contentLen = y;

    pop();
}

document.oncontextmenu = function () {
    return false;
};

function mouseMoved() {
    mMoved = true;
}

function drawTotal(n, w) {
    n.y += 20;
    stroke(0);
    strokeWeight(3);
    line(w*0.5, n.y, w*0.9, n.y);
    n.y += 30;
    fill(0);
    noStroke();
    textAlign(RIGHT, CENTER);
    if (n.total > 0) text("+ " + n.total, w * 0.8, n.y);
    else text("- " + (-n.total), w * 0.8, n.y);

    return n.y;
}

let notes = {
    draw: function (notes, y) {
        let total = 0;
        for (let i = 0; i < notes.length; i++) {
            total += this[notes[i].type](notes[i], y, width / 2);
            y += 120;
        }
        return { y: y, total: total };
    },
    plantilla: function (txt, score, backcolor, y, w) {
        stroke(0);
        fill(backcolor.r, backcolor.g, backcolor.b);
        strokeWeight(3);
        rect(50, y, w - 100, 100, 20);

        noStroke();
        fill(0);
        textSize(22);

        textAlign(LEFT, CENTER);
        text(txt, w * 0.3, y + 50);

        textAlign(RIGHT, CENTER);
        if (score > 0) text("+ " + score, w * 0.8, y + 50);
        else text("- " + (-score), w * 0.8, y + 50);
    },
    star: function (nota, y, w) {
        this.plantilla("ESTRELLA", nota.score, { r: 255, g: 220, b: 10 }, y, w);
        stroke(0);
        strokeWeight(3);
        fill(255, 255, 0);
        star(w * 0.2, y + 50, 40, 10, 5);

        return nota.score;
    },
    gomet: function (nota, y, w) {

        this.plantilla("GOMET", nota.score,
            nota.score > 0 ? { r: 180, g: 250, b: 180 } : { r: 255, g: 200, b: 200 }, y, w);

        stroke(0);
        strokeWeight(1);
        fill(60, 255, 10);
        ellipse(w * 0.2, y + 50, 40);

        return nota.score;
    },
    falta: function (nota, y, w) {
        this.plantilla("FALTA D'ASSISTÈNCIA", -5, { r: 255, g: 50, b: 0 }, y, w);
        return -5;
    }
};

function star(x, y, radius1, radius2, npoints) {
    let angle = TWO_PI / npoints;
    let halfAngle = angle / 2.0;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
        let sx = x + cos(a) * radius2;
        let sy = y + sin(a) * radius2;
        vertex(sx, sy);
        sx = x + cos(a + halfAngle) * radius1;
        sy = y + sin(a + halfAngle) * radius1;
        vertex(sx, sy);
    }
    endShape(CLOSE);
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}