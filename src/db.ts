import { Pool } from 'pg';

const pool = new Pool({
  user: 'superuser',
  host: 'db',
  database: 'inventory_db',
  password: '123',
  port: 5432,
});

export default pool;
