import { sql } from 'slonik';
import { connection } from '../connection';

export const getOrdersFromUser = async (userId: number) => {
  try {
    return (
      await connection.query(
        sql`SELECT id, user_id, created_at, modified_at FROM orders WHERE user_id = ${userId} ORDER BY created_at DESC`
      )
    ).rows;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const getOrderFromUser = async (orderId: number, userId: number) => {
  try {
    return (
      await connection.maybeOne(
        sql`SELECT id, user_id, created_at, modified_at FROM orders WHERE user_id = ${userId} AND id = ${orderId}`
      )
    ).rows;
  } catch (e) {
    console.log(e);
    return [];
  }
};

interface NewOrderType {
  user_id: number;
  payment_info: string;
  address: string;
}

export const insertOrder = async (
  order: NewOrderType
): Promise<number | null> => {
  try {
    const { address, payment_info, user_id } = order;

    const { id } = (
      await connection.query<{ id: number }>(
        sql`INSERT INTO orders (address, payment_info, user_id) VALUES (${address}, ${payment_info}, ${user_id}) RETURNING id`
      )
    ).rows[0];
    return id;
  } catch (e) {
    console.log(e);
    return null;
  }
};
