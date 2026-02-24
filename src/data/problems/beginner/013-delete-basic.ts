import type { Problem } from '@/types/problem';

export const problem: Problem = {
  id: 'beginner-013', level: 'beginner', order: 13,
  title: { ko: 'DELETE: 리뷰 삭제', en: 'DELETE: Remove a Review' },
  description: {
    ko: `\`reviews\` 테이블에서 **평점(rating)이 1점**인 리뷰를 모두 삭제하세요.\n\n### DELETE 기본 구문\n\`\`\`sql\nDELETE FROM 테이블\nWHERE 조건;\n\`\`\`\n\n> **주의**: WHERE 없이 DELETE하면 **모든 행**이 삭제됩니다!\n> 반드시 WHERE 조건을 작성하세요.`,
    en: `Delete all reviews with **rating = 1** from the \`reviews\` table.\n\n### DELETE Basic Syntax\n\`\`\`sql\nDELETE FROM table\nWHERE condition;\n\`\`\`\n\n> **Warning**: DELETE without WHERE removes **all rows**!\n> Always include a WHERE clause.`,
  },
  schema: 'ecommerce', category: 'DML', difficulty: 1,
  hints: {
    ko: ['DELETE FROM reviews WHERE 조건 구문을 사용하세요.', 'WHERE rating = 1 조건으로 1점 리뷰만 삭제합니다.', 'DELETE FROM reviews WHERE rating = 1;'],
    en: ['Use DELETE FROM reviews WHERE condition.', 'Use WHERE rating = 1 to target 1-star reviews.', 'DELETE FROM reviews WHERE rating = 1;'],
  },
  explanation: {
    ko: `## DELETE\n\n테이블에서 행을 삭제하는 명령어입니다.\n\n\`\`\`sql\nDELETE FROM reviews\nWHERE rating = 1;\n\`\`\`\n\n### 핵심 포인트\n- **DELETE FROM**: 삭제 대상 테이블 지정\n- **WHERE**: 삭제 조건 (반드시 작성!)\n- 결과에 "N rows affected"가 표시됨\n\n### DELETE vs TRUNCATE\n| 명령 | 설명 |\n|------|------|\n| DELETE | 조건부 삭제, 행 단위, 롤백 가능 |\n| TRUNCATE | 전체 삭제, 빠름, 롤백 어려움 |\n\n### 안전한 삭제 절차\n1. 먼저 \`SELECT * FROM reviews WHERE rating = 1;\`로 대상 확인\n2. 확인 후 \`DELETE FROM reviews WHERE rating = 1;\` 실행`,
    en: `## DELETE\n\nRemoves rows from a table.\n\n\`\`\`sql\nDELETE FROM reviews\nWHERE rating = 1;\n\`\`\`\n\n### Key Points\n- **DELETE FROM**: Target table\n- **WHERE**: Deletion condition (essential!)\n- Shows "N rows affected" in result\n\n### DELETE vs TRUNCATE\n| Command | Description |\n|---------|-------------|\n| DELETE | Conditional, row-by-row, rollback possible |\n| TRUNCATE | All rows, fast, hard to rollback |\n\n### Safe Deletion Process\n1. First verify: \`SELECT * FROM reviews WHERE rating = 1;\`\n2. Then delete: \`DELETE FROM reviews WHERE rating = 1;\``,
  },
  expectedQuery: {
    postgresql: 'DELETE FROM reviews WHERE rating = 1;',
    mysql: 'DELETE FROM reviews WHERE rating = 1;',
  },
  gradingMode: 'contains', relatedConcepts: ['DELETE', 'WHERE', 'DML'],
};
