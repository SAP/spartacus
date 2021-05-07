import {
  DYNAMIC_ATTRIBUTE_SERVICE,
  SPARTACUS_CORE,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

// projects/core/src/cms/services/dynamic-attribute.service.ts
export const DYNAMIC_ATTRIBUTE_SERVICE_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: DYNAMIC_ATTRIBUTE_SERVICE,
    importPath: SPARTACUS_CORE,
    deprecatedNode: `addDynamicAttributes`,
    comment: `// ${TODO_SPARTACUS} 'addDynamicAttributes' method was removed. Please use functions 'addAttributesToComponent' or 'addAttributesToSlot' instead`,
  },
];
