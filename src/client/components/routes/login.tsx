import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../../../common/types';
import { login } from '../../store/auth';
import { useAppDisptach } from '../../store/hooks';
import Error from '../partials/error';

export const Login: React.FC = (props) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState<string>(null);
  const dispatch = useAppDisptach();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const res = await fetch('/api/account/login', {
      body: JSON.stringify({ username, password }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const { data, error } = (await res.json()) as { data: User; error: string };

    if (error) {
      setError(error);
      return;
    }

    if (data) {
      dispatch(login(data));
      navigate('/');
    }
  };

  return (
    <div className='auth-form-container'>
      <div className='auth-form'>
        {error && <Error error={error} />}
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='username'>Username</label>
            <input
              required
              id='username'
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input
              required
              id='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
