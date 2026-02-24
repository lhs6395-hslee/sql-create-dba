import type { Problem } from '@/types/problem';

export const problem: Problem = {
  id: 'expert-004', level: 'expert', order: 4,
  title: { ko: 'CREATE TABLE: 복합 제약조건', en: 'CREATE TABLE: Complex Constraints' },
  description: {
    ko: `다양한 **제약조건**이 포함된 \`employee_log\` 테이블을 생성하세요.\n\n### 요구사항\n1. 먼저 테이블을 생성하세요:\n\`\`\`sql\nCREATE TABLE IF NOT EXISTS employee_log (\n  id SERIAL PRIMARY KEY,\n  employee_name VARCHAR(100) NOT NULL,\n  department VARCHAR(50) NOT NULL,\n  action VARCHAR(20) NOT NULL CHECK (action IN ('login', 'logout', 'break', 'overtime')),\n  log_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,\n  duration_minutes INTEGER CHECK (duration_minutes > 0),\n  notes TEXT,\n  UNIQUE(employee_name, log_time)\n);\n\`\`\`\n\n2. 테이블 구조와 제약조건을 확인하세요:\n\`\`\`sql\nSELECT column_name, data_type, is_nullable, column_default\nFROM information_schema.columns\nWHERE table_name = 'employee_log'\nORDER BY ordinal_position;\n\`\`\`\n\n> **채점**: 2번 SELECT 쿼리의 결과로 채점됩니다.`,
    en: `Create an \`employee_log\` table with various **constraints**.\n\n### Requirements\n1. Create the table:\n\`\`\`sql\nCREATE TABLE IF NOT EXISTS employee_log (\n  id SERIAL PRIMARY KEY,\n  employee_name VARCHAR(100) NOT NULL,\n  department VARCHAR(50) NOT NULL,\n  action VARCHAR(20) NOT NULL CHECK (action IN ('login', 'logout', 'break', 'overtime')),\n  log_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,\n  duration_minutes INTEGER CHECK (duration_minutes > 0),\n  notes TEXT,\n  UNIQUE(employee_name, log_time)\n);\n\`\`\`\n\n2. Verify structure and constraints:\n\`\`\`sql\nSELECT column_name, data_type, is_nullable, column_default\nFROM information_schema.columns\nWHERE table_name = 'employee_log'\nORDER BY ordinal_position;\n\`\`\`\n\n> **Grading**: Based on step 2's SELECT result.`,
  },
  schema: 'ecommerce', category: 'DDL', difficulty: 2,
  hints: {
    ko: ['CHECK 제약조건으로 허용 값을 제한할 수 있습니다.', 'UNIQUE(col1, col2)는 복합 유니크 제약조건입니다.', "SELECT column_name, data_type, is_nullable, column_default FROM information_schema.columns WHERE table_name = 'employee_log' ORDER BY ordinal_position;"],
    en: ['CHECK constraints limit allowed values.', 'UNIQUE(col1, col2) is a composite unique constraint.', "SELECT column_name, data_type, is_nullable, column_default FROM information_schema.columns WHERE table_name = 'employee_log' ORDER BY ordinal_position;"],
  },
  explanation: {
    ko: `## 제약조건 (Constraints)\n\n\`\`\`sql\nCREATE TABLE IF NOT EXISTS employee_log (\n  id SERIAL PRIMARY KEY,\n  employee_name VARCHAR(100) NOT NULL,\n  department VARCHAR(50) NOT NULL,\n  action VARCHAR(20) NOT NULL\n    CHECK (action IN ('login', 'logout', 'break', 'overtime')),\n  log_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,\n  duration_minutes INTEGER CHECK (duration_minutes > 0),\n  notes TEXT,\n  UNIQUE(employee_name, log_time)\n);\n\`\`\`\n\n### 제약조건 유형\n| 제약조건 | 설명 |\n|---------|------|\n| PRIMARY KEY | 고유 식별자 (NOT NULL + UNIQUE) |\n| NOT NULL | NULL 값 불허 |\n| UNIQUE | 중복 값 불허 |\n| CHECK | 조건식 만족 확인 |\n| DEFAULT | 기본값 설정 |\n| FOREIGN KEY | 다른 테이블 참조 |\n\n### 복합 UNIQUE\n- \`UNIQUE(employee_name, log_time)\`: 같은 직원이 같은 시간에 중복 로그 방지\n- 개별 컬럼은 중복 가능, 조합이 유일해야 함`,
    en: `## Constraints\n\n\`\`\`sql\nCREATE TABLE IF NOT EXISTS employee_log (\n  id SERIAL PRIMARY KEY,\n  employee_name VARCHAR(100) NOT NULL,\n  department VARCHAR(50) NOT NULL,\n  action VARCHAR(20) NOT NULL\n    CHECK (action IN ('login', 'logout', 'break', 'overtime')),\n  log_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,\n  duration_minutes INTEGER CHECK (duration_minutes > 0),\n  notes TEXT,\n  UNIQUE(employee_name, log_time)\n);\n\`\`\`\n\n### Constraint Types\n| Constraint | Description |\n|-----------|-------------|\n| PRIMARY KEY | Unique identifier (NOT NULL + UNIQUE) |\n| NOT NULL | Disallow NULL |\n| UNIQUE | No duplicates |\n| CHECK | Validate condition |\n| DEFAULT | Default value |\n| FOREIGN KEY | Reference another table |\n\n### Composite UNIQUE\n- \`UNIQUE(employee_name, log_time)\`: Prevents duplicate logs per employee per time\n- Individual columns can repeat; the combination must be unique`,
  },
  expectedQuery: {
    postgresql: "SELECT column_name, data_type, is_nullable, column_default FROM information_schema.columns WHERE table_name = 'employee_log' ORDER BY ordinal_position;",
    mysql: "SELECT column_name, data_type, is_nullable, column_default FROM information_schema.columns WHERE table_name = 'employee_log' ORDER BY ordinal_position;",
  },
  gradingMode: 'exact', relatedConcepts: ['CREATE TABLE', 'CHECK', 'UNIQUE', 'NOT NULL', 'DEFAULT', 'Constraints'],
};
