import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';
import { useEffect, useState } from 'react';

//styled components
import styled, { css } from 'styled-components';
import bgImg from '../assets/bg.png';

// custom hooks
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { useInterval } from '../hooks/useInterval';
import { useGameStatus } from '../hooks/useGameStatus';

//utils
import { createStage, checkCollision } from '../utils/gameHelpers';

function Tetris() {
  console.log('re-render');

  const [droptime, setDroptime] = useState(null);
  const [gameover, setGameover] = useState(false);

  const [player, updatePlayerPosition, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] =
    useGameStatus(rowsCleared);

  useEffect(() => {
    console.log(stage);
  }, []);

  function movePlayer(direction) {
    if (!checkCollision(player, stage, { x: direction, y: 0 })) {
      updatePlayerPosition({ x: direction, y: 0 });
    }
  }

  const startGame = () => {
    // reset stage
    setStage(createStage());
    setDroptime(1000);
    resetPlayer();
    setGameover(false);
    setScore(0);
    setRows(0);
    setLevel(0);
  };

  function drop() {
    // increase lvl when player clears 10 rows
    if (rows > (level + 1) * 10) {
      setLevel((prev) => prev + 1);
      // also increase speed
      setDroptime(1000 / (level + 1) + 200);
    }
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPosition({ x: 0, y: 1, collided: false });
    } else {
      // Gameover
      if (player.position.y < 1) {
        console.log('Gameover');
        setGameover(true);
        setDroptime(null);
      }
      updatePlayerPosition({ x: 0, y: 0, collided: true });
    }
  }

  const keyUp = ({ keyCode }) => {
    if (!gameover) {
      if (keyCode === 40) {
        console.log('interval on');
        setDroptime(1000 / (level + 1) + 200);
      }
    }
  };

  function dropPlayer() {
    setDroptime(null);
    console.log('interval off');
    drop();
  }

  const move = ({ keyCode }) => {
    if (!gameover) {
      if (keyCode === 37) {
        movePlayer(-1);
      } else if (keyCode === 39) {
        movePlayer(1);
      } else if (keyCode === 40) {
        dropPlayer();
      } else if (keyCode === 38 /*up*/ || keyCode === 88 /*X*/) {
        playerRotate(stage, 1);
      } else if (keyCode === 90 /*Z*/) {
        playerRotate(stage, -1);
      }
    }
  };

  useInterval(() => {
    drop();
  }, droptime);

  return (
    <TetrisWrapper
      role="button"
      tabIndex="0"
      onKeyUp={keyUp}
      onKeyDown={(e) => move(e)}
    >
      <div className={`second-wrapper`}>
        <Stage stage={stage} />
        <aside>
          {/* ternary */}
          {gameover ? (
            <Display
              gameover={gameover}
              text="Game Over"
            />
          ) : (
            <div>
              <Display text={`Score: ${score}`} />
              <Display text={`Rows: ${rows}`} />
              <Display text={`Level: ${level}`} />
            </div>
          )}

          <StartButton callback={startGame} />
        </aside>
      </div>
    </TetrisWrapper>
  );
}

const TetrisWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: url(${bgImg});
  background-size: cover;
  overflow: hidden;

  & .second-wrapper {
    display: flex;
    align-items: flex-start;
    padding: 20px 0 10px 0;
    margin: 0 auto;
    max-width: 900px;
    aside {
      width: 100%;
      max-width: 200px;
      display: block;
      padding: 0 20px;
    }
  }
`;

export default Tetris;
