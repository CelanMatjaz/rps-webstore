import { createPool, sql } from 'slonik';
import dotenv from 'dotenv';
import fs from 'fs';
import {
  createCartItems,
  createCarts,
  createCategories,
  createItems,
  createOrderItems,
  createOrders,
  createSessions,
  createUsers,
  dropTables,
} from './queries';
import { getDefaultComponents, categoryNames } from './defaultValues';
import { genSalt, hash } from 'bcrypt';

const saltRounds = 10;

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

  console.log('Creating table categories');
  await connection.query(createCategories);

  console.log('Creating table items');
  await connection.query(createItems);

  console.log('Creating table orders');
  await connection.query(createOrders);

  console.log('Creating table order_items');
  await connection.query(createOrderItems);

  console.log('Creating table carts');
  await connection.query(createCarts);

  console.log('Creating table cart_items');
  await connection.query(createCartItems);

  console.log('Creating session');
  for (const q of createSessions) {
    await connection.query(q);
  }

  if (addDefaults) {
    console.log('Creating default categories');
    await connection.query(categoryNames);

    console.log('Creating default items');
    const files = fs.readdirSync('./public/images');
    for (const file of files) {
      const randomCategoryId = Math.floor((Math.random() * 10) % 6) + 1;

      await connection.query(getDefaultComponents(file, randomCategoryId));
    }

    const salt = await genSalt(saltRounds);

    console.log('Creating default user (username: 1234, password: 1234)');
    connection.query(sql`
     INSERT INTO users (username, name, last_name, password, mail)
        VALUES (${sql.join(
          ['1234', 'name', 'last name', await hash('1234', salt), 'mail'],
          sql`, `
        )}) RETURNING id;
    `);
  }

  await connection.end();
}
try {
  migrate();
} catch (e) {
  console.log(e);
}
