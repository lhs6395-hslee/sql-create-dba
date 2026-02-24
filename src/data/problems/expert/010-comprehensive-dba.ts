import type { Problem } from '@/types/problem';

export const problem: Problem = {
  id: 'expert-010', level: 'expert', order: 10,
  title: { ko: '종합: DBA 대시보드 쿼리', en: 'Comprehensive: DBA Dashboard Query' },
  description: {
    ko: `CTE, 윈도우 함수, JOIN을 모두 활용하여 **고객 등급 분석 대시보드**를 작성하세요.\n\n### 요구사항\n- 배달 완료(delivered) 주문만 대상\n- 고객별 총 주문 금액, 주문 횟수 계산\n- 총 주문 금액 기준으로 NTILE(4)를 사용하여 4개 등급 부여 (1=VIP, 4=일반)\n- 컬럼: \`name\`, \`total_spent\`, \`order_count\`, \`customer_tier\`\n- \`customer_tier\` 오름차순, \`total_spent\` 내림차순 정렬\n- 상위 20건 출력`,
    en: `Build a **customer tier analysis dashboard** using CTE, window functions, and JOIN.\n\n### Requirements\n- Only delivered orders\n- Calculate total amount and order count per customer\n- Use NTILE(4) on total amount to assign 4 tiers (1=VIP, 4=Regular)\n- Columns: \`name\`, \`total_spent\`, \`order_count\`, \`customer_tier\`\n- Sort by \`customer_tier\` ASC, \`total_spent\` DESC\n- Limit to 20 rows`,
  },
  schema: 'ecommerce', category: 'Comprehensive', difficulty: 3,
  hints: {
    ko: ['CTE로 고객별 합계를 구하고, 메인 쿼리에서 NTILE()을 적용합니다.', 'NTILE(4) OVER(ORDER BY total_spent DESC)로 4분위를 나눕니다.', "WITH customer_stats AS (SELECT c.name, SUM(o.total_amount) AS total_spent, COUNT(o.id) AS order_count FROM customers c JOIN orders o ON c.id = o.customer_id WHERE o.status = 'delivered' GROUP BY c.id, c.name) SELECT name, total_spent, order_count, NTILE(4) OVER(ORDER BY total_spent DESC) AS customer_tier FROM customer_stats ORDER BY customer_tier, total_spent DESC LIMIT 20;"],
    en: ['CTE for per-customer totals, then NTILE() in main query.', 'NTILE(4) OVER(ORDER BY total_spent DESC) creates 4 quartiles.', "WITH customer_stats AS (SELECT c.name, SUM(o.total_amount) AS total_spent, COUNT(o.id) AS order_count FROM customers c JOIN orders o ON c.id = o.customer_id WHERE o.status = 'delivered' GROUP BY c.id, c.name) SELECT name, total_spent, order_count, NTILE(4) OVER(ORDER BY total_spent DESC) AS customer_tier FROM customer_stats ORDER BY customer_tier, total_spent DESC LIMIT 20;"],
  },
  explanation: {
    ko: `## DBA 대시보드 종합 쿼리\n\nCTE + Window + JOIN + GROUP BY를 조합한 실무 분석 쿼리입니다.\n\n\`\`\`sql\nWITH customer_stats AS (\n  SELECT c.name,\n    SUM(o.total_amount) AS total_spent,\n    COUNT(o.id) AS order_count\n  FROM customers c\n  JOIN orders o ON c.id = o.customer_id\n  WHERE o.status = 'delivered'\n  GROUP BY c.id, c.name\n)\nSELECT name, total_spent, order_count,\n  NTILE(4) OVER(ORDER BY total_spent DESC) AS customer_tier\nFROM customer_stats\nORDER BY customer_tier, total_spent DESC\nLIMIT 20;\n\`\`\`\n\n### NTILE(N)\n- 결과를 N개의 동일한 크기 그룹으로 나눔\n- NTILE(4): 상위 25% = 1, 하위 25% = 4\n- 고객 등급, 성과 분석에 활용\n\n### DBA 실무에서의 활용\n1. **고객 세그멘테이션**: VIP/일반 고객 분류\n2. **매출 분석**: 매출 기여도 상위 고객 식별\n3. **마케팅**: 등급별 맞춤 프로모션\n4. **리텐션**: 등급 변화 추적으로 이탈 방지`,
    en: `## DBA Dashboard Comprehensive Query\n\nReal-world analytics combining CTE + Window + JOIN + GROUP BY.\n\n\`\`\`sql\nWITH customer_stats AS (\n  SELECT c.name,\n    SUM(o.total_amount) AS total_spent,\n    COUNT(o.id) AS order_count\n  FROM customers c\n  JOIN orders o ON c.id = o.customer_id\n  WHERE o.status = 'delivered'\n  GROUP BY c.id, c.name\n)\nSELECT name, total_spent, order_count,\n  NTILE(4) OVER(ORDER BY total_spent DESC) AS customer_tier\nFROM customer_stats\nORDER BY customer_tier, total_spent DESC\nLIMIT 20;\n\`\`\`\n\n### NTILE(N)\n- Divides results into N equal-sized groups\n- NTILE(4): Top 25% = 1, Bottom 25% = 4\n- Used for customer tiers, performance analysis\n\n### DBA Real-World Usage\n1. **Customer Segmentation**: VIP/regular classification\n2. **Revenue Analysis**: Top revenue contributors\n3. **Marketing**: Tier-based promotions\n4. **Retention**: Track tier changes to prevent churn`,
  },
  expectedQuery: {
    postgresql: "WITH customer_stats AS (SELECT c.name, SUM(o.total_amount) AS total_spent, COUNT(o.id) AS order_count FROM customers c JOIN orders o ON c.id = o.customer_id WHERE o.status = 'delivered' GROUP BY c.id, c.name) SELECT name, total_spent, order_count, NTILE(4) OVER(ORDER BY total_spent DESC) AS customer_tier FROM customer_stats ORDER BY customer_tier, total_spent DESC LIMIT 20;",
    mysql: "WITH customer_stats AS (SELECT c.name, SUM(o.total_amount) AS total_spent, COUNT(o.id) AS order_count FROM customers c JOIN orders o ON c.id = o.customer_id WHERE o.status = 'delivered' GROUP BY c.id, c.name) SELECT name, total_spent, order_count, NTILE(4) OVER(ORDER BY total_spent DESC) AS customer_tier FROM customer_stats ORDER BY customer_tier, total_spent DESC LIMIT 20;",
  },
  gradingMode: 'exact', relatedConcepts: ['CTE', 'NTILE', 'Window Function', 'JOIN', 'GROUP BY', 'Dashboard'],
};
