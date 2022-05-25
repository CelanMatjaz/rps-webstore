import React, { useState } from 'react';
import Categories from '../partials/categories';
import FeaturedProductsContainer from '../partials/featuredProductsContainer';

export const Catalog: React.FC = (props) => {
  const [category, setCategory] = useState(null);

  return (
    <div>
      <div>
        <h1>Catalog</h1>
      </div>
      <div className='catalog-container'>
        <div className='category-container'>
          <Categories setCategory={setCategory} categoryId={category} />
        </div>
        <div className='products-container'>
          <FeaturedProductsContainer categoryId={category} />
        </div>
      </div>
    </div>
  );
};

export default Catalog;
