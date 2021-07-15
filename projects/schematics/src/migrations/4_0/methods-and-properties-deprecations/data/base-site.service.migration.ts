import {
  BASE_SITE_SERVICE,
  INITIALIZE,
  SPARTACUS_CORE,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

// projects/core/src/site-context/facade/base-site.service.ts
export const BASE_SITE_SERVICE_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: BASE_SITE_SERVICE,
    importPath: SPARTACUS_CORE,
    deprecatedNode: INITIALIZE,
    comment: `// ${TODO_SPARTACUS} Method '${BASE_SITE_SERVICE}.${INITIALIZE}' was removed. The state initialization is done with the 'BaseSiteInitializer' .`,
  },
];
