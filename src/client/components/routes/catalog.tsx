import React from 'react';
import FeaturedProductsContainer from '../partials/featuredProductsContainer';

export const Catalog: React.FC = (props) => {
  return (
    <div>
      <div>
        <h1>Catalog</h1>
      </div>
      <div>
        <FeaturedProductsContainer />
      </div>
    </div>
  );
};

export default Catalog;
