import { GameFieldItem } from 'features/gameField/ui/gameFieldItem';
import { RemaningNumbers } from 'features/gameField/ui/remaningNumbers';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useStores } from 'stores/rootStoreContext';

import classes from './gameField.module.scss';

export const GameFieldContainer = observer(() => {
  const {
    gameFieldStore: {
      gameField,
      generateGameField,
      isGameFinished,
      checkIsGameFinished,
      remaningNumbers,
    },
  } = useStores();

  useEffect(() => {
    checkIsGameFinished();
  }, [remaningNumbers.length]);

  useEffect(() => {
    if (isGameFinished) {
      // TODO: избавиться от alert
      alert('Вы выиграли');
      generateGameField();
    }
  }, [isGameFinished]);

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
      <RemaningNumbers />
    </main>
  );
});
