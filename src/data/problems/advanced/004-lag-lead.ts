import type { Problem } from '@/types/problem';

export const problem: Problem = {
  id: 'advanced-004', level: 'advanced', order: 4,
  title: { ko: 'LAG/LEAD: 이전/다음 주문 비교', en: 'LAG/LEAD: Compare Previous/Next Orders' },
  description: {
    ko: `고객 ID 1번의 주문을 날짜순으로 정렬하고, **이전 주문 금액**과 **차이**를 계산하세요.\n\n### 요구사항\n- \`orders\` 테이블에서 \`customer_id = 1\`만 필터링\n- \`LAG()\`로 이전 주문 금액 조회\n- 현재 금액과 이전 금액의 차이 계산\n- 컬럼: \`id\`, \`order_date\`, \`total_amount\`, \`prev_amount\`, \`diff\`\n- \`order_date\` 오름차순 정렬`,
    en: `For customer ID 1, list orders by date with the **previous order amount** and **difference**.\n\n### Requirements\n- Filter \`orders\` for \`customer_id = 1\`\n- Use \`LAG()\` to get previous order amount\n- Calculate difference between current and previous\n- Columns: \`id\`, \`order_date\`, \`total_amount\`, \`prev_amount\`, \`diff\`\n- Sort by \`order_date\` ASC`,
  },
  schema: 'ecommerce', category: 'Window Function', difficulty: 2,
  hints: {
    ko: ['LAG(컬럼, 1) OVER(ORDER BY ...)는 이전 행의 값을 가져옵니다.', 'NULL인 경우 빼기 연산이 NULL이 되므로 주의하세요.', "SELECT id, order_date, total_amount, LAG(total_amount, 1) OVER(ORDER BY order_date) AS prev_amount, total_amount - LAG(total_amount, 1) OVER(ORDER BY order_date) AS diff FROM orders WHERE customer_id = 1 ORDER BY order_date;"],
    en: ['LAG(column, 1) OVER(ORDER BY ...) retrieves the previous row value.', 'Be careful: subtraction with NULL yields NULL.', "SELECT id, order_date, total_amount, LAG(total_amount, 1) OVER(ORDER BY order_date) AS prev_amount, total_amount - LAG(total_amount, 1) OVER(ORDER BY order_date) AS diff FROM orders WHERE customer_id = 1 ORDER BY order_date;"],
  },
  explanation: {
    ko: `## LAG / LEAD 윈도우 함수\n\n- **LAG(컬럼, N)**: N행 이전 값 조회 (기본 N=1)\n- **LEAD(컬럼, N)**: N행 이후 값 조회 (기본 N=1)\n\n\`\`\`sql\nSELECT id, order_date, total_amount,\n  LAG(total_amount, 1) OVER(ORDER BY order_date) AS prev_amount,\n  total_amount - LAG(total_amount, 1) OVER(ORDER BY order_date) AS diff\nFROM orders\nWHERE customer_id = 1\nORDER BY order_date;\n\`\`\`\n\n### 활용 예시\n- 전월 대비 매출 증감 분석\n- 연속된 이벤트 간 시간 차이 계산\n- 주가 변동률 계산`,
    en: `## LAG / LEAD Window Functions\n\n- **LAG(col, N)**: Value N rows before (default N=1)\n- **LEAD(col, N)**: Value N rows after (default N=1)\n\n\`\`\`sql\nSELECT id, order_date, total_amount,\n  LAG(total_amount, 1) OVER(ORDER BY order_date) AS prev_amount,\n  total_amount - LAG(total_amount, 1) OVER(ORDER BY order_date) AS diff\nFROM orders\nWHERE customer_id = 1\nORDER BY order_date;\n\`\`\`\n\n### Use Cases\n- Month-over-month sales comparison\n- Time between consecutive events\n- Stock price change calculation`,
  },
  expectedQuery: {
    postgresql: "SELECT id, order_date, total_amount, LAG(total_amount, 1) OVER(ORDER BY order_date) AS prev_amount, total_amount - LAG(total_amount, 1) OVER(ORDER BY order_date) AS diff FROM orders WHERE customer_id = 1 ORDER BY order_date;",
    mysql: "SELECT id, order_date, total_amount, LAG(total_amount, 1) OVER(ORDER BY order_date) AS prev_amount, total_amount - LAG(total_amount, 1) OVER(ORDER BY order_date) AS diff FROM orders WHERE customer_id = 1 ORDER BY order_date;",
  },
  gradingMode: 'exact', relatedConcepts: ['LAG', 'LEAD', 'Window Function', 'OVER'],
};
