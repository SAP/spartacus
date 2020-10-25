import {
  PRODUCT_LOADING_SERVICE,
  PRODUCT_SERVICE,
  SPARTACUS_CORE,
  STORE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const PRODUCT_SERVICE_MIGRATION: ConstructorDeprecation = {
  class: PRODUCT_SERVICE,
  importPath: SPARTACUS_CORE,
  deprecatedParams: [
    {
      className: STORE,
      importPath: SPARTACUS_CORE,
    },
  ],
  addParams: [
    {
      className: PRODUCT_LOADING_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
};
