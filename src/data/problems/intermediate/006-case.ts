import type { Problem } from '@/types/problem';

export const problem: Problem = {
  id: 'intermediate-006', level: 'intermediate', order: 6,
  title: { ko: 'CASE 문으로 가격 등급 분류', en: 'Classify Price Tiers with CASE' },
  description: {
    ko: `\`products\` 테이블에서 상품명, 가격, 그리고 **가격 등급(price_tier)**을 조회하세요.\n\n### 가격 등급 기준\n| 조건 | 등급 |\n|------|------|\n| price < 50000 | Budget |\n| 50000 <= price <= 500000 | Mid-Range |\n| price > 500000 | Premium |`,
    en: `Select product name, price, and a **price_tier** column from the \`products\` table.\n\n### Price Tier Criteria\n| Condition | Tier |\n|-----------|------|\n| price < 50000 | Budget |\n| 50000 <= price <= 500000 | Mid-Range |\n| price > 500000 | Premium |`,
  },
  schema: 'ecommerce', category: 'CASE', difficulty: 2,
  hints: {
    ko: ['CASE WHEN ... THEN ... ELSE ... END 구문을 사용합니다.', 'WHEN 조건은 위에서부터 순서대로 평가됩니다.', "SELECT name, price, CASE WHEN price < 50000 THEN 'Budget' WHEN price <= 500000 THEN 'Mid-Range' ELSE 'Premium' END AS price_tier FROM products;"],
    en: ['Use CASE WHEN ... THEN ... ELSE ... END syntax.', 'WHEN conditions are evaluated top to bottom.', "SELECT name, price, CASE WHEN price < 50000 THEN 'Budget' WHEN price <= 500000 THEN 'Mid-Range' ELSE 'Premium' END AS price_tier FROM products;"],
  },
  explanation: {
    ko: `## CASE 표현식\n\nSQL의 조건 분기 처리입니다. 프로그래밍의 if-else와 비슷합니다.\n\n\`\`\`sql\nSELECT name, price,\n  CASE\n    WHEN price < 50000 THEN 'Budget'\n    WHEN price <= 500000 THEN 'Mid-Range'\n    ELSE 'Premium'\n  END AS price_tier\nFROM products;\n\`\`\`\n\n> **팁**: CASE는 SELECT, WHERE, ORDER BY 등 다양한 위치에서 사용할 수 있습니다.`,
    en: `## CASE Expression\n\nConditional logic in SQL, similar to if-else in programming.\n\n\`\`\`sql\nSELECT name, price,\n  CASE\n    WHEN price < 50000 THEN 'Budget'\n    WHEN price <= 500000 THEN 'Mid-Range'\n    ELSE 'Premium'\n  END AS price_tier\nFROM products;\n\`\`\`\n\n> **Tip**: CASE can be used in SELECT, WHERE, ORDER BY, and more.`,
  },
  expectedQuery: {
    postgresql: "SELECT name, price, CASE WHEN price < 50000 THEN 'Budget' WHEN price <= 500000 THEN 'Mid-Range' ELSE 'Premium' END AS price_tier FROM products;",
    mysql: "SELECT name, price, CASE WHEN price < 50000 THEN 'Budget' WHEN price <= 500000 THEN 'Mid-Range' ELSE 'Premium' END AS price_tier FROM products;",
  },
  gradingMode: 'unordered', relatedConcepts: ['CASE', 'WHEN', 'THEN', 'ELSE', 'conditional'],
};
