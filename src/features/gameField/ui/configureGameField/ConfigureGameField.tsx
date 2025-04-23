import { Button, Slider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useStores } from 'stores/rootStoreContext';

import classes from './configureGameField.module.scss';
import { Dimensions } from './configureGameField.types';

export const ConfigureGameField = () => {
  const {
    gameFieldStore: { fieldHeight, fieldWidth, setFieldHeight, setFieldWidth },
  } = useStores();

  const handleChange = (dimensions: Dimensions) => {
    return (_: Event, value: number) => {
      switch (dimensions) {
        case Dimensions.heigth:
          setFieldHeight(value);
          break;
        case Dimensions.width:
          setFieldWidth(value);
          break;
      }
    };
  };

  const navigate = useNavigate();
  return (
    <div className={classes.container}>
      <h2>Введите размер поля</h2>
      <h3>Ширина</h3>
      <Slider
        aria-label="Temperature"
        defaultValue={fieldWidth}
        onChange={handleChange(Dimensions.width)}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={2}
        max={8}
        color="warning"
      />
      <h3>Высота</h3>
      <Slider
        aria-label="Temperature"
        defaultValue={fieldHeight}
        // TODO: мемоизировать
        onChange={handleChange(Dimensions.heigth)}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={2}
        max={8}
        color="warning"
      />
      <Button
        onClick={() => {
          navigate('/game');
        }}
        variant="contained"
        color="warning"
      >
        Начать
      </Button>
    </div>
  );
};
