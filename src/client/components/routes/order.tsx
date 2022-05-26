import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import OrderProduct from '../partials/orderProduct';

export const Order: React.FC = (props) => {
  const [orderItems, setOrderItems] = useState([]);

  const { id: orderId } = useParams<{ id: string }>();

  useEffect(() => {
    async function fetchOrderItems() {
      const res = await fetch(`/api/orders/${orderId}`);

      if (res.status === 200) {
        const data = await res.json();
        setOrderItems(data.data);
      }
    }

    fetchOrderItems();
  }, []);

  return (
    <div>
      <h2>Items in order {orderId}</h2>
      <div>
        {orderItems.map((item, i) => (
          <OrderProduct key={i} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Order;
