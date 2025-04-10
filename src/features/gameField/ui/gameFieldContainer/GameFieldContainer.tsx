import { GameFieldItem } from 'features/gameField/ui/gameFieldItem';
import { RemaningNumbers } from 'features/gameField/ui/remaningNumbers';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useStores } from 'stores/rootStoreContext';

import classes from './gameField.module.scss';

export const GameFieldContainer = observer(() => {
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
