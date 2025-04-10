import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useStores } from 'stores/rootStoreContext';
import { GameFieldItem } from 'widgets/gameFieldItem';
import { RemaningNumbers } from 'widgets/remaningNumbers';

import classes from './gameField.module.scss';

export const GameField = observer(() => {
  const {
    gameFieldStore: { gameField, generateGameField },
  } = useStores();

  useEffect(() => {
    generateGameField();
  }, []);

  if (!gameField.length) return null;

  return (
    <div className={classes.gameFieldContainer}>
      <div className={classes.gameField}>
        {gameField.map((column, columnIndex) => (
          <div className={classes.column} key={columnIndex}>
            {column.map((currentGameFieldItem, numberIndex) => (
              <GameFieldItem
                columnIndex={columnIndex}
                currentGameFieldItem={currentGameFieldItem}
                numberIndex={numberIndex}
                key={`${columnIndex}_${numberIndex}`}
              />
            ))}
          </div>
        ))}
      </div>
      <RemaningNumbers />
    </div>
  );
});
