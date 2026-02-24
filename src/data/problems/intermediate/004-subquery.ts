import type { Problem } from '@/types/problem';

export const problem: Problem = {
  id: 'intermediate-004', level: 'intermediate', order: 4,
  title: { ko: '서브쿼리로 평균 이상 가격 제품 찾기', en: 'Products Above Average Price' },
  description: {
    ko: `\`products\` 테이블에서 **전체 평균 가격보다 비싼 제품**을 모두 조회하세요.\n\n서브쿼리를 사용하여 평균 가격을 구하고, WHERE 절에서 비교하세요.`,
    en: `Find all products from the \`products\` table that have a **price above the overall average**.\n\nUse a subquery to calculate the average price and compare in the WHERE clause.`,
  },
  schema: 'ecommerce', category: 'Subquery', difficulty: 2,
  hints: {
    ko: ['서브쿼리는 괄호 안에 작성하는 쿼리입니다.', 'AVG(price)로 평균을 구하고 WHERE에서 비교하세요.', 'SELECT * FROM products WHERE price > (SELECT AVG(price) FROM products);'],
    en: ['A subquery is a query within parentheses.', 'Use AVG(price) and compare in WHERE.', 'SELECT * FROM products WHERE price > (SELECT AVG(price) FROM products);'],
  },
  explanation: {
    ko: `## 서브쿼리 (Subquery)\n\n서브쿼리는 다른 쿼리 안에 포함된 쿼리입니다.\n\n\`\`\`sql\nSELECT * FROM products\nWHERE price > (SELECT AVG(price) FROM products);\n\`\`\`\n\n### 서브쿼리 유형\n- **스칼라 서브쿼리**: 단일 값 반환 (위 예시)\n- **IN 서브쿼리**: 여러 값 반환\n- **EXISTS 서브쿼리**: 존재 여부 확인`,
    en: `## Subquery\n\nA subquery is a query nested inside another query.\n\n\`\`\`sql\nSELECT * FROM products\nWHERE price > (SELECT AVG(price) FROM products);\n\`\`\`\n\n### Subquery Types\n- **Scalar**: Returns single value (above example)\n- **IN**: Returns multiple values\n- **EXISTS**: Checks existence`,
  },
  expectedQuery: {
    postgresql: 'SELECT * FROM products WHERE price > (SELECT AVG(price) FROM products);',
    mysql: 'SELECT * FROM products WHERE price > (SELECT AVG(price) FROM products);',
  },
  gradingMode: 'unordered', relatedConcepts: ['subquery', 'AVG', 'WHERE', 'scalar subquery'],
};
