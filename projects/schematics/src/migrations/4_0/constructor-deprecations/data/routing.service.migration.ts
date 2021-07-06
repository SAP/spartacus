import {
  ANGULAR_COMMON,
  ANGULAR_ROUTER,
  LOCATION,
  NGRX_STORE,
  ROUTER,
  ROUTING_PARAMS_SERVICE,
  ROUTING_SERVICE,
  SEMANTIC_PATH_SERVICE,
  SPARTACUS_CORE,
  STORE,
  WINDOW_REF,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const ROUTING_SERVICE_MIGRATION_V1: ConstructorDeprecation = {
  // projects/core/src/routing/facade/routing.service.ts
  class: ROUTING_SERVICE,
  importPath: SPARTACUS_CORE,
  deprecatedParams: [
    { className: STORE, importPath: NGRX_STORE },
    { className: WINDOW_REF, importPath: SPARTACUS_CORE },
    { className: SEMANTIC_PATH_SERVICE, importPath: SPARTACUS_CORE },
    { className: ROUTING_PARAMS_SERVICE, importPath: SPARTACUS_CORE },
    { className: ROUTER, importPath: ANGULAR_ROUTER },
  ],
  addParams: [{ className: LOCATION, importPath: ANGULAR_COMMON }],
};

export const ROUTING_SERVICE_MIGRATION_V2: ConstructorDeprecation = {
  // projects/core/src/routing/facade/routing.service.ts
  class: ROUTING_SERVICE,
  importPath: SPARTACUS_CORE,
  deprecatedParams: [
    { className: STORE, importPath: NGRX_STORE },
    { className: WINDOW_REF, importPath: SPARTACUS_CORE },
    { className: SEMANTIC_PATH_SERVICE, importPath: SPARTACUS_CORE },
    { className: ROUTING_PARAMS_SERVICE, importPath: SPARTACUS_CORE },
  ],
  addParams: [
    { className: ROUTER, importPath: ANGULAR_ROUTER },
    { className: LOCATION, importPath: ANGULAR_COMMON },
  ],
};
