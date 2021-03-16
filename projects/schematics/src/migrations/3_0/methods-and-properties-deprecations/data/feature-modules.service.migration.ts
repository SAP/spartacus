import {
  FEATURE_MODULES_SERVICE,
  GET_INJECTORS,
  SPARTACUS_STOREFRONTLIB,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

// projects\storefrontlib\src\cms-structure\services\cms-components.service.ts
export const FEATURE_MODULES_SERVICE_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: FEATURE_MODULES_SERVICE,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedNode: GET_INJECTORS,
    comment: `// ${TODO_SPARTACUS} Method '${GET_INJECTORS}' has been removed'`,
  },
];
