import React from 'react';
import { useAppSelector } from '../../store/hooks';

export const Cart: React.FC = (props) => {
  const itemsInCart = useAppSelector(
    (state) => Object.keys(state.cart.items).length
  );

  return (
    <div className='cart'>
      <div className='cart-title'>
        <h1>Cart</h1>
      </div>
      <div className='cart-details'>
        <div>Current items in cart ({itemsInCart})</div>
        <div className='cart-items'></div>
      </div>
    </div>
  );
};

export default Cart;
