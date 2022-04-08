import React from 'react';

export const Home: React.FC = () => {
  return (
    <div>
      <div className='featured-products'>
        <h2>Featured products</h2>
        <div className='featured-products-container'>
          <div className='featured-product'></div>
          <div className='featured-product'></div>
          <div className='featured-product'></div>
          <div className='featured-product'></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
