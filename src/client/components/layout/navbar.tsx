import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../store/auth';
import { useAppDisptach, useAppSelector } from '../../store/hooks';

export const Navbar: React.FC = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const itemsInCart = useAppSelector((state) =>
    Object.values(state.cart.items)
  ).reduce((prev, current) => {
    return prev + current.quantity;
  }, 0);

  const dispatch = useAppDisptach();
  const navigate = useNavigate();

  return (
    <nav>
      <ul className='navigation-links'>
        <li>
          <NavLink to='/'>Home</NavLink>
        </li>
        <li>
          <NavLink to='/catalog'>Catalog</NavLink>
        </li>
        <li>
          <NavLink to='/contact'>Contact</NavLink>
        </li>
        {isLoggedIn ? (
          <>
            <li>
              <NavLink to='/account'>Account</NavLink>
            </li>
            <li>
              <NavLink to='/cart'>Cart ({itemsInCart})</NavLink>
            </li>
            <li>
              <Link
                to='#'
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(logout());
                  navigate('/');
                }}
              >
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to='/login'>Login</NavLink>
            </li>
            <li>
              <NavLink to='/register'>Register</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
