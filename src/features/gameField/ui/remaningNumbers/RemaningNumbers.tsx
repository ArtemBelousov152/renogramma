import { observer } from 'mobx-react-lite';
import { Number } from 'shared/components/number';
import { useStores } from 'stores/rootStoreContext';

import classes from './remaningNumbers.module.scss';

export const RemaningNumbers = observer(() => {
  const {
    gameFieldStore: { remaningNumbers, setCurrentNumber },
  } = useStores();

  const handleChange = (number: number) => {
    return () => {
      setCurrentNumber(number);
    };
  };

  const handleWheel: React.WheelEventHandler<HTMLDivElement> = (event) => {
    if (event.deltaY === 0) return;
    event.preventDefault();
    event.currentTarget.scrollLeft += event.deltaY;
  };

  return (
    <div className={classes.remaningNumbers} onWheel={handleWheel}>
      {remaningNumbers.map((number, index) => (
        <Number
          number={number}
          isEnableHover
          onClick={handleChange(number)}
          key={`${number}_${index}`}
        />
      ))}
    </div>
  );
});
