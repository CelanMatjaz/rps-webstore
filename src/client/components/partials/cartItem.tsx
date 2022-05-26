import React from 'react';
import { Link } from 'react-router-dom';
import { CartItemType } from '../../store/cart';

interface Props {
  cartItem: CartItemType;
}

export const CartItem: React.FC<Props> = ({ cartItem }) => {
  const { item, quantity } = cartItem;

  return (
    <div className='cart-item product-small'>
      <div>
        <img src={item.img_path} />
      </div>
      <div>
        <div className='product-details'>
          <div className='product-name'>
            <Link to={`/items/${item.id}`}>
              <h1>{item.name}</h1>
            </Link>
          </div>
          <div className='product-quantity float-left'>
            {item.quantity} left in stock
          </div>
          <div className='product-price float-left'>
            {quantity} X {item.price}€ = {item.price * quantity}€
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
