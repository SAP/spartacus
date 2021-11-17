import {
  SPARTACUS_CORE,
  STORE_FINDER_SERVICE,
  SPARTACUS_STOREFINDER,
  GOOGLE_MAP_RENDERER_SERVICE,
  STORE_FINDER_CONFIG,
  STORE_DATA_SERVICE,
  EXTERNAL_JS_FILE_LOADER,
  SCRIPT_LOADER,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const GOOGLE_MAP_RENDERER_SERVICE_MIGRATION_V1: ConstructorDeprecation =
  {
    // feature-libs/storefinder/core/service/google-map-renderer.service.ts
    class: GOOGLE_MAP_RENDERER_SERVICE,
    importPath: SPARTACUS_STOREFINDER,
    deprecatedParams: [
      {
        className: STORE_FINDER_CONFIG,
        importPath: SPARTACUS_STOREFINDER,
      },
      {
        className: EXTERNAL_JS_FILE_LOADER,
        importPath: SPARTACUS_CORE,
      },
      {
        className: STORE_DATA_SERVICE,
        importPath: SPARTACUS_STOREFINDER,
      },
      {
        className: SCRIPT_LOADER,
        importPath: SPARTACUS_CORE,
      },
    ],
    removeParams: [
      {
        className: EXTERNAL_JS_FILE_LOADER,
        importPath: SPARTACUS_CORE,
      },
      {
        className: STORE_DATA_SERVICE,
        importPath: SPARTACUS_STOREFINDER,
      },
      {
        className: SCRIPT_LOADER,
        importPath: SPARTACUS_CORE,
      },
    ],
    addParams: [
      {
        className: STORE_FINDER_SERVICE,
        importPath: SPARTACUS_STOREFINDER,
      },
      {
        className: SCRIPT_LOADER,
        importPath: SPARTACUS_CORE,
      },
    ],
  };

export const GOOGLE_MAP_RENDERER_SERVICE_MIGRATION_V2: ConstructorDeprecation =
  {
    // feature-libs/storefinder/core/service/google-map-renderer.service.ts
    class: GOOGLE_MAP_RENDERER_SERVICE,
    importPath: SPARTACUS_STOREFINDER,
    deprecatedParams: [
      {
        className: STORE_FINDER_CONFIG,
        importPath: SPARTACUS_STOREFINDER,
      },
      {
        className: EXTERNAL_JS_FILE_LOADER,
        importPath: SPARTACUS_CORE,
      },
      {
        className: STORE_DATA_SERVICE,
        importPath: SPARTACUS_STOREFINDER,
      },
    ],
    removeParams: [
      {
        className: EXTERNAL_JS_FILE_LOADER,
        importPath: SPARTACUS_CORE,
      },
      {
        className: STORE_DATA_SERVICE,
        importPath: SPARTACUS_STOREFINDER,
      },
    ],
    addParams: [
      {
        className: STORE_FINDER_SERVICE,
        importPath: SPARTACUS_STOREFINDER,
      },
      {
        className: SCRIPT_LOADER,
        importPath: SPARTACUS_CORE,
      },
    ],
  };
