import { connection } from '../connection';
import { User, BaseItem } from '../../../common/types';
import { QueryResultRow, sql } from 'slonik';
import { genSalt, hash, compare } from 'bcrypt';

// bcrypt
const saltRounds = 10;
const TABLE_NAME = 'users';

interface QueryCreate extends Omit<User, keyof BaseItem> {
  password: string;
}
export async function create({
  name,
  username,
  password,
  last_name,
  mail,
}: QueryCreate): Promise<User> {
  const salt = await genSalt(saltRounds);
  const hashed = await hash(password, salt);

  const res = await connection.query(sql`
        INSERT INTO users (username, name, last_name, password, mail)
        VALUES (${sql.join(
          [username, name, last_name, hashed, mail],
          sql`, `
        )}) RETURNING id;
    `);
  const id = res.rows[0].id as number;

  const user = await getUserById(id);
  return user;
}

export async function comparePasswords(hashed: string, password: string) {
  return compare(password, hashed);
}

interface UserWithPassword extends User {
  password: string;
}
export async function findUserByUsernameWithPassword(
  username: string
): Promise<UserWithPassword> {
  const res = await connection.query(
    sql`SELECT * FROM users WHERE username = ${username}`
  );
  if (res.rows.length) {
    const row = res.rows[0];
    return { ...usererify(row), password: row.password } as any;
  }
  return null;
}

export const getUserById = async (id: number): Promise<User> => {
  const res = await connection.query(sql`SELECT * FROM users WHERE id = ${id}`);
  if (res.rows.length) {
    return usererify(res.rows[0]);
  }
  return null;
};

function usererify(row: QueryResultRow): User {
  const { id, last_name, mail, name, username, created_at, modified_at } = row;
  return {
    id,
    last_name,
    mail,
    name,
    username,
    created_at,
    modified_at,
  } as any;
}
