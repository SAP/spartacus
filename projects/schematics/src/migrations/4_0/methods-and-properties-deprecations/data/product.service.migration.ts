import {
  PRODUCT_SERVICE,
  SPARTACUS_CORE,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

// projects/core/src/product/facade/product.service.ts
export const PRODUCT_SERVICE_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: PRODUCT_SERVICE,
    importPath: SPARTACUS_CORE,
    deprecatedNode: `reload`,
    comment: `// ${TODO_SPARTACUS} Method '${PRODUCT_SERVICE}.reload' was removed. Please use the reloading triggers configuration instead (see https://sap.github.io/spartacus-docs/loading-scopes/#reloading-triggers for more).`,
  },
];
