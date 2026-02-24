import type { Problem } from '@/types/problem';

export const problem: Problem = {
  id: 'expert-003', level: 'expert', order: 3,
  title: { ko: '트랜잭션: 주문 상태 일괄 변경', en: 'Transaction: Batch Order Status Update' },
  description: {
    ko: `**트랜잭션**을 사용하여 처리중(processing) 주문을 배송됨(shipped)으로 일괄 변경하고, 변경 결과를 확인하세요.\n\n### 요구사항\n아래 트랜잭션을 실행하세요 (전문가 레벨은 복수 문장 허용):\n\`\`\`sql\nBEGIN;\nUPDATE orders SET status = 'shipped' WHERE status = 'processing';\nSELECT id, customer_id, status, total_amount\nFROM orders WHERE status = 'shipped'\nORDER BY id DESC LIMIT 10;\nCOMMIT;\n\`\`\`\n\n> **참고**: BEGIN과 COMMIT 사이의 모든 작업은 하나의 원자적 단위로 처리됩니다.\n> 중간에 오류가 발생하면 ROLLBACK으로 되돌릴 수 있습니다.`,
    en: `Use a **transaction** to batch update processing orders to shipped, then verify.\n\n### Requirements\nRun this transaction (expert level allows multiple statements):\n\`\`\`sql\nBEGIN;\nUPDATE orders SET status = 'shipped' WHERE status = 'processing';\nSELECT id, customer_id, status, total_amount\nFROM orders WHERE status = 'shipped'\nORDER BY id DESC LIMIT 10;\nCOMMIT;\n\`\`\`\n\n> **Note**: All operations between BEGIN and COMMIT are atomic.\n> If an error occurs, ROLLBACK undoes all changes.`,
  },
  schema: 'ecommerce', category: 'Transaction', difficulty: 3,
  hints: {
    ko: ['BEGIN으로 트랜잭션을 시작하고, COMMIT으로 확정합니다.', 'ROLLBACK을 사용하면 BEGIN 이후의 모든 변경을 취소할 수 있습니다.', "BEGIN; UPDATE orders SET status = 'shipped' WHERE status = 'processing'; SELECT id, customer_id, status, total_amount FROM orders WHERE status = 'shipped' ORDER BY id DESC LIMIT 10; COMMIT;"],
    en: ['Begin with BEGIN, finalize with COMMIT.', 'ROLLBACK undoes all changes since BEGIN.', "BEGIN; UPDATE orders SET status = 'shipped' WHERE status = 'processing'; SELECT id, customer_id, status, total_amount FROM orders WHERE status = 'shipped' ORDER BY id DESC LIMIT 10; COMMIT;"],
  },
  explanation: {
    ko: `## 트랜잭션 (Transaction)\n\n여러 SQL 문을 하나의 논리적 작업 단위로 묶습니다.\n\n\`\`\`sql\nBEGIN;\n  UPDATE orders SET status = 'shipped'\n  WHERE status = 'processing';\n  \n  SELECT id, customer_id, status, total_amount\n  FROM orders WHERE status = 'shipped'\n  ORDER BY id DESC LIMIT 10;\nCOMMIT;\n\`\`\`\n\n### ACID 속성\n- **Atomicity** (원자성): 전부 성공 또는 전부 실패\n- **Consistency** (일관성): 제약조건 유지\n- **Isolation** (격리성): 동시 트랜잭션 간 간섭 방지\n- **Durability** (지속성): COMMIT 후 영구 저장\n\n### 주요 명령어\n| 명령 | 설명 |\n|------|------|\n| BEGIN | 트랜잭션 시작 |\n| COMMIT | 변경사항 확정 |\n| ROLLBACK | 변경사항 취소 |\n| SAVEPOINT | 중간 저장점 생성 |`,
    en: `## Transaction\n\nGroups multiple SQL statements into one logical unit of work.\n\n\`\`\`sql\nBEGIN;\n  UPDATE orders SET status = 'shipped'\n  WHERE status = 'processing';\n  \n  SELECT id, customer_id, status, total_amount\n  FROM orders WHERE status = 'shipped'\n  ORDER BY id DESC LIMIT 10;\nCOMMIT;\n\`\`\`\n\n### ACID Properties\n- **Atomicity**: All or nothing\n- **Consistency**: Constraints maintained\n- **Isolation**: No interference between concurrent transactions\n- **Durability**: Committed data persists\n\n### Key Commands\n| Command | Description |\n|---------|-------------|\n| BEGIN | Start transaction |\n| COMMIT | Finalize changes |\n| ROLLBACK | Undo changes |\n| SAVEPOINT | Create intermediate checkpoint |`,
  },
  expectedQuery: {
    postgresql: "SELECT id, customer_id, status, total_amount FROM orders WHERE status = 'shipped' ORDER BY id DESC LIMIT 10;",
    mysql: "SELECT id, customer_id, status, total_amount FROM orders WHERE status = 'shipped' ORDER BY id DESC LIMIT 10;",
  },
  gradingMode: 'contains', relatedConcepts: ['BEGIN', 'COMMIT', 'ROLLBACK', 'Transaction', 'ACID'],
};
