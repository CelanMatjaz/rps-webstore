import { connection } from '../connection';
import { QueryResult, sql } from 'slonik';

export const getOrderItemsFromOrder = async (
  orderId: number,
  userId: number
) => {
  return await (
    await connection.query(
      sql`
        SELECT oi.id, order_id, oi.name, category_id, c.name as category, quantity, price, img_path, oi.created_at, oi.modified_at 
        FROM order_items oi
        LEFT JOIN orders o ON o.id = oi.order_id
        LEFT JOIN categories c ON c.id = oi.category_id
        WHERE o.user_id = ${userId}
        AND o.id = ${orderId}
        `
    )
  ).rows;
};

interface InsertOrderItem {
  order_id: number;
  category_id: number;
  name: string;
  quantity: number;
  price: number;
  img_path: string;
}

export const insertOrderItem = async (item: InsertOrderItem) => {
  try {
    const { order_id, category_id, name, quantity, price, img_path } = item;
    await connection.query(sql`
      INSERT INTO order_items (order_id, category_id, name, quantity, price, img_path)
      VALUES (${order_id}, ${category_id}, ${name}, ${quantity}, ${price}, ${img_path})
    `);

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
