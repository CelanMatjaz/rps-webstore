import React from 'react';
import ProductsContainer from '../partials/productsContainer';

export const Home: React.FC = () => {
  return (
    <div>
      <ProductsContainer itemLimit={9} />
    </div>
  );
};

export default Home;
