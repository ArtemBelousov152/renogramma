import { observer } from 'mobx-react-lite';
import { useEffect, useMemo } from 'react';
import { useStores } from 'stores/rootStoreContext';

import { FieldActions } from '../fieldActions';
import { FinishGameDialog } from '../finishGameDialog';
import { GameFieldItem } from '../gameFieldItem';
import { RemaningNumbers } from '../remaningNumbers';
import classes from './gameField.module.scss';
import { getBorderRadiusDictionary } from './utils';

export const GameFieldContainer = observer(() => {
  const {
    gameFieldStore: {
      gameField,
      generateGameField,
      checkIsGameFinished,
      remaningNumbers,
      fieldHeight,
      fieldWidth,
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

  const borderRadiusDictionary = useMemo(() => {
    return getBorderRadiusDictionary({ fieldHeight, fieldWidth });
  }, [fieldHeight, fieldWidth]);
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
                borderRadius={
                  borderRadiusDictionary[`${columnIndex},${rowIndex}`]
                }
              />
            ))}
          </div>
        ))}
      </div>
      <FieldActions />
      <FinishGameDialog />
      <RemaningNumbers />
    </main>
  );
});
