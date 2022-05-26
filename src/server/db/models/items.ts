import { connection } from '../connection';
import { Item } from '../../../common/types';
import { QueryResult, sql } from 'slonik';

const TABLE_NAME = 'items';

export async function getAllItems(
  offset?: number,
  limit?: number
): Promise<Item[]> {
  let res: QueryResult<Item>;
  const exist = (value: any) => !(value === undefined || value === null);
  if (exist(offset) && exist(limit)) {
    if (offset === 0) {
      offset++;
    }
    offset = (offset - 1) * limit;
    res = await connection.query<Item>(
      sql`SELECT id, quantity, name, price, discount, description, img_path, created_at, modified_at FROM items OFFSET ${offset} LIMIT ${limit}`
    );
  } else {
    res = await connection.query<Item>(
      sql`SELECT id, quantity, name, price, discount, description, img_path, created_at, modified_at FROM items`
    );
  }
  return (res.rows ?? []) as Item[];
}

export async function getAllItemsByCategory(
  categoryId: number,
  offset?: number,
  limit?: number
): Promise<Item[]> {
  let res: QueryResult<Item>;
  const exist = (value: any) => !(value === undefined || value === null);
  if (exist(offset) && exist(limit)) {
    if (offset === 0) {
      offset++;
    }
    offset = (offset - 1) * limit;

    res = await connection.query<Item>(
      sql`SELECT id, quantity, name, price, discount, description, img_path, created_at, modified_at FROM items WHERE category_id = ${categoryId} OFFSET ${offset} LIMIT ${limit} `
    );
  } else {
    res = await connection.query<Item>(
      sql`SELECT id, quantity, name, price, discount, description, img_path, created_at, modified_at FROM items WHERE category_id = ${categoryId}`
    );
  }
  return (res.rows ?? []) as Item[];
}

export const getItemById = async (id: string) => {
  return await connection.maybeOne<Item>(
    sql`SELECT id, quantity, name, price, discount, description, img_path, created_at, modified_at FROM items WHERE id = ${id}`
  );
};

export const getItemsByIds = async (ids: number[]) => {
  return (
    await connection.query<Item>(
      sql`SELECT id, category_id, quantity, name, price, discount, description, img_path, created_at, modified_at FROM items WHERE id IN (${sql.join(
        ids,
        sql`,`
      )})`
    )
  ).rows;
};
