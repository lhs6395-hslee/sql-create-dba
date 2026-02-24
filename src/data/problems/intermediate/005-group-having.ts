import type { Problem } from '@/types/problem';

export const problem: Problem = {
  id: 'intermediate-005', level: 'intermediate', order: 5,
  title: { ko: 'HAVING으로 우수 고객 찾기', en: 'Find Top Customers with HAVING' },
  description: {
    ko: `\`orders\` 테이블에서 **주문 횟수가 3회를 초과**하는 고객을 찾으세요.\n\ncustomer_id와 주문 횟수(order_count)를 출력하고, 주문 횟수 내림차순으로 정렬하세요.`,
    en: `Find customers who have placed **more than 3 orders** from the \`orders\` table.\n\nShow customer_id and order count (order_count), sorted by order_count descending.`,
  },
  schema: 'ecommerce', category: 'GROUP BY', difficulty: 2,
  hints: {
    ko: ['GROUP BY로 고객별로 그룹핑한 후 COUNT로 주문 수를 세세요.', 'HAVING은 그룹에 대한 조건이고, WHERE는 행에 대한 조건입니다.', 'SELECT customer_id, COUNT(*) AS order_count FROM orders GROUP BY customer_id HAVING COUNT(*) > 3 ORDER BY order_count DESC;'],
    en: ['GROUP BY customer_id and COUNT the orders.', 'HAVING filters groups, WHERE filters rows.', 'SELECT customer_id, COUNT(*) AS order_count FROM orders GROUP BY customer_id HAVING COUNT(*) > 3 ORDER BY order_count DESC;'],
  },
  explanation: {
    ko: `## HAVING vs WHERE\n\n| 구분 | WHERE | HAVING |\n|------|-------|--------|\n| 대상 | 개별 행 | 그룹 |\n| 위치 | GROUP BY 전 | GROUP BY 후 |\n| 집계함수 | 사용 불가 | 사용 가능 |\n\n\`\`\`sql\nSELECT customer_id, COUNT(*) AS order_count\nFROM orders\nGROUP BY customer_id\nHAVING COUNT(*) > 3\nORDER BY order_count DESC;\n\`\`\``,
    en: `## HAVING vs WHERE\n\n| | WHERE | HAVING |\n|---|-------|--------|\n| Target | Individual rows | Groups |\n| Position | Before GROUP BY | After GROUP BY |\n| Aggregates | Not allowed | Allowed |\n\n\`\`\`sql\nSELECT customer_id, COUNT(*) AS order_count\nFROM orders\nGROUP BY customer_id\nHAVING COUNT(*) > 3\nORDER BY order_count DESC;\n\`\`\``,
  },
  expectedQuery: {
    postgresql: 'SELECT customer_id, COUNT(*) AS order_count FROM orders GROUP BY customer_id HAVING COUNT(*) > 3 ORDER BY order_count DESC;',
    mysql: 'SELECT customer_id, COUNT(*) AS order_count FROM orders GROUP BY customer_id HAVING COUNT(*) > 3 ORDER BY order_count DESC;',
  },
  gradingMode: 'exact', relatedConcepts: ['GROUP BY', 'HAVING', 'COUNT', 'aggregate'],
};
