import { Stack } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { Button } from 'shared/components/button';
import { useStores } from 'stores/rootStoreContext';

import { FieldActionsProps } from './fieldActions.types';

export const FieldActions = observer(
  ({ editFieldCallback, generateNewGameFieldCallback }: FieldActionsProps) => {
    const {
      gameFieldStore: { generateGameField },
    } = useStores();

    const navigate = useNavigate();

    const handleGenerateNewGameField = () => {
      generateNewGameFieldCallback?.();
      generateGameField();
    };

    const handleEditGameField = () => {
      editFieldCallback?.();
      navigate('/');
    };
    return (
      <Stack spacing={2} direction="row">
        <Button onClick={handleGenerateNewGameField}>Сгенерировать поле</Button>
        <Button onClick={handleEditGameField}>Редактировать поле</Button>
      </Stack>
    );
  }
);
