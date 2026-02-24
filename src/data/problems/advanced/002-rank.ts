import type { Problem } from '@/types/problem';

export const problem: Problem = {
  id: 'advanced-002', level: 'advanced', order: 2,
  title: { ko: 'RANK: 제품 가격 순위', en: 'RANK: Product Price Ranking' },
  description: {
    ko: `카테고리별로 제품 가격 순위를 매기되, **동일 가격은 같은 순위**를 부여하세요.\n\n### 요구사항\n- \`products\` 테이블 사용\n- 카테고리별(\`category_id\`)로 \`price\` 내림차순 순위\n- \`RANK()\`와 \`DENSE_RANK()\` 모두 출력하여 차이를 확인\n- 컬럼: \`category_id\`, \`name\`, \`price\`, \`price_rank\`, \`price_dense_rank\`\n- \`category_id\` 오름차순, \`price_rank\` 오름차순 정렬\n- 상위 20건만 출력`,
    en: `Rank products by price within each category, giving **same rank for ties**.\n\n### Requirements\n- Use \`products\` table\n- Rank by \`price\` DESC per \`category_id\`\n- Show both \`RANK()\` and \`DENSE_RANK()\` to compare\n- Columns: \`category_id\`, \`name\`, \`price\`, \`price_rank\`, \`price_dense_rank\`\n- Sort by \`category_id\` ASC, \`price_rank\` ASC\n- Limit to 20 rows`,
  },
  schema: 'ecommerce', category: 'Window Function', difficulty: 2,
  hints: {
    ko: ['RANK()는 동일 순위 후 다음 순위를 건너뛰고, DENSE_RANK()는 건너뛰지 않습니다.', 'OVER(PARTITION BY category_id ORDER BY price DESC)로 카테고리별 순위를 매깁니다.', "SELECT category_id, name, price, RANK() OVER(PARTITION BY category_id ORDER BY price DESC) AS price_rank, DENSE_RANK() OVER(PARTITION BY category_id ORDER BY price DESC) AS price_dense_rank FROM products ORDER BY category_id, price_rank LIMIT 20;"],
    en: ['RANK() skips ranks after ties; DENSE_RANK() does not.', 'Use OVER(PARTITION BY category_id ORDER BY price DESC).', "SELECT category_id, name, price, RANK() OVER(PARTITION BY category_id ORDER BY price DESC) AS price_rank, DENSE_RANK() OVER(PARTITION BY category_id ORDER BY price DESC) AS price_dense_rank FROM products ORDER BY category_id, price_rank LIMIT 20;"],
  },
  explanation: {
    ko: `## RANK vs DENSE_RANK\n\n\`\`\`sql\nSELECT category_id, name, price,\n  RANK() OVER(PARTITION BY category_id ORDER BY price DESC) AS price_rank,\n  DENSE_RANK() OVER(PARTITION BY category_id ORDER BY price DESC) AS price_dense_rank\nFROM products\nORDER BY category_id, price_rank\nLIMIT 20;\n\`\`\`\n\n### 차이점\n| 함수 | 동률 처리 | 예시 |\n|------|----------|------|\n| RANK() | 1, 2, 2, **4** | 동률 후 건너뜀 |\n| DENSE_RANK() | 1, 2, 2, **3** | 동률 후 연속 |\n| ROW_NUMBER() | 1, 2, 3, 4 | 항상 고유 |`,
    en: `## RANK vs DENSE_RANK\n\n\`\`\`sql\nSELECT category_id, name, price,\n  RANK() OVER(PARTITION BY category_id ORDER BY price DESC) AS price_rank,\n  DENSE_RANK() OVER(PARTITION BY category_id ORDER BY price DESC) AS price_dense_rank\nFROM products\nORDER BY category_id, price_rank\nLIMIT 20;\n\`\`\`\n\n### Differences\n| Function | Tie Handling | Example |\n|----------|-------------|----------|\n| RANK() | 1, 2, 2, **4** | Skips after ties |\n| DENSE_RANK() | 1, 2, 2, **3** | No gaps |\n| ROW_NUMBER() | 1, 2, 3, 4 | Always unique |`,
  },
  expectedQuery: {
    postgresql: "SELECT category_id, name, price, RANK() OVER(PARTITION BY category_id ORDER BY price DESC) AS price_rank, DENSE_RANK() OVER(PARTITION BY category_id ORDER BY price DESC) AS price_dense_rank FROM products ORDER BY category_id, price_rank LIMIT 20;",
    mysql: "SELECT category_id, name, price, RANK() OVER(PARTITION BY category_id ORDER BY price DESC) AS price_rank, DENSE_RANK() OVER(PARTITION BY category_id ORDER BY price DESC) AS price_dense_rank FROM products ORDER BY category_id, price_rank LIMIT 20;",
  },
  gradingMode: 'exact', relatedConcepts: ['RANK', 'DENSE_RANK', 'Window Function', 'PARTITION BY'],
};
