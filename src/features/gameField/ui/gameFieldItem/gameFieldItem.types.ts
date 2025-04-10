import { FieldItemPosition } from 'shared/types';

export interface GameFieldItemProps extends FieldItemPosition {
  currentGameFieldItem: number | null;
}
