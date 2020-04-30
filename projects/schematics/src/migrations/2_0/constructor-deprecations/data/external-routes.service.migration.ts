import {
  ANGULAR_CORE,
  EXTERNAL_ROUTES_CONFIG,
  EXTERNAL_ROUTES_SERVICE,
  INJECTOR,
  SPARTACUS_CORE,
  URL_MATCHER_FACTORY_SERVICE,
  URL_MATCHER_SERVICE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const EXTERNAL_ROUTES_SERVICE_MIGRATION: ConstructorDeprecation = {
  // projects/core/src/routing/external-routes/external-routes.service.ts
  class: EXTERNAL_ROUTES_SERVICE,
  importPath: SPARTACUS_CORE,
  deprecatedParams: [
    {
      className: EXTERNAL_ROUTES_CONFIG,
      importPath: SPARTACUS_CORE,
    },
    {
      className: URL_MATCHER_FACTORY_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: INJECTOR,
      importPath: ANGULAR_CORE,
    },
  ],
  removeParams: [
    {
      className: URL_MATCHER_FACTORY_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: INJECTOR,
      importPath: ANGULAR_CORE,
    },
  ],
  addParams: [
    {
      className: URL_MATCHER_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: INJECTOR,
      importPath: ANGULAR_CORE,
    },
  ],
};
