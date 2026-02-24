import type { Problem } from '@/types/problem';

export const problem: Problem = {
  id: 'advanced-008', level: 'advanced', order: 8,
  title: { ko: 'CREATE TABLE: 배송 추적 테이블', en: 'CREATE TABLE: Shipment Tracking Table' },
  description: {
    ko: `주문 배송을 추적하기 위한 \`shipments\` 테이블을 생성하세요.\n\n### 요구사항\n1. 먼저 아래 \`CREATE TABLE\`문을 실행하세요:\n\`\`\`sql\nCREATE TABLE IF NOT EXISTS shipments (\n  id SERIAL PRIMARY KEY,\n  order_id INTEGER NOT NULL REFERENCES orders(id),\n  carrier VARCHAR(50) NOT NULL,\n  tracking_number VARCHAR(100),\n  shipped_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n  delivered_date TIMESTAMP,\n  status VARCHAR(20) DEFAULT 'pending'\n);\n\`\`\`\n\n2. 그 다음, 테이블 구조를 확인하세요:\n\`\`\`sql\nSELECT column_name, data_type, is_nullable\nFROM information_schema.columns\nWHERE table_name = 'shipments'\nORDER BY ordinal_position;\n\`\`\`\n\n> **채점**: 2번 SELECT 쿼리의 결과로 채점됩니다.`,
    en: `Create a \`shipments\` table for order delivery tracking.\n\n### Requirements\n1. First, run this \`CREATE TABLE\` statement:\n\`\`\`sql\nCREATE TABLE IF NOT EXISTS shipments (\n  id SERIAL PRIMARY KEY,\n  order_id INTEGER NOT NULL REFERENCES orders(id),\n  carrier VARCHAR(50) NOT NULL,\n  tracking_number VARCHAR(100),\n  shipped_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n  delivered_date TIMESTAMP,\n  status VARCHAR(20) DEFAULT 'pending'\n);\n\`\`\`\n\n2. Then verify the table structure:\n\`\`\`sql\nSELECT column_name, data_type, is_nullable\nFROM information_schema.columns\nWHERE table_name = 'shipments'\nORDER BY ordinal_position;\n\`\`\`\n\n> **Grading**: Based on the result of step 2's SELECT query.`,
  },
  schema: 'ecommerce', category: 'DDL', difficulty: 2,
  hints: {
    ko: ['CREATE TABLE IF NOT EXISTS로 테이블이 없을 때만 생성합니다.', 'SERIAL은 PostgreSQL의 자동 증가 정수 타입입니다.', "SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name = 'shipments' ORDER BY ordinal_position;"],
    en: ['CREATE TABLE IF NOT EXISTS creates only if table does not exist.', 'SERIAL is PostgreSQL auto-incrementing integer type.', "SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name = 'shipments' ORDER BY ordinal_position;"],
  },
  explanation: {
    ko: `## CREATE TABLE\n\n새 테이블을 정의하는 DDL 명령어입니다.\n\n\`\`\`sql\nCREATE TABLE IF NOT EXISTS shipments (\n  id SERIAL PRIMARY KEY,\n  order_id INTEGER NOT NULL REFERENCES orders(id),\n  carrier VARCHAR(50) NOT NULL,\n  tracking_number VARCHAR(100),\n  shipped_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n  delivered_date TIMESTAMP,\n  status VARCHAR(20) DEFAULT 'pending'\n);\n\`\`\`\n\n### 핵심 개념\n- **PRIMARY KEY**: 고유 식별자 (NOT NULL + UNIQUE)\n- **REFERENCES**: 외래키 제약조건 (참조 무결성)\n- **NOT NULL**: NULL 값 불허\n- **DEFAULT**: 값 미지정시 기본값\n- **IF NOT EXISTS**: 이미 존재하면 무시 (오류 방지)\n\n### information_schema\n- 데이터베이스의 메타데이터를 담은 시스템 스키마\n- \`information_schema.columns\`: 모든 테이블의 컬럼 정보`,
    en: `## CREATE TABLE\n\nDDL command to define a new table.\n\n\`\`\`sql\nCREATE TABLE IF NOT EXISTS shipments (\n  id SERIAL PRIMARY KEY,\n  order_id INTEGER NOT NULL REFERENCES orders(id),\n  carrier VARCHAR(50) NOT NULL,\n  tracking_number VARCHAR(100),\n  shipped_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n  delivered_date TIMESTAMP,\n  status VARCHAR(20) DEFAULT 'pending'\n);\n\`\`\`\n\n### Key Concepts\n- **PRIMARY KEY**: Unique identifier (NOT NULL + UNIQUE)\n- **REFERENCES**: Foreign key constraint (referential integrity)\n- **NOT NULL**: Disallow NULL values\n- **DEFAULT**: Fallback value when not specified\n- **IF NOT EXISTS**: Skip if already exists (error prevention)\n\n### information_schema\n- System schema containing database metadata\n- \`information_schema.columns\`: Column info for all tables`,
  },
  expectedQuery: {
    postgresql: "SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name = 'shipments' ORDER BY ordinal_position;",
    mysql: "SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name = 'shipments' ORDER BY ordinal_position;",
  },
  gradingMode: 'exact', relatedConcepts: ['CREATE TABLE', 'PRIMARY KEY', 'REFERENCES', 'DDL', 'information_schema'],
};
