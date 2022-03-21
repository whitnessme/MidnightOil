import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';

const LoginForm = ({ setShowModal }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory()

  const onLogin = async (e) => {
    e?.preventDefault();
    dispatch(login(email, password)).then((res) => {
      if (res) {
        setErrors(res);
      } else {
        history.push('/dashboard')
      }})
  };

  const handleDemo = () => {
    setEmail("demo@aa.io");
    setPassword("password");
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <>
    <h2 className='modal-header'>Log In</h2>
    <form className='login-signup-form' onSubmit={onLogin}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
          ))}
      </div>
      <div className='input-label-div'>
        <label htmlFor='email'>Email</label>
        <input
          name='email'
          type='text'
          // placeholder='Email'
          value={email}
          onChange={updateEmail}
          />
      </div>
      <div className='input-label-div'>
        <label htmlFor='password'>Password</label>
        <input
          name='password'
          type='password'
          // placeholder='Password'
          value={password}
          onChange={updatePassword}
          />
      </div>
      <div className='login-buttons'>
      <button type='submit'>Login</button>
      <button onClick={handleDemo} >Demo</button>
      </div>
    </form>
    </>
  );
};

export default LoginForm;
