import React from 'react';
import { Item } from '../../../common/types';

interface Props {
  item: Item;
}

export const ProductSingle: React.FC<Props> = (props) => {
  const { item } = props;

  return <div></div>;
};

export default ProductSingle;
