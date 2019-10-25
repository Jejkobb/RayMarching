function Box(x, y, w, h, c) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.c = c;
  this.min = {
      x: (this.x-this.w/2),
      y: (this.y-this.h/2)
  }
  this.max = {
      x: (this.x+this.w/2),
      y: (this.y+this.h/2)
  }
  this.show = function() {
    push();
    rectMode(CENTER);
    noStroke();
    fill(this.c);
    rect(this.x, this.y, this.w, this.h);
    pop();
  }
}

function Circle(x, y, r, c) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.c = c;
  this.show = function() {
    push();
    rectMode(CENTER);
    noStroke();
    fill(this.c);
    ellipse(this.x, this.y, this.r*2);
    pop();
  }
}
