import {
  PRODUCT_LIST_ITEM_COMPONENT,
  PRODUCT_LIST_ITEM_CONTEXT_SOURCE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const PRODUCT_LIST_ITEM_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // projects/storefrontlib/cms-components/product/product-list/product-list-item/product-list-item.component.ts
  class: PRODUCT_LIST_ITEM_COMPONENT,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [],
  addParams: [
    {
      className: PRODUCT_LIST_ITEM_CONTEXT_SOURCE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
  ],
};
