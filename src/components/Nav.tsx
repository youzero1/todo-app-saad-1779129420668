import { NavLink } from 'react-router-dom';
import styles from './Nav.module.css';

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.active}` : styles.link
        }
      >
        Todos
      </NavLink>
      <NavLink
        to="/items"
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.active}` : styles.link
        }
      >
        Items
      </NavLink>
    </nav>
  );
}
