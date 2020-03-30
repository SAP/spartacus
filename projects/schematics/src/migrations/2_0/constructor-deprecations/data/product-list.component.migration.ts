import {
  PAGE_LAYOUT_SERVICE,
  PRODUCT_LIST_COMPONENT,
  PRODUCT_LIST_COMPONENT_SERVICE,
  VIEW_CONFIG,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';
// projects/storefrontlib/src/cms-components/product/product-list/container/product-list.component.ts
export const PRODUCT_LIST_COMPONENT_MIGRATION: ConstructorDeprecation = {
  class: PRODUCT_LIST_COMPONENT,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: PAGE_LAYOUT_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
    {
      className: PRODUCT_LIST_COMPONENT_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
  ],
  addParams: [
    {
      className: VIEW_CONFIG,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
  ],
};
