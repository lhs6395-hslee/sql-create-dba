import type { Problem } from '@/types/problem';

export const problem: Problem = {
  id: 'advanced-010', level: 'advanced', order: 10,
  title: { ko: 'ALTER TABLE: 테이블 구조 변경', en: 'ALTER TABLE: Modify Table Structure' },
  description: {
    ko: `\`products\` 테이블에 **할인율(discount_rate)** 컬럼을 추가하세요.\n\n### 요구사항\n1. 먼저 아래 \`ALTER TABLE\`문을 실행하세요:\n\`\`\`sql\nALTER TABLE products\nADD COLUMN IF NOT EXISTS discount_rate DECIMAL(5,2) DEFAULT 0.00;\n\`\`\`\n\n2. 그 다음, 변경된 테이블에서 할인 적용 가격을 계산하세요:\n\`\`\`sql\nSELECT name, price, discount_rate,\n  ROUND(price * (1 - discount_rate / 100), 2) AS discounted_price\nFROM products\nORDER BY price DESC\nLIMIT 10;\n\`\`\`\n\n> **채점**: 2번 SELECT 쿼리의 결과로 채점됩니다.`,
    en: `Add a **discount_rate** column to the \`products\` table.\n\n### Requirements\n1. First, run this \`ALTER TABLE\` statement:\n\`\`\`sql\nALTER TABLE products\nADD COLUMN IF NOT EXISTS discount_rate DECIMAL(5,2) DEFAULT 0.00;\n\`\`\`\n\n2. Then calculate discounted prices:\n\`\`\`sql\nSELECT name, price, discount_rate,\n  ROUND(price * (1 - discount_rate / 100), 2) AS discounted_price\nFROM products\nORDER BY price DESC\nLIMIT 10;\n\`\`\`\n\n> **Grading**: Based on the result of step 2's SELECT query.`,
  },
  schema: 'ecommerce', category: 'DDL', difficulty: 2,
  hints: {
    ko: ['ALTER TABLE ... ADD COLUMN 으로 컬럼을 추가합니다.', 'IF NOT EXISTS를 붙이면 이미 컬럼이 있어도 에러가 나지 않습니다.', "SELECT name, price, discount_rate, ROUND(price * (1 - discount_rate / 100), 2) AS discounted_price FROM products ORDER BY price DESC LIMIT 10;"],
    en: ['Use ALTER TABLE ... ADD COLUMN to add a column.', 'IF NOT EXISTS prevents errors if column already exists.', "SELECT name, price, discount_rate, ROUND(price * (1 - discount_rate / 100), 2) AS discounted_price FROM products ORDER BY price DESC LIMIT 10;"],
  },
  explanation: {
    ko: `## ALTER TABLE\n\n기존 테이블의 구조를 변경하는 DDL 명령어입니다.\n\n\`\`\`sql\n-- 컬럼 추가\nALTER TABLE products\nADD COLUMN IF NOT EXISTS discount_rate DECIMAL(5,2) DEFAULT 0.00;\n\n-- 변경 확인\nSELECT name, price, discount_rate,\n  ROUND(price * (1 - discount_rate / 100), 2) AS discounted_price\nFROM products\nORDER BY price DESC\nLIMIT 10;\n\`\`\`\n\n### ALTER TABLE 주요 기능\n- **ADD COLUMN**: 새 컬럼 추가\n- **DROP COLUMN**: 컬럼 삭제\n- **ALTER COLUMN**: 컬럼 타입/기본값 변경\n- **RENAME COLUMN**: 컬럼 이름 변경\n- **ADD CONSTRAINT**: 제약조건 추가\n\n### 주의사항\n- 운영 DB에서 ALTER TABLE은 **테이블 잠금**을 유발할 수 있음\n- 대용량 테이블에서는 신중하게 실행해야 함`,
    en: `## ALTER TABLE\n\nDDL command to modify existing table structure.\n\n\`\`\`sql\n-- Add column\nALTER TABLE products\nADD COLUMN IF NOT EXISTS discount_rate DECIMAL(5,2) DEFAULT 0.00;\n\n-- Verify\nSELECT name, price, discount_rate,\n  ROUND(price * (1 - discount_rate / 100), 2) AS discounted_price\nFROM products\nORDER BY price DESC\nLIMIT 10;\n\`\`\`\n\n### ALTER TABLE Operations\n- **ADD COLUMN**: Add new column\n- **DROP COLUMN**: Remove column\n- **ALTER COLUMN**: Change type/default\n- **RENAME COLUMN**: Rename column\n- **ADD CONSTRAINT**: Add constraint\n\n### Caution\n- ALTER TABLE can cause **table locks** in production\n- Execute carefully on large tables`,
  },
  expectedQuery: {
    postgresql: "SELECT name, price, discount_rate, ROUND(price * (1 - discount_rate / 100), 2) AS discounted_price FROM products ORDER BY price DESC LIMIT 10;",
    mysql: "SELECT name, price, discount_rate, ROUND(price * (1 - discount_rate / 100), 2) AS discounted_price FROM products ORDER BY price DESC LIMIT 10;",
  },
  gradingMode: 'exact', relatedConcepts: ['ALTER TABLE', 'ADD COLUMN', 'DDL', 'DEFAULT', 'DECIMAL'],
};
