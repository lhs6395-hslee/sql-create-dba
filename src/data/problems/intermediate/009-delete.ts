import type { Problem } from '@/types/problem';

export const problem: Problem = {
  id: 'intermediate-009', level: 'intermediate', order: 9,
  title: { ko: 'DELETE로 데이터 삭제하기', en: 'Delete Data with DELETE' },
  description: {
    ko: `\`orders\` 테이블에서 **상태가 'cancelled'인 모든 주문**을 삭제하세요.\n\n> **주의**: DELETE는 데이터를 영구 삭제합니다. 실무에서는 반드시 WHERE 조건을 확인하세요!\n> **참고**: 외래 키(FK) 제약조건으로 인해 order_items가 있는 주문은 삭제가 실패할 수 있습니다. 이 문제에서는 개념 학습에 집중하세요.`,
    en: `Delete all orders with **status = 'cancelled'** from the \`orders\` table.\n\n> **Warning**: DELETE permanently removes data. Always verify your WHERE condition!\n> **Note**: Foreign key constraints may prevent deletion of orders with order_items. Focus on the concept here.`,
  },
  schema: 'ecommerce', category: 'DML', difficulty: 2,
  hints: {
    ko: ['DELETE FROM 테이블 WHERE 조건 구문을 사용합니다.', "상태가 cancelled인 행만 삭제해야 합니다.", "DELETE FROM orders WHERE status = 'cancelled';"],
    en: ['Use DELETE FROM table WHERE condition.', "Only delete rows where status is 'cancelled'.", "DELETE FROM orders WHERE status = 'cancelled';"],
  },
  explanation: {
    ko: `## DELETE\n\n테이블에서 행을 삭제하는 DML 명령어입니다.\n\n\`\`\`sql\nDELETE FROM orders WHERE status = 'cancelled';\n\`\`\`\n\n### DML 3형제 비교\n| 명령어 | 용도 | 위험도 |\n|--------|------|--------|\n| INSERT | 추가 | 낮음 |\n| UPDATE | 수정 | 중간 |\n| DELETE | 삭제 | 높음 |\n\n### DBA 관점\n- DELETE 전에 항상 SELECT로 대상 확인\n- 트랜잭션 사용: \`BEGIN; DELETE ...; ROLLBACK;\` 으로 먼저 테스트\n- FK 제약조건이 있으면 자식 테이블 데이터를 먼저 삭제해야 합니다`,
    en: `## DELETE\n\nDML command to remove rows from a table.\n\n\`\`\`sql\nDELETE FROM orders WHERE status = 'cancelled';\n\`\`\`\n\n### DML Commands Comparison\n| Command | Purpose | Risk |\n|---------|---------|------|\n| INSERT | Add | Low |\n| UPDATE | Modify | Medium |\n| DELETE | Remove | High |\n\n### DBA Perspective\n- Always SELECT before DELETE to verify targets\n- Use transactions: \`BEGIN; DELETE ...; ROLLBACK;\` to test first\n- FK constraints require deleting child table data first`,
  },
  expectedQuery: {
    postgresql: "DELETE FROM orders WHERE status = 'cancelled';",
    mysql: "DELETE FROM orders WHERE status = 'cancelled';",
  },
  gradingMode: 'contains', relatedConcepts: ['DELETE', 'WHERE', 'DML', 'foreign key'],
};
