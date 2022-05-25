import React, { useEffect, useState } from 'react';
import Item from './item';

interface Props {
  categoryId?: number;
}

export const FeaturedProductsContainer: React.FC<Props> = ({ categoryId }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch(
        '/api/items/all' + (categoryId ? `?categoryId=${categoryId}` : '')
      );
      const data = await res.json();
      setProducts(data.data);
      setIsLoading(false);
    }
    fetchProducts();
  }, [categoryId]);

  return (
    <div className='featured-products'>
      <h2>Featured products</h2>
      <div className='featured-products-container'>
        {!isLoading &&
          products.length > 0 &&
          products.map((p, i) => <Item item={p} key={i} />)}
      </div>
    </div>
  );
};

export default FeaturedProductsContainer;
