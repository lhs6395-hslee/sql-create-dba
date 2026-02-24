import type { Problem } from '@/types/problem';

export const problem: Problem = {
  id: 'intermediate-001',
  level: 'intermediate',
  order: 1,
  title: {
    ko: 'INNER JOIN으로 주문 조회하기',
    en: 'Query Orders with INNER JOIN',
  },
  description: {
    ko: `\`orders\` 테이블과 \`customers\` 테이블을 **INNER JOIN**하여, 각 주문의 **주문 ID, 고객 이름, 주문 날짜, 총 금액**을 조회하세요.

### 테이블 구조

**orders**
| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | INTEGER | 주문 ID |
| customer_id | INTEGER | 고객 ID (FK) |
| order_date | TIMESTAMP | 주문 날짜 |
| status | VARCHAR | 주문 상태 |
| total_amount | DECIMAL | 총 금액 |

**customers**
| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | INTEGER | 고객 ID |
| name | VARCHAR | 고객 이름 |

### 기대 결과
주문 ID, 고객 이름, 주문 날짜, 총 금액이 출력되어야 합니다.`,
    en: `Use **INNER JOIN** to combine the \`orders\` and \`customers\` tables. Retrieve the **order ID, customer name, order date, and total amount** for each order.

### Table Schema

**orders**
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Order ID |
| customer_id | INTEGER | Customer ID (FK) |
| order_date | TIMESTAMP | Order date |
| status | VARCHAR | Order status |
| total_amount | DECIMAL | Total amount |

**customers**
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Customer ID |
| name | VARCHAR | Customer name |

### Expected Result
Output should include order ID, customer name, order date, and total amount.`,
  },
  schema: 'ecommerce',
  category: 'JOIN',
  difficulty: 1,
  hints: {
    ko: [
      'INNER JOIN은 두 테이블에서 조건이 일치하는 행만 결합합니다.',
      'JOIN ... ON 구문으로 두 테이블의 관계를 지정합니다.',
      'SELECT o.id, c.name, o.order_date, o.total_amount FROM orders o INNER JOIN customers c ON o.customer_id = c.id;',
    ],
    en: [
      'INNER JOIN combines rows from two tables where the condition matches.',
      'Use JOIN ... ON to specify the relationship between tables.',
      'SELECT o.id, c.name, o.order_date, o.total_amount FROM orders o INNER JOIN customers c ON o.customer_id = c.id;',
    ],
  },
  explanation: {
    ko: `## INNER JOIN

\`INNER JOIN\`은 두 테이블에서 **조인 조건이 일치하는 행만** 결합하여 반환합니다.

\`\`\`sql
SELECT o.id, c.name, o.order_date, o.total_amount
FROM orders o
INNER JOIN customers c ON o.customer_id = c.id;
\`\`\`

### 핵심 개념
- \`INNER JOIN\`: 양쪽 테이블에 모두 존재하는 데이터만 반환
- \`ON\`: 조인 조건을 지정 (보통 FK = PK 관계)
- **별칭(Alias)**: \`orders o\`, \`customers c\`처럼 테이블에 짧은 이름을 부여

> **팁**: \`INNER JOIN\`에서 \`INNER\`는 생략 가능합니다. \`JOIN\`만 써도 동일하게 동작합니다.`,
    en: `## INNER JOIN

\`INNER JOIN\` combines rows from two tables where the **join condition matches**.

\`\`\`sql
SELECT o.id, c.name, o.order_date, o.total_amount
FROM orders o
INNER JOIN customers c ON o.customer_id = c.id;
\`\`\`

### Key Concepts
- \`INNER JOIN\`: Returns only rows that exist in both tables
- \`ON\`: Specifies the join condition (usually FK = PK relationship)
- **Aliases**: Short names like \`orders o\`, \`customers c\`

> **Tip**: The \`INNER\` keyword is optional. \`JOIN\` alone works the same way.`,
  },
  expectedQuery: {
    postgresql: 'SELECT o.id, c.name, o.order_date, o.total_amount FROM orders o INNER JOIN customers c ON o.customer_id = c.id;',
    mysql: 'SELECT o.id, c.name, o.order_date, o.total_amount FROM orders o INNER JOIN customers c ON o.customer_id = c.id;',
  },
  gradingMode: 'unordered',
  relatedConcepts: ['INNER JOIN', 'ON', 'alias', 'foreign key'],
};
