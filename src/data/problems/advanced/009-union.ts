import type { Problem } from '@/types/problem';

export const problem: Problem = {
  id: 'advanced-009', level: 'advanced', order: 9,
  title: { ko: 'UNION: 고가/저가 제품 통합 조회', en: 'UNION: Combine High/Low Price Products' },
  description: {
    ko: `**가장 비싼 제품 5개**와 **가장 저렴한 제품 5개**를 하나의 결과로 합쳐서 조회하세요.\n\n### 요구사항\n- \`products\` 테이블 사용\n- UNION ALL로 두 결과 결합\n- 각 그룹을 구분하기 위해 \`price_group\` 컬럼 추가 ('Expensive' 또는 'Cheap')\n- 컬럼: \`name\`, \`price\`, \`price_group\`\n- 비싼 순 → 저렴한 순으로 출력`,
    en: `Combine the **top 5 most expensive** and **top 5 cheapest** products into one result.\n\n### Requirements\n- Use \`products\` table\n- Use UNION ALL to combine\n- Add \`price_group\` column ('Expensive' or 'Cheap')\n- Columns: \`name\`, \`price\`, \`price_group\`\n- Show expensive first, then cheap`,
  },
  schema: 'ecommerce', category: 'Set Operations', difficulty: 2,
  hints: {
    ko: ['SELECT ... UNION ALL SELECT ... 로 두 쿼리를 합칩니다.', "리터럴 문자열 'Expensive' AS price_group 으로 구분 컬럼을 만듭니다.", "(SELECT name, price, 'Expensive' AS price_group FROM products ORDER BY price DESC LIMIT 5) UNION ALL (SELECT name, price, 'Cheap' AS price_group FROM products ORDER BY price ASC LIMIT 5);"],
    en: ['Use SELECT ... UNION ALL SELECT ... to combine queries.', "Add a literal string 'Expensive' AS price_group for labeling.", "(SELECT name, price, 'Expensive' AS price_group FROM products ORDER BY price DESC LIMIT 5) UNION ALL (SELECT name, price, 'Cheap' AS price_group FROM products ORDER BY price ASC LIMIT 5);"],
  },
  explanation: {
    ko: `## UNION / UNION ALL\n\n두 개 이상의 SELECT 결과를 세로로 결합합니다.\n\n\`\`\`sql\n(SELECT name, price, 'Expensive' AS price_group\n FROM products ORDER BY price DESC LIMIT 5)\nUNION ALL\n(SELECT name, price, 'Cheap' AS price_group\n FROM products ORDER BY price ASC LIMIT 5);\n\`\`\`\n\n### UNION vs UNION ALL\n| 연산 | 중복 처리 | 성능 |\n|------|----------|------|\n| UNION | 중복 제거 | 느림 (정렬 필요) |\n| UNION ALL | 중복 포함 | 빠름 |\n\n### 규칙\n- 컬럼 개수와 데이터 타입이 일치해야 함\n- 컬럼 이름은 첫 번째 SELECT 기준\n- 각 SELECT에 ORDER BY + LIMIT을 쓰려면 괄호로 감싸기`,
    en: `## UNION / UNION ALL\n\nCombines results of two or more SELECT queries vertically.\n\n\`\`\`sql\n(SELECT name, price, 'Expensive' AS price_group\n FROM products ORDER BY price DESC LIMIT 5)\nUNION ALL\n(SELECT name, price, 'Cheap' AS price_group\n FROM products ORDER BY price ASC LIMIT 5);\n\`\`\`\n\n### UNION vs UNION ALL\n| Operation | Duplicates | Performance |\n|-----------|-----------|-------------|\n| UNION | Removes | Slower (needs sort) |\n| UNION ALL | Keeps | Faster |\n\n### Rules\n- Column count and types must match\n- Column names come from the first SELECT\n- Wrap each SELECT in parentheses for individual ORDER BY + LIMIT`,
  },
  expectedQuery: {
    postgresql: "(SELECT name, price, 'Expensive' AS price_group FROM products ORDER BY price DESC LIMIT 5) UNION ALL (SELECT name, price, 'Cheap' AS price_group FROM products ORDER BY price ASC LIMIT 5);",
    mysql: "(SELECT name, price, 'Expensive' AS price_group FROM products ORDER BY price DESC LIMIT 5) UNION ALL (SELECT name, price, 'Cheap' AS price_group FROM products ORDER BY price ASC LIMIT 5);",
  },
  gradingMode: 'exact', relatedConcepts: ['UNION', 'UNION ALL', 'Set Operations', 'ORDER BY', 'LIMIT'],
};
