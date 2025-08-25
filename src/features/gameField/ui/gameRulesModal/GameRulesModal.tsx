import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Button } from 'shared/components/button';

import classes from './gameRulesModal.module.scss';

export const GameRulesModal = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpen} fullWidth>
        Правила игры
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="rules-dialog-title"
        aria-describedby="rules-dialog-description"
      >
        <div className={classes.gameRulesModalTheme}>
          <DialogTitle id="rules-dialog-title">
            Правила и управление игрой
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="rules-dialog-description">
              <Typography className={classes.gameRulesModalTheme} variant="h6">
                Цель игры
              </Typography>
              <span className={classes.gameRulesModalTheme}>
                Нужно построить цепочку из чисел от самого маленького, до самого
                большого. При наведении на цепочку, она будет выделена.
              </span>
              <br />
              <br />
              <Typography className={classes.gameRulesModalTheme} variant="h6">
                Управление
              </Typography>
              <ul className={classes.gameRulesModalList}>
                <li>
                  <strong>Выбор числа:</strong> Левый клик по числу в списке
                  снизу — выбираем его как текущее
                </li>
                <li>
                  <strong>Отмена выбора:</strong> Правый клик по любому числу на
                  поле — сбрасываем выбор
                </li>
                <li>
                  <strong>Удаление числа:</strong> Правый клик по установленному
                  числу (когда нет выбранного числа)
                </li>
                <li>
                  <strong>Взятие числа:</strong> Левый клик по установленному
                  вами числу (когда нет выбранного числа) — удаляет число и
                  делает его текущим
                </li>
                <li>
                  <strong>Авто-выбор:</strong> Левый клик по предустановленному
                  числу — автоматически выбирается следующее доступное число
                </li>
                <li>
                  <strong>Установка числа:</strong> При наличии текущего числа,
                  левый клик по пустой ячейке — установка текущего числа и
                  автоматический выбор следующего
                </li>
                <li>
                  <strong>Замена числа:</strong> При наличии текущего числа,
                  левый клик по установленному вами числу — замена на текущее
                  число
                </li>
              </ul>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Закрыть
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
};
