import { Number } from 'components';
import { observer } from 'mobx-react-lite';
import { gameData } from 'mocks';
import { useEffect, useState } from 'react';
import { useStores } from 'stores/rootStoreContext';

import classes from './playingField.module.scss';

export const PlayingField = observer(() => {
  const {
    gameFieldStore: {
      currentNumber,
      gameField,
      generateGameField,
      putGameFieldItem,
      remaningNumbers,
      removeGameFieldItem,
      setCurrentNumber,
    },
  } = useStores();
  const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null);
  // Подумать как переделать
  const [currentFieldHover, setCurrentFieldHover] = useState<null | {
    columnIndex: number;
    numberIndex: number;
  }>(null);

  useEffect(() => {
    generateGameField();
  }, []);

  if (!gameField.length) return null;

  return (
    <div className={classes.gameContainer}>
      <div className={classes.gameFieldContainer}>
        <div className={classes.gameField}>
          {gameField.map((column, columnIndex) => (
            <div className={classes.column} key={columnIndex}>
              {column.map((currentGameFieldItem, numberIndex) => {
                const isStartNumber =
                  gameData[columnIndex][numberIndex] &&
                  gameData[columnIndex][numberIndex] === currentGameFieldItem;

                const isHoverField =
                  currentFieldHover?.columnIndex === columnIndex &&
                  currentFieldHover.numberIndex === numberIndex;

                const isEmptyField = !currentGameFieldItem;

                return (
                  <Number
                    isDisabledText={isHoverField && !isStartNumber}
                    isStartNumber={isStartNumber}
                    number={
                      isHoverField && !isStartNumber && isEmptyField
                        ? currentNumber
                        : currentGameFieldItem
                    }
                    key={`${currentGameFieldItem}_${numberIndex}`}
                    onMouseEnter={() => {
                      setCurrentFieldHover({ columnIndex, numberIndex });
                    }}
                    onMouseLeave={() => {
                      setCurrentFieldHover(null);
                    }}
                    onDoubleClick={() => {
                      if (clickTimeout) clearTimeout(clickTimeout);
                      if (currentGameFieldItem && !isStartNumber) {
                        removeGameFieldItem({
                          columnIndex,
                          numberIndex,
                        });
                      }
                    }}
                    onClick={() => {
                      if (clickTimeout) {
                        clearTimeout(clickTimeout);
                      }
                      const timeout = setTimeout(() => {
                        if (isStartNumber && currentGameFieldItem) {
                          setCurrentNumber(
                            remaningNumbers.find(
                              (value) => value === currentGameFieldItem + 1
                            ) ?? 0
                          );
                        }

                        if (currentNumber && !isStartNumber) {
                          putGameFieldItem({
                            columnIndex,
                            numberIndex,
                          });
                        }
                      }, 200);
                      setClickTimeout(timeout);
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>
        <div className={classes.remaningNumbers}>
          {remaningNumbers.map((number, index) => (
            <Number
              number={number}
              onClick={() => {
                setCurrentNumber(number);
              }}
              key={`${number}_${index}`}
            />
          ))}
        </div>
      </div>
      <div>
        <span>Current number</span>
        <Number number={currentNumber} />
      </div>
    </div>
  );
});
