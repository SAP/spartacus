import {
  CONFIGURATOR_COMMONS_SERVICE,
  CONFIGURATOR_GROUPS_SERVICE,
  CONFIGURATOR_GROUP_MENU_COMPONENT,
  CONFIGURATOR_GROUP_MENU_SERVICE,
  CONFIGURATOR_ROUTER_EXTRACTOR_SERVICE,
  CONFIGURATOR_STOREFRONT_UTILS_SERVICE,
  DIRECTION_SERVICE,
  HAMBURGER_MENU_SERVICE,
  SPARTACUS_PRODUCT_CONFIGURATOR_COMMON,
  SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const CONFIGURATOR_GROUP_MENU_COMPONENT_MIGRATION: ConstructorDeprecation =
  {
    // feature-libs/product-configurator/rulebased/components/group-menu/configurator-group-menu.component.ts
    class: CONFIGURATOR_GROUP_MENU_COMPONENT,
    importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
    deprecatedParams: [
      {
        className: CONFIGURATOR_COMMONS_SERVICE,
        importPath: SPARTACUS_PRODUCT_CONFIGURATOR_COMMON,
      },
      {
        className: CONFIGURATOR_GROUPS_SERVICE,
        importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
      },
      {
        className: HAMBURGER_MENU_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
      {
        className: CONFIGURATOR_ROUTER_EXTRACTOR_SERVICE,
        importPath: SPARTACUS_PRODUCT_CONFIGURATOR_COMMON,
      },
      {
        className: CONFIGURATOR_STOREFRONT_UTILS_SERVICE,
        importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
      },
    ],
    addParams: [
      {
        className: CONFIGURATOR_GROUP_MENU_SERVICE,
        importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
      },
      {
        className: DIRECTION_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
    ],
  };
