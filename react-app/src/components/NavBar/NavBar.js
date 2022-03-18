import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { useSelector } from 'react-redux';

import './NavBar.css'

const NavBar = () => {
  const user = useSelector((state) => state.session?.user);

  return (
    <nav>
      <div className='nav-left-side'>
          <NavLink to='/dashboard' exact={true} activeClassName='active'>
            <img alt="oil lamp icon" className='logo-icon' src='https://cdn.iconscout.com/icon/free/png-256/diya-33-1101846.png'></img>
          </NavLink>
      </div>
      <ul className='nav-right-side'>
        {!user ?
        <>
        <li>
          <LoginFormModal />
        </li>
        <li>
          <SignupFormModal />
        </li>
        </>
        :
        <>
          <li>

          </li>
          <li>
            <LogoutButton />
          </li>
        </>
        }
      </ul>
    </nav>
  );
}

export default NavBar;
