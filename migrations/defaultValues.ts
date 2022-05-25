import { sql } from 'slonik';
import path from 'path';

export const getDefaultComponents = (imgPath: string, categoryId: number) => {
  const filename = path.basename(imgPath);
  const filepath = '/public/images/' + filename;

  return sql`
  INSERT INTO items (quantity, name, price, discount, description, img_path, category_id) 
  VALUES (1, ${filename}, 0, 0, ${filename}, ${filepath}, ${categoryId})`;
};

export const categoryNames = sql`INSERT INTO categories (name) VALUES ('CPU'), ('Motherboard'), ('PSU'), ('GPU'), ('Case'), ('RAM')`;
