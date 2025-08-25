import { ConfigureGameField } from 'features/gameField/ui';
import { PlayingFieldPage } from 'pages/playingFieldPage';
import { Route, Routes } from 'react-router-dom';
import { Header } from 'shared/components/header';
import { ThemeProvider } from 'shared/theme/ThemeProvider';
import RootStore from 'stores/rootStore';
import { RootStoreContext } from 'stores/rootStoreContext';

import classNames from './app.module.scss';
import './styles/index.scss';

export const App = () => {
  return (
    <ThemeProvider>
      <RootStoreContext.Provider value={new RootStore()}>
        <div className={classNames.app}>
          <Header />
          <Routes>
            <Route path="/game" element={<PlayingFieldPage />} />
            <Route path="/" element={<ConfigureGameField />} />
          </Routes>
        </div>
      </RootStoreContext.Provider>
    </ThemeProvider>
  );
};
