import { makeAutoObservable } from 'mobx';
import { FieldItemPosition } from 'shared/types';
import { genMap } from 'shared/utils';

class GameFieldStore {
  gameField: Array<Array<number | null>> = [];
  startField: Array<Array<number | null>> = [];
  remaningNumbers: number[] = [];
  currentNumber: number | null = null;
  fullField: Array<Array<number | null>> = [];
  currentFieldHover: FieldItemPosition | null = null;
  isGameFinished: boolean = false;
  fieldWidth: number = 8;
  fieldHeight: number = 7;
  numberChain: number[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  calculateRemaningNumbers() {
    const newRemamingNumbers = [];
    const currentGameFieldFlat = this.gameField.flat();
    const currentNumbers = currentGameFieldFlat.filter((number) =>
      Boolean(number)
    );
    for (let i = 1; i < currentGameFieldFlat.length; i++) {
      if (!currentNumbers.includes(i)) {
        newRemamingNumbers.push(i);
      }
    }

    this.remaningNumbers = newRemamingNumbers;
  }

  generateGameField = () => {
    const { fld, fullfld } = genMap(this.fieldWidth, this.fieldHeight);
    this.gameField = structuredClone(fld);
    this.startField = structuredClone(fld);
    this.fullField = structuredClone(fullfld);
    this.isGameFinished = false;
    this.calculateRemaningNumbers();
  };

  checkIsGameFinished = () => {
    this.isGameFinished =
      JSON.stringify(this.gameField) === JSON.stringify(this.fullField);
  };

  resetGameField = () => {
    this.gameField = JSON.parse(JSON.stringify(this.startField));
    this.calculateRemaningNumbers();
    this.currentNumber = null;
    this.isGameFinished = false;
  };

  setFieldHeight = (newHeight: number) => {
    this.fieldHeight = newHeight;
  };

  setFieldWidth = (newWidth: number) => {
    this.fieldWidth = newWidth;
  };

  setCurrentNumber = (number: number | null) => {
    this.currentNumber = number;
  };

  setCurrentFieldHover = (fieldItelPosition: null | FieldItemPosition) => {
    this.setNumberChain(fieldItelPosition);
    this.currentFieldHover = fieldItelPosition;
  };

  setNumberChain = (fieldItemPosition: FieldItemPosition | null) => {
    if (!fieldItemPosition) {
      this.numberChain = [];
      return;
    }
    const resultChainNumber: number[] = [];
    const checkValudNumberOnChain = (
      fieldItemPosition: FieldItemPosition,
      down: boolean
    ) => {
      const { columnIndex, rowIndex } = fieldItemPosition;
      const currentNumber = this.gameField[columnIndex][rowIndex];
      if (!currentNumber) return;

      if (!resultChainNumber.includes(currentNumber)) {
        resultChainNumber.push(currentNumber);
      }

      for (let i = -1; i < 2; i++) {
        if (columnIndex + i < 0 || columnIndex + i >= this.fieldWidth) {
          continue;
        }
        for (let j = -1; j < 2; j++) {
          if (rowIndex + j < 0 || rowIndex + j >= this.fieldHeight) {
            continue;
          }

          const checkNumber = this.gameField[columnIndex + i][rowIndex + j];
          if (currentNumber === checkNumber) {
            continue;
          }

          if (
            checkNumber &&
            currentNumber &&
            currentNumber - checkNumber === (down ? 1 : -1)
          ) {
            const numberToPush = down ? currentNumber : checkNumber;
            if (!resultChainNumber.includes(numberToPush)) {
              resultChainNumber.push(numberToPush);
            }
            checkValudNumberOnChain(
              {
                columnIndex: columnIndex + i,
                rowIndex: rowIndex + j,
              },
              down
            );
          }
        }
      }
    };
    checkValudNumberOnChain(fieldItemPosition, true);
    checkValudNumberOnChain(fieldItemPosition, false);

    this.numberChain = resultChainNumber;
  };

  removeGameFieldItem = ({ columnIndex, rowIndex }: FieldItemPosition) => {
    const newGameField = this.gameField;

    newGameField[columnIndex][rowIndex] = null;

    this.gameField = newGameField;
    this.calculateRemaningNumbers();
  };

  putGameFieldItem = ({ columnIndex, rowIndex }: FieldItemPosition) => {
    const newGameField = this.gameField;
    newGameField[columnIndex][rowIndex] = this.currentNumber;
    const nextNumber =
      this.remaningNumbers[
        this.remaningNumbers.findIndex(
          (value) => value === this.currentNumber
        ) + 1
      ];
    this.currentNumber = nextNumber;
    this.calculateRemaningNumbers();
  };
}
export const gameFieldStore = new GameFieldStore();
