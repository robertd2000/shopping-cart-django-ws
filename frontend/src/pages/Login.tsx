import React from 'react';
import { Link } from 'react-router-dom';
import useLogin from '../hooks/useLogin';
import styles from './Login.module.css';

const Login = () => {
  const { username, password, setUsername, setPassword, submitForm } =
    useLogin();

  return (
    <div className={styles['container']}>
      <section className={styles['wrapper']}>
        <div className={styles['heading']}>
          <h1 className={styles['text text-large']}>Sign In</h1>
          <p className={styles['text text-normal']}>
            New user?{' '}
            <span>
              <Link to={'/sign-up'} className={styles['text text-links']}>
                Create an account
              </Link>
            </span>
          </p>
        </div>
        <form name="signin" className={styles['form']} onSubmit={submitForm}>
          <div className={styles['input-control']}>
            <label htmlFor="email" className={styles['input-label']} hidden>
              Username
            </label>
            <input
              type="text"
              name="email"
              id="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles['input-field']}
              placeholder="Email Address"
            />
          </div>
          <div className={styles['input-control']}>
            <label htmlFor="password" className={styles['input-label']} hidden>
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className={styles['input-field']}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={styles['input-control']}>
            <input
              type="submit"
              name="submit"
              className={styles['input-submit']}
              value="Sign In"
            />
          </div>
        </form>
      </section>
    </div>
  );
};

export default Login;
