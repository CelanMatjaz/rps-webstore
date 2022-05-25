import React, { useEffect, useState } from 'react';
import { Category } from '../../../common/types';

interface Props {
  categoryId?: number;
  setCategory: (id?: number) => void;
}

export const Categories: React.FC<Props> = ({ setCategory, categoryId }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data.data);
      setIsLoading(false);
    }
    fetchCategories();
  }, []);

  return (
    <div>
      <h3>Categories</h3>
      <ul>
        <li
          onClick={() => setCategory()}
          className={categoryId === null ? 'active-category' : ''}
        >
          <div className='category'>All categories</div>
        </li>
        {categories.map((c, i) => (
          <li
            key={i}
            onClick={() => setCategory(c.id)}
            className={categoryId === c.id ? 'active-category' : ''}
          >
            <div className='category'>{c.name}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
