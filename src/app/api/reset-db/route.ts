import { NextRequest, NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';
import { resetPostgresDatabase } from '@/lib/db/postgres-engine';
import { resetMysqlDatabase } from '@/lib/db/mysql-engine';
import type { DbEngine } from '@/types/problem';

// Cache init SQL content to avoid repeated file reads
let pgInitSql: string | null = null;
let mysqlInitSql: string | null = null;

function getInitSql(engine: DbEngine): string {
  if (engine === 'postgresql') {
    if (!pgInitSql) {
      pgInitSql = readFileSync(join(process.cwd(), 'docker/postgres/init.sql'), 'utf-8');
    }
    return pgInitSql;
  } else {
    if (!mysqlInitSql) {
      mysqlInitSql = readFileSync(join(process.cwd(), 'docker/mysql/init.sql'), 'utf-8');
    }
    return mysqlInitSql;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { engine } = body as { engine: DbEngine };

    if (!engine) {
      return NextResponse.json(
        { error: 'Missing required field: engine' },
        { status: 400 }
      );
    }

    const initSql = getInitSql(engine);

    if (engine === 'postgresql') {
      await resetPostgresDatabase(initSql);
    } else {
      await resetMysqlDatabase(initSql);
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
