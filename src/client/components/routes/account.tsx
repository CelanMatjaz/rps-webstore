import React from 'react';
import { useNavigate } from 'react-router';
import { useAppSelector } from '../../store/hooks';
import OrdersContainer from '../partials/ordersContainer';

export const Account: React.FC = (props) => {
  const user = useAppSelector((state) => state.auth.user);

  if (!user) useNavigate()('/');

  return (
    <div className='account-details'>
      <h3>Account details</h3>
      <div className='details'>
        <div>
          <label>Username</label>: {user.username}
        </div>
        <div>
          <label>First name</label>: {user.name}
        </div>
        <div>
          <label>Last name</label>: {user.last_name}
        </div>
        <div>
          <label>Email</label>: {user.mail}
        </div>
        <div>
          <label>Joined</label>: {new Date(user.created_at).toDateString()}
        </div>
      </div>

      <div style={{ marginTop: '40px' }}>
        <h3>Previous orders</h3>
        <OrdersContainer />
      </div>
    </div>
  );
};

export default Account;
