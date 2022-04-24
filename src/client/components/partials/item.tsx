import React from 'react';
import { Link } from 'react-router-dom';
import { Item as ItemType } from '../../../common/types';

interface Props {
  item: ItemType;
}

export const Item: React.FC<Props> = ({ item }) => {
  return (
    <div className='product-small'>
      <img src={item.img_path} />
      <div className='product-description'>
        <div>
          <Link to={`/items/${item.id}`}>{item.name}</Link>
        </div>
        <div>{item.quantity} in stock</div>
        <div>{item.price}€</div>
      </div>
      <div></div>
    </div>
  );
};

export default Item;
