import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { observer } from 'mobx-react-lite';
import { useStores } from 'stores/rootStoreContext';

import { FieldActions } from '../fieldActions';
import classes from './finishGameDialog.module.scss';

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

export const FinishGameDialog = observer(() => {
  const {
    gameFieldStore: { isGameFinished, resetGameField },
  } = useStores();

  return (
    <Dialog open={isGameFinished}>
      <div className={classes.container}>
        <DialogTitle textAlign="center">Вы выиграли!</DialogTitle>
        <FieldActions editFieldCallback={resetGameField} />
      </div>
    </Dialog>
  );
});
