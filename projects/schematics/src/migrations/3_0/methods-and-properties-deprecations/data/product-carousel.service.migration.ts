import {
  GET_PRODUCT_REFERENCES,
  PRODUCT_CAROUSEL_SERVICE,
  SPARTACUS_STOREFRONTLIB,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

// projects/storefrontlib/cms-components/product/carousel/product-carousel.service.ts
export const PRODUCT_CAROUSEL_SERVICE_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: PRODUCT_CAROUSEL_SERVICE,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedNode: GET_PRODUCT_REFERENCES,
    comment: `// ${TODO_SPARTACUS} Method '${GET_PRODUCT_REFERENCES}' was removed from '${PRODUCT_CAROUSEL_SERVICE}'.`,
  },
];
