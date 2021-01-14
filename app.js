document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  const width = 30;
  let leftId;
  let rightId;
  let upId;
  let downId;
  const layout = [
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0]
    
  const squares = []


  //create your board
  function createBoard() {
    for (let i=0; i<layout.length; i++) {
      const square = document.createElement('div');
      grid.appendChild(square);
      squares.push(square);

      //add layout to the board
      if(layout[i] === 1) {
        squares[i].classList.add('wall');
      }
    }
  }
  createBoard()

  function startGame() {
    let enterPoint = NaN;
    moveEnterPoint(enterPoint);
    document.addEventListener('keyup', moveEnterPoint);
  }

  //draw enterpoint on the board
  let enterPointCurrentIndex = 0;
  squares[enterPointCurrentIndex].classList.add('enterPoint');

  //draw exitpoint on the board
  let exitPointCurrentIndex = 358;
  squares[exitPointCurrentIndex].classList.add('exitPoint');


  //get the coordinates of exitPoint or enterPoint on the grid with X and Y axis
  function getCoordinates(index) {
    return [index % width, Math.floor(index / width)];
  }


  //move enterPoint
  function moveEnterPoint() {
    const directions = [-1, +1, +width, -width];
    let enterPointTimerId = NaN;
    let direction = directions[Math.floor(Math.random() * directions.length)];

    enterPointTimerId = setInterval(function() {
      if  (!squares[enterPointCurrentIndex + direction].classList.contains('wall')) {

          //remove the enterPoint class
          squares[enterPointCurrentIndex].classList.remove('enterPoint');

          //move into that space
          const [enterPointX, enterPointY] = getCoordinates(enterPointCurrentIndex);
          const [exitPointX, exitPointY] = getCoordinates(exitPointCurrentIndex);
          const [enterPointNextX, enterPointNextY] = getCoordinates(enterPointCurrentIndex + direction);

          function isXCoordCloser() {
            if ((enterPointNextX - exitPointX) > (enterPointX - exitPointX)){
              return true;
            } else return false;
          }

          function isYCoordCloser() {
            if ((enterPointNextY - exitPointY) > (enterPointY - exitPointY)) {
              return true;
            } else return false;
          }
          if (isXCoordCloser() || isYCoordCloser()) {
            if(!squares[width+1].classList.contains('wall')) direction += width;
            enterPointCurrentIndex += direction;
            squares[enterPointCurrentIndex].classList.add('enterPoint');


          } else {
            if(!squares[width+1].classList.contains('wall')) direction += width;
            squares[enterPointCurrentIndex].classList.add('enterPoint');
            direction = directions[Math.floor(Math.random() * directions.length)];
            if(!squares[width+1].classList.contains('wall')) direction += width;
        }
        if(!squares[width+1].classList.contains('wall')) direction += width;
        squares[enterPointCurrentIndex].classList.add('enterPoint');

        }
        if(!squares[width+1].classList.contains('wall')) direction += width; 
        else direction = directions[Math.floor(Math.random() * directions.length)];
    
      if(!squares[width+1].classList.contains('wall')) direction += width;
      if(squares[enterPointCurrentIndex].classList.contains('exitPoint')) clearInterval(enterPointTimerId);

    }, 500);
  }
  moveEnterPoint();
  startGame();


});
