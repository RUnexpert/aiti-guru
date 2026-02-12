import { useState } from 'react';
import { login } from '../../api/auth';
import { useNavigate } from 'react-router-dom';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Message } from 'primereact/message';
import { Checkbox } from 'primereact/checkbox';
import { FloatLabel } from 'primereact/floatlabel';

import styles from './Login.module.css';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const data = await login({ username, password });

      if (rememberMe) {
        localStorage.setItem('token', data.token);
      } else {
        sessionStorage.setItem('token', data.token);
      }

      navigate('/products');
    } catch {
      setError('Неверный логин или пароль');
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.logo} />

      <h2 className={styles.title}>Добро пожаловать!</h2>
      <span className={styles.subtitle}>Пожалуйста, авторизируйтесь</span>

      <form onSubmit={handleSubmit} className={styles.form}>
        <FloatLabel>
          <InputText
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.loginInput}
          />
          <label htmlFor="username">Логин</label>
        </FloatLabel>

        <FloatLabel className={styles.passwordContainer}>
          <Password
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            feedback={false}
            toggleMask
            className={styles.passwordInput}
          />
          <label htmlFor="password">Пароль</label>
        </FloatLabel>

        <div className={styles.remember}>
          <Checkbox
            inputId="remember"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.checked ?? false)}
          />
          <label htmlFor="remember">Запомнить данные</label>
        </div>

        {error && <Message severity="error" text={error} />}

        <Button type="submit" label="Войти" className="p-button-fluid" />
      </form>
    </div>
  );
};
