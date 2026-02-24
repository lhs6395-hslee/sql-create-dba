import type { Problem } from '@/types/problem';

export const problem: Problem = {
  id: 'expert-005', level: 'expert', order: 5,
  title: { ko: 'UPSERT: 충돌 시 업데이트', en: 'UPSERT: Insert or Update on Conflict' },
  description: {
    ko: `**UPSERT** (INSERT ... ON CONFLICT)를 사용하여, 고객이 이미 존재하면 도시를 업데이트하고, 없으면 새로 추가하세요.\n\n### 요구사항\n아래 쿼리를 실행하세요:\n\`\`\`sql\nINSERT INTO customers (name, email, city, country, signup_date, is_premium)\nVALUES ('Kim Cheolsu', 'cheolsu@email.com', 'Busan', 'South Korea', '2025-01-01', true)\nON CONFLICT (email)\nDO UPDATE SET city = EXCLUDED.city, signup_date = EXCLUDED.signup_date\nRETURNING *;\n\`\`\`\n\n> **참고**: \`cheolsu@email.com\`은 이미 존재하는 이메일입니다. ON CONFLICT로 도시가 Seoul에서 Busan으로 업데이트됩니다.\n> RETURNING *은 변경된 행을 반환합니다.`,
    en: `Use **UPSERT** (INSERT ... ON CONFLICT) to update city if customer exists, or insert if not.\n\n### Requirements\nRun this query:\n\`\`\`sql\nINSERT INTO customers (name, email, city, country, signup_date, is_premium)\nVALUES ('Kim Cheolsu', 'cheolsu@email.com', 'Busan', 'South Korea', '2025-01-01', true)\nON CONFLICT (email)\nDO UPDATE SET city = EXCLUDED.city, signup_date = EXCLUDED.signup_date\nRETURNING *;\n\`\`\`\n\n> **Note**: \`cheolsu@email.com\` already exists. ON CONFLICT updates city from Seoul to Busan.\n> RETURNING * shows the modified row.`,
  },
  schema: 'ecommerce', category: 'DML', difficulty: 2,
  hints: {
    ko: ['ON CONFLICT (컬럼)로 충돌 대상을 지정합니다.', 'EXCLUDED는 INSERT하려던 새 값을 참조합니다.', "INSERT INTO customers (name, email, city, country, signup_date, is_premium) VALUES ('Kim Cheolsu', 'cheolsu@email.com', 'Busan', 'South Korea', '2025-01-01', true) ON CONFLICT (email) DO UPDATE SET city = EXCLUDED.city, signup_date = EXCLUDED.signup_date RETURNING *;"],
    en: ['ON CONFLICT (column) specifies the conflict target.', 'EXCLUDED references the new values from INSERT.', "INSERT INTO customers (name, email, city, country, signup_date, is_premium) VALUES ('Kim Cheolsu', 'cheolsu@email.com', 'Busan', 'South Korea', '2025-01-01', true) ON CONFLICT (email) DO UPDATE SET city = EXCLUDED.city, signup_date = EXCLUDED.signup_date RETURNING *;"],
  },
  explanation: {
    ko: `## UPSERT (INSERT ON CONFLICT)\n\nPostgreSQL의 \`INSERT ... ON CONFLICT\`는 충돌 시 동작을 정의합니다.\n\n\`\`\`sql\nINSERT INTO customers (...)\nVALUES (...)\nON CONFLICT (email)\nDO UPDATE SET city = EXCLUDED.city;\n\`\`\`\n\n### 키워드\n- **ON CONFLICT (컬럼)**: UNIQUE 제약조건이 있는 컬럼 지정\n- **DO UPDATE SET**: 충돌 시 업데이트할 컬럼 지정\n- **DO NOTHING**: 충돌 시 아무것도 하지 않음\n- **EXCLUDED**: INSERT하려던 새 값을 참조\n- **RETURNING**: 변경된 행을 반환\n\n### MySQL 대응\n\`\`\`sql\nINSERT INTO customers (...) VALUES (...)\nON DUPLICATE KEY UPDATE city = VALUES(city);\n\`\`\``,
    en: `## UPSERT (INSERT ON CONFLICT)\n\nPostgreSQL's \`INSERT ... ON CONFLICT\` defines behavior on conflicts.\n\n\`\`\`sql\nINSERT INTO customers (...)\nVALUES (...)\nON CONFLICT (email)\nDO UPDATE SET city = EXCLUDED.city;\n\`\`\`\n\n### Keywords\n- **ON CONFLICT (col)**: Column with UNIQUE constraint\n- **DO UPDATE SET**: Columns to update on conflict\n- **DO NOTHING**: Ignore the conflict\n- **EXCLUDED**: References the attempted INSERT values\n- **RETURNING**: Returns the modified row\n\n### MySQL Equivalent\n\`\`\`sql\nINSERT INTO customers (...) VALUES (...)\nON DUPLICATE KEY UPDATE city = VALUES(city);\n\`\`\``,
  },
  expectedQuery: {
    postgresql: "INSERT INTO customers (name, email, city, country, signup_date, is_premium) VALUES ('Kim Cheolsu', 'cheolsu@email.com', 'Busan', 'South Korea', '2025-01-01', true) ON CONFLICT (email) DO UPDATE SET city = EXCLUDED.city, signup_date = EXCLUDED.signup_date RETURNING *;",
    mysql: "INSERT INTO customers (name, email, city, country, signup_date, is_premium) VALUES ('Kim Cheolsu', 'cheolsu@email.com', 'Busan', 'South Korea', '2025-01-01', true) ON DUPLICATE KEY UPDATE city = VALUES(city), signup_date = VALUES(signup_date);",
  },
  gradingMode: 'contains', relatedConcepts: ['INSERT ON CONFLICT', 'UPSERT', 'EXCLUDED', 'RETURNING', 'DO UPDATE'],
};
