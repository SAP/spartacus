import {
  ACTIVATED_ROUTE,
  ANGULAR_ROUTER,
  ROUTING_SERVICE,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
  STORE_DATA_SERVICE,
  STORE_FINDER_LIST_ITEM_COMPONENT,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const STORE_FINDER_LIST_ITEM_MIGRATION: ConstructorDeprecation = {
  // projects/storefrontlib/src/cms-components/storefinder/components/store-finder-list-item/store-finder-list-item.component.ts
  class: STORE_FINDER_LIST_ITEM_COMPONENT,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: STORE_DATA_SERVICE,
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
      className: ACTIVATED_ROUTE,
      importPath: ANGULAR_ROUTER,
    },
    {
      className: ROUTING_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
};
