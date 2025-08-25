import { ThemeToggle } from '../themeToggle';
import classes from './header.module.scss';

export const Header = () => {
  return (
    <div className={classes.header}>
      <ThemeToggle />
    </div>
  );
};
