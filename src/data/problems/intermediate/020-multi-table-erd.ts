import type { Problem } from '@/types/problem';

export const problem: Problem = {
  id: 'intermediate-020',
  level: 'intermediate',
  order: 20,
  title: {
    ko: 'ERD 전체 탐색 — 고객별 주문 상품 카테고리',
    en: 'Full ERD Traversal — Customer Order Product Category',
  },
  description: {
    ko: `ERD를 따라 **customers → orders → order_items → products → categories** 경로로 4번의 JOIN을 수행합니다.\n\n**서울(Seoul)**에 거주하는 고객들이 주문한 상품의 **고객명(customer_name)**, **상품명(product_name)**, **카테고리명(category_name)**을 조회하세요.\n\n중복은 제거하고 고객명 기준 오름차순으로 정렬합니다.`,
    en: `Traverse the full ERD path: **customers → orders → order_items → products → categories** with 4 JOINs.\n\nList the **customer name (customer_name)**, **product name (product_name)**, and **category name (category_name)** for products ordered by customers in **Seoul**.\n\nRemove duplicates and sort by customer name ascending.`,
  },
  schema: 'ecommerce',
  category: 'ERD / JOIN',
  difficulty: 3,
  hints: {
    ko: [
      'customers → orders → order_items → products → categories 순서로 JOIN합니다.',
      'WHERE c.city = \'Seoul\' 조건을 추가하고 DISTINCT로 중복을 제거합니다.',
      "SELECT DISTINCT c.name AS customer_name, p.name AS product_name, cat.name AS category_name FROM customers c JOIN orders o ON c.id = o.customer_id JOIN order_items oi ON o.id = oi.order_id JOIN products p ON oi.product_id = p.id JOIN categories cat ON p.category_id = cat.id WHERE c.city = 'Seoul' ORDER BY c.name;",
    ],
    en: [
      'JOIN in order: customers → orders → order_items → products → categories.',
      "Add WHERE c.city = 'Seoul' and use DISTINCT to remove duplicates.",
      "SELECT DISTINCT c.name AS customer_name, p.name AS product_name, cat.name AS category_name FROM customers c JOIN orders o ON c.id = o.customer_id JOIN order_items oi ON o.id = oi.order_id JOIN products p ON oi.product_id = p.id JOIN categories cat ON p.category_id = cat.id WHERE c.city = 'Seoul' ORDER BY c.name;",
    ],
  },
  explanation: {
    ko: `## ERD 전체 경로 탐색 (Multi-Table JOIN)\n\n실무에서는 3~5개 테이블을 연결하는 JOIN이 흔합니다. ERD를 보고 FK 경로를 따라가세요.\n\n\`\`\`sql\nSELECT DISTINCT\n  c.name AS customer_name,\n  p.name AS product_name,\n  cat.name AS category_name\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nJOIN order_items oi ON o.id = oi.order_id\nJOIN products p ON oi.product_id = p.id\nJOIN categories cat ON p.category_id = cat.id\nWHERE c.city = 'Seoul'\nORDER BY c.name;\n\`\`\`\n\n**ERD 경로**: customers →(1:N)→ orders →(1:N)→ order_items →(N:1)→ products →(N:1)→ categories\n\nJOIN 순서는 ERD의 관계선을 따라가면 자연스럽게 결정됩니다.`,
    en: `## Full ERD Path Traversal (Multi-Table JOIN)\n\nIn practice, JOINs connecting 3-5 tables are common. Follow the FK path on the ERD.\n\n\`\`\`sql\nSELECT DISTINCT\n  c.name AS customer_name,\n  p.name AS product_name,\n  cat.name AS category_name\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nJOIN order_items oi ON o.id = oi.order_id\nJOIN products p ON oi.product_id = p.id\nJOIN categories cat ON p.category_id = cat.id\nWHERE c.city = 'Seoul'\nORDER BY c.name;\n\`\`\`\n\n**ERD path**: customers →(1:N)→ orders →(1:N)→ order_items →(N:1)→ products →(N:1)→ categories\n\nThe JOIN order follows the relationship lines on the ERD naturally.`,
  },
  expectedQuery: {
    postgresql:
      "SELECT DISTINCT c.name AS customer_name, p.name AS product_name, cat.name AS category_name FROM customers c JOIN orders o ON c.id = o.customer_id JOIN order_items oi ON o.id = oi.order_id JOIN products p ON oi.product_id = p.id JOIN categories cat ON p.category_id = cat.id WHERE c.city = 'Seoul' ORDER BY c.name;",
    mysql:
      "SELECT DISTINCT c.name AS customer_name, p.name AS product_name, cat.name AS category_name FROM customers c JOIN orders o ON c.id = o.customer_id JOIN order_items oi ON o.id = oi.order_id JOIN products p ON oi.product_id = p.id JOIN categories cat ON p.category_id = cat.id WHERE c.city = 'Seoul' ORDER BY c.name;",
  },
  gradingMode: 'exact',
  relatedConcepts: ['multi-table JOIN', 'ERD traversal', 'DISTINCT', 'FK path', 'ORDER BY'],
};
