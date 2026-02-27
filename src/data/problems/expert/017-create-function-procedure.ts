import type { Problem } from '@/types/problem';

export const problem: Problem = {
  id: 'expert-017', level: 'expert', order: 17,
  title: { ko: 'CREATE PROCEDURE: 프리미엄 고객 업데이트', en: 'CREATE PROCEDURE: Premium Customer Update' },
  description: {
    ko: `프리미엄 고객 상태를 업데이트하는 프로시저를 생성하고 실행하세요.

### 요구사항
1. 총 주문금액이 임계값 이상인 고객을 프리미엄으로 변경하는 프로시저를 생성하세요:
\`\`\`sql
CREATE OR REPLACE PROCEDURE update_premium_customers(threshold DECIMAL)
LANGUAGE plpgsql
AS $$
DECLARE
  updated_count INTEGER;
BEGIN
  UPDATE customers SET is_premium = true
  WHERE id IN (
    SELECT customer_id FROM orders
    GROUP BY customer_id
    HAVING SUM(total_amount) >= threshold
  ) AND is_premium = false;

  GET DIAGNOSTICS updated_count = ROW_COUNT;
  RAISE NOTICE 'Updated % customers to premium', updated_count;
  COMMIT;
END;
$$;
\`\`\`

2. 프로시저를 호출하세요 (임계값 500000):
\`\`\`sql
CALL update_premium_customers(500000);
\`\`\`

3. 프리미엄 고객 목록을 확인하세요:
\`\`\`sql
SELECT id, name, email, is_premium
FROM customers
WHERE is_premium = true
ORDER BY name;
\`\`\`

> **MySQL 참고**: MySQL에서는 LANGUAGE plpgsql 대신 DELIMITER와 BEGIN...END 블록을 사용합니다. GET DIAGNOSTICS 대신 ROW_COUNT() 함수를 사용하세요.

> **채점**: 3번 SELECT 쿼리의 결과로 채점됩니다.`,
    en: `Create and execute a procedure that updates premium customer status.

### Requirements
1. Create a procedure that upgrades customers with total orders above a threshold to premium:
\`\`\`sql
CREATE OR REPLACE PROCEDURE update_premium_customers(threshold DECIMAL)
LANGUAGE plpgsql
AS $$
DECLARE
  updated_count INTEGER;
BEGIN
  UPDATE customers SET is_premium = true
  WHERE id IN (
    SELECT customer_id FROM orders
    GROUP BY customer_id
    HAVING SUM(total_amount) >= threshold
  ) AND is_premium = false;

  GET DIAGNOSTICS updated_count = ROW_COUNT;
  RAISE NOTICE 'Updated % customers to premium', updated_count;
  COMMIT;
END;
$$;
\`\`\`

2. Call the procedure (threshold 500000):
\`\`\`sql
CALL update_premium_customers(500000);
\`\`\`

3. Verify premium customers:
\`\`\`sql
SELECT id, name, email, is_premium
FROM customers
WHERE is_premium = true
ORDER BY name;
\`\`\`

> **MySQL Note**: In MySQL, use DELIMITER and BEGIN...END blocks instead of LANGUAGE plpgsql. Use ROW_COUNT() instead of GET DIAGNOSTICS.

> **Grading**: Based on step 3's SELECT result.`,
  },
  schema: 'ecommerce', category: 'DDL', difficulty: 3,
  hints: {
    ko: ['CREATE OR REPLACE PROCEDURE를 사용합니다.', '프로시저는 CALL 문으로 호출합니다.', 'GET DIAGNOSTICS로 영향받은 행 수를 확인할 수 있습니다.', '프로시저 안에서 COMMIT/ROLLBACK 사용이 가능합니다.'],
    en: ['Use CREATE OR REPLACE PROCEDURE.', 'Call procedures with CALL statement.', 'Use GET DIAGNOSTICS to check affected row count.', 'COMMIT/ROLLBACK can be used inside procedures.'],
  },
  explanation: {
    ko: `## CREATE PROCEDURE (프로시저)

프로시저는 함수와 달리 값을 반환하지 않으며, 트랜잭션 제어가 가능합니다.

### 함수 vs 프로시저
| 구분 | 함수 | 프로시저 |
|------|------|---------|
| 반환값 | 필수 (RETURNS) | 없음 |
| 호출 | SELECT에서 사용 | CALL로 호출 |
| 트랜잭션 | 제어 불가 | COMMIT/ROLLBACK 가능 |

### 핵심 포인트
- **LANGUAGE plpgsql**: 프로시저 언어 지정
- **CALL**: 프로시저 호출 구문 (PG 11+)
- **GET DIAGNOSTICS**: 실행 결과 메타데이터 조회
- **COMMIT**: 프로시저 내 트랜잭션 커밋 가능

### 실무 활용
- 대량 데이터 배치 처리
- 복잡한 비즈니스 로직 캡슐화
- 정기 유지보수 작업 자동화`,
    en: `## CREATE PROCEDURE

Unlike functions, procedures don't return values and can control transactions.

### Function vs Procedure
| Aspect | Function | Procedure |
|--------|----------|-----------|
| Return value | Required (RETURNS) | None |
| Calling | Use in SELECT | CALL |
| Transaction | No control | COMMIT/ROLLBACK |

### Key Points
- **LANGUAGE plpgsql**: Specify procedure language
- **CALL**: Procedure call syntax (PG 11+)
- **GET DIAGNOSTICS**: Query execution metadata
- **COMMIT**: Transaction commit within procedure

### Real-World Uses
- Batch processing large datasets
- Encapsulating complex business logic
- Automating regular maintenance tasks`,
  },
  expectedQuery: {
    postgresql: "SELECT id, name, email, is_premium FROM customers WHERE is_premium = true ORDER BY name;",
    mysql: "SELECT id, name, email, is_premium FROM customers WHERE is_premium = true ORDER BY name;",
  },
  gradingMode: 'exact', relatedConcepts: ['CREATE PROCEDURE', 'CALL', 'COMMIT', 'GET DIAGNOSTICS', 'PL/pgSQL', 'DBA'],
};
