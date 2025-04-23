import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { observer } from 'mobx-react-lite';
import { useStores } from 'stores/rootStoreContext';

import { FieldActions } from '../fieldActions';

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

export const FinishGameDialog = observer(() => {
  const {
    gameFieldStore: { isGameFinished },
  } = useStores();

  return (
    <Dialog style={{ padding: '20px' }} open={isGameFinished}>
      <DialogTitle textAlign="center">Вы выиграли!</DialogTitle>
      <List>
        <ListItem>
          <FieldActions />
        </ListItem>
      </List>
    </Dialog>
  );
});
