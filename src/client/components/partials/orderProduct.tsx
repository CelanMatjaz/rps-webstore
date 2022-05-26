import React from 'react';
import { OrderItem } from '../../../common/types';

interface Props {
  item: OrderItem;
}

export const OrderProduct: React.FC<Props> = ({ item }) => {
  console.log(item);
  const {
    category,
    category_id,
    created_at,
    id,
    img_path,
    name,
    price,
    quantity,
    updated_at,
  } = item;

  return (
    <div className='order-product'>
      <div className='order-product-image'>
        <img src={img_path} />
      </div>
      <div className='order-product-details'>
        <div className='order-product-details-name'>{name}</div>
        <div>Category: {category}</div>
        <div>
          Price: <span className='bold'> {quantity} </span> x{' '}
          <span className='bold'>
            {price}€ ({quantity * price}€)
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderProduct;
