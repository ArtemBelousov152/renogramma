import { observer } from 'mobx-react-lite';
import { Number } from 'shared/components';
import { useStores } from 'stores/rootStoreContext';

import classes from './remaningNumbers.module.scss';

export const RemaningNumbers = observer(() => {
  const {
    gameFieldStore: { remaningNumbers, setCurrentNumber },
  } = useStores();
  return (
    <div className={classes.remaningNumbers}>
      {remaningNumbers.map((number, index) => (
        <Number
          number={number}
          isEnableHover
          onClick={() => {
            setCurrentNumber(number);
          }}
          key={`${number}_${index}`}
        />
      ))}
    </div>
  );
});
