import {
  SPARTACUS_CORE,
  STORE,
  NGRX_STORE,
  STORE_FINDER_SERVICE,
  WINDOW_REF,
  GLOBAL_MESSAGE_SERVICE,
  ROUTING_SERVICE,
  SPARTACUS_STOREFINDER,
  ANGULAR_CORE,
  PLATFORM_ID_STRING,
  ANY_TYPE,
  PLATFORM,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const STORE_FINDER_SERVICE_MIGRATION: ConstructorDeprecation = {
  // feature-libs/storefinder/core/facade/store-finder.service.ts
  class: STORE_FINDER_SERVICE,
  importPath: SPARTACUS_STOREFINDER,
  deprecatedParams: [
    {
      className: STORE,
      importPath: NGRX_STORE,
    },
    {
      className: WINDOW_REF,
      importPath: SPARTACUS_CORE,
    },
    {
      className: GLOBAL_MESSAGE_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: ROUTING_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
  addParams: [
    {
      className: PLATFORM,
      literalInference: ANY_TYPE,
      injectionToken: {
        token: PLATFORM_ID_STRING,
        importPath: ANGULAR_CORE,
      },
    },
  ],
};
