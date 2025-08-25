import { observer } from 'mobx-react-lite';
import { Button } from 'shared/components/button';
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
        <Number number={currentNumber} style={{ borderRadius: '10px' }} />
        <span>Выбранное число</span>
      </div>
      <div className={classes.buttonsContainer}>
        <GameRulesModal />
        <Button onClick={resetGameField}>Сбросить</Button>
      </div>
    </div>
  );
});
