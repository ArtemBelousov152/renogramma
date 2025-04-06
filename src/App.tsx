import { PlayingField } from 'pages';
import { Route, Routes } from 'react-router-dom';

import classNames from './app.module.scss';
import './styles/index.scss';

export const App = () => {
  return (
    <div className={classNames.app}>
      <Routes>
        <Route path="/" element={<PlayingField />} />
      </Routes>
    </div>
  );
};
