import type { Problem } from '@/types/problem';

export const problem: Problem = {
  id: 'advanced-003', level: 'advanced', order: 3,
  title: { ko: 'SUM OVER: 누적 매출 계산', en: 'SUM OVER: Running Total Sales' },
  description: {
    ko: `주문을 날짜순으로 정렬하고, **누적 매출(running_total)**을 계산하세요.\n\n### 요구사항\n- \`orders\` 테이블에서 \`status = 'delivered'\`인 주문만 사용\n- \`order_date\` 오름차순으로 누적 합계 계산\n- 컬럼: \`id\`, \`order_date\`, \`total_amount\`, \`running_total\`\n- 상위 20건만 출력`,
    en: `Sort orders by date and calculate a **running total** of sales.\n\n### Requirements\n- Use \`orders\` table, only \`status = 'delivered'\`\n- Calculate cumulative sum ordered by \`order_date\` ASC\n- Columns: \`id\`, \`order_date\`, \`total_amount\`, \`running_total\`\n- Limit to 20 rows`,
  },
  schema: 'ecommerce', category: 'Window Function', difficulty: 2,
  hints: {
    ko: ['SUM(total_amount) OVER(ORDER BY ...) 구문으로 누적 합계를 구합니다.', 'PARTITION BY 없이 ORDER BY만 사용하면 전체 데이터에 대한 누적 합계가 됩니다.', "SELECT id, order_date, total_amount, SUM(total_amount) OVER(ORDER BY order_date) AS running_total FROM orders WHERE status = 'delivered' ORDER BY order_date LIMIT 20;"],
    en: ['Use SUM(total_amount) OVER(ORDER BY ...) for cumulative sum.', 'Without PARTITION BY, the window covers all rows.', "SELECT id, order_date, total_amount, SUM(total_amount) OVER(ORDER BY order_date) AS running_total FROM orders WHERE status = 'delivered' ORDER BY order_date LIMIT 20;"],
  },
  explanation: {
    ko: `## 누적 합계 (Running Total)\n\n\`SUM() OVER(ORDER BY ...)\`는 정렬 기준에 따라 누적 합계를 계산합니다.\n\n\`\`\`sql\nSELECT id, order_date, total_amount,\n  SUM(total_amount) OVER(ORDER BY order_date) AS running_total\nFROM orders\nWHERE status = 'delivered'\nORDER BY order_date\nLIMIT 20;\n\`\`\`\n\n### 윈도우 프레임\n- \`ORDER BY\`만 지정하면 기본 프레임은 **UNBOUNDED PRECEDING ~ CURRENT ROW**\n- 즉, 첫 번째 행부터 현재 행까지의 합계\n- \`PARTITION BY\`를 추가하면 그룹별 누적 합계 가능`,
    en: `## Running Total\n\n\`SUM() OVER(ORDER BY ...)\` calculates a cumulative sum.\n\n\`\`\`sql\nSELECT id, order_date, total_amount,\n  SUM(total_amount) OVER(ORDER BY order_date) AS running_total\nFROM orders\nWHERE status = 'delivered'\nORDER BY order_date\nLIMIT 20;\n\`\`\`\n\n### Window Frame\n- With only ORDER BY, default frame is **UNBOUNDED PRECEDING to CURRENT ROW**\n- Sums from first row to current row\n- Add PARTITION BY for per-group running totals`,
  },
  expectedQuery: {
    postgresql: "SELECT id, order_date, total_amount, SUM(total_amount) OVER(ORDER BY order_date) AS running_total FROM orders WHERE status = 'delivered' ORDER BY order_date LIMIT 20;",
    mysql: "SELECT id, order_date, total_amount, SUM(total_amount) OVER(ORDER BY order_date) AS running_total FROM orders WHERE status = 'delivered' ORDER BY order_date LIMIT 20;",
  },
  gradingMode: 'exact', relatedConcepts: ['SUM', 'OVER', 'Window Frame', 'Running Total'],
};
