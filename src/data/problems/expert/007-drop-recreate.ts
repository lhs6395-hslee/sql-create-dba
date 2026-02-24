import type { Problem } from '@/types/problem';

export const problem: Problem = {
  id: 'expert-007', level: 'expert', order: 7,
  title: { ko: 'DROP IF EXISTS: 안전한 스키마 관리', en: 'DROP IF EXISTS: Safe Schema Management' },
  description: {
    ko: `**DROP IF EXISTS**를 사용하여 기존 테이블을 안전하게 삭제하고 재생성하세요.\n\n### 요구사항\n1. 기존 \`audit_log\` 테이블이 있으면 삭제하고 새로 생성하세요:\n\`\`\`sql\nDROP TABLE IF EXISTS audit_log;\nCREATE TABLE audit_log (\n  id SERIAL PRIMARY KEY,\n  table_name VARCHAR(50) NOT NULL,\n  operation VARCHAR(10) NOT NULL CHECK (operation IN ('INSERT', 'UPDATE', 'DELETE')),\n  old_data JSONB,\n  new_data JSONB,\n  changed_by VARCHAR(100) DEFAULT CURRENT_USER,\n  changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);\n\`\`\`\n\n2. 테이블 구조를 확인하세요:\n\`\`\`sql\nSELECT column_name, data_type, is_nullable\nFROM information_schema.columns\nWHERE table_name = 'audit_log'\nORDER BY ordinal_position;\n\`\`\`\n\n> **채점**: 2번 SELECT 쿼리의 결과로 채점됩니다.`,
    en: `Use **DROP IF EXISTS** to safely remove and recreate a table.\n\n### Requirements\n1. Drop and recreate the \`audit_log\` table:\n\`\`\`sql\nDROP TABLE IF EXISTS audit_log;\nCREATE TABLE audit_log (\n  id SERIAL PRIMARY KEY,\n  table_name VARCHAR(50) NOT NULL,\n  operation VARCHAR(10) NOT NULL CHECK (operation IN ('INSERT', 'UPDATE', 'DELETE')),\n  old_data JSONB,\n  new_data JSONB,\n  changed_by VARCHAR(100) DEFAULT CURRENT_USER,\n  changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);\n\`\`\`\n\n2. Verify the table:\n\`\`\`sql\nSELECT column_name, data_type, is_nullable\nFROM information_schema.columns\nWHERE table_name = 'audit_log'\nORDER BY ordinal_position;\n\`\`\`\n\n> **Grading**: Based on step 2's SELECT result.`,
  },
  schema: 'ecommerce', category: 'DDL', difficulty: 2,
  hints: {
    ko: ['DROP TABLE IF EXISTS는 테이블이 없어도 에러가 발생하지 않습니다.', 'JSONB는 PostgreSQL의 바이너리 JSON 타입입니다.', "SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name = 'audit_log' ORDER BY ordinal_position;"],
    en: ['DROP TABLE IF EXISTS does not error if the table does not exist.', 'JSONB is PostgreSQL binary JSON type.', "SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name = 'audit_log' ORDER BY ordinal_position;"],
  },
  explanation: {
    ko: `## DROP IF EXISTS + CREATE\n\n안전한 테이블 재생성 패턴입니다.\n\n\`\`\`sql\nDROP TABLE IF EXISTS audit_log;\nCREATE TABLE audit_log (\n  id SERIAL PRIMARY KEY,\n  table_name VARCHAR(50) NOT NULL,\n  operation VARCHAR(10) NOT NULL\n    CHECK (operation IN ('INSERT', 'UPDATE', 'DELETE')),\n  old_data JSONB,\n  new_data JSONB,\n  changed_by VARCHAR(100) DEFAULT CURRENT_USER,\n  changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);\n\`\`\`\n\n### DROP TABLE 옵션\n- **IF EXISTS**: 존재하지 않아도 에러 없음\n- **CASCADE**: 의존하는 객체(뷰, FK 등)도 함께 삭제\n- **RESTRICT**: 의존 객체가 있으면 삭제 거부 (기본값)\n\n### JSONB 타입\n- PostgreSQL 전용 바이너리 JSON 타입\n- 인덱싱, 검색에 최적화\n- 감사 로그(Audit Log)에서 변경 전/후 데이터 저장에 유용`,
    en: `## DROP IF EXISTS + CREATE\n\nSafe table recreation pattern.\n\n\`\`\`sql\nDROP TABLE IF EXISTS audit_log;\nCREATE TABLE audit_log (...);\n\`\`\`\n\n### DROP TABLE Options\n- **IF EXISTS**: No error if table doesn't exist\n- **CASCADE**: Also drops dependent objects (views, FKs)\n- **RESTRICT**: Refuses if dependents exist (default)\n\n### JSONB Type\n- PostgreSQL binary JSON type\n- Optimized for indexing and searching\n- Useful for storing before/after data in audit logs`,
  },
  expectedQuery: {
    postgresql: "SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name = 'audit_log' ORDER BY ordinal_position;",
    mysql: "SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name = 'audit_log' ORDER BY ordinal_position;",
  },
  gradingMode: 'exact', relatedConcepts: ['DROP TABLE', 'IF EXISTS', 'JSONB', 'CASCADE', 'RESTRICT'],
};
