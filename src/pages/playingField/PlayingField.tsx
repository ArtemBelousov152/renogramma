import { GameField, GameFieldSIdeBar } from 'widgets';

import classes from './playingField.module.scss';

export const PlayingField = () => {
  return (
    <div className={classes.gameContainer}>
      <GameField />
      <GameFieldSIdeBar />
    </div>
  );
};
