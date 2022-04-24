import { createPool } from 'slonik';

export const connection = createPool(process.env.DB);