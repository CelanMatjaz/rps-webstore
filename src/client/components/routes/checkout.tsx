import React, { useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import Error from '../partials/error';

export const Checkout: React.FC = (props) => {
  const [address, setAddress] = useState('');
  const [paymentInfo, setPaymentInfo] = useState('');
  const [error, setError] = useState(null);

  const cartItems = useAppSelector((state) => state.cart.items);

  console.log(error);

  return (
    <div className='checkout auth-form-container'>
      <h1>Checkout</h1>

      <div>{error && <Error error={error} />}</div>

      <form
        className='auth-form'
        style={{ margin: 0 }}
        onSubmit={async (e) => {
          e.preventDefault();
          setError(null);
          const items = Object.values(cartItems).map((i) => ({
            id: i.item.id,
            quantity: i.quantity,
          }));

          const res = await fetch('/api/checkout', {
            method: 'POST',
            body: JSON.stringify(items),
            headers: {
              'Content-type': 'application/json',
            },
          });

          if (res.status === 200) {
            const data = await res.json();
            console.log('OK');
          } else {
            try {
              const data = await res.json();
              setError(data.error);
            } catch (e) {
              setError('There was an error when checking out');
            }
          }
        }}
      >
        <div>
          <label htmlFor='address'>Enter address:</label>
          <input
            type='text'
            id='address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor='payment-info'>Enter payment info:</label>
          <input
            type='text'
            id='payment-info'
            value={paymentInfo}
            onChange={(e) => setPaymentInfo(e.target.value)}
          />
        </div>
        <button>Checkout</button>
      </form>
    </div>
  );
};

export default Checkout;
