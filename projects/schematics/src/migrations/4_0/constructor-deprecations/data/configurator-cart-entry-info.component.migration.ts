import {
  CART_ITEM_CONTEXT,
  COMMON_CONFIGURATOR_UTILS_SERVICE,
  CONFIGURATOR_CART_ENTRY_INFO_COMPONENT,
  SPARTACUS_PRODUCT_CONFIGURATOR_COMMON,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const CONFIGURATOR_CART_ENTRY_INFO_COMPONENT_MIGRATION: ConstructorDeprecation =
  {
    // feature-libs/product-configurator/common/components/configurator-cart-entry-info/configurator-cart-entry-info.component.ts
    class: CONFIGURATOR_CART_ENTRY_INFO_COMPONENT,
    importPath: SPARTACUS_PRODUCT_CONFIGURATOR_COMMON,
    deprecatedParams: [
      {
        className: CART_ITEM_CONTEXT,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
    ],
    addParams: [
      {
        className: COMMON_CONFIGURATOR_UTILS_SERVICE,
        importPath: SPARTACUS_PRODUCT_CONFIGURATOR_COMMON,
      },
    ],
  };
