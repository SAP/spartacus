import {
  ACTIVATED_ROUTE,
  ANGULAR_ROUTER,
  BREAKPOINT_SERVICE,
  MODAL_SERVICE,
  PRODUCT_FACET_NAVIGATION_COMPONENT,
  PRODUCT_LIST_COMPONENT_SERVICE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

// projects\storefrontlib\src\cms-components\product\product-list\product-facet-navigation\product-facet-navigation.component.ts
export const PRODUCT_FACET_NAVIGATION_COMPONENT_MIGRATION: ConstructorDeprecation = {
  class: PRODUCT_FACET_NAVIGATION_COMPONENT,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: MODAL_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
    {
      className: ACTIVATED_ROUTE,
      importPath: ANGULAR_ROUTER,
    },
    {
      className: PRODUCT_LIST_COMPONENT_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
  ],
  removeParams: [
    {
      className: MODAL_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
    {
      className: ACTIVATED_ROUTE,
      importPath: ANGULAR_ROUTER,
    },
    {
      className: PRODUCT_LIST_COMPONENT_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
  ],
  addParams: [
    {
      className: BREAKPOINT_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
  ],
};
