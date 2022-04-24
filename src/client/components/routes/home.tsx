import React, { useEffect, useState } from 'react';
import Item from '../partials/item';

export const Home: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch('/api/items/all');
      const data = await res.json();
      setProducts(data.data);
      console.log(data);
      setIsLoading(false);
    }
    fetchProducts();
  }, []);

  return (
    <div>
      <div className='featured-products'>
        <h2>Featured products</h2>
        <div className='featured-products-container'>
          {!isLoading &&
            products.length > 0 &&
            products.map((p, i) => <Item item={p} key={i} />)}
        </div>
      </div>
    </div>
  );
};

export default Home;
