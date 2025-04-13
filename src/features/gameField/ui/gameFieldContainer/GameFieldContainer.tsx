import {
  FinishGameDialog,
  GameFieldItem,
  RemaningNumbers,
} from 'features/gameField/ui';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useStores } from 'stores/rootStoreContext';

import classes from './gameField.module.scss';

export const GameFieldContainer = observer(() => {
  const {
    gameFieldStore: {
      gameField,
      generateGameField,
      checkIsGameFinished,
      remaningNumbers,
    },
  } = useStores();

  useEffect(() => {
    if (!remaningNumbers.length) {
      checkIsGameFinished();
    }
  }, [remaningNumbers.length]);

  useEffect(() => {
    generateGameField();
  }, []);

  if (!gameField.length) return null;

  return (
    <main className={classes.gameFieldContainer}>
      {/* TODO: Подумать как переделать */}
      <div
        style={{ gridTemplateColumns: `repeat(${gameField.length}, 80px)` }}
        className={classes.gameField}
      >
        {gameField.map((column, columnIndex) => (
          <div className={classes.column} key={columnIndex}>
            {column.map((currentGameFieldItem, rowIndex) => (
              <GameFieldItem
                columnIndex={columnIndex}
                currentGameFieldItem={currentGameFieldItem}
                rowIndex={rowIndex}
                key={`${columnIndex}_${rowIndex}`}
              />
            ))}
          </div>
        ))}
      </div>
      <FinishGameDialog />
      <RemaningNumbers />
    </main>
  );
});
