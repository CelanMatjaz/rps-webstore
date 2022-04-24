import { connection } from '../connection';
import { Item } from '../../../common/types';
import { sql } from 'slonik';

const TABLE_NAME = 'items';

export async function getAllItems():Promise<Item[]> {
    const res = await connection.query<Item>(sql`SELECT id, quantity, name, price, discount, description, img_path, created_at, modified_at FROM ${TABLE_NAME}`)
    return (res.rows ?? []) as Item[];
}