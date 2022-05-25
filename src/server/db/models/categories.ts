import { connection } from '../connection';
import { Category } from '../../../common/types';
import { sql } from 'slonik';

export async function getAllCategories() {
  try {
    return await (
      await connection.query<Category>(sql`SELECT id, name FROM categories`)
    ).rows;
  } catch {
    return [];
  }
}
