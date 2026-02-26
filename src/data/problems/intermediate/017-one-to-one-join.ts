import type { Problem } from '@/types/problem';

export const problem: Problem = {
  id: 'intermediate-017',
  level: 'intermediate',
  order: 17,
  title: {
    ko: '1:1 관계 조회 — 고객과 프로필',
    en: '1:1 Relationship — Customer Profiles',
  },
  description: {
    ko: `\`customers\`와 \`customer_profiles\`는 **1:1 관계**입니다.\n\n모든 고객의 **이름(name)**, **이메일(email)**, **자기소개(bio)**를 조회하세요.\n\n프로필이 없는 고객도 포함해야 합니다 (bio는 NULL로 표시).`,
    en: `\`customers\` and \`customer_profiles\` have a **1:1 relationship**.\n\nList every customer's **name**, **email**, and **bio**.\n\nInclude customers who don't have a profile (bio shown as NULL).`,
  },
  schema: 'ecommerce',
  category: 'ERD / JOIN',
  difficulty: 1,
  hints: {
    ko: [
      'customer_profiles.customer_id가 customers.id를 참조합니다.',
      '프로필이 없는 고객도 포함하려면 LEFT JOIN을 사용하세요.',
      'SELECT c.name, c.email, cp.bio FROM customers c LEFT JOIN customer_profiles cp ON c.id = cp.customer_id;',
    ],
    en: [
      'customer_profiles.customer_id references customers.id.',
      'Use LEFT JOIN to include customers without a profile.',
      'SELECT c.name, c.email, cp.bio FROM customers c LEFT JOIN customer_profiles cp ON c.id = cp.customer_id;',
    ],
  },
  explanation: {
    ko: `## 1:1 관계 조회\n\n1:1 관계에서도 JOIN을 사용합니다. LEFT JOIN을 쓰면 프로필이 없는 고객도 포함됩니다.\n\n\`\`\`sql\nSELECT c.name, c.email, cp.bio\nFROM customers c\nLEFT JOIN customer_profiles cp\n  ON c.id = cp.customer_id;\n\`\`\`\n\n**핵심**: customer_profiles.customer_id에 \`UNIQUE\` 제약이 있어 1:1이 보장됩니다.`,
    en: `## 1:1 Relationship Query\n\nJOIN is used even in 1:1 relationships. LEFT JOIN includes customers without a profile.\n\n\`\`\`sql\nSELECT c.name, c.email, cp.bio\nFROM customers c\nLEFT JOIN customer_profiles cp\n  ON c.id = cp.customer_id;\n\`\`\`\n\n**Key**: The \`UNIQUE\` constraint on customer_profiles.customer_id guarantees the 1:1 relationship.`,
  },
  expectedQuery: {
    postgresql:
      'SELECT c.name, c.email, cp.bio FROM customers c LEFT JOIN customer_profiles cp ON c.id = cp.customer_id;',
    mysql:
      'SELECT c.name, c.email, cp.bio FROM customers c LEFT JOIN customer_profiles cp ON c.id = cp.customer_id;',
  },
  gradingMode: 'unordered',
  relatedConcepts: ['1:1 relationship', 'LEFT JOIN', 'ERD', 'Foreign Key', 'UNIQUE'],
};
