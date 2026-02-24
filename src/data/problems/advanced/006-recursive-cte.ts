import type { Problem } from '@/types/problem';

export const problem: Problem = {
  id: 'advanced-006', level: 'advanced', order: 6,
  title: { ko: '재귀 CTE: 카테고리 계층 구조', en: 'Recursive CTE: Category Hierarchy' },
  description: {
    ko: `재귀 CTE를 사용하여 카테고리의 **계층 구조(부모-자식)**를 조회하세요.\n\n### 요구사항\n- \`categories\` 테이블의 \`parent_id\`를 활용\n- 최상위 카테고리(parent_id IS NULL)부터 시작하여 하위 카테고리까지 탐색\n- 컬럼: \`id\`, \`name\`, \`parent_id\`, \`depth\` (계층 깊이, 최상위=0)\n- \`depth\` 오름차순, \`id\` 오름차순 정렬`,
    en: `Use a recursive CTE to display the **category hierarchy** (parent-child).\n\n### Requirements\n- Use \`parent_id\` in \`categories\` table\n- Start from root categories (parent_id IS NULL)\n- Columns: \`id\`, \`name\`, \`parent_id\`, \`depth\` (hierarchy level, root=0)\n- Sort by \`depth\` ASC, \`id\` ASC`,
  },
  schema: 'ecommerce', category: 'CTE', difficulty: 3,
  hints: {
    ko: ['WITH RECURSIVE를 사용하여 재귀 CTE를 정의합니다.', '기저 조건(Base): parent_id IS NULL, 재귀 조건: JOIN으로 자식 카테고리 탐색.', "WITH RECURSIVE category_tree AS (SELECT id, name, parent_id, 0 AS depth FROM categories WHERE parent_id IS NULL UNION ALL SELECT c.id, c.name, c.parent_id, ct.depth + 1 FROM categories c JOIN category_tree ct ON c.parent_id = ct.id) SELECT id, name, parent_id, depth FROM category_tree ORDER BY depth, id;"],
    en: ['Use WITH RECURSIVE to define a recursive CTE.', 'Base case: parent_id IS NULL. Recursive: JOIN child categories.', "WITH RECURSIVE category_tree AS (SELECT id, name, parent_id, 0 AS depth FROM categories WHERE parent_id IS NULL UNION ALL SELECT c.id, c.name, c.parent_id, ct.depth + 1 FROM categories c JOIN category_tree ct ON c.parent_id = ct.id) SELECT id, name, parent_id, depth FROM category_tree ORDER BY depth, id;"],
  },
  explanation: {
    ko: `## 재귀 CTE (Recursive CTE)\n\n자기 자신을 참조하여 계층 데이터를 탐색합니다.\n\n\`\`\`sql\nWITH RECURSIVE category_tree AS (\n  -- Base case: 최상위 카테고리\n  SELECT id, name, parent_id, 0 AS depth\n  FROM categories\n  WHERE parent_id IS NULL\n  \n  UNION ALL\n  \n  -- Recursive: 자식 카테고리 탐색\n  SELECT c.id, c.name, c.parent_id, ct.depth + 1\n  FROM categories c\n  JOIN category_tree ct ON c.parent_id = ct.id\n)\nSELECT id, name, parent_id, depth\nFROM category_tree\nORDER BY depth, id;\n\`\`\`\n\n### 구조\n1. **기저 조건** (Base Case): 재귀의 시작점\n2. **UNION ALL**: 기저 + 재귀 결과 결합\n3. **재귀 조건**: 자기 자신을 JOIN하여 확장\n\n### 주의사항\n- 무한 루프 방지를 위해 데이터에 순환 참조가 없어야 함\n- PostgreSQL은 기본적으로 무한 재귀 방지 없음 (MAXRECURSION 없음)`,
    en: `## Recursive CTE\n\nReferences itself to traverse hierarchical data.\n\n\`\`\`sql\nWITH RECURSIVE category_tree AS (\n  -- Base case: root categories\n  SELECT id, name, parent_id, 0 AS depth\n  FROM categories\n  WHERE parent_id IS NULL\n  \n  UNION ALL\n  \n  -- Recursive: find children\n  SELECT c.id, c.name, c.parent_id, ct.depth + 1\n  FROM categories c\n  JOIN category_tree ct ON c.parent_id = ct.id\n)\nSELECT id, name, parent_id, depth\nFROM category_tree\nORDER BY depth, id;\n\`\`\`\n\n### Structure\n1. **Base Case**: Starting point of recursion\n2. **UNION ALL**: Combines base + recursive results\n3. **Recursive Term**: JOINs back to itself to expand\n\n### Caution\n- Data must not have circular references (infinite loops)\n- PostgreSQL has no default MAXRECURSION limit`,
  },
  expectedQuery: {
    postgresql: "WITH RECURSIVE category_tree AS (SELECT id, name, parent_id, 0 AS depth FROM categories WHERE parent_id IS NULL UNION ALL SELECT c.id, c.name, c.parent_id, ct.depth + 1 FROM categories c JOIN category_tree ct ON c.parent_id = ct.id) SELECT id, name, parent_id, depth FROM category_tree ORDER BY depth, id;",
    mysql: "WITH RECURSIVE category_tree AS (SELECT id, name, parent_id, 0 AS depth FROM categories WHERE parent_id IS NULL UNION ALL SELECT c.id, c.name, c.parent_id, ct.depth + 1 FROM categories c JOIN category_tree ct ON c.parent_id = ct.id) SELECT id, name, parent_id, depth FROM category_tree ORDER BY depth, id;",
  },
  gradingMode: 'exact', relatedConcepts: ['Recursive CTE', 'WITH RECURSIVE', 'UNION ALL', 'Hierarchy'],
};
