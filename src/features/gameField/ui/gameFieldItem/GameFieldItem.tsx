import { observer } from 'mobx-react-lite';
import { FC, useState } from 'react';
import { Number } from 'shared/components';
import { useStores } from 'stores/rootStoreContext';

import { GameFieldItemProps } from './gameFieldItem.types';

export const GameFieldItem: FC<GameFieldItemProps> = observer(
  ({ columnIndex, numberIndex, currentGameFieldItem }) => {
    const {
      gameFieldStore: {
        startField,
        removeGameFieldItem,
        setCurrentNumber,
        setCurrentFieldHover,
        currentFieldHover,
        currentNumber,
        putGameFieldItem,
        remaningNumbers,
      },
    } = useStores();
    const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(
      null
    );

    const isStartNumber =
      startField[columnIndex][numberIndex] &&
      startField[columnIndex][numberIndex] === currentGameFieldItem;

    const isHoverField =
      currentFieldHover !== null &&
      currentFieldHover.columnIndex === columnIndex &&
      currentFieldHover.numberIndex === numberIndex;

    const isEmptyField = !currentGameFieldItem;

    return (
      <Number
        isDisabledText={isHoverField && !isStartNumber}
        isStartNumber={isStartNumber}
        isEnableHover={!isStartNumber}
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
  }
);
