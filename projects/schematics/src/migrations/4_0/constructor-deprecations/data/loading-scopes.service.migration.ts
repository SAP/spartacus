import {
  EVENT_SERVICE,
  OCC_CONFIG,
  SPARTACUS_CORE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const LOADING_SCOPES_SERVICE_MIGRATION: ConstructorDeprecation = {
  // projects/core/src/occ/services/loading-scopes.service.ts
  class: `LoadingScopesService`,
  importPath: SPARTACUS_CORE,
  deprecatedParams: [{ className: OCC_CONFIG, importPath: SPARTACUS_CORE }],
  removeParams: [{ className: EVENT_SERVICE, importPath: SPARTACUS_CORE }],
};
