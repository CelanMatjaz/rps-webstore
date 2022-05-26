import React, { useEffect, useState } from 'react';
import { OrderItem as Order } from '../../../common/types';
import OrderItem from './orderItem';

export const OrdersContainer: React.FC = (props) => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`/api/orders`);
        const data = await res.json();

        if (res.status === 200 && data.data) {
          setOrders(data.data);
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      {orders.map((order, i) => (
        <OrderItem key={i} order={order} />
      ))}
    </div>
  );
};

export default OrdersContainer;
