import { GameFieldContainer, GameFieldSIdeBar } from 'features/gameField/ui';

import classes from './playingFieldPage.module.scss';

export const PlayingFieldPage = () => {
  return (
    <div className={classes.gameContainer}>
      <GameFieldContainer />
      <GameFieldSIdeBar />
    </div>
  );
};
