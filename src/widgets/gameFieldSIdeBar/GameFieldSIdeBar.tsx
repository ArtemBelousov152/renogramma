import { observer } from 'mobx-react-lite';
import { Number } from 'shared';
import { useStores } from 'stores/rootStoreContext';

export const GameFieldSIdeBar = observer(() => {
  const {
    gameFieldStore: { currentNumber },
  } = useStores();
  return (
    <div>
      <span>Current number</span>
      <Number number={currentNumber} />
    </div>
  );
});
