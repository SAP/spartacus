import {
  BREAKPOINT_SERVICE,
  COMMON_CONFIGURATOR_UTILS_SERVICE,
  CONFIGURATOR_CART_ENTRY_BUNDLE_INFO_COMPONENT,
  CONFIGURATOR_CART_ENTRY_BUNDLE_INFO_SERVICE,
  SPARTACUS_CORE,
  SPARTACUS_PRODUCT_CONFIGURATOR_COMMON,
  SPARTACUS_STOREFRONTLIB,
  TRANSLATION_SERVICE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const CONFIGURATOR_CART_ENTRY_BUNDLE_INFO_COMPONENT_MIGRATION: ConstructorDeprecation =
  {
    // feature-libs/product-configurator/common/components/configurator-cart-entry-bundle-info/configurator-cart-entry-bundle-info.component.ts/configurator-cart-entry-bundle-info.component.ts
    class: CONFIGURATOR_CART_ENTRY_BUNDLE_INFO_COMPONENT,
    importPath: SPARTACUS_PRODUCT_CONFIGURATOR_COMMON,
    deprecatedParams: [
      {
        className: COMMON_CONFIGURATOR_UTILS_SERVICE,
        importPath: SPARTACUS_PRODUCT_CONFIGURATOR_COMMON,
      },
      {
        className: CONFIGURATOR_CART_ENTRY_BUNDLE_INFO_SERVICE,
        importPath: SPARTACUS_PRODUCT_CONFIGURATOR_COMMON,
      },
      {
        className: BREAKPOINT_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
    ],
    addParams: [
      {
        className: TRANSLATION_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
  };
