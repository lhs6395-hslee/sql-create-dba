import type { Problem } from '@/types/problem';

export const problem: Problem = {
  id: 'beginner-012', level: 'beginner', order: 12,
  title: { ko: 'UPDATE: 제품 가격 수정', en: 'UPDATE: Modify Product Price' },
  description: {
    ko: `\`products\` 테이블에서 **'SQL in 10 Minutes'** 도서의 가격을 **30000**으로 변경하세요.\n\n### UPDATE 기본 구문\n\`\`\`sql\nUPDATE 테이블\nSET 컬럼 = 새값\nWHERE 조건;\n\`\`\`\n\n> **주의**: WHERE 없이 UPDATE하면 **모든 행**이 변경됩니다!\n> 반드시 WHERE 조건을 작성하세요.`,
    en: `Change the price of **'SQL in 10 Minutes'** to **30000** in the \`products\` table.\n\n### UPDATE Basic Syntax\n\`\`\`sql\nUPDATE table\nSET column = new_value\nWHERE condition;\n\`\`\`\n\n> **Warning**: UPDATE without WHERE changes **all rows**!\n> Always include a WHERE clause.`,
  },
  schema: 'ecommerce', category: 'DML', difficulty: 1,
  hints: {
    ko: ["UPDATE products SET price = ... WHERE name = '...' 구문을 사용하세요.", "WHERE 조건에 name = 'SQL in 10 Minutes'를 사용합니다.", "UPDATE products SET price = 30000 WHERE name = 'SQL in 10 Minutes';"],
    en: ["Use UPDATE products SET price = ... WHERE name = '...'.","Use WHERE name = 'SQL in 10 Minutes'.", "UPDATE products SET price = 30000 WHERE name = 'SQL in 10 Minutes';"],
  },
  explanation: {
    ko: `## UPDATE\n\n기존 데이터를 수정하는 명령어입니다.\n\n\`\`\`sql\nUPDATE products\nSET price = 30000\nWHERE name = 'SQL in 10 Minutes';\n\`\`\`\n\n### 핵심 포인트\n- **SET**: 변경할 컬럼과 새 값 지정\n- **WHERE**: 변경 대상 행을 특정 (필수!)\n- 여러 컬럼을 동시에 변경: \`SET col1 = val1, col2 = val2\`\n\n### WHERE 없는 UPDATE의 위험\n\`\`\`sql\n-- 위험! 모든 제품의 가격이 30000으로 변경됨\nUPDATE products SET price = 30000;\n\`\`\`\n\n실무에서는 항상 먼저 SELECT로 대상을 확인한 후 UPDATE를 실행합니다.`,
    en: `## UPDATE\n\nModifies existing data in a table.\n\n\`\`\`sql\nUPDATE products\nSET price = 30000\nWHERE name = 'SQL in 10 Minutes';\n\`\`\`\n\n### Key Points\n- **SET**: Column and new value\n- **WHERE**: Filter rows to update (essential!)\n- Multiple columns: \`SET col1 = val1, col2 = val2\`\n\n### Danger of UPDATE Without WHERE\n\`\`\`sql\n-- Dangerous! Changes ALL product prices to 30000\nUPDATE products SET price = 30000;\n\`\`\`\n\nIn practice, always verify with SELECT first before running UPDATE.`,
  },
  expectedQuery: {
    postgresql: "UPDATE products SET price = 30000 WHERE name = 'SQL in 10 Minutes';",
    mysql: "UPDATE products SET price = 30000 WHERE name = 'SQL in 10 Minutes';",
  },
  gradingMode: 'contains', relatedConcepts: ['UPDATE', 'SET', 'WHERE', 'DML'],
};
