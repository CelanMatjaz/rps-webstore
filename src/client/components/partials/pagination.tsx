import React from 'react';

interface Props {
  pageNumber: number;
  moveToPrevPage?: () => void;
  moveToNextPage?: () => void;
}

export const Pagination: React.FC<Props> = ({
  pageNumber,
  moveToNextPage,
  moveToPrevPage,
}) => {
  return (
    <div className='pagination-container'>
      <div
        className='pagination-container-button'
        onClick={() => {
          if (moveToPrevPage) moveToPrevPage();
        }}
      >
        {'<-'}
      </div>
      <div>{pageNumber}</div>
      <div
        className='pagination-container-button'
        onClick={() => {
          if (moveToNextPage) moveToNextPage();
        }}
      >
        {'->'}
      </div>
    </div>
  );
};

export default Pagination;
