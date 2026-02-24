import type { Problem } from '@/types/problem';

export const problem: Problem = {
  id: 'intermediate-008', level: 'intermediate', order: 8,
  title: { ko: 'UPDATE로 데이터 수정하기', en: 'Update Data with UPDATE' },
  description: {
    ko: `\`products\` 테이블에서 **카테고리 6번(Smartphones)**의 모든 제품 재고를 **50개 추가**하세요.\n\n\`stock_quantity\`를 현재 값에서 50 증가시켜야 합니다.\n\n> **주의**: UPDATE 문은 데이터를 실제로 수정합니다. WHERE 절을 빼먹으면 모든 행이 변경됩니다!`,
    en: `Add **50 units** to the stock of all **Smartphones (category_id=6)** in the \`products\` table.\n\nIncrease \`stock_quantity\` by 50 from its current value.\n\n> **Warning**: UPDATE modifies real data. Forgetting WHERE updates ALL rows!`,
  },
  schema: 'ecommerce', category: 'DML', difficulty: 2,
  hints: {
    ko: ['UPDATE 테이블 SET 컬럼 = 새값 WHERE 조건 구문을 사용합니다.', '현재 값에 더하려면 stock_quantity = stock_quantity + 50 으로 작성합니다.', 'UPDATE products SET stock_quantity = stock_quantity + 50 WHERE category_id = 6;'],
    en: ['Use UPDATE table SET column = value WHERE condition.', 'To add to current value: stock_quantity = stock_quantity + 50.', 'UPDATE products SET stock_quantity = stock_quantity + 50 WHERE category_id = 6;'],
  },
  explanation: {
    ko: `## UPDATE\n\n기존 데이터를 수정하는 DML 명령어입니다.\n\n\`\`\`sql\nUPDATE products\nSET stock_quantity = stock_quantity + 50\nWHERE category_id = 6;\n\`\`\`\n\n### WHERE 절의 중요성\n- WHERE 없이 실행하면 **모든 행**이 수정됩니다\n- 실무에서는 UPDATE 전에 SELECT로 대상 행을 먼저 확인하는 습관이 중요합니다\n- DBA는 실수 방지를 위해 트랜잭션(BEGIN/ROLLBACK) 사용을 권장합니다`,
    en: `## UPDATE\n\nDML command to modify existing data.\n\n\`\`\`sql\nUPDATE products\nSET stock_quantity = stock_quantity + 50\nWHERE category_id = 6;\n\`\`\`\n\n### Importance of WHERE\n- Without WHERE, **all rows** are modified\n- Always verify target rows with SELECT before UPDATE\n- DBAs recommend using transactions (BEGIN/ROLLBACK) to prevent mistakes`,
  },
  expectedQuery: {
    postgresql: 'UPDATE products SET stock_quantity = stock_quantity + 50 WHERE category_id = 6;',
    mysql: 'UPDATE products SET stock_quantity = stock_quantity + 50 WHERE category_id = 6;',
  },
  gradingMode: 'contains', relatedConcepts: ['UPDATE', 'SET', 'WHERE', 'DML'],
};
