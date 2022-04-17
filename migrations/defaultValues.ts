import { sql } from 'slonik';
import path from 'path';

export const getDefaultComponents = (imgPath: string) => {
  const filename = path.basename(imgPath);
  const filepath = '/public/images/' + filename;

  return sql`
  INSERT INTO items (quantity, name, price, discount, description, img_path) 
  VALUES (1, ${filename}, 0, 0, ${filename}, ${filepath})`;
};
