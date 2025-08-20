import { useNavigate } from 'react-router-dom';
import { Button } from 'shared/components/button';
import { Slider } from 'shared/components/slider';
import { useStores } from 'stores/rootStoreContext';

import classes from './configureGameField.module.scss';
import { Dimensions } from './configureGameField.types';

export const ConfigureGameField = () => {
  const {
    gameFieldStore: { fieldHeight, fieldWidth, setFieldHeight, setFieldWidth },
  } = useStores();

  const handleChange = (dimensions: Dimensions) => {
    return (_: Event, value: number | number[]) => {
      // TODO: Подумать как убрать этот костыль и из типов убрать number[]
      if (Array.isArray(value)) {
        return;
      }

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
        defaultValue={fieldWidth}
        onChange={handleChange(Dimensions.width)}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={2}
        max={8}
      />
      <h3>Высота</h3>
      <Slider
        defaultValue={fieldHeight}
        onChange={handleChange(Dimensions.heigth)}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={2}
        max={8}
      />
      <Button
        onClick={() => {
          navigate('/game');
        }}
      >
        Начать
      </Button>
    </div>
  );
};
