export const STAGE_WIDTH = 10;
export const STAGE_HEIGHT = 20;

export const createStage = () => {

  return Array.from(Array(STAGE_HEIGHT), () =>
    new Array(STAGE_WIDTH).fill([0, 'clear']),
  );
};

export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
  for (let y = 0; y < player.tetromino.length; y += 1) {
    for (let x = 0; x < player.tetromino[y].length; x += 1) {

      if (player.tetromino[y][x] !== 0) {
        if (

          !stage[y + player.position.y + moveY] ||

          !stage[y + player.position.y + moveY][
            x + player.position.x + moveX
          ] ||

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
