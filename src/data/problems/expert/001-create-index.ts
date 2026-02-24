import type { Problem } from '@/types/problem';

export const problem: Problem = {
  id: 'expert-001', level: 'expert', order: 1,
  title: { ko: 'CREATE INDEX: 주문 조회 인덱스', en: 'CREATE INDEX: Order Lookup Index' },
  description: {
    ko: `주문 조회 성능을 향상시키기 위해 **인덱스**를 생성하세요.\n\n### 요구사항\n1. \`orders\` 테이블의 \`customer_id\`와 \`status\` 컬럼에 복합 인덱스를 생성하세요:\n\`\`\`sql\nCREATE INDEX IF NOT EXISTS idx_orders_customer_status\nON orders(customer_id, status);\n\`\`\`\n\n2. 생성된 인덱스 목록을 확인하세요:\n\`\`\`sql\nSELECT indexname, indexdef\nFROM pg_indexes\nWHERE tablename = 'orders'\nORDER BY indexname;\n\`\`\`\n\n> **채점**: 2번 SELECT 쿼리의 결과로 채점됩니다.`,
    en: `Create an **index** to improve order query performance.\n\n### Requirements\n1. Create a composite index on \`customer_id\` and \`status\` of \`orders\`:\n\`\`\`sql\nCREATE INDEX IF NOT EXISTS idx_orders_customer_status\nON orders(customer_id, status);\n\`\`\`\n\n2. Verify the created indexes:\n\`\`\`sql\nSELECT indexname, indexdef\nFROM pg_indexes\nWHERE tablename = 'orders'\nORDER BY indexname;\n\`\`\`\n\n> **Grading**: Based on the result of step 2's SELECT query.`,
  },
  schema: 'ecommerce', category: 'Index', difficulty: 2,
  hints: {
    ko: ['CREATE INDEX로 인덱스를 생성합니다.', 'pg_indexes 시스템 뷰에서 인덱스 정보를 확인할 수 있습니다.', "SELECT indexname, indexdef FROM pg_indexes WHERE tablename = 'orders' ORDER BY indexname;"],
    en: ['Use CREATE INDEX to create an index.', 'pg_indexes system view shows index information.', "SELECT indexname, indexdef FROM pg_indexes WHERE tablename = 'orders' ORDER BY indexname;"],
  },
  explanation: {
    ko: `## CREATE INDEX\n\n인덱스는 데이터 조회 속도를 향상시키는 데이터 구조입니다.\n\n\`\`\`sql\nCREATE INDEX IF NOT EXISTS idx_orders_customer_status\nON orders(customer_id, status);\n\`\`\`\n\n### 인덱스 유형\n- **B-Tree**: 기본 인덱스 (=, <, >, BETWEEN)\n- **Hash**: 동등 비교 (=)에 최적화\n- **GIN**: 배열, JSONB, 전문 검색\n- **GiST**: 지리 데이터, 범위 검색\n\n### 복합 인덱스\n- 여러 컬럼을 하나의 인덱스로 생성\n- **컬럼 순서 중요**: 가장 왼쪽 컬럼부터 사용됨 (Leftmost Prefix)\n- \`(customer_id, status)\`는 \`WHERE customer_id = ?AND status = ?\` 에 효과적\n\n### 주의사항\n- 인덱스는 INSERT/UPDATE/DELETE 성능을 **저하**시킴\n- 너무 많은 인덱스는 오히려 해로움\n- 선택도(Selectivity)가 높은 컬럼에 생성하는 것이 효과적`,
    en: `## CREATE INDEX\n\nIndexes are data structures that speed up data retrieval.\n\n\`\`\`sql\nCREATE INDEX IF NOT EXISTS idx_orders_customer_status\nON orders(customer_id, status);\n\`\`\`\n\n### Index Types\n- **B-Tree**: Default (=, <, >, BETWEEN)\n- **Hash**: Optimized for equality (=)\n- **GIN**: Arrays, JSONB, full-text search\n- **GiST**: Geospatial, range queries\n\n### Composite Index\n- Multiple columns in one index\n- **Column order matters**: Leftmost prefix rule\n- \`(customer_id, status)\` is effective for \`WHERE customer_id = ? AND status = ?\`\n\n### Caution\n- Indexes **slow down** INSERT/UPDATE/DELETE\n- Too many indexes can be harmful\n- Create on high-selectivity columns`,
  },
  expectedQuery: {
    postgresql: "SELECT indexname, indexdef FROM pg_indexes WHERE tablename = 'orders' ORDER BY indexname;",
    mysql: "SELECT index_name, column_name FROM information_schema.statistics WHERE table_name = 'orders' AND table_schema = DATABASE() ORDER BY index_name, seq_in_index;",
  },
  gradingMode: 'exact', relatedConcepts: ['CREATE INDEX', 'Composite Index', 'B-Tree', 'pg_indexes'],
};
