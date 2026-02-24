import type { Problem } from '@/types/problem';

export const problem: Problem = {
  id: 'intermediate-007', level: 'intermediate', order: 7,
  title: { ko: 'INSERT로 새 고객 추가하기', en: 'Insert a New Customer' },
  description: {
    ko: `\`customers\` 테이블에 **새로운 고객**을 추가하세요.\n\n### 추가할 데이터\n| 컬럼 | 값 |\n|------|----|\n| name | Test User |\n| email | test@email.com |\n| city | Seoul |\n| country | South Korea |\n| signup_date | 2025-01-01 |\n| is_premium | false |\n\n> **참고**: INSERT 문은 데이터를 실제로 추가합니다. 실행 후 affected rows가 1이면 성공입니다.`,
    en: `Add a **new customer** to the \`customers\` table.\n\n### Data to Insert\n| Column | Value |\n|--------|-------|\n| name | Test User |\n| email | test@email.com |\n| city | Seoul |\n| country | South Korea |\n| signup_date | 2025-01-01 |\n| is_premium | false |\n\n> **Note**: INSERT modifies data. If affected rows = 1, it's successful.`,
  },
  schema: 'ecommerce', category: 'DML', difficulty: 1,
  hints: {
    ko: ['INSERT INTO 테이블 (컬럼들) VALUES (값들) 구문을 사용합니다.', '문자열은 작은따옴표로 감싸세요.', "INSERT INTO customers (name, email, city, country, signup_date, is_premium) VALUES ('Test User', 'test@email.com', 'Seoul', 'South Korea', '2025-01-01', false);"],
    en: ['Use INSERT INTO table (columns) VALUES (values) syntax.', 'Strings must be wrapped in single quotes.', "INSERT INTO customers (name, email, city, country, signup_date, is_premium) VALUES ('Test User', 'test@email.com', 'Seoul', 'South Korea', '2025-01-01', false);"],
  },
  explanation: {
    ko: `## INSERT INTO\n\n테이블에 새 행을 추가하는 DML 명령어입니다.\n\n\`\`\`sql\nINSERT INTO customers (name, email, city, country, signup_date, is_premium)\nVALUES ('Test User', 'test@email.com', 'Seoul', 'South Korea', '2025-01-01', false);\n\`\`\`\n\n### 주의사항\n- 컬럼 순서와 VALUES 순서가 일치해야 합니다\n- NOT NULL 컬럼은 반드시 값을 지정해야 합니다\n- UNIQUE 제약조건이 있는 컬럼(email)에 중복 값을 넣으면 오류가 발생합니다`,
    en: `## INSERT INTO\n\nDML command to add new rows to a table.\n\n\`\`\`sql\nINSERT INTO customers (name, email, city, country, signup_date, is_premium)\nVALUES ('Test User', 'test@email.com', 'Seoul', 'South Korea', '2025-01-01', false);\n\`\`\`\n\n### Notes\n- Column order must match VALUES order\n- NOT NULL columns must have values\n- Duplicate values in UNIQUE columns (email) cause errors`,
  },
  expectedQuery: {
    postgresql: "INSERT INTO customers (name, email, city, country, signup_date, is_premium) VALUES ('Test User', 'test@email.com', 'Seoul', 'South Korea', '2025-01-01', false);",
    mysql: "INSERT INTO customers (name, email, city, country, signup_date, is_premium) VALUES ('Test User', 'test@email.com', 'Seoul', 'South Korea', '2025-01-01', false);",
  },
  gradingMode: 'contains', relatedConcepts: ['INSERT INTO', 'VALUES', 'DML'],
};
