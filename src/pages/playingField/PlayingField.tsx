import classNames from 'classnames';
import { gameData } from 'mocks';
import { useEffect, useState } from 'react';

import classes from './playingField.module.scss';

export const PlayingField = () => {
  const [currentGameFfield, setCurrentGameField] = useState(
    structuredClone(gameData)
  );
  const [remaningNumbers, setRemaningNumbers] = useState<number[]>([]);
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);

  useEffect(() => {
    const newRemamingNumbers = [];
    const currentNumbers = currentGameFfield
      .flat()
      .filter((number) => Boolean(number));
    console.debug(currentNumbers, 'currentNumbers');

    for (let i = 1; i < 56; i++) {
      if (!currentNumbers.includes(i)) {
        newRemamingNumbers.push(i);
      }
    }

    setRemaningNumbers(newRemamingNumbers);
  }, [currentNumber]);
  console.debug(gameData, 'gameData');

  return (
    <div className={classes.gameContainer}>
      <div className={classes.gameField}>
        {currentGameFfield.map((column, columnIndex) => (
          <div className={classes.column} key={columnIndex}>
            {column.map((number, numberIndex) => {
              return (
                <div
                  className={classNames(classes.number, {
                    [classes.startNumbers]:
                      gameData[columnIndex][numberIndex] &&
                      gameData[columnIndex][numberIndex] ===
                        currentGameFfield[columnIndex][numberIndex],
                  })}
                  key={`${number}_${numberIndex}`}
                  onClick={() => {
                    if (currentNumber) {
                      setCurrentGameField((prevGameField) => {
                        const newGameField = prevGameField;
                        newGameField[columnIndex][numberIndex] = currentNumber;
                        setCurrentNumber(null);
                        console.debug('set');

                        return newGameField;
                      });
                    }
                  }}
                >
                  {number}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className={classes.remaningNumbers}>
        {remaningNumbers.map((number, index) => (
          <div
            onClick={() => {
              setCurrentNumber(number);
            }}
            key={`${number}_${index}`}
            className={classes.number}
          >
            {number}
          </div>
        ))}
      </div>
    </div>
  );
};
