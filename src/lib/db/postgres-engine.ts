import { Pool } from 'pg';

let pool: Pool | null = null;

function getPool(): Pool {
  if (!pool) {
    pool = new Pool({
      host: process.env.PG_HOST || 'localhost',
      port: parseInt(process.env.PG_PORT || '5432'),
      database: process.env.PG_DATABASE || 'sql_practice',
      user: process.env.PG_USER || 'sql_student',
      password: process.env.PG_PASSWORD || 'practice123',
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });
  }
  return pool;
}

const DML_PATTERN = /^\s*(INSERT|UPDATE|DELETE)\b/i;
const DDL_PATTERN = /^\s*(CREATE|ALTER|DROP|TRUNCATE)\b/i;

export async function executePostgresQuery(sql: string): Promise<{
  columns: string[];
  rows: (string | number | boolean | null)[][];
  rowCount: number;
  executionTime: number;
}> {
  const client = await getPool().connect();
  try {
    await client.query('SET statement_timeout = 5000');

    const isDML = DML_PATTERN.test(sql);
    const isDDL = DDL_PATTERN.test(sql);

    if (isDML) {
      // DML: wrap in transaction and ROLLBACK to prevent permanent changes
      await client.query('BEGIN');
      try {
        const startTime = Date.now();
        const result = await client.query(sql);
        const executionTime = Date.now() - startTime;
        const affectedRows = result.rowCount ?? 0;

        // ROLLBACK to undo the DML changes
        await client.query('ROLLBACK');

        return {
          columns: ['affectedRows'],
          rows: [[affectedRows]],
          rowCount: affectedRows,
          executionTime,
        };
      } catch (error) {
        await client.query('ROLLBACK');
        throw error;
      }
    }

    if (isDDL) {
      // DDL: wrap in transaction and ROLLBACK to prevent permanent schema changes
      await client.query('BEGIN');
      try {
        const startTime = Date.now();
        const result = await client.query(sql);
        const executionTime = Date.now() - startTime;

        await client.query('ROLLBACK');

        const columns = result.fields?.map((f) => f.name) || [];
        const rows = result.rows?.map((row) => columns.map((col) => row[col])) || [];

        return {
          columns: columns.length > 0 ? columns : ['result'],
          rows: rows.length > 0 ? rows : [['OK']],
          rowCount: result.rowCount ?? rows.length,
          executionTime,
        };
      } catch (error) {
        await client.query('ROLLBACK');
        throw error;
      }
    }

    // SELECT and other read queries: execute directly
    const startTime = Date.now();
    const result = await client.query(sql);
    const executionTime = Date.now() - startTime;

    const columns = result.fields?.map((f) => f.name) || [];
    const rows = result.rows?.map((row) => columns.map((col) => row[col])) || [];

    return {
      columns,
      rows,
      rowCount: result.rowCount ?? rows.length,
      executionTime,
    };
  } finally {
    client.release();
  }
}

export async function testPostgresConnection(): Promise<boolean> {
  try {
    const client = await getPool().connect();
    await client.query('SELECT 1');
    client.release();
    return true;
  } catch {
    return false;
  }
}
