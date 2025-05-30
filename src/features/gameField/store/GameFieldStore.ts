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
    this.currentFieldHover = fieldItelPosition;
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
