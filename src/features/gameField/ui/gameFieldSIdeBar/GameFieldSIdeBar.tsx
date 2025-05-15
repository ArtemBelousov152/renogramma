import { Button } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Number } from 'shared/components/number';
import { useStores } from 'stores/rootStoreContext';

import { GameRulesModal } from '../gameRulesModal';
import classes from './gameFieldSideBar.module.scss';

export const GameFieldSIdeBar = observer(() => {
  const {
    gameFieldStore: { currentNumber, resetGameField },
  } = useStores();

  return (
    <div className={classes.container}>
      <div className={classes.numberContainer}>
        <Number number={currentNumber} />
        <span>Выбранное число</span>
      </div>
      <div className={classes.buttonsContainer}>
        <GameRulesModal />
        <Button variant="contained" color="primary" onClick={resetGameField}>
          Сбросить
        </Button>
      </div>
    </div>
  );
});
