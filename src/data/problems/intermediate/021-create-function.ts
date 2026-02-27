import type { Problem } from '@/types/problem';

export const problem: Problem = {
  id: 'intermediate-021', level: 'intermediate', order: 21,
  title: { ko: 'CREATE FUNCTION: 세금 계산 함수', en: 'CREATE FUNCTION: Tax Calculation' },
  description: {
    ko: `세금을 계산하는 사용자 정의 함수를 생성하고 사용하세요.

### 요구사항
1. 가격에 10% 세금을 계산하는 함수를 생성하세요:
\`\`\`sql
CREATE OR REPLACE FUNCTION calc_tax(price DECIMAL)
RETURNS DECIMAL AS $$
BEGIN
  RETURN ROUND(price * 0.1, 2);
END;
$$ LANGUAGE plpgsql;
\`\`\`

**MySQL:**
\`\`\`sql
DELIMITER //
CREATE FUNCTION calc_tax(p DECIMAL(10,2))
RETURNS DECIMAL(10,2) DETERMINISTIC
BEGIN
  RETURN ROUND(p * 0.1, 2);
END //
DELIMITER ;
\`\`\`

2. 함수를 사용하여 products 테이블에서 각 상품의 이름, 가격, 세금을 조회하세요:
\`\`\`sql
SELECT name, price, calc_tax(price) AS tax
FROM products
ORDER BY price DESC;
\`\`\`

> **채점**: 2번 SELECT 쿼리의 결과로 채점됩니다.`,
    en: `Create and use a user-defined function that calculates tax.

### Requirements
1. Create a function that calculates 10% tax on a price:
\`\`\`sql
CREATE OR REPLACE FUNCTION calc_tax(price DECIMAL)
RETURNS DECIMAL AS $$
BEGIN
  RETURN ROUND(price * 0.1, 2);
END;
$$ LANGUAGE plpgsql;
\`\`\`

**MySQL:**
\`\`\`sql
DELIMITER //
CREATE FUNCTION calc_tax(p DECIMAL(10,2))
RETURNS DECIMAL(10,2) DETERMINISTIC
BEGIN
  RETURN ROUND(p * 0.1, 2);
END //
DELIMITER ;
\`\`\`

2. Use the function to query each product's name, price, and tax:
\`\`\`sql
SELECT name, price, calc_tax(price) AS tax
FROM products
ORDER BY price DESC;
\`\`\`

> **Grading**: Based on step 2's SELECT result.`,
  },
  schema: 'ecommerce', category: 'DDL', difficulty: 2,
  hints: {
    ko: ['CREATE OR REPLACE FUNCTION을 사용합니다.', 'RETURNS 절로 반환 타입을 지정합니다.', '$$ ... $$ LANGUAGE plpgsql로 함수 본문을 감쌉니다.'],
    en: ['Use CREATE OR REPLACE FUNCTION.', 'Specify return type with RETURNS clause.', 'Wrap function body with $$ ... $$ LANGUAGE plpgsql.'],
  },
  explanation: {
    ko: `## CREATE FUNCTION (사용자 정의 함수)

사용자 정의 함수(UDF)는 반복되는 계산 로직을 캡슐화하여 재사용할 수 있게 합니다.

### PostgreSQL 함수 구조
\`\`\`sql
CREATE OR REPLACE FUNCTION 함수명(매개변수 타입)
RETURNS 반환타입 AS $$
BEGIN
  RETURN 결과;
END;
$$ LANGUAGE plpgsql;
\`\`\`

### 핵심 포인트
- **CREATE OR REPLACE**: 기존 함수가 있으면 대체
- **RETURNS**: 반환 타입 지정 필수
- **$$**: 함수 본문의 시작과 끝을 감싸는 달러 쿼팅
- **LANGUAGE plpgsql**: PL/pgSQL 언어 사용을 명시

### 함수 사용 위치
함수는 SELECT, WHERE, ORDER BY, INSERT 등 다양한 SQL 문에서 호출 가능합니다.`,
    en: `## CREATE FUNCTION (User-Defined Function)

User-defined functions (UDFs) encapsulate repetitive calculation logic for reuse.

### PostgreSQL Function Structure
\`\`\`sql
CREATE OR REPLACE FUNCTION func_name(param type)
RETURNS return_type AS $$
BEGIN
  RETURN result;
END;
$$ LANGUAGE plpgsql;
\`\`\`

### Key Points
- **CREATE OR REPLACE**: Replace if function exists
- **RETURNS**: Return type specification required
- **$$**: Dollar quoting wraps the function body
- **LANGUAGE plpgsql**: Specifies PL/pgSQL language

### Where Functions Can Be Used
Functions can be called in SELECT, WHERE, ORDER BY, INSERT, and other SQL statements.`,
  },
  expectedQuery: {
    postgresql: "SELECT name, price, calc_tax(price) AS tax FROM products ORDER BY price DESC;",
    mysql: "SELECT name, price, calc_tax(price) AS tax FROM products ORDER BY price DESC;",
  },
  gradingMode: 'exact', relatedConcepts: ['CREATE FUNCTION', 'PL/pgSQL', 'UDF', 'RETURNS'],
};
