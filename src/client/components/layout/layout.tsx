import React from 'react';
import { Outlet } from 'react-router';
import Navbar from './navbar';

export const Layout: React.FC = () => {
  return (
    <div>
      <div className='header'>
        <div>Welcome to our store</div>
      </div>
      <div className='navigation'>
        <Navbar />
      </div>
      <div className='container'>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
