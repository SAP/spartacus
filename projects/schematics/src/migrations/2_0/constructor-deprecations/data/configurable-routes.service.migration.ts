import {
  ANGULAR_CORE,
  CONFIGURABLE_ROUTES_SERVICE,
  INJECTOR,
  ROUTING_CONFIG_SERVICE,
  SPARTACUS_CORE,
  URL_MATCHER_FACTORY_SERVICE,
  URL_MATCHER_SERVICE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const CONFIGURABLE_ROUTES_SERVICE_MIGRATION: ConstructorDeprecation = {
  // projects/core/src/routing/configurable-routes/configurable-routes.service.ts
  class: CONFIGURABLE_ROUTES_SERVICE,
  importPath: SPARTACUS_CORE,
  deprecatedParams: [
    {
      className: INJECTOR,
      importPath: ANGULAR_CORE,
    },
    {
      className: ROUTING_CONFIG_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: URL_MATCHER_FACTORY_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
  removeParams: [
    {
      className: URL_MATCHER_FACTORY_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
  addParams: [
    {
      className: URL_MATCHER_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
};
