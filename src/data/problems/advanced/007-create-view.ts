import type { Problem } from '@/types/problem';

export const problem: Problem = {
  id: 'advanced-007', level: 'advanced', order: 7,
  title: { ko: 'CREATE VIEW: 고객 주문 요약 뷰', en: 'CREATE VIEW: Customer Order Summary' },
  description: {
    ko: `고객별 주문 요약 정보를 보여주는 **VIEW**를 생성하세요.\n\n### 요구사항\n1. 먼저 아래 \`CREATE VIEW\`문을 실행하세요:\n\`\`\`sql\nCREATE OR REPLACE VIEW customer_order_summary AS\nSELECT c.id AS customer_id, c.name,\n  COUNT(o.id) AS order_count,\n  COALESCE(SUM(o.total_amount), 0) AS total_spent\nFROM customers c\nLEFT JOIN orders o ON c.id = o.customer_id\nGROUP BY c.id, c.name;\n\`\`\`\n\n2. 그 다음, 뷰에서 **total_spent가 높은 상위 10명**을 조회하세요:\n\`\`\`sql\nSELECT * FROM customer_order_summary\nORDER BY total_spent DESC LIMIT 10;\n\`\`\`\n\n> **채점**: 2번 SELECT 쿼리의 결과로 채점됩니다.`,
    en: `Create a **VIEW** showing customer order summaries.\n\n### Requirements\n1. First, run this \`CREATE VIEW\` statement:\n\`\`\`sql\nCREATE OR REPLACE VIEW customer_order_summary AS\nSELECT c.id AS customer_id, c.name,\n  COUNT(o.id) AS order_count,\n  COALESCE(SUM(o.total_amount), 0) AS total_spent\nFROM customers c\nLEFT JOIN orders o ON c.id = o.customer_id\nGROUP BY c.id, c.name;\n\`\`\`\n\n2. Then query the view for **top 10 spenders**:\n\`\`\`sql\nSELECT * FROM customer_order_summary\nORDER BY total_spent DESC LIMIT 10;\n\`\`\`\n\n> **Grading**: Based on the result of step 2's SELECT query.`,
  },
  schema: 'ecommerce', category: 'DDL', difficulty: 2,
  hints: {
    ko: ['CREATE OR REPLACE VIEW로 뷰를 생성/수정합니다.', 'VIEW를 먼저 생성한 뒤 SELECT로 조회합니다.', "SELECT * FROM customer_order_summary ORDER BY total_spent DESC LIMIT 10;"],
    en: ['Use CREATE OR REPLACE VIEW to create/update a view.', 'Create the VIEW first, then query it with SELECT.', "SELECT * FROM customer_order_summary ORDER BY total_spent DESC LIMIT 10;"],
  },
  explanation: {
    ko: `## VIEW (뷰)\n\n뷰는 저장된 SELECT 쿼리입니다. 테이블처럼 조회할 수 있습니다.\n\n\`\`\`sql\n-- 뷰 생성\nCREATE OR REPLACE VIEW customer_order_summary AS\nSELECT c.id AS customer_id, c.name,\n  COUNT(o.id) AS order_count,\n  COALESCE(SUM(o.total_amount), 0) AS total_spent\nFROM customers c\nLEFT JOIN orders o ON c.id = o.customer_id\nGROUP BY c.id, c.name;\n\n-- 뷰 조회\nSELECT * FROM customer_order_summary\nORDER BY total_spent DESC LIMIT 10;\n\`\`\`\n\n### VIEW 장점\n- 복잡한 쿼리를 **간단히 재사용**\n- **보안**: 원본 테이블의 특정 컬럼만 노출\n- **추상화**: 비즈니스 로직을 뷰에 캡슐화\n\n### OR REPLACE\n- 뷰가 이미 존재하면 덮어쓰기\n- DROP + CREATE를 합친 것과 유사`,
    en: `## VIEW\n\nA view is a stored SELECT query that can be queried like a table.\n\n\`\`\`sql\n-- Create view\nCREATE OR REPLACE VIEW customer_order_summary AS\nSELECT c.id AS customer_id, c.name,\n  COUNT(o.id) AS order_count,\n  COALESCE(SUM(o.total_amount), 0) AS total_spent\nFROM customers c\nLEFT JOIN orders o ON c.id = o.customer_id\nGROUP BY c.id, c.name;\n\n-- Query view\nSELECT * FROM customer_order_summary\nORDER BY total_spent DESC LIMIT 10;\n\`\`\`\n\n### VIEW Benefits\n- **Reuse** complex queries easily\n- **Security**: Expose only specific columns\n- **Abstraction**: Encapsulate business logic\n\n### OR REPLACE\n- Overwrites if view already exists\n- Similar to DROP + CREATE combined`,
  },
  expectedQuery: {
    postgresql: "SELECT * FROM customer_order_summary ORDER BY total_spent DESC LIMIT 10;",
    mysql: "SELECT * FROM customer_order_summary ORDER BY total_spent DESC LIMIT 10;",
  },
  gradingMode: 'exact', relatedConcepts: ['CREATE VIEW', 'OR REPLACE', 'DDL', 'COALESCE'],
};
