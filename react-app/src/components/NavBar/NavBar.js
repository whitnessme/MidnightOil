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
          <NavLink className='logo-link' to='/dashboard' exact={true} activeClassName='active'>
            <img alt="oil lamp icon"
            className='logo-icon'
            src='../../../../static/oil-lamp-1.png'></img>
          <h1 className='app-name'>Midnight Oil</h1>
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
