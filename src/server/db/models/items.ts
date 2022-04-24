import { connection } from '../connection';
import { User, BaseItem, Item } from '../../../common/types';
import { QueryResultRow, sql } from 'slonik';

const TABLE_NAME = 'items';


export async function getAllItems():Promise<Item[]> { 
    const res = await connection.query(sql`SELECT * FROM items`);
    if (res.rows.length) {
        return res.rows.map(itemify);
    }
    return null;
}

function itemify(row: QueryResultRow): Item {
    const { 
        id, quantity, name, price, discount, description, img_path, created_at, modified_at
    } = row;
    return {id, quantity, name, price, discount, description, img_path, created_at, modified_at } as any
}