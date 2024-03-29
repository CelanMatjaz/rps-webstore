import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Item as ItemType } from '../../../../common/types';
import { addItemToCart } from '../../../store/cart';
import { useAppDisptach, useAppSelector } from '../../../store/hooks';

export const Item: React.FC = (props) => {
  const [item, setItem] = useState<ItemType>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useAppDisptach();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await fetch(`/api/items/${id}`);
        const data = await res.json();

        if (res.status === 200 && data.data) {
          setItem(data.data);
        }
      } catch (e) {
        navigate('/');
      }
    };

    fetchItem();
  }, []);

  if (!item) return <div></div>;

  return (
    <div className='product-container'>
      <div>
        <img src={item.img_path} />
      </div>
      <div>
        <div className='product-details'>
          <div className='product-name'>
            <h1>{item.name}</h1>
          </div>
          <div className='product-description'>{item.description}</div>
          <div className='product-quantity float-left'>
            {item.quantity} left in stock
          </div>
          <div className='product-price float-left'>{item.price}€</div>
          {isLoggedIn && (
            <div className='product-add-to-cart-button float-left'>
              <button
                onClick={() => {
                  dispatch(addItemToCart(item));
                }}
              >
                Add to cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Item;
