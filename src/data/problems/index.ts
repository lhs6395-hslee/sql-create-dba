import type { Problem, Level } from '@/types/problem';

// Beginner
import { problem as b001 } from './beginner/001-select-all';
import { problem as b002 } from './beginner/002-select-columns';
import { problem as b003 } from './beginner/003-column-alias';
import { problem as b004 } from './beginner/004-where-basic';
import { problem as b005 } from './beginner/005-where-and-or';
import { problem as b006 } from './beginner/006-between-in';
import { problem as b007 } from './beginner/007-like-pattern';
import { problem as b008 } from './beginner/008-order-by';
import { problem as b009 } from './beginner/009-limit';
import { problem as b010 } from './beginner/010-aggregate';
import { problem as b011 } from './beginner/011-insert-basic';
import { problem as b012 } from './beginner/012-update-basic';
import { problem as b013 } from './beginner/013-delete-basic';

// Intermediate
import { problem as i001 } from './intermediate/001-inner-join';
import { problem as i002 } from './intermediate/002-left-join';
import { problem as i003 } from './intermediate/003-multi-join';
import { problem as i004 } from './intermediate/004-subquery';
import { problem as i005 } from './intermediate/005-group-having';
import { problem as i006 } from './intermediate/006-case';
import { problem as i007 } from './intermediate/007-insert';
import { problem as i008 } from './intermediate/008-update';
import { problem as i009 } from './intermediate/009-delete';
import { problem as i010 } from './intermediate/010-comprehensive';

// Advanced
import { problem as a001 } from './advanced/001-row-number';
import { problem as a002 } from './advanced/002-rank';
import { problem as a003 } from './advanced/003-running-total';
import { problem as a004 } from './advanced/004-lag-lead';
import { problem as a005 } from './advanced/005-cte-basic';
import { problem as a006 } from './advanced/006-recursive-cte';
import { problem as a007 } from './advanced/007-create-view';
import { problem as a008 } from './advanced/008-create-table';
import { problem as a009 } from './advanced/009-union';
import { problem as a010 } from './advanced/010-alter-table';

// Expert
import { problem as e001 } from './expert/001-create-index';
import { problem as e002 } from './expert/002-explain';
import { problem as e003 } from './expert/003-transaction';
import { problem as e004 } from './expert/004-constraints';
import { problem as e005 } from './expert/005-upsert';
import { problem as e006 } from './expert/006-explain-analyze';
import { problem as e007 } from './expert/007-drop-recreate';
import { problem as e008 } from './expert/008-window-cte-combo';
import { problem as e009 } from './expert/009-subquery-optimization';
import { problem as e010 } from './expert/010-comprehensive-dba';

const allProblems: Problem[] = [
  // Beginner
  b001, b002, b003, b004, b005, b006, b007, b008, b009, b010, b011, b012, b013,
  // Intermediate
  i001, i002, i003, i004, i005, i006, i007, i008, i009, i010,
  // Advanced
  a001, a002, a003, a004, a005, a006, a007, a008, a009, a010,
  // Expert
  e001, e002, e003, e004, e005, e006, e007, e008, e009, e010,
];

export function getAllProblems(): Problem[] {
  return allProblems;
}

export function getProblemsByLevel(level: Level): Problem[] {
  return allProblems.filter((p) => p.level === level);
}

export function getProblemById(id: string): Problem | undefined {
  return allProblems.find((p) => p.id === id);
}

export function getNextProblem(currentId: string): Problem | undefined {
  const idx = allProblems.findIndex((p) => p.id === currentId);
  return idx >= 0 && idx < allProblems.length - 1
    ? allProblems[idx + 1]
    : undefined;
}
