import type { Problem } from '@/types/problem';

export const problem: Problem = {
  id: 'expert-002', level: 'expert', order: 2,
  title: { ko: 'EXPLAIN: 쿼리 실행 계획 분석', en: 'EXPLAIN: Query Execution Plan Analysis' },
  description: {
    ko: `\`EXPLAIN\`을 사용하여 쿼리의 **실행 계획**을 분석하세요.\n\n### 요구사항\n아래 쿼리의 실행 계획을 확인하세요:\n\`\`\`sql\nEXPLAIN SELECT c.name, COUNT(o.id) AS order_count\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE o.status = 'delivered'\nGROUP BY c.id, c.name\nORDER BY order_count DESC;\n\`\`\`\n\n> **참고**: EXPLAIN은 쿼리를 실행하지 않고 실행 계획만 보여줍니다.\n> 어떤 스캔 방식(Seq Scan, Index Scan 등)이 사용되는지 확인해보세요.`,
    en: `Use \`EXPLAIN\` to analyze a query's **execution plan**.\n\n### Requirements\nExamine the execution plan for this query:\n\`\`\`sql\nEXPLAIN SELECT c.name, COUNT(o.id) AS order_count\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE o.status = 'delivered'\nGROUP BY c.id, c.name\nORDER BY order_count DESC;\n\`\`\`\n\n> **Note**: EXPLAIN shows the plan without executing the query.\n> Check which scan methods (Seq Scan, Index Scan, etc.) are used.`,
  },
  schema: 'ecommerce', category: 'Performance', difficulty: 2,
  hints: {
    ko: ['EXPLAIN 키워드를 SELECT 앞에 붙이면 실행 계획을 볼 수 있습니다.', 'Seq Scan은 전체 테이블 스캔, Index Scan은 인덱스를 활용한 스캔입니다.', "EXPLAIN SELECT c.name, COUNT(o.id) AS order_count FROM customers c JOIN orders o ON c.id = o.customer_id WHERE o.status = 'delivered' GROUP BY c.id, c.name ORDER BY order_count DESC;"],
    en: ['Add EXPLAIN before SELECT to see the execution plan.', 'Seq Scan = full table scan, Index Scan = uses index.', "EXPLAIN SELECT c.name, COUNT(o.id) AS order_count FROM customers c JOIN orders o ON c.id = o.customer_id WHERE o.status = 'delivered' GROUP BY c.id, c.name ORDER BY order_count DESC;"],
  },
  explanation: {
    ko: `## EXPLAIN\n\nSELECT 문의 실행 계획을 미리 확인합니다.\n\n\`\`\`sql\nEXPLAIN SELECT c.name, COUNT(o.id) AS order_count\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE o.status = 'delivered'\nGROUP BY c.id, c.name\nORDER BY order_count DESC;\n\`\`\`\n\n### 실행 계획 읽는 법\n- **Seq Scan**: 테이블 전체를 순차 스캔 (느림)\n- **Index Scan**: 인덱스를 사용하여 스캔 (빠름)\n- **Hash Join**: 해시 테이블을 만들어 조인\n- **Nested Loop**: 중첩 루프 조인\n- **Sort**: 정렬 연산\n- **Aggregate**: 집계 연산\n\n### cost 해석\n- \`cost=0.00..35.50\`: 시작 비용..총 비용\n- \`rows=10\`: 예상 행 수\n- \`width=42\`: 예상 행 크기(바이트)\n\n### EXPLAIN ANALYZE\n- 실제 실행 후 실측 시간도 함께 표시\n- \`EXPLAIN ANALYZE SELECT ...;\``,
    en: `## EXPLAIN\n\nShows the execution plan for a SELECT statement.\n\n\`\`\`sql\nEXPLAIN SELECT c.name, COUNT(o.id) AS order_count\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE o.status = 'delivered'\nGROUP BY c.id, c.name\nORDER BY order_count DESC;\n\`\`\`\n\n### Reading Execution Plans\n- **Seq Scan**: Sequential full table scan (slow)\n- **Index Scan**: Uses index (fast)\n- **Hash Join**: Builds hash table for join\n- **Nested Loop**: Nested loop join\n- **Sort**: Sort operation\n- **Aggregate**: Aggregation operation\n\n### Understanding cost\n- \`cost=0.00..35.50\`: startup cost..total cost\n- \`rows=10\`: estimated row count\n- \`width=42\`: estimated row size in bytes\n\n### EXPLAIN ANALYZE\n- Actually executes and shows real timings\n- \`EXPLAIN ANALYZE SELECT ...;\``,
  },
  expectedQuery: {
    postgresql: "EXPLAIN SELECT c.name, COUNT(o.id) AS order_count FROM customers c JOIN orders o ON c.id = o.customer_id WHERE o.status = 'delivered' GROUP BY c.id, c.name ORDER BY order_count DESC;",
    mysql: "EXPLAIN SELECT c.name, COUNT(o.id) AS order_count FROM customers c JOIN orders o ON c.id = o.customer_id WHERE o.status = 'delivered' GROUP BY c.id, c.name ORDER BY order_count DESC;",
  },
  gradingMode: 'contains', relatedConcepts: ['EXPLAIN', 'Execution Plan', 'Seq Scan', 'Index Scan', 'Performance'],
};
