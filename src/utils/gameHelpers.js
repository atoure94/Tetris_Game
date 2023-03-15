export const STAGE_WIDTH = 10;
export const STAGE_HEIGHT = 20;

export const createStage = () => {
  // Multidimensional array to represent the grid
  return Array.from(Array(STAGE_HEIGHT), () =>
    new Array(STAGE_WIDTH).fill([0, 'clear']),
  );
};

export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
  for (let y = 0; y < player.tetromino.length; y += 1) {
    for (let x = 0; x < player.tetromino[y].length; x += 1) {
      // check that the cell isnt 0
      if (player.tetromino[y][x] !== 0) {
        if (
          //check that movement is inside the stage height(y)
          !stage[y + player.position.y + moveY] ||
          //check that movement is inside the stage width (x)
          !stage[y + player.position.y + moveY][
            x + player.position.x + moveX
          ] ||
          //check that cell isnt set to 'clear' so we know we havent collided
          stage[y + player.position.y + moveY][
            x + player.position.x + moveX
          ][1] !== 'clear'
        ) {
          return true;
        }
      }
    }
  }
};
