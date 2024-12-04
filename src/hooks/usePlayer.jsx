import { useCallback, useState } from 'react';
import {
  checkCollision,
  STAGE_HEIGHT,
  STAGE_WIDTH,
} from '../utils/gameHelpers';
import { randomTetromino, TETROMINOS } from '../utils/tetrominos';

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    position: {
      x: 0,
      y: 0,
    },
    tetromino: TETROMINOS[0].shape,
    collided: false,
  });

  function updatePlayerPosition({ x, y, collided }) {
    setPlayer((prevState) => ({
      ...prevState,
      position: {
        x: (prevState.position.x += x),
        y: (prevState.position.y += y),
      },
      collided,
    }));
  }

  const rotate = (matrix, direction) => {


    const rotatedTetro = matrix.map((_, index) =>
      matrix.map((col) => col[index]),
    );


    if (direction > 0) return rotatedTetro.map((row) => row.reverse());
    return rotatedTetro.reverse();
  };

  const playerRotate = (stage, direction) => {

    const clonedPlayer = JSON.parse(JSON.stringify(player));
    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, direction);

    const position = clonedPlayer.position.x;
    let offset = 1;
    while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
      clonedPlayer.position.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > clonedPlayer.tetromino[0].length) {
        rotate(clonedPlayer.tetromino, -direction);
        clonedPlayer.position.x = position;
        return;
      }
    }
    setPlayer(clonedPlayer);
  };

  const resetPlayer = useCallback(() => {
    setPlayer({
      position: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetromino: randomTetromino().shape,
      collided: false,
    });
  }, []);

  return [player, updatePlayerPosition, resetPlayer, playerRotate];
};
