import { sql } from 'slonik';

export const dropTables = sql`
  DROP TABLE IF EXISTS cart_items;
  DROP TABLE IF EXISTS users;
  DROP TABLE IF EXISTS items;
  DROP TABLE IF EXISTS carts;
  `;

export const createUsers = sql`
CREATE TABLE users (
  id serial NOT NULL UNIQUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  modified_at TIMESTAMP NULL DEFAULT NOW(),
  name VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NULL,
  mail VARCHAR(255) NULL
);`;

export const createItems = sql`
CREATE TABLE items (
  id serial NOT NULL UNIQUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  modified_at TIMESTAMP NULL DEFAULT NOW(),
  quantity SMALLINT NOT NULL,
  name VARCHAR(255) NOT NULL,
  price REAL NOT NULL,
  discount INT NULL,
  description TEXT NULL
);`;

export const createCarts = sql`
CREATE TABLE carts (
  id SERIAL NOT NULL UNIQUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  modified_at TIMESTAMP NULL DEFAULT NOW(),
  name VARCHAR(255) NULL
);`;

export const createCartItems = sql`
CREATE TABLE cart_items (
  id SERIAL NOT NULL UNIQUE,
  cart_id INT NOT NULL REFERENCES carts(id),
  item_id INT NOT NULL REFERENCES items(id),
  quantity SMALLINT NOT NULL
);`;
