import { Button, Stack } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { useStores } from 'stores/rootStoreContext';

export const FieldActions = observer(() => {
  const {
    gameFieldStore: { generateGameField },
  } = useStores();

  const navigate = useNavigate();

  const handleGenerateNewGameField = () => {
    generateGameField();
  };

  const handleEditGameField = () => {
    navigate('/');
  };
  return (
    <Stack spacing={2} direction="row">
      <Button onClick={handleGenerateNewGameField} variant="contained">
        Сгенерировать поле
      </Button>
      <Button onClick={handleEditGameField} variant="contained">
        Редактировать поле
      </Button>
    </Stack>
  );
});
