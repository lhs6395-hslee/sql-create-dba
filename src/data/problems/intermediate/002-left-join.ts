import type { Problem } from '@/types/problem';

export const problem: Problem = {
  id: 'intermediate-002',
  level: 'intermediate',
  order: 2,
  title: { ko: 'LEFT JOIN으로 모든 고객의 주문 조회', en: 'All Customer Orders with LEFT JOIN' },
  description: {
    ko: `\`customers\`와 \`orders\` 테이블을 **LEFT JOIN**하여 **모든 고객**의 이름, 주문 ID, 총 금액을 조회하세요.\n\n주문이 없는 고객도 결과에 포함되어야 합니다.\n\n### 출력 컬럼\n| 컬럼 | 설명 |\n|------|------|\n| name | 고객 이름 |\n| order_id | 주문 ID (없으면 NULL) |\n| total_amount | 총 금액 (없으면 NULL) |`,
    en: `Use **LEFT JOIN** on \`customers\` and \`orders\` to retrieve **all customers'** name, order ID, and total amount.\n\nCustomers without orders must also appear in the result.\n\n### Output Columns\n| Column | Description |\n|--------|-------------|\n| name | Customer name |\n| order_id | Order ID (NULL if none) |\n| total_amount | Total amount (NULL if none) |`,
  },
  schema: 'ecommerce', category: 'JOIN', difficulty: 1,
  hints: {
    ko: ['LEFT JOIN은 왼쪽 테이블의 모든 행을 유지합니다.', 'customers를 왼쪽에, orders를 오른쪽에 놓으세요.', 'SELECT c.name, o.id AS order_id, o.total_amount FROM customers c LEFT JOIN orders o ON c.id = o.customer_id;'],
    en: ['LEFT JOIN keeps all rows from the left table.', 'Put customers on the left, orders on the right.', 'SELECT c.name, o.id AS order_id, o.total_amount FROM customers c LEFT JOIN orders o ON c.id = o.customer_id;'],
  },
  explanation: {
    ko: `## LEFT JOIN\n\n\`LEFT JOIN\`은 왼쪽 테이블의 **모든 행**을 유지하고, 오른쪽 테이블에서 일치하는 행이 없으면 NULL을 채웁니다.\n\n\`\`\`sql\nSELECT c.name, o.id AS order_id, o.total_amount\nFROM customers c\nLEFT JOIN orders o ON c.id = o.customer_id;\n\`\`\`\n\n### INNER JOIN vs LEFT JOIN\n| 구분 | INNER JOIN | LEFT JOIN |\n|------|-----------|----------|\n| 결과 | 양쪽 일치만 | 왼쪽 전부 + 오른쪽 일치 |\n| NULL | 없음 | 오른쪽에 일치 없으면 NULL |`,
    en: `## LEFT JOIN\n\n\`LEFT JOIN\` keeps **all rows** from the left table and fills NULL for non-matching right rows.\n\n\`\`\`sql\nSELECT c.name, o.id AS order_id, o.total_amount\nFROM customers c\nLEFT JOIN orders o ON c.id = o.customer_id;\n\`\`\`\n\n### INNER JOIN vs LEFT JOIN\n| | INNER JOIN | LEFT JOIN |\n|---|-----------|----------|\n| Result | Matching only | All left + matching right |\n| NULL | None | NULL for non-matching right |`,
  },
  expectedQuery: {
    postgresql: 'SELECT c.name, o.id AS order_id, o.total_amount FROM customers c LEFT JOIN orders o ON c.id = o.customer_id;',
    mysql: 'SELECT c.name, o.id AS order_id, o.total_amount FROM customers c LEFT JOIN orders o ON c.id = o.customer_id;',
  },
  gradingMode: 'unordered', relatedConcepts: ['LEFT JOIN', 'OUTER JOIN', 'NULL'],
};
