import { Button } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Number } from 'shared/components';
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
      <Button variant="outlined" color="warning" onClick={resetGameField}>
        Сбросить
      </Button>
    </div>
  );
});
