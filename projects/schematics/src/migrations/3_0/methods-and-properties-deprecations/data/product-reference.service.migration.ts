import {
  GET,
  GET_PRODUCT_REFERENCES,
  LOAD_PRODUCT_REFERENCES,
  PRODUCT_REFERENCE_SERVICE,
  SPARTACUS_CORE,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

// projects/core/src/product/facade/product-reference.service.ts
export const PRODUCT_REFERENCE_SERVICE_MIGRATION: MethodPropertyDeprecation[] =
  [
    {
      class: PRODUCT_REFERENCE_SERVICE,
      importPath: SPARTACUS_CORE,
      deprecatedNode: GET,
      comment: `// ${TODO_SPARTACUS} Method '${GET}' was removed from '${PRODUCT_REFERENCE_SERVICE}'. Use ${LOAD_PRODUCT_REFERENCES} and ${GET_PRODUCT_REFERENCES} instead.`,
    },
  ];
