import {
  SPARTACUS_STOREFRONTLIB,
  SPARTACUS_CORE,
  ACTIVATED_ROUTE,
  ANGULAR_ROUTER,
  STORE_FINDER_SEARCH_RESULT_COMPONENT,
  STORE_FINDER_SERVICE,
  STORE_FINDER_CONFIG,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const STORE_FINDER_SEARCH_RESULT_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // projects\storefrontlib\src\cms-components\storefinder\components\store-finder-search-result\store-finder-search-result.component.ts
  class: STORE_FINDER_SEARCH_RESULT_COMPONENT,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: STORE_FINDER_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: ACTIVATED_ROUTE,
      importPath: ANGULAR_ROUTER,
    },
  ],
  addParams: [
    {
      className: STORE_FINDER_CONFIG,
      importPath: SPARTACUS_CORE,
    },
  ],
};
