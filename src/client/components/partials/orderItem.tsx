import React from 'react';
import { Link } from 'react-router-dom';
import { Order } from '../../../common/types';

interface Props {
  order: Order;
}

export const OrderItem: React.FC<Props> = ({ order }) => {
  const { created_at, id, updated_at, user_id } = order;

  return (
    <Link to={`/orders/${id}`}>
      <div className='order-item'>
        <div>Order ID: {id}</div>
        <div>Ordered on: {new Date(created_at).toUTCString()}</div>
      </div>
    </Link>
  );
};

export default OrderItem;
