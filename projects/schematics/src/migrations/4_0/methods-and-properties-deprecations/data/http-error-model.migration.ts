import {
  ERROR,
  HTTP_ERROR_MODEL,
  SPARTACUS_CORE,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

export const HTTP_ERROR_MODEL_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: HTTP_ERROR_MODEL,
    importPath: SPARTACUS_CORE,
    deprecatedNode: ERROR,
    comment: `// ${TODO_SPARTACUS} Property '${ERROR}' was removed from interface`,
  },
];
