import type { Problem } from '@/types/problem';

export const problem: Problem = {
  id: 'intermediate-018',
  level: 'intermediate',
  order: 18,
  title: {
    ko: 'N:M 관계 — 주문별 상품 목록',
    en: 'N:M Relationship — Products per Order',
  },
  description: {
    ko: `\`orders\`와 \`products\`는 \`order_items\` 중간 테이블을 통한 **N:M 관계**입니다.\n\n**주문 ID 1**에 포함된 모든 상품의 **상품명(name)**, **수량(quantity)**, **단가(unit_price)**를 조회하세요.`,
    en: `\`orders\` and \`products\` have an **N:M relationship** through the \`order_items\` junction table.\n\nList the **product name**, **quantity**, and **unit_price** for all items in **order ID 1**.`,
  },
  schema: 'ecommerce',
  category: 'ERD / JOIN',
  difficulty: 2,
  hints: {
    ko: [
      'order_items는 orders와 products를 연결하는 중간 테이블입니다.',
      'order_items에서 products로 JOIN하면 상품명을 가져올 수 있습니다.',
      'SELECT p.name, oi.quantity, oi.unit_price FROM order_items oi JOIN products p ON oi.product_id = p.id WHERE oi.order_id = 1;',
    ],
    en: [
      'order_items is the junction table connecting orders and products.',
      'JOIN order_items to products to get the product name.',
      'SELECT p.name, oi.quantity, oi.unit_price FROM order_items oi JOIN products p ON oi.product_id = p.id WHERE oi.order_id = 1;',
    ],
  },
  explanation: {
    ko: `## N:M 관계 조회\n\nN:M 관계는 중간 테이블(Junction Table)을 통해 2번의 JOIN으로 조회합니다.\n\n\`\`\`sql\nSELECT p.name, oi.quantity, oi.unit_price\nFROM order_items oi\nJOIN products p ON oi.product_id = p.id\nWHERE oi.order_id = 1;\n\`\`\`\n\n**ERD 관점**: orders --1:N--> order_items <--N:1-- products\n\n중간 테이블이 양쪽의 FK를 모두 보유하여 N:M 관계를 표현합니다.`,
    en: `## N:M Relationship Query\n\nN:M relationships are queried through a junction table with 2 JOINs.\n\n\`\`\`sql\nSELECT p.name, oi.quantity, oi.unit_price\nFROM order_items oi\nJOIN products p ON oi.product_id = p.id\nWHERE oi.order_id = 1;\n\`\`\`\n\n**ERD perspective**: orders --1:N--> order_items <--N:1-- products\n\nThe junction table holds FKs to both sides, expressing the N:M relationship.`,
  },
  expectedQuery: {
    postgresql:
      'SELECT p.name, oi.quantity, oi.unit_price FROM order_items oi JOIN products p ON oi.product_id = p.id WHERE oi.order_id = 1;',
    mysql:
      'SELECT p.name, oi.quantity, oi.unit_price FROM order_items oi JOIN products p ON oi.product_id = p.id WHERE oi.order_id = 1;',
  },
  gradingMode: 'unordered',
  relatedConcepts: ['N:M relationship', 'junction table', 'JOIN', 'ERD', 'order_items'],
};
