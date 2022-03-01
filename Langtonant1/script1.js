//create the canvas 
let canvas = document.getElementById("canvas");
let surface = canvas.getContext("2d");
surface.fillStyle = "rgba(0, 0, 0, 1)";

//Initilise the default option for the starting point of the ant, this can be varied 
let AntClass = {
  x: 40,
  y: 40,
  dir: 1,
  // function that turn the ant to the left and can't go beyond 4 direction
  turnLeft: function () {
    this.dir--;
    if (this.dir < 1) this.dir = 4;
    this.move(this.dir);
  },

  // function that turn the ant to the right and can't go beyond 4 direction
  turnRight: function () {
    this.dir++;
    if (this.dir > 4) this.dir = 1;
    this.move(this.dir);
  },
  //the movement action of the ant using switch to decide  the posible direction from the cardinal point 1
  move: function (direction) {
    switch (direction) {
      case 1:
        ant.y--;
        break;
      case 2:
        ant.x++;
        break;
      case 3:
        ant.y++;
        break;
      case 4:
        ant.x--;
        break;
      default:
    }
  },
};


/// create the Ant itself
let ant = Object.create(AntClass);
ant.x = Math.round(canvas.width / 2);
ant.y = Math.round(canvas.height / 2);
ant.dir = 1;

// start the ant movement on loading the window page, the function start is called immediately
window.addEventListener("load", startAnt, false);
function startAnt() {
  let color = surface.getImageData(ant.y, ant.x, 1, 1); //the number 1, 1 shows the dirction the ant should move respect to the cardinal point 
  let antColor = color.data[0];
  if (antColor > 100) {
    surface.fillStyle = "rgba(0, 0, 0, 1)"; //this is used to determine the filled color when it turn Left, black by default
    surface.fillRect(ant.x, ant.y, 1, 1); //changing the number here will determine the shape for the patteern by the ant
    ant.turnLeft();
  } else {
    surface.fillStyle = "rgba(255, 255, 255, 1)"; //this is used to determine the filled color when it turn Right, white by default
    surface.fillRect(ant.x, ant.y, 1, 1); //changing the number here will determine the shape for the patteern by the ant
    ant.turnRight();
  }

  window.setTimeout(startAnt, 1);
}
