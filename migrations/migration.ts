import { createPool, sql } from 'slonik';
import dotenv from 'dotenv';
import fs from 'fs';
import {
  createCartItems,
  createCarts,
  createItems,
  createSessions,
  createUsers,
  dropTables,
} from './queries';
import { getDefaultComponents } from './defaultValues';

dotenv.config();

let addDefaults = false;
const flag = process.argv[2];
if (flag === 'defaults') addDefaults = true;

async function migrate() {
  if (!process.env.DB) {
    console.log('connection string doesnt exist');
    return;
  }

  const connection = createPool(process.env.DB);

  await connection.query(dropTables);

  console.log('Creating table users');
  await connection.query(createUsers);

  console.log('Creating table items');
  await connection.query(createItems);

  console.log('Creating table carts');
  await connection.query(createCarts);

  console.log('Creating table cart_items');
  await connection.query(createCartItems);

  console.log('Creating session');
  for (const q of createSessions) {
    await connection.query(q);
  }

  if (addDefaults) {
    console.log('Creating default items');
    const files = fs.readdirSync('./public/images');
    for (const file of files) {
      await connection.query(getDefaultComponents(file));
    }
  }

  await connection.end();
}
try {
  migrate();
} catch (e) {
  console.log(e);
}
