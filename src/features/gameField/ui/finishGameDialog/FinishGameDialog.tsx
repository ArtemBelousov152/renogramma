import { Button, Stack } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { observer } from 'mobx-react-lite';
import { useStores } from 'stores/rootStoreContext';

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

export const FinishGameDialog = observer(() => {
  const {
    gameFieldStore: { isGameFinished, generateGameField },
  } = useStores();

  const handleGenerateNewGameField = () => {
    generateGameField();
  };

  const handleEditGameField = () => {
    console.debug('edit');
  };

  return (
    <Dialog style={{ padding: '20px' }} open={isGameFinished}>
      <DialogTitle textAlign="center">Вы выиграли!</DialogTitle>
      <List>
        <ListItem>
          <Stack spacing={2} direction="row">
            <Button onClick={handleGenerateNewGameField} variant="outlined">
              Сгенерировать поле
            </Button>
            <Button onClick={handleEditGameField} variant="outlined">
              Редактировать поле
            </Button>
          </Stack>
        </ListItem>
      </List>
    </Dialog>
  );
});
