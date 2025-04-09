import { makeAutoObservable } from 'mobx';
import { gameData } from 'mocks';

interface FieldItemPosition {
  columnIndex: number;
  numberIndex: number;
}

class GameFieldStore {
  gameField: Array<Array<number | null>> = [];
  startField: Array<Array<number | null>> = [];
  remaningNumbers: number[] = [];
  currentNumber: number | null = null;

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
    this.gameField = gameData;
    this.startField = gameData;
    this.calculateRemaningNumbers();
  };

  setCurrentNumber = (number: number) => {
    this.currentNumber = number;
  };

  removeGameFieldItem = ({ columnIndex, numberIndex }: FieldItemPosition) => {
    const newGameField = this.gameField;

    // this.currentNumber = newGameField[columnIndex][numberIndex]

    newGameField[columnIndex][numberIndex] = null;

    this.gameField = newGameField;
    this.calculateRemaningNumbers();
  };

  putGameFieldItem = ({ columnIndex, numberIndex }: FieldItemPosition) => {
    const newGameField = this.gameField;
    newGameField[columnIndex][numberIndex] = this.currentNumber;
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

export default new GameFieldStore();
