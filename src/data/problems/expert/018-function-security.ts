import type { Problem } from '@/types/problem';

export const problem: Problem = {
  id: 'expert-018', level: 'expert', order: 18,
  title: { ko: '함수 고급: OUT 매개변수와 조건부 로직', en: 'Advanced Function: OUT Parameters & Conditional Logic' },
  description: {
    ko: `고객 등급을 판정하는 함수를 OUT 매개변수와 조건부 로직으로 생성하세요.

### 요구사항
1. 고객의 주문 통계와 등급을 반환하는 함수를 생성하세요:
\`\`\`sql
CREATE OR REPLACE FUNCTION get_customer_grade(
  cust_id INTEGER,
  OUT order_count BIGINT,
  OUT total_spent DECIMAL,
  OUT grade VARCHAR
) AS $$
BEGIN
  SELECT COUNT(*), COALESCE(SUM(total_amount), 0)
  INTO order_count, total_spent
  FROM orders WHERE customer_id = cust_id;

  IF total_spent >= 1000000 THEN
    grade := 'VIP';
  ELSIF total_spent >= 500000 THEN
    grade := 'GOLD';
  ELSIF total_spent >= 100000 THEN
    grade := 'SILVER';
  ELSE
    grade := 'BRONZE';
  END IF;
END;
$$ LANGUAGE plpgsql;
\`\`\`

2. 모든 고객에 대해 등급을 조회하세요:
\`\`\`sql
SELECT c.id, c.name,
  (get_customer_grade(c.id)).order_count,
  (get_customer_grade(c.id)).total_spent,
  (get_customer_grade(c.id)).grade
FROM customers c
ORDER BY (get_customer_grade(c.id)).total_spent DESC;
\`\`\`

> **참고**: 이 문제는 PostgreSQL의 OUT 매개변수와 복합 타입 접근 구문을 사용합니다. MySQL에서는 다중 값 반환 시 프로시저의 OUT 매개변수를 사용합니다.

> **채점**: 2번 SELECT 쿼리의 결과로 채점됩니다.`,
    en: `Create a function with OUT parameters and conditional logic to determine customer grades.

### Requirements
1. Create a function that returns customer order statistics and grade:
\`\`\`sql
CREATE OR REPLACE FUNCTION get_customer_grade(
  cust_id INTEGER,
  OUT order_count BIGINT,
  OUT total_spent DECIMAL,
  OUT grade VARCHAR
) AS $$
BEGIN
  SELECT COUNT(*), COALESCE(SUM(total_amount), 0)
  INTO order_count, total_spent
  FROM orders WHERE customer_id = cust_id;

  IF total_spent >= 1000000 THEN
    grade := 'VIP';
  ELSIF total_spent >= 500000 THEN
    grade := 'GOLD';
  ELSIF total_spent >= 100000 THEN
    grade := 'SILVER';
  ELSE
    grade := 'BRONZE';
  END IF;
END;
$$ LANGUAGE plpgsql;
\`\`\`

2. Query grades for all customers:
\`\`\`sql
SELECT c.id, c.name,
  (get_customer_grade(c.id)).order_count,
  (get_customer_grade(c.id)).total_spent,
  (get_customer_grade(c.id)).grade
FROM customers c
ORDER BY (get_customer_grade(c.id)).total_spent DESC;
\`\`\`

> **Note**: This problem uses PostgreSQL's OUT parameters and composite type access syntax. In MySQL, use procedure OUT parameters for returning multiple values.

> **Grading**: Based on step 2's SELECT result.`,
  },
  schema: 'ecommerce', category: 'DDL', difficulty: 3,
  hints: {
    ko: ['OUT 매개변수를 사용하면 여러 값을 반환할 수 있습니다.', 'IF/ELSIF/ELSE로 조건부 로직을 작성합니다.', 'OUT 매개변수 함수의 결과는 (func()).column 형태로 접근합니다.'],
    en: ['OUT parameters allow returning multiple values.', 'Use IF/ELSIF/ELSE for conditional logic.', 'Access OUT parameter results with (func()).column syntax.'],
  },
  explanation: {
    ko: `## OUT 매개변수와 조건부 로직

### OUT 매개변수
여러 값을 반환해야 할 때 OUT 매개변수를 사용합니다.
\`\`\`sql
CREATE FUNCTION func_name(
  IN input_param TYPE,
  OUT output1 TYPE,
  OUT output2 TYPE
) AS $$ ... $$;
\`\`\`

### 결과 접근 방법
\`\`\`sql
-- 방법 1: 복합 타입으로 접근
SELECT (get_customer_grade(1)).grade;

-- 방법 2: FROM 절에서 사용
SELECT * FROM get_customer_grade(1);
\`\`\`

### 제어문
- **IF/ELSIF/ELSE**: 조건 분기
- **:=** : PL/pgSQL 변수 할당 연산자
- **INTO**: SELECT 결과를 변수에 할당`,
    en: `## OUT Parameters & Conditional Logic

### OUT Parameters
Use OUT parameters when returning multiple values.
\`\`\`sql
CREATE FUNCTION func_name(
  IN input_param TYPE,
  OUT output1 TYPE,
  OUT output2 TYPE
) AS $$ ... $$;
\`\`\`

### Accessing Results
\`\`\`sql
-- Method 1: Access as composite type
SELECT (get_customer_grade(1)).grade;

-- Method 2: Use in FROM clause
SELECT * FROM get_customer_grade(1);
\`\`\`

### Control Flow
- **IF/ELSIF/ELSE**: Conditional branching
- **:=** : PL/pgSQL variable assignment operator
- **INTO**: Assign SELECT results to variables`,
  },
  expectedQuery: {
    postgresql: "SELECT c.id, c.name, (get_customer_grade(c.id)).order_count, (get_customer_grade(c.id)).total_spent, (get_customer_grade(c.id)).grade FROM customers c ORDER BY (get_customer_grade(c.id)).total_spent DESC;",
    mysql: "SELECT c.id, c.name, COUNT(o.id) AS order_count, COALESCE(SUM(o.total_amount), 0) AS total_spent, CASE WHEN COALESCE(SUM(o.total_amount), 0) >= 1000000 THEN 'VIP' WHEN COALESCE(SUM(o.total_amount), 0) >= 500000 THEN 'GOLD' WHEN COALESCE(SUM(o.total_amount), 0) >= 100000 THEN 'SILVER' ELSE 'BRONZE' END AS grade FROM customers c LEFT JOIN orders o ON c.id = o.customer_id GROUP BY c.id, c.name ORDER BY total_spent DESC;",
  },
  gradingMode: 'exact', relatedConcepts: ['OUT Parameters', 'IF/ELSIF/ELSE', 'PL/pgSQL', 'CREATE FUNCTION', 'Conditional Logic'],
};
