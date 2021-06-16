import {
  PRODUCT_LIST_COMPONENT_SERVICE,
  SPARTACUS_STOREFRONTLIB,
  VIEW_CONFIG,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const PRODUCT_LIST_COMPONENT_SERVICE_MIGRATION: ConstructorDeprecation = {
  // projects/storefrontlib/src/cms-components/product/product-list/container/product-list-component.service.ts
  class: PRODUCT_LIST_COMPONENT_SERVICE,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [],
  addParams: [
    {
      className: VIEW_CONFIG,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
  ],
};
