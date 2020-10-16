import {
  ACTIVATED_ROUTE,
  ANGULAR_ROUTER,
  ROUTING_SERVICE,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
  STORE_FINDER_GRID_COMPONENT,
  STORE_FINDER_SERVICE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

// projects/storefrontlib/src/cms-components/storefinder/components/store-finder-grid/store-finder-grid.component.ts
export const STORE_FINDER_GRID_COMPONENT_MIGRATION: ConstructorDeprecation = {
  class: STORE_FINDER_GRID_COMPONENT,
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
    {
      className: ROUTING_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
  removeParams: [
    {
      className: ROUTING_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
};
