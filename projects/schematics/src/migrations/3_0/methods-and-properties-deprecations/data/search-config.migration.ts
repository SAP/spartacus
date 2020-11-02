import {
  SEARCH_CONFIG,
  SORT,
  SORT_CODE,
  SPARTACUS_CORE,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

// projects/core/src/product/model/search-config.ts
export const SEARCH_CONFIG_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: SEARCH_CONFIG,
    importPath: SPARTACUS_CORE,
    deprecatedNode: SORT_CODE,
    newNode: SORT,
    comment: `// ${TODO_SPARTACUS} Property '${SORT_CODE}' was renamed from '${SORT}'.`,
  },
];
