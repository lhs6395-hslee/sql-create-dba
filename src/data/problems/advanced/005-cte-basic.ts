import type { Problem } from '@/types/problem';

export const problem: Problem = {
  id: 'advanced-005', level: 'advanced', order: 5,
  title: { ko: 'CTE: 평균 이상 주문 고객', en: 'CTE: Customers Above Average Orders' },
  description: {
    ko: `CTE(Common Table Expression)를 사용하여 **평균 주문 금액 이상**의 주문을 한 고객 목록을 구하세요.\n\n### 요구사항\n- CTE로 전체 주문의 평균 금액을 먼저 계산\n- 해당 평균 이상의 \`total_amount\`를 가진 주문의 고객 정보 조회\n- \`customers\`와 \`orders\` JOIN\n- 컬럼: \`name\` (고객명), \`total_amount\`, \`order_date\`\n- \`total_amount\` 내림차순 정렬\n- 상위 20건만 출력`,
    en: `Use a CTE to find customers whose orders are **above average** amount.\n\n### Requirements\n- CTE calculates the overall average order amount\n- Find orders with \`total_amount\` >= that average\n- JOIN \`customers\` and \`orders\`\n- Columns: \`name\`, \`total_amount\`, \`order_date\`\n- Sort by \`total_amount\` DESC\n- Limit to 20 rows`,
  },
  schema: 'ecommerce', category: 'CTE', difficulty: 2,
  hints: {
    ko: ['WITH cte_name AS (SELECT ...) 구문으로 CTE를 정의합니다.', 'CTE에서 AVG(total_amount)를 구한 뒤, 메인 쿼리에서 비교합니다.', "WITH avg_order AS (SELECT AVG(total_amount) AS avg_amount FROM orders) SELECT c.name, o.total_amount, o.order_date FROM customers c JOIN orders o ON c.id = o.customer_id, avg_order WHERE o.total_amount >= avg_order.avg_amount ORDER BY o.total_amount DESC LIMIT 20;"],
    en: ['Define a CTE with WITH cte_name AS (SELECT ...).', 'Calculate AVG(total_amount) in the CTE, then compare in main query.', "WITH avg_order AS (SELECT AVG(total_amount) AS avg_amount FROM orders) SELECT c.name, o.total_amount, o.order_date FROM customers c JOIN orders o ON c.id = o.customer_id, avg_order WHERE o.total_amount >= avg_order.avg_amount ORDER BY o.total_amount DESC LIMIT 20;"],
  },
  explanation: {
    ko: `## CTE (Common Table Expression)\n\n\`WITH\` 절을 사용하여 임시 결과 집합을 정의합니다.\n\n\`\`\`sql\nWITH avg_order AS (\n  SELECT AVG(total_amount) AS avg_amount FROM orders\n)\nSELECT c.name, o.total_amount, o.order_date\nFROM customers c\nJOIN orders o ON c.id = o.customer_id, avg_order\nWHERE o.total_amount >= avg_order.avg_amount\nORDER BY o.total_amount DESC\nLIMIT 20;\n\`\`\`\n\n### CTE 장점\n- 복잡한 쿼리를 **가독성** 좋게 분리\n- 같은 CTE를 메인 쿼리에서 **여러 번 참조** 가능\n- 서브쿼리보다 읽기 쉽고 유지보수 용이\n- **재귀 CTE**로 계층 구조 탐색 가능`,
    en: `## CTE (Common Table Expression)\n\nUse \`WITH\` clause to define temporary named result sets.\n\n\`\`\`sql\nWITH avg_order AS (\n  SELECT AVG(total_amount) AS avg_amount FROM orders\n)\nSELECT c.name, o.total_amount, o.order_date\nFROM customers c\nJOIN orders o ON c.id = o.customer_id, avg_order\nWHERE o.total_amount >= avg_order.avg_amount\nORDER BY o.total_amount DESC\nLIMIT 20;\n\`\`\`\n\n### CTE Benefits\n- Improves **readability** by breaking complex queries\n- Can be **referenced multiple times** in the main query\n- Easier to maintain than nested subqueries\n- **Recursive CTEs** enable hierarchical data traversal`,
  },
  expectedQuery: {
    postgresql: "WITH avg_order AS (SELECT AVG(total_amount) AS avg_amount FROM orders) SELECT c.name, o.total_amount, o.order_date FROM customers c JOIN orders o ON c.id = o.customer_id, avg_order WHERE o.total_amount >= avg_order.avg_amount ORDER BY o.total_amount DESC LIMIT 20;",
    mysql: "WITH avg_order AS (SELECT AVG(total_amount) AS avg_amount FROM orders) SELECT c.name, o.total_amount, o.order_date FROM customers c JOIN orders o ON c.id = o.customer_id, avg_order WHERE o.total_amount >= avg_order.avg_amount ORDER BY o.total_amount DESC LIMIT 20;",
  },
  gradingMode: 'exact', relatedConcepts: ['CTE', 'WITH', 'AVG', 'JOIN'],
};
