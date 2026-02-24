import type { Problem } from '@/types/problem';

export const problem: Problem = {
  id: 'intermediate-010', level: 'intermediate', order: 10,
  title: { ko: '종합: 고객별 총 구매 금액 분석', en: 'Comprehensive: Customer Spending Analysis' },
  description: {
    ko: `**배달 완료(delivered)**된 주문만 대상으로, 고객별 **총 구매 금액**을 구하세요.\n\n### 요구사항\n- \`customers\`와 \`orders\` 테이블을 JOIN\n- 주문 상태가 \`'delivered'\`인 것만 필터링\n- 고객 이름과 총 구매 금액(total_spending) 출력\n- 총 구매 금액 내림차순 정렬`,
    en: `Calculate **total spending per customer** for **delivered** orders only.\n\n### Requirements\n- JOIN \`customers\` and \`orders\`\n- Filter only orders with status \`'delivered'\`\n- Show customer name and total_spending\n- Sort by total_spending descending`,
  },
  schema: 'ecommerce', category: 'Comprehensive', difficulty: 3,
  hints: {
    ko: ['JOIN으로 두 테이블을 연결하고, WHERE로 delivered만 필터링하세요.', 'GROUP BY와 SUM을 사용하여 고객별 합계를 구하세요.', "SELECT c.name, SUM(o.total_amount) AS total_spending FROM customers c JOIN orders o ON c.id = o.customer_id WHERE o.status = 'delivered' GROUP BY c.id, c.name ORDER BY total_spending DESC;"],
    en: ['JOIN tables and filter with WHERE for delivered only.', 'Use GROUP BY and SUM for per-customer totals.', "SELECT c.name, SUM(o.total_amount) AS total_spending FROM customers c JOIN orders o ON c.id = o.customer_id WHERE o.status = 'delivered' GROUP BY c.id, c.name ORDER BY total_spending DESC;"],
  },
  explanation: {
    ko: `## 종합 쿼리\n\nJOIN + WHERE + GROUP BY + ORDER BY를 모두 결합한 쿼리입니다.\n\n\`\`\`sql\nSELECT c.name, SUM(o.total_amount) AS total_spending\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE o.status = 'delivered'\nGROUP BY c.id, c.name\nORDER BY total_spending DESC;\n\`\`\`\n\n### SQL 실행 순서\n1. FROM + JOIN (테이블 결합)\n2. WHERE (행 필터링)\n3. GROUP BY (그룹핑)\n4. HAVING (그룹 필터링)\n5. SELECT (컬럼 선택)\n6. ORDER BY (정렬)\n7. LIMIT (개수 제한)`,
    en: `## Comprehensive Query\n\nCombines JOIN + WHERE + GROUP BY + ORDER BY.\n\n\`\`\`sql\nSELECT c.name, SUM(o.total_amount) AS total_spending\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE o.status = 'delivered'\nGROUP BY c.id, c.name\nORDER BY total_spending DESC;\n\`\`\`\n\n### SQL Execution Order\n1. FROM + JOIN\n2. WHERE\n3. GROUP BY\n4. HAVING\n5. SELECT\n6. ORDER BY\n7. LIMIT`,
  },
  expectedQuery: {
    postgresql: "SELECT c.name, SUM(o.total_amount) AS total_spending FROM customers c JOIN orders o ON c.id = o.customer_id WHERE o.status = 'delivered' GROUP BY c.id, c.name ORDER BY total_spending DESC;",
    mysql: "SELECT c.name, SUM(o.total_amount) AS total_spending FROM customers c JOIN orders o ON c.id = o.customer_id WHERE o.status = 'delivered' GROUP BY c.id, c.name ORDER BY total_spending DESC;",
  },
  gradingMode: 'exact', relatedConcepts: ['JOIN', 'WHERE', 'GROUP BY', 'SUM', 'ORDER BY'],
};
