import React from 'react';

interface Props {
  error: string;
}

export const Error: React.FC<Props> = ({ error }) => {
  return <div className='error'>{error}</div>;
};

export default Error;
