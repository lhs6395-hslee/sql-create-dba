import type { Problem } from '@/types/problem';

export const problem: Problem = {
  id: 'intermediate-003', level: 'intermediate', order: 3,
  title: { ko: '3개 테이블 조인하기', en: 'Joining Three Tables' },
  description: {
    ko: `\`orders\`, \`order_items\`, \`products\` 테이블을 조인하여 **주문 ID, 상품명, 수량, 단가**를 조회하세요.\n\n### 관계\n- orders.id = order_items.order_id\n- order_items.product_id = products.id`,
    en: `Join \`orders\`, \`order_items\`, and \`products\` to show **order ID, product name, quantity, and unit price**.\n\n### Relationships\n- orders.id = order_items.order_id\n- order_items.product_id = products.id`,
  },
  schema: 'ecommerce', category: 'JOIN', difficulty: 2,
  hints: {
    ko: ['여러 테이블을 조인할 때 JOIN을 연속으로 사용합니다.', 'orders → order_items → products 순서로 조인하세요.', 'SELECT o.id AS order_id, p.name AS product_name, oi.quantity, oi.unit_price FROM orders o JOIN order_items oi ON o.id = oi.order_id JOIN products p ON oi.product_id = p.id;'],
    en: ['Chain multiple JOINs to connect several tables.', 'Join in order: orders → order_items → products.', 'SELECT o.id AS order_id, p.name AS product_name, oi.quantity, oi.unit_price FROM orders o JOIN order_items oi ON o.id = oi.order_id JOIN products p ON oi.product_id = p.id;'],
  },
  explanation: {
    ko: `## 다중 테이블 JOIN\n\n3개 이상의 테이블을 조인할 때는 \`JOIN\`을 연속으로 사용합니다.\n\n\`\`\`sql\nSELECT o.id AS order_id, p.name AS product_name, oi.quantity, oi.unit_price\nFROM orders o\nJOIN order_items oi ON o.id = oi.order_id\nJOIN products p ON oi.product_id = p.id;\n\`\`\`\n\n> **팁**: 조인 순서는 논리적 관계를 따라가면 이해하기 쉽습니다.`,
    en: `## Multi-table JOIN\n\nChain \`JOIN\` statements to connect 3+ tables.\n\n\`\`\`sql\nSELECT o.id AS order_id, p.name AS product_name, oi.quantity, oi.unit_price\nFROM orders o\nJOIN order_items oi ON o.id = oi.order_id\nJOIN products p ON oi.product_id = p.id;\n\`\`\`\n\n> **Tip**: Follow logical relationships when ordering JOINs.`,
  },
  expectedQuery: {
    postgresql: 'SELECT o.id AS order_id, p.name AS product_name, oi.quantity, oi.unit_price FROM orders o JOIN order_items oi ON o.id = oi.order_id JOIN products p ON oi.product_id = p.id;',
    mysql: 'SELECT o.id AS order_id, p.name AS product_name, oi.quantity, oi.unit_price FROM orders o JOIN order_items oi ON o.id = oi.order_id JOIN products p ON oi.product_id = p.id;',
  },
  gradingMode: 'unordered', relatedConcepts: ['multi-table JOIN', 'foreign key', 'alias'],
};
