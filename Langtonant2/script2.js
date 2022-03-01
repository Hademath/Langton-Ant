// firstly create the container that hold the whole ant in the canvas
let canvas = document.createElement("canvas");
canvas.id = "canvasContainer";
document.body.appendChild(canvas);

function langtonant(antx, optx) {
  let x, y, i;

  // create an  default opts for the grids and 
  let opts = {
    gridsize: 100,
    pixlsize: 4,
    interval: 4,
  };
  for (i in optx) {
    opts[i] = optx[i];
  }

  // extend default ants
  let ants = [
    {
      x: 50,
      y: 50,
      dir: 0,
    },
  ];
  for (i in antx) {
    ants[i] = antx[i];
  }

  // initialise grid shape on which the ant moves
  let grid = [];
  for (x = 0; x < opts.gridsize; x++) {
    grid[x] = [];
    for (y = 0; y < opts.gridsize; y++) {
      grid[x][y] = true;
    }
  }

  // initialise  ant directions from the point 0, 1 and -1 on the clockwise and anticlockwise direction
  let directions = [
    { x: 1, y: 0 },
    { x: 0, y: -1 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
  ];

  //  canvas for 2d can be initiated  and determine the dimension for each
  let mainCavas = document.getElementById("canvasContainer");
  let cont = mainCavas.getContext("2d");
  mainCavas.width = opts.gridsize * opts.pixlsize;
  mainCavas.height = opts.gridsize * opts.pixlsize;

  // initialise pixels
  let color_black = cont.createImageData(opts.pixlsize, opts.pixlsize);
  for (i = 0; i < opts.pixlsize * opts.pixlsize * 4; i += 4) {
    color_black.data[i + 3] = 255;
  }
  let color_white = cont.createImageData(opts.pixlsize, opts.pixlsize);
  for (i = 0; i < opts.pixlsize * opts.pixlsize * 4; i += 4) {
    color_white.data[i + 3] = 0;
  }

  // run the  matthew function to get ant moved in the canvas
  function matthew() {
    let testsanity = true;

    // iterate over ants
    for (i = 0; i < ants.length; i++) {
      let n = ants[i];

      // invert, draw the ant, turn the ant
      if (grid[n.x][n.y]) {
        grid[n.x][n.y] = false;
        cont.putImageData(
          color_black,
          n.x * opts.pixlsize,
          n.y * opts.pixlsize
        );
        n.dir--;
      } else {
        grid[n.x][n.y] = true;
        cont.putImageData(
          color_white,
          n.x * opts.pixlsize,
          n.y * opts.pixlsize
        );
        n.dir++;
      }

      // modulus wrap around for perfect movement
      n.dir += directions.length;
      n.dir %= directions.length;

      // position + direction
      n.x += directions[n.dir].x;
      n.y += directions[n.dir].y;

    //   check if the movement is arbitrary
      testsanity = n.x < 0 || n.x > opts.gridsize || n.y < 0 || n.y > opts.gridsize ? true
          : testsanity;
    }

    // loop with interval 
    if (testsanity) {
      setTimeout(matthew, opts.interval);
    }
  }

  matthew();
}
