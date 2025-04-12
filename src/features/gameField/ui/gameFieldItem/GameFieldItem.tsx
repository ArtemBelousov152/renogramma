import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { Number } from 'shared/components';
import { useStores } from 'stores/rootStoreContext';

import { GameFieldItemProps } from './gameFieldItem.types';

export const GameFieldItem: FC<GameFieldItemProps> = observer(
  ({ columnIndex, rowIndex, currentGameFieldItem }) => {
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

    const isStartNumber =
      !!startField[columnIndex][rowIndex] &&
      startField[columnIndex][rowIndex] === currentGameFieldItem;

    const isHoverField =
      currentFieldHover !== null &&
      currentFieldHover.columnIndex === columnIndex &&
      currentFieldHover.rowIndex === rowIndex;

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
        key={`${currentGameFieldItem}_${rowIndex}`}
        onMouseEnter={() => {
          setCurrentFieldHover({ columnIndex, rowIndex });
        }}
        onMouseLeave={() => {
          setCurrentFieldHover(null);
        }}
        onContextMenu={(event) => {
          event.preventDefault();
          if (currentNumber) {
            setCurrentNumber(null);
          } else {
            removeGameFieldItem({ columnIndex, rowIndex });
          }
        }}
        onClick={(event) => {
          if (isStartNumber && currentGameFieldItem) {
            setCurrentNumber(
              remaningNumbers.find(
                (value) => value >= currentGameFieldItem + 1
              ) ?? null
            );
          }

          if (currentNumber && !isStartNumber) {
            putGameFieldItem({
              columnIndex,
              rowIndex,
            });
          }

          if (!currentNumber && !isStartNumber && currentGameFieldItem) {
            setCurrentNumber(currentGameFieldItem);
            removeGameFieldItem({ columnIndex, rowIndex });
          }
        }}
      />
    );
  }
);
