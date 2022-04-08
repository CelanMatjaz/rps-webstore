import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../../../common/types';
import Error from '../partials/error';

export const Register: React.FC = (props) => {
  const [name, setName] = React.useState('');
  const [lastname, setLastname] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [mail, setMail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordRepeat, setPasswordRepeat] = React.useState('');
  const [error, setError] = React.useState<string>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const res = await fetch('/api/account/login', {
      body: JSON.stringify({
        username,
        name,
        last_name: lastname,
        mail,
        password,
        repeat_password: passwordRepeat,
      }),
      method: 'POST',
    });
    const { data, error } = (await res.json()) as { data: User; error: string };

    if (error) {
      setError(error);
      return;
    }

    navigate('/');
  };

  return (
    <div className='auth-form-container'>
      <div className='auth-form'>
        {error && <Error error={error} />}
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className='split'>
            <div>
              <label htmlFor='name'>First name</label>
              <input
                required
                id='name'
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='lastName'>Last name</label>
              <input
                required
                id='lastName'
                type='text'
                value={name}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
          </div>
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
            <label htmlFor='mail'>Mail</label>
            <input
              required
              id='mail'
              type='text'
              value={mail}
              onChange={(e) => setMail(e.target.value)}
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
          <div>
            <label htmlFor='passwordRepeat'>Repeat password</label>
            <input
              required
              id='passwordRepeat'
              type='password'
              value={passwordRepeat}
              onChange={(e) => setPasswordRepeat(e.target.value)}
            />
          </div>
          <button>Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
