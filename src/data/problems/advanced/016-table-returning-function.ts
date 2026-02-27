import type { Problem } from '@/types/problem';

export const problem: Problem = {
  id: 'advanced-016', level: 'advanced', order: 16,
  title: { ko: 'RETURNS TABLE: 테이블 반환 함수', en: 'RETURNS TABLE: Table-Returning Function' },
  description: {
    ko: `카테고리별 매출 요약을 반환하는 테이블 반환 함수를 생성하세요.

### 요구사항
1. 다음과 같은 테이블 반환 함수를 생성하세요:
\`\`\`sql
CREATE OR REPLACE FUNCTION get_category_revenue()
RETURNS TABLE (
  category_name VARCHAR,
  product_count BIGINT,
  total_revenue DECIMAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT c.name, COUNT(DISTINCT p.id), SUM(oi.quantity * oi.unit_price)
  FROM categories c
  JOIN products p ON c.id = p.category_id
  JOIN order_items oi ON p.id = oi.product_id
  GROUP BY c.name
  ORDER BY SUM(oi.quantity * oi.unit_price) DESC;
END;
$$ LANGUAGE plpgsql;
\`\`\`

2. 함수를 호출하세요:
\`\`\`sql
SELECT * FROM get_category_revenue();
\`\`\`

> **채점**: 2번 SELECT 쿼리의 결과로 채점됩니다.`,
    en: `Create a table-returning function that summarizes revenue by category.

### Requirements
1. Create the following table-returning function:
\`\`\`sql
CREATE OR REPLACE FUNCTION get_category_revenue()
RETURNS TABLE (
  category_name VARCHAR,
  product_count BIGINT,
  total_revenue DECIMAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT c.name, COUNT(DISTINCT p.id), SUM(oi.quantity * oi.unit_price)
  FROM categories c
  JOIN products p ON c.id = p.category_id
  JOIN order_items oi ON p.id = oi.product_id
  GROUP BY c.name
  ORDER BY SUM(oi.quantity * oi.unit_price) DESC;
END;
$$ LANGUAGE plpgsql;
\`\`\`

2. Call the function:
\`\`\`sql
SELECT * FROM get_category_revenue();
\`\`\`

> **Grading**: Based on step 2's SELECT result.`,
  },
  schema: 'ecommerce', category: 'DDL', difficulty: 2,
  hints: {
    ko: ['RETURNS TABLE로 반환할 열들을 정의합니다.', 'RETURN QUERY 다음에 SELECT 문을 작성합니다.', '함수를 FROM 절에서 테이블처럼 사용할 수 있습니다.'],
    en: ['Define return columns with RETURNS TABLE.', 'Write SELECT statement after RETURN QUERY.', 'The function can be used like a table in FROM clause.'],
  },
  explanation: {
    ko: `## RETURNS TABLE (테이블 반환 함수)

RETURNS TABLE 함수는 여러 행과 여러 열을 반환하며, FROM 절에서 테이블처럼 사용할 수 있습니다.

### 핵심 구문
\`\`\`sql
CREATE OR REPLACE FUNCTION func_name(params)
RETURNS TABLE (
  col1 type1,
  col2 type2
) AS $$
BEGIN
  RETURN QUERY SELECT ...;
END;
$$ LANGUAGE plpgsql;
\`\`\`

### 주요 포인트
- **RETURNS TABLE**: 반환할 열 목록을 정의
- **RETURN QUERY**: SELECT 결과를 반환
- FROM 절에서 \`SELECT * FROM func_name()\` 형태로 사용
- 복잡한 집계 쿼리를 캡슐화하여 재사용 가능`,
    en: `## RETURNS TABLE (Table-Returning Function)

RETURNS TABLE functions return multiple rows and columns, usable like a table in FROM clause.

### Key Syntax
\`\`\`sql
CREATE OR REPLACE FUNCTION func_name(params)
RETURNS TABLE (
  col1 type1,
  col2 type2
) AS $$
BEGIN
  RETURN QUERY SELECT ...;
END;
$$ LANGUAGE plpgsql;
\`\`\`

### Key Points
- **RETURNS TABLE**: Define return column list
- **RETURN QUERY**: Return SELECT results
- Use as \`SELECT * FROM func_name()\` in FROM clause
- Encapsulate complex aggregate queries for reuse`,
  },
  expectedQuery: {
    postgresql: "SELECT * FROM get_category_revenue();",
    mysql: "SELECT * FROM get_category_revenue();",
  },
  gradingMode: 'exact', relatedConcepts: ['RETURNS TABLE', 'RETURN QUERY', 'CREATE FUNCTION', 'Table-Returning Function'],
};
