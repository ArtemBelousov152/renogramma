import { Number } from 'components';
import { gameData } from 'mocks';
import { useEffect, useMemo, useState } from 'react';

import classes from './playingField.module.scss';

export const PlayingField = () => {
  const startField = useMemo(() => gameData, []);

  const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null);

  const [currentGameFfield, setCurrentGameField] = useState(
    structuredClone(startField)
  );
  const [remaningNumbers, setRemaningNumbers] = useState<number[]>([]);
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  const [currentFieldHover, setCurrentFieldHover] = useState<null | {
    columnIndex: number;
    numberIndex: number;
  }>(null);

  useEffect(() => {
    const newRemamingNumbers = [];
    const currentGameFieldFlat = currentGameFfield.flat();
    const currentNumbers = currentGameFieldFlat.filter((number) =>
      Boolean(number)
    );
    for (let i = 1; i < currentGameFieldFlat.length; i++) {
      if (!currentNumbers.includes(i)) {
        newRemamingNumbers.push(i);
      }
    }

    setRemaningNumbers(newRemamingNumbers);
  }, [currentNumber, currentGameFfield]);

  return (
    <div className={classes.gameContainer}>
      <div className={classes.gameFieldContainer}>
        <div className={classes.gameField}>
          {currentGameFfield.map((column, columnIndex) => (
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
                        setCurrentGameField((prevGameField) => {
                          const newGameField = prevGameField;
                          setCurrentNumber(
                            newGameField[columnIndex][numberIndex]
                          );
                          newGameField[columnIndex][numberIndex] = null;

                          return newGameField;
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
                            remaningNumbers[
                              remaningNumbers.findIndex(
                                (value) => value === currentGameFieldItem + 1
                              )
                            ]
                          );
                        }
                        if (currentNumber && !isStartNumber) {
                          setCurrentGameField((prevGameField) => {
                            const newGameField = prevGameField;
                            newGameField[columnIndex][numberIndex] =
                              currentNumber;
                            const nextNumber =
                              remaningNumbers[
                                remaningNumbers.findIndex(
                                  (value) => value === currentNumber
                                ) + 1
                              ];
                            setCurrentNumber(nextNumber);
                            return newGameField;
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
};
