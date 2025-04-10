import { GameFieldContainer, GameFieldSIdeBar } from 'features/gameField/ui';

import classes from './playingField.module.scss';

export const PlayingField = () => {
  return (
    <div className={classes.gameContainer}>
      <GameFieldContainer />
      <GameFieldSIdeBar />
    </div>
  );
};
