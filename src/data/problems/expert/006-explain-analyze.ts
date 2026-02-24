import type { Problem } from '@/types/problem';

export const problem: Problem = {
  id: 'expert-006', level: 'expert', order: 6,
  title: { ko: 'EXPLAIN ANALYZE: 실측 성능 분석', en: 'EXPLAIN ANALYZE: Actual Performance Analysis' },
  description: {
    ko: `\`EXPLAIN ANALYZE\`로 쿼리의 **실제 실행 시간**을 측정하세요.\n\n### 요구사항\n아래 쿼리를 실행하세요:\n\`\`\`sql\nEXPLAIN ANALYZE\nSELECT p.name, c.name AS category,\n  AVG(r.rating) AS avg_rating,\n  COUNT(r.id) AS review_count\nFROM products p\nJOIN categories c ON p.category_id = c.id\nLEFT JOIN reviews r ON p.id = r.product_id\nGROUP BY p.id, p.name, c.name\nHAVING COUNT(r.id) >= 2\nORDER BY avg_rating DESC;\n\`\`\`\n\n> **EXPLAIN vs EXPLAIN ANALYZE**\n> - EXPLAIN: 예상 비용만 표시 (쿼리 미실행)\n> - EXPLAIN ANALYZE: 실제 실행 후 실측 시간 표시`,
    en: `Use \`EXPLAIN ANALYZE\` to measure **actual execution time**.\n\n### Requirements\nRun this query:\n\`\`\`sql\nEXPLAIN ANALYZE\nSELECT p.name, c.name AS category,\n  AVG(r.rating) AS avg_rating,\n  COUNT(r.id) AS review_count\nFROM products p\nJOIN categories c ON p.category_id = c.id\nLEFT JOIN reviews r ON p.id = r.product_id\nGROUP BY p.id, p.name, c.name\nHAVING COUNT(r.id) >= 2\nORDER BY avg_rating DESC;\n\`\`\`\n\n> **EXPLAIN vs EXPLAIN ANALYZE**\n> - EXPLAIN: Estimated costs only (no execution)\n> - EXPLAIN ANALYZE: Actual execution with real timings`,
  },
  schema: 'ecommerce', category: 'Performance', difficulty: 3,
  hints: {
    ko: ['EXPLAIN ANALYZE는 쿼리를 실제로 실행합니다.', 'actual time과 Planning Time, Execution Time을 확인하세요.', "EXPLAIN ANALYZE SELECT p.name, c.name AS category, AVG(r.rating) AS avg_rating, COUNT(r.id) AS review_count FROM products p JOIN categories c ON p.category_id = c.id LEFT JOIN reviews r ON p.id = r.product_id GROUP BY p.id, p.name, c.name HAVING COUNT(r.id) >= 2 ORDER BY avg_rating DESC;"],
    en: ['EXPLAIN ANALYZE actually executes the query.', 'Check actual time, Planning Time, and Execution Time.', "EXPLAIN ANALYZE SELECT p.name, c.name AS category, AVG(r.rating) AS avg_rating, COUNT(r.id) AS review_count FROM products p JOIN categories c ON p.category_id = c.id LEFT JOIN reviews r ON p.id = r.product_id GROUP BY p.id, p.name, c.name HAVING COUNT(r.id) >= 2 ORDER BY avg_rating DESC;"],
  },
  explanation: {
    ko: `## EXPLAIN ANALYZE\n\n실제 실행 결과를 포함한 상세한 실행 계획을 보여줍니다.\n\n\`\`\`sql\nEXPLAIN ANALYZE\nSELECT p.name, c.name AS category, ...\n\`\`\`\n\n### 출력 해석\n\`\`\`\nSort (cost=... rows=...) (actual time=0.5..0.8 rows=50 loops=1)\n  -> HashAggregate (actual time=0.3..0.4 rows=50 loops=1)\n    -> Hash Join (actual time=0.1..0.2 rows=150 loops=1)\nPlanning Time: 0.2 ms\nExecution Time: 1.0 ms\n\`\`\`\n\n### 핵심 지표\n- **actual time**: 실제 소요 시간 (ms)\n- **rows**: 실제 처리 행 수\n- **loops**: 반복 횟수\n- **Planning Time**: 쿼리 계획 수립 시간\n- **Execution Time**: 총 실행 시간\n\n### DBA 활용법\n1. 느린 쿼리 식별\n2. Seq Scan → Index Scan으로 개선 가능한지 판단\n3. 인덱스 추가 전후 성능 비교`,
    en: `## EXPLAIN ANALYZE\n\nShows detailed execution plan with actual runtime statistics.\n\n\`\`\`sql\nEXPLAIN ANALYZE\nSELECT p.name, c.name AS category, ...\n\`\`\`\n\n### Reading Output\n\`\`\`\nSort (cost=... rows=...) (actual time=0.5..0.8 rows=50 loops=1)\n  -> HashAggregate (actual time=0.3..0.4 rows=50 loops=1)\n    -> Hash Join (actual time=0.1..0.2 rows=150 loops=1)\nPlanning Time: 0.2 ms\nExecution Time: 1.0 ms\n\`\`\`\n\n### Key Metrics\n- **actual time**: Real elapsed time (ms)\n- **rows**: Actual rows processed\n- **loops**: Number of iterations\n- **Planning Time**: Query planning time\n- **Execution Time**: Total execution time\n\n### DBA Usage\n1. Identify slow queries\n2. Determine if Seq Scan → Index Scan improvement is possible\n3. Compare performance before/after adding indexes`,
  },
  expectedQuery: {
    postgresql: "EXPLAIN ANALYZE SELECT p.name, c.name AS category, AVG(r.rating) AS avg_rating, COUNT(r.id) AS review_count FROM products p JOIN categories c ON p.category_id = c.id LEFT JOIN reviews r ON p.id = r.product_id GROUP BY p.id, p.name, c.name HAVING COUNT(r.id) >= 2 ORDER BY avg_rating DESC;",
    mysql: "EXPLAIN ANALYZE SELECT p.name, c.name AS category, AVG(r.rating) AS avg_rating, COUNT(r.id) AS review_count FROM products p JOIN categories c ON p.category_id = c.id LEFT JOIN reviews r ON p.id = r.product_id GROUP BY p.id, p.name, c.name HAVING COUNT(r.id) >= 2 ORDER BY avg_rating DESC;",
  },
  gradingMode: 'contains', relatedConcepts: ['EXPLAIN ANALYZE', 'Performance', 'Execution Plan', 'Planning Time'],
};
