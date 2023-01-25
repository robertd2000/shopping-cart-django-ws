import React, { memo, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/authContext';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { user } = useContext(AuthContext);

  console.log('user', user);

  return (
    <nav>
      <div className={styles['container']}>
        <ul className={styles['navbar-left']}>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>

        <ul className={styles['navbar-right']}>
          <li>
            <Link to="/cart">
              <i className="fa fa-shopping-cart"></i> Cart{' '}
              <span className={styles['badge']}>3</span>
            </Link>
          </li>
          <li>{user.name || ''}</li>
        </ul>
      </div>
    </nav>
  );
};

export default memo(Navbar);
