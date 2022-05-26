import React, { useState } from 'react';
import Categories from '../partials/categories';
import ProductsContainer from '../partials/productsContainer';

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
          <ProductsContainer categoryId={category} itemLimit={4} />
        </div>
      </div>
    </div>
  );
};

export default Catalog;
