import {
  ACTIVATED_ROUTE,
  ANGULAR_ROUTER,
  CURRENCY_SERVICE,
  LANGUAGE_SERVICE,
  PRODUCT_LIST_COMPONENT_SERVICE,
  PRODUCT_SEARCH_SERVICE,
  ROUTER,
  ROUTING_SERVICE,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
  VIEW_CONFIG,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const PRODUCT_LIST_COMPONENT_SERVICE_MIGRATION: ConstructorDeprecation =
  {
    // projects/storefrontlib/cms-components/product/product-list/container/product-list-component.service.ts
    class: PRODUCT_LIST_COMPONENT_SERVICE,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
      {
        className: PRODUCT_SEARCH_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: ROUTING_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: ACTIVATED_ROUTE,
        importPath: ANGULAR_ROUTER,
      },
      {
        className: CURRENCY_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: LANGUAGE_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: ROUTER,
        importPath: ANGULAR_ROUTER,
      },
    ],
    addParams: [
      {
        className: VIEW_CONFIG,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
    ],
  };
