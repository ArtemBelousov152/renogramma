import { PlayingField } from 'pages';
import { Route, Routes } from 'react-router-dom';
import RootStore from 'stores/rootStore';
import { RootStoreContext } from 'stores/rootStoreContext';

import classNames from './app.module.scss';
import './styles/index.scss';

export const App = () => {
  return (
    <RootStoreContext.Provider value={new RootStore()}>
      <div className={classNames.app}>
        <Routes>
          <Route path="/" element={<PlayingField />} />
        </Routes>
      </div>
    </RootStoreContext.Provider>
  );
};
