import type { Problem } from '@/types/problem';

export const problem: Problem = {
  id: 'advanced-001', level: 'advanced', order: 1,
  title: { ko: 'ROW_NUMBER: 주문 금액 순위', en: 'ROW_NUMBER: Order Amount Ranking' },
  description: {
    ko: `각 고객별로 주문 금액이 높은 순서대로 **순위(rank)**를 매기세요.\n\n### 요구사항\n- \`orders\` 테이블 사용\n- 고객별(\`customer_id\`)로 \`total_amount\` 내림차순 순위 부여\n- 컬럼: \`customer_id\`, \`id\` (주문 ID), \`total_amount\`, \`rn\` (순위)\n- \`customer_id\` 오름차순, \`rn\` 오름차순 정렬\n- 상위 20건만 출력 (\`LIMIT 20\`)`,
    en: `Rank orders by amount within each customer.\n\n### Requirements\n- Use \`orders\` table\n- Assign row number per \`customer_id\` ordered by \`total_amount\` DESC\n- Columns: \`customer_id\`, \`id\` (order ID), \`total_amount\`, \`rn\` (rank)\n- Sort by \`customer_id\` ASC, \`rn\` ASC\n- Show top 20 rows (\`LIMIT 20\`)`,
  },
  schema: 'ecommerce', category: 'Window Function', difficulty: 2,
  hints: {
    ko: ['ROW_NUMBER() OVER(PARTITION BY ... ORDER BY ...) 구문을 사용하세요.', 'PARTITION BY customer_id로 고객별 그룹을 나눕니다.', "SELECT customer_id, id, total_amount, ROW_NUMBER() OVER(PARTITION BY customer_id ORDER BY total_amount DESC) AS rn FROM orders ORDER BY customer_id, rn LIMIT 20;"],
    en: ['Use ROW_NUMBER() OVER(PARTITION BY ... ORDER BY ...) syntax.', 'PARTITION BY customer_id groups by customer.', "SELECT customer_id, id, total_amount, ROW_NUMBER() OVER(PARTITION BY customer_id ORDER BY total_amount DESC) AS rn FROM orders ORDER BY customer_id, rn LIMIT 20;"],
  },
  explanation: {
    ko: `## ROW_NUMBER 윈도우 함수\n\n\`ROW_NUMBER()\`는 파티션 내에서 각 행에 고유한 순번을 부여합니다.\n\n\`\`\`sql\nSELECT customer_id, id, total_amount,\n  ROW_NUMBER() OVER(\n    PARTITION BY customer_id\n    ORDER BY total_amount DESC\n  ) AS rn\nFROM orders\nORDER BY customer_id, rn\nLIMIT 20;\n\`\`\`\n\n### 핵심 개념\n- **OVER()**: 윈도우 함수의 범위를 정의\n- **PARTITION BY**: 그룹을 나누는 기준 (GROUP BY와 유사하지만 행을 합치지 않음)\n- **ORDER BY**: 파티션 내에서의 정렬 기준\n- ROW_NUMBER는 동일 값이라도 서로 다른 순번 부여`,
    en: `## ROW_NUMBER Window Function\n\n\`ROW_NUMBER()\` assigns a unique sequential number to each row within a partition.\n\n\`\`\`sql\nSELECT customer_id, id, total_amount,\n  ROW_NUMBER() OVER(\n    PARTITION BY customer_id\n    ORDER BY total_amount DESC\n  ) AS rn\nFROM orders\nORDER BY customer_id, rn\nLIMIT 20;\n\`\`\`\n\n### Key Concepts\n- **OVER()**: Defines the window frame\n- **PARTITION BY**: Groups rows (similar to GROUP BY but doesn't collapse)\n- **ORDER BY**: Sorting within each partition\n- ROW_NUMBER assigns unique numbers even for ties`,
  },
  expectedQuery: {
    postgresql: "SELECT customer_id, id, total_amount, ROW_NUMBER() OVER(PARTITION BY customer_id ORDER BY total_amount DESC) AS rn FROM orders ORDER BY customer_id, rn LIMIT 20;",
    mysql: "SELECT customer_id, id, total_amount, ROW_NUMBER() OVER(PARTITION BY customer_id ORDER BY total_amount DESC) AS rn FROM orders ORDER BY customer_id, rn LIMIT 20;",
  },
  gradingMode: 'exact', relatedConcepts: ['ROW_NUMBER', 'OVER', 'PARTITION BY', 'Window Function'],
};
