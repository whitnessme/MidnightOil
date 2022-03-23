import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = ({ setShowModal }) => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [full_name, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSignUp = async (e) => {
    e.preventDefault();
      const data = await dispatch(signUp(username, full_name, email, password, repeatPassword));
      if (data) {
          setErrors(data)
      } else {
        history.push('/dashboard')
      }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };
  
  const updateFullname = (e) => {
    setFullname(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <>
    <h2 className='modal-header'>Get Started</h2>
    <form className='login-signup-form' onSubmit={onSignUp}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className='input-label-div'>
        <label>Username</label>
        <input
          type='text'
          name='username'
          // placeholder='username'
          onChange={updateUsername}
          value={username}
        ></input>
          <span className='required-icon'>
              <i className="fa-solid fa-asterisk"></i>
          </span>
      </div>
      <div className='input-label-div'>
        <label>Full Name</label>
        <input
          type='text'
          name='full_name'
          onChange={updateFullname}
          value={full_name}
        ></input>
          <span className='required-icon'>
              <i className="fa-solid fa-asterisk"></i>
          </span>
      </div>
      <div className='input-label-div'>
        <label>Email</label>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
        ></input>
          <span className='required-icon'>
              <i className="fa-solid fa-asterisk"></i>
          </span>
      </div>
      <div className='input-label-div'>
        <label>Password</label>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>
          <span className='required-icon'>
              <i className="fa-solid fa-asterisk"></i>
          </span>
      </div>
      <div className='input-label-div'>
        <label>Repeat Password</label>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          // required={true}
        ></input>
          <span className='required-icon'>
              <i className="fa-solid fa-asterisk"></i>
          </span>
      </div>
      <button type='submit'>Sign up</button>
    </form>
    </>
  );
};

export default SignUpForm;
