import {
  COMMON_CONFIGURATOR_UTILS_SERVICE,
  CONFIGURATOR_CART_ENTRY_INFO_COMPONENT,
  SPARTACUS_PRODUCT_CONFIGURATOR_COMMON,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const CONFIGURATOR_CART_ENTRY_INFO_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // feature-libs/product-configurator/common/components/configurator-cart-entry-info/configurator-cart-entry-info.component.ts
  class: CONFIGURATOR_CART_ENTRY_INFO_COMPONENT,
  importPath: SPARTACUS_PRODUCT_CONFIGURATOR_COMMON,
  deprecatedParams: [],
  addParams: [
    {
      className: COMMON_CONFIGURATOR_UTILS_SERVICE,
      importPath: SPARTACUS_PRODUCT_CONFIGURATOR_COMMON,
    },
  ],
};
