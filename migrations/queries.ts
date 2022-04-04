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
  created_at timestamp without time zone NOT NULL DEFAULT now(),
  name character varying(255) NOT NULL,
  last_modified timestamp(6) without time zone NULL,
  username character varying(255) NOT NULL,
  password character varying(255) NOT NULL,
  last_name character varying(255) NULL,
  mail character varying(255) NULL
);`;

export const createItems = sql`
CREATE TABLE items (
  id serial NOT NULL UNIQUE,
  time_created timestamp(6) without time zone NOT NULL DEFAULT now(),
  last_modified timestamp(6) without time zone NOT NULL DEFAULT now(),
  quantity smallint NOT NULL,
  name character varying(255) NOT NULL,
  price real NOT NULL,
  discount smallint NULL,
  description text NULL
);`;

export const createCarts = sql`
CREATE TABLE carts (
  id serial NOT NULL UNIQUE,
  time_created timestamp(6) without time zone NOT NULL DEFAULT now(),
  last_modified timestamp(6) without time zone NULL,
  name character varying(255) NULL
);`;

export const createCartItems = sql`
CREATE TABLE cart_items (
  id serial NOT NULL UNIQUE,
  cart_id integer NOT NULL REFERENCES carts(id),
  item_id integer NOT NULL REFERENCES items(id),
  time_created timestamp(6) without time zone NULL DEFAULT now()
);`;
