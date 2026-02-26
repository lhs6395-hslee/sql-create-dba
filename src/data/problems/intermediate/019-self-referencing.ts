import type { Problem } from '@/types/problem';

export const problem: Problem = {
  id: 'intermediate-019',
  level: 'intermediate',
  order: 19,
  title: {
    ko: '자기참조 관계 — 카테고리 계층',
    en: 'Self-Referencing — Category Hierarchy',
  },
  description: {
    ko: `\`categories\` 테이블은 **parent_id**로 자기 자신을 참조하는 **자기참조(Self-Referencing) 관계**를 가집니다.\n\n모든 하위 카테고리의 **카테고리명(name)**과 **상위 카테고리명(parent_name)**을 조회하세요.\n\n상위 카테고리가 없는 최상위 카테고리는 제외합니다.`,
    en: `The \`categories\` table has a **self-referencing relationship** through **parent_id**.\n\nList the **category name** and its **parent category name (parent_name)** for all subcategories.\n\nExclude top-level categories (those without a parent).`,
  },
  schema: 'ecommerce',
  category: 'ERD / JOIN',
  difficulty: 2,
  hints: {
    ko: [
      'categories 테이블을 자기 자신과 JOIN해야 합니다 (Self JOIN).',
      'parent_id가 NULL이 아닌 행만 선택하면 하위 카테고리만 나옵니다.',
      'SELECT c.name, p.name AS parent_name FROM categories c JOIN categories p ON c.parent_id = p.id WHERE c.parent_id IS NOT NULL;',
    ],
    en: [
      'You need to JOIN the categories table with itself (Self JOIN).',
      'Filter rows where parent_id IS NOT NULL to get only subcategories.',
      'SELECT c.name, p.name AS parent_name FROM categories c JOIN categories p ON c.parent_id = p.id WHERE c.parent_id IS NOT NULL;',
    ],
  },
  explanation: {
    ko: `## 자기참조(Self-Referencing) 관계\n\nSelf JOIN은 같은 테이블을 서로 다른 별칭으로 두 번 사용합니다.\n\n\`\`\`sql\nSELECT c.name, p.name AS parent_name\nFROM categories c\nJOIN categories p ON c.parent_id = p.id\nWHERE c.parent_id IS NOT NULL;\n\`\`\`\n\n**ERD 관점**: categories 테이블이 자기 자신의 id를 parent_id FK로 참조합니다.\n\n이 패턴은 조직도, 댓글 대댓글, 파일 폴더 구조 등에 널리 사용됩니다.`,
    en: `## Self-Referencing Relationship\n\nA Self JOIN uses the same table twice with different aliases.\n\n\`\`\`sql\nSELECT c.name, p.name AS parent_name\nFROM categories c\nJOIN categories p ON c.parent_id = p.id\nWHERE c.parent_id IS NOT NULL;\n\`\`\`\n\n**ERD perspective**: The categories table references its own id through the parent_id FK.\n\nThis pattern is widely used for org charts, threaded comments, file/folder structures, etc.`,
  },
  expectedQuery: {
    postgresql:
      'SELECT c.name, p.name AS parent_name FROM categories c JOIN categories p ON c.parent_id = p.id WHERE c.parent_id IS NOT NULL;',
    mysql:
      'SELECT c.name, p.name AS parent_name FROM categories c JOIN categories p ON c.parent_id = p.id WHERE c.parent_id IS NOT NULL;',
  },
  gradingMode: 'unordered',
  relatedConcepts: ['self-referencing', 'Self JOIN', 'ERD', 'parent_id', 'hierarchy'],
};
