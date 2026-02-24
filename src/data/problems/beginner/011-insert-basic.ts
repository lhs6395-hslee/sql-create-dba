import type { Problem } from '@/types/problem';

export const problem: Problem = {
  id: 'beginner-011', level: 'beginner', order: 11,
  title: { ko: 'INSERT: 새 카테고리 추가', en: 'INSERT: Add a New Category' },
  description: {
    ko: `\`categories\` 테이블에 **새 카테고리**를 추가하세요.\n\n### 추가할 데이터\n| 컬럼 | 값 |\n|------|----|\n| id | 100 |\n| name | Travel |\n| parent_id | NULL |\n\n### INSERT 기본 구문\n\`\`\`sql\nINSERT INTO 테이블 (컬럼1, 컬럼2, ...)\nVALUES (값1, 값2, ...);\n\`\`\`\n\n> **참고**: 실행 결과에 "1 row affected"가 표시되면 성공입니다.`,
    en: `Add a **new category** to the \`categories\` table.\n\n### Data to Insert\n| Column | Value |\n|--------|-------|\n| id | 100 |\n| name | Travel |\n| parent_id | NULL |\n\n### INSERT Basic Syntax\n\`\`\`sql\nINSERT INTO table (col1, col2, ...)\nVALUES (val1, val2, ...);\n\`\`\`\n\n> **Note**: If the result shows "1 row affected", it was successful.`,
  },
  schema: 'ecommerce', category: 'DML', difficulty: 1,
  hints: {
    ko: ['INSERT INTO categories (id, name, parent_id) VALUES (...) 구문을 사용하세요.', '문자열은 작은따옴표로 감싸고, NULL은 따옴표 없이 씁니다.', "INSERT INTO categories (id, name, parent_id) VALUES (100, 'Travel', NULL);"],
    en: ['Use INSERT INTO categories (id, name, parent_id) VALUES (...).', 'Strings use single quotes, NULL has no quotes.', "INSERT INTO categories (id, name, parent_id) VALUES (100, 'Travel', NULL);"],
  },
  explanation: {
    ko: `## INSERT INTO\n\n테이블에 새로운 행을 추가하는 명령어입니다.\n\n\`\`\`sql\nINSERT INTO categories (id, name, parent_id)\nVALUES (100, 'Travel', NULL);\n\`\`\`\n\n### 핵심 포인트\n- **컬럼 목록**: 값을 넣을 컬럼을 지정\n- **VALUES**: 각 컬럼에 대응하는 값을 순서대로 나열\n- 문자열은 **작은따옴표** 사용 (\`'Travel'\`)\n- NULL은 따옴표 없이 \`NULL\`\n- 컬럼 순서와 VALUES 순서가 반드시 일치해야 함`,
    en: `## INSERT INTO\n\nAdds a new row to a table.\n\n\`\`\`sql\nINSERT INTO categories (id, name, parent_id)\nVALUES (100, 'Travel', NULL);\n\`\`\`\n\n### Key Points\n- **Column list**: Specify which columns to fill\n- **VALUES**: List values in matching order\n- Strings use **single quotes** (\`'Travel'\`)\n- NULL has no quotes\n- Column order must match VALUES order`,
  },
  expectedQuery: {
    postgresql: "INSERT INTO categories (id, name, parent_id) VALUES (100, 'Travel', NULL);",
    mysql: "INSERT INTO categories (id, name, parent_id) VALUES (100, 'Travel', NULL);",
  },
  gradingMode: 'contains', relatedConcepts: ['INSERT INTO', 'VALUES', 'DML'],
};
