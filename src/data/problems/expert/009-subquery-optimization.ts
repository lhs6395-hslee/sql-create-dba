import type { Problem } from '@/types/problem';

export const problem: Problem = {
  id: 'expert-009', level: 'expert', order: 9,
  title: { ko: '서브쿼리 최적화: 상관 서브쿼리 → JOIN', en: 'Subquery Optimization: Correlated → JOIN' },
  description: {
    ko: `다음 **상관 서브쿼리**를 **JOIN + 집계**로 최적화하세요.\n\n### 원본 쿼리 (비효율적)\n\`\`\`sql\nSELECT p.name, p.price,\n  (SELECT AVG(r.rating) FROM reviews r WHERE r.product_id = p.id) AS avg_rating,\n  (SELECT COUNT(r.id) FROM reviews r WHERE r.product_id = p.id) AS review_count\nFROM products p\nWHERE p.price > 100000;\n\`\`\`\n\n### 최적화된 쿼리 (JOIN 사용)\n위 쿼리를 **LEFT JOIN + GROUP BY**로 다시 작성하세요.\n- 컬럼: \`name\`, \`price\`, \`avg_rating\` (소수점 2자리), \`review_count\`\n- 가격 10만원 초과 제품만\n- \`review_count\` 내림차순 정렬\n- 상위 15건 출력`,
    en: `Optimize this **correlated subquery** using **JOIN + aggregation**.\n\n### Original Query (Inefficient)\n\`\`\`sql\nSELECT p.name, p.price,\n  (SELECT AVG(r.rating) FROM reviews r WHERE r.product_id = p.id) AS avg_rating,\n  (SELECT COUNT(r.id) FROM reviews r WHERE r.product_id = p.id) AS review_count\nFROM products p\nWHERE p.price > 100000;\n\`\`\`\n\n### Optimized Query (Using JOIN)\nRewrite using **LEFT JOIN + GROUP BY**.\n- Columns: \`name\`, \`price\`, \`avg_rating\` (2 decimal places), \`review_count\`\n- Products with price > 100000 only\n- Sort by \`review_count\` DESC\n- Limit to 15 rows`,
  },
  schema: 'ecommerce', category: 'Performance', difficulty: 3,
  hints: {
    ko: ['상관 서브쿼리는 외부 행마다 내부 쿼리를 실행하므로 비효율적입니다.', 'LEFT JOIN + GROUP BY로 한 번에 집계할 수 있습니다.', "SELECT p.name, p.price, ROUND(AVG(r.rating), 2) AS avg_rating, COUNT(r.id) AS review_count FROM products p LEFT JOIN reviews r ON p.id = r.product_id WHERE p.price > 100000 GROUP BY p.id, p.name, p.price ORDER BY review_count DESC LIMIT 15;"],
    en: ['Correlated subqueries execute inner query for each outer row (slow).', 'LEFT JOIN + GROUP BY aggregates in one pass.', "SELECT p.name, p.price, ROUND(AVG(r.rating), 2) AS avg_rating, COUNT(r.id) AS review_count FROM products p LEFT JOIN reviews r ON p.id = r.product_id WHERE p.price > 100000 GROUP BY p.id, p.name, p.price ORDER BY review_count DESC LIMIT 15;"],
  },
  explanation: {
    ko: `## 서브쿼리 최적화\n\n### 상관 서브쿼리 (비효율)\n\`\`\`sql\n-- products의 각 행마다 reviews를 2번 스캔\nSELECT p.name,\n  (SELECT AVG(r.rating) FROM reviews r WHERE r.product_id = p.id),\n  (SELECT COUNT(r.id) FROM reviews r WHERE r.product_id = p.id)\nFROM products p;\n\`\`\`\n\n### JOIN 기반 (효율적)\n\`\`\`sql\n-- reviews를 1번만 스캔\nSELECT p.name, p.price,\n  ROUND(AVG(r.rating), 2) AS avg_rating,\n  COUNT(r.id) AS review_count\nFROM products p\nLEFT JOIN reviews r ON p.id = r.product_id\nWHERE p.price > 100000\nGROUP BY p.id, p.name, p.price\nORDER BY review_count DESC\nLIMIT 15;\n\`\`\`\n\n### 왜 JOIN이 더 빠른가?\n- 상관 서브쿼리: O(N×M) - 외부 행마다 내부 테이블 스캔\n- JOIN + GROUP BY: O(N+M) - 한 번의 조인으로 해결\n- 데이터가 많을수록 성능 차이가 커짐`,
    en: `## Subquery Optimization\n\n### Correlated Subquery (Slow)\n\`\`\`sql\n-- Scans reviews twice for each product row\nSELECT p.name,\n  (SELECT AVG(rating) FROM reviews WHERE product_id = p.id),\n  (SELECT COUNT(id) FROM reviews WHERE product_id = p.id)\nFROM products p;\n\`\`\`\n\n### JOIN-based (Fast)\n\`\`\`sql\nSELECT p.name, p.price,\n  ROUND(AVG(r.rating), 2) AS avg_rating,\n  COUNT(r.id) AS review_count\nFROM products p\nLEFT JOIN reviews r ON p.id = r.product_id\nWHERE p.price > 100000\nGROUP BY p.id, p.name, p.price\nORDER BY review_count DESC LIMIT 15;\n\`\`\`\n\n### Why JOIN Is Faster\n- Correlated: O(N×M) - scans inner table per outer row\n- JOIN + GROUP BY: O(N+M) - single join pass\n- Gap increases with data size`,
  },
  expectedQuery: {
    postgresql: "SELECT p.name, p.price, ROUND(AVG(r.rating), 2) AS avg_rating, COUNT(r.id) AS review_count FROM products p LEFT JOIN reviews r ON p.id = r.product_id WHERE p.price > 100000 GROUP BY p.id, p.name, p.price ORDER BY review_count DESC LIMIT 15;",
    mysql: "SELECT p.name, p.price, ROUND(AVG(r.rating), 2) AS avg_rating, COUNT(r.id) AS review_count FROM products p LEFT JOIN reviews r ON p.id = r.product_id WHERE p.price > 100000 GROUP BY p.id, p.name, p.price ORDER BY review_count DESC LIMIT 15;",
  },
  gradingMode: 'exact', relatedConcepts: ['Correlated Subquery', 'LEFT JOIN', 'GROUP BY', 'Query Optimization'],
};
