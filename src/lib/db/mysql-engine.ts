import mysql from 'mysql2/promise';

let pool: mysql.Pool | null = null;

function getPool(): mysql.Pool {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.MYSQL_HOST || 'localhost',
      port: parseInt(process.env.MYSQL_PORT || '3306'),
      database: process.env.MYSQL_DATABASE || 'sql_practice',
      user: process.env.MYSQL_USER || 'sql_student',
      password: process.env.MYSQL_PASSWORD || 'practice123',
      waitForConnections: true,
      connectionLimit: 20,
      queueLimit: 0,
      connectTimeout: 5000,
    });
  }
  return pool;
}

const DML_PATTERN = /^\s*(INSERT|UPDATE|DELETE)\b/i;
const DDL_PATTERN = /^\s*(CREATE|ALTER|DROP|TRUNCATE)\b/i;

export async function executeMysqlQuery(sql: string): Promise<{
  columns: string[];
  rows: (string | number | boolean | null)[][];
  rowCount: number;
  executionTime: number;
}> {
  const connection = await getPool().getConnection();
  try {
    await connection.query('SET max_execution_time = 5000');

    const isDML = DML_PATTERN.test(sql);
    const isDDL = DDL_PATTERN.test(sql);

    if (isDML) {
      // DML: wrap in transaction and ROLLBACK to prevent permanent changes
      await connection.beginTransaction();
      try {
        const startTime = Date.now();
        const [results] = await connection.query(sql);
        const executionTime = Date.now() - startTime;
        const resultHeader = results as mysql.ResultSetHeader;
        const affectedRows = resultHeader.affectedRows ?? 0;

        await connection.rollback();

        return {
          columns: ['affectedRows'],
          rows: [[affectedRows]],
          rowCount: affectedRows,
          executionTime,
        };
      } catch (error) {
        await connection.rollback();
        throw error;
      }
    }

    if (isDDL) {
      // DDL: MySQL DDL causes implicit commit, so we just execute and report
      // Note: MySQL DDL auto-commits, cannot be rolled back in a transaction
      const startTime = Date.now();
      const [results, fields] = await connection.query(sql);
      const executionTime = Date.now() - startTime;

      if (Array.isArray(fields) && fields.length > 0) {
        const columns = fields.map((f) => f.name);
        const rows = (results as Record<string, unknown>[]).map((row) =>
          columns.map((col) => {
            const val = row[col];
            if (val === undefined || val === null) return null;
            if (typeof val === 'bigint') return Number(val);
            if (val instanceof Date) return val.toISOString();
            return val as string | number | boolean;
          })
        );
        return { columns, rows, rowCount: rows.length, executionTime };
      }

      return {
        columns: ['result'],
        rows: [['OK']],
        rowCount: 0,
        executionTime,
      };
    }

    // SELECT and other read queries
    const startTime = Date.now();
    const [results, fields] = await connection.query(sql);
    const executionTime = Date.now() - startTime;

    if (Array.isArray(fields) && fields.length > 0) {
      const columns = fields.map((f) => f.name);
      const rows = (results as Record<string, unknown>[]).map((row) =>
        columns.map((col) => {
          const val = row[col];
          if (val === undefined || val === null) return null;
          if (typeof val === 'bigint') return Number(val);
          if (val instanceof Date) return val.toISOString();
          return val as string | number | boolean;
        })
      );

      return {
        columns,
        rows,
        rowCount: rows.length,
        executionTime,
      };
    }

    const resultHeader = results as mysql.ResultSetHeader;
    return {
      columns: ['affectedRows', 'insertId'],
      rows: [[resultHeader.affectedRows, resultHeader.insertId]],
      rowCount: resultHeader.affectedRows,
      executionTime,
    };
  } finally {
    connection.release();
  }
}

export async function testMysqlConnection(): Promise<boolean> {
  try {
    const connection = await getPool().getConnection();
    await connection.query('SELECT 1');
    connection.release();
    return true;
  } catch {
    return false;
  }
}
