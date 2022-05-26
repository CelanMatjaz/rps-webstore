import React, { useEffect, useState } from 'react';
import Item from './item';
import Pagination from './pagination';

interface Props {
  categoryId?: number;
  itemLimit?: number;
}

const maxItemsPerPage = 4;

export const FeaturedProductsContainer: React.FC<Props> = ({
  categoryId,
  itemLimit,
}) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [categoryId]);

  useEffect(() => {
    async function fetchProducts() {
      const params = {
        page: currentPage,
        page_size: itemLimit ?? maxItemsPerPage,
      };

      if (categoryId) params['categoryId'] = categoryId;

      const res = await fetch(
        '/api/items/all?' +
          Object.entries(params)
            .map(([key, val]) => `${key}=${val}`)
            .join('&')
      );
      const data = await res.json();
      setProducts(data.data);
      setIsLoading(false);
    }
    fetchProducts();
  }, [categoryId, itemLimit, currentPage]);

  const pagination = (
    <div className='pagination'>
      <Pagination
        pageNumber={currentPage}
        moveToPrevPage={() => {
          if (currentPage > 1) setCurrentPage((p) => p - 1);
        }}
        moveToNextPage={() => {
          if (products.length > 0 && products.length === itemLimit)
            setCurrentPage((p) => p + 1);
        }}
      />
    </div>
  );

  return (
    <div className='featured-products'>
      <h2>Featured products</h2>
      {pagination}
      <div className='featured-products-container'>
        {!isLoading &&
          products.length > 0 &&
          products.map((p, i) => <Item item={p} key={i} />)}
      </div>
      {pagination}
    </div>
  );
};

export default FeaturedProductsContainer;
