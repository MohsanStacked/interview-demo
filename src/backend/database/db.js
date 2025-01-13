import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Pool } = pkg;
const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_URL,
  database: process.env.DATABASE,
  password: process.env.DATABASE_PASS,
  port: process.env.DATABASE_PORT,
});

console.log(
  'Connected to PostgreSQL database',
  `user: ${process.env.DATABASE_USER},
  host: ${process.env.DATABASE_URL},
  database: ${process.env.DATABASE},
  password: ${process.env.DATABASE_PASS},
  port: ${process.env.DATABASE_PORT},`
);

export default pool;
