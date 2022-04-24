import { connection } from '../connection';
import { Item } from '../../../common/types';
import { sql } from 'slonik';

const TABLE_NAME = 'items';

export async function getAllItems():Promise<Item[]> {
    const res = await connection.query<Item>(sql`SELECT id, quantity, name, price, discount, description, img_path, created_at, modified_at FROM items`)
    return (res.rows ?? []) as Item[];
}

export async function getItemById(id: string) {
    const res = await connection.maybeOne<Item>(sql`SELECT id, quantity, name, price, discount, description, img_path, created_at, modified_at FROM items WHERE id = ${id}`);
    return res;
} 