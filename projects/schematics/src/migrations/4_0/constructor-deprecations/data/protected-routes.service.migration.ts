import {
  PROTECTED_ROUTES_SERVICE,
  ROUTING_CONFIG,
  SPARTACUS_CORE,
  URL_PARSING_SERVICE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const PROTECTED_ROUTES_SERVICE_MIGRATION: ConstructorDeprecation = {
  // projects/core/src/routing/protected-routes/protected-routes.service.ts
  class: PROTECTED_ROUTES_SERVICE,
  importPath: SPARTACUS_CORE,
  deprecatedParams: [
    {
      className: ROUTING_CONFIG,
      importPath: SPARTACUS_CORE,
    },
  ],
  addParams: [
    {
      className: URL_PARSING_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
};
