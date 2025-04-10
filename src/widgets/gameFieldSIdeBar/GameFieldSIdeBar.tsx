import { observer } from 'mobx-react-lite';
import { Number } from 'shared';
import { useStores } from 'stores/rootStoreContext';

import classes from './gameFieldSideBar.module.scss';

export const GameFieldSIdeBar = observer(() => {
  const {
    gameFieldStore: { currentNumber, resetGameField },
  } = useStores();
  return (
    <div className={classes.container}>
      <div>
        <Number number={currentNumber} />
        <span>Current</span>
      </div>
      <button style={{ padding: 20 }} onClick={resetGameField}>
        Reset
      </button>
    </div>
  );
});
