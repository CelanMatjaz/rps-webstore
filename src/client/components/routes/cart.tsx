import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import CartItem from '../partials/cartItem';

export const Cart: React.FC = (props) => {
  const cartItems = useAppSelector((state) => state.cart.items);

  const numberOfItemsInCart = Object.values(cartItems).reduce(
    (prev, current) => {
      return prev + current.quantity;
    },
    0
  );

  return (
    <div className='cart'>
      <div className='cart-title'>
        <h1>Cart</h1>
      </div>
      <div>
        {Object.values(cartItems).length > 0 && (
          <Link className='checkout-link' to='/checkout'>
            Checkout
          </Link>
        )}
      </div>
      <div className='cart-details'>
        <div>Current items in cart ({numberOfItemsInCart})</div>
        <div className='cart-items'>
          {Object.values(cartItems).map((item, i) => (
            <div key={i}>
              <CartItem cartItem={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cart;
