import {
  COMMON_CONFIGURATOR_UTILS_SERVICE,
  CONFIGURATOR_ADD_TO_CART_BUTTON_COMPONENT,
  CONFIGURATOR_CART_SERVICE,
  CONFIGURATOR_COMMONS_SERVICE,
  CONFIGURATOR_GROUPS_SERVICE,
  CONFIGURATOR_ROUTER_EXTRACTOR_SERVICE,
  GLOBAL_MESSAGE_SERVICE,
  ORDER_FACADE,
  ROUTING_SERVICE,
  SPARTACUS_CORE,
  SPARTACUS_ORDER_ROOT,
  SPARTACUS_PRODUCT_CONFIGURATOR_COMMON,
  SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const CONFIGURATOR_ADD_TO_CART_BUTTON_COMPONENT_MIGRATION: ConstructorDeprecation =
  {
    // feature-libs/product-configurator/rulebased/components/add-to-cart-button/configurator-add-to-cart-button.component.ts
    class: CONFIGURATOR_ADD_TO_CART_BUTTON_COMPONENT,
    importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
    deprecatedParams: [
      {
        className: ROUTING_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: CONFIGURATOR_COMMONS_SERVICE,
        importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
      },
      {
        className: CONFIGURATOR_CART_SERVICE,
        importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
      },
      {
        className: CONFIGURATOR_GROUPS_SERVICE,
        importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
      },
      {
        className: CONFIGURATOR_ROUTER_EXTRACTOR_SERVICE,
        importPath: SPARTACUS_PRODUCT_CONFIGURATOR_COMMON,
      },
      {
        className: GLOBAL_MESSAGE_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
    addParams: [
      {
        className: ORDER_FACADE,
        importPath: SPARTACUS_ORDER_ROOT,
      },
      {
        className: COMMON_CONFIGURATOR_UTILS_SERVICE,
        importPath: SPARTACUS_PRODUCT_CONFIGURATOR_COMMON,
      },
    ],
  };
