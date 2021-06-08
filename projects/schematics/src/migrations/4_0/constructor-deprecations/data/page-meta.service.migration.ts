import {
  ANGULAR_CORE,
  CMS_SERVICE,
  PAGE_META_CONFIG,
  PAGE_META_SERVICE,
  PLATFORM_ID,
  SPARTACUS_CORE,
  UNIFIED_INJECTOR,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const PAGE_META_SERVICE_MIGRATION: ConstructorDeprecation = {
  class: PAGE_META_SERVICE,
  importPath: SPARTACUS_CORE,
  deprecatedParams: [{ className: CMS_SERVICE, importPath: SPARTACUS_CORE }],
  addParams: [
    { className: UNIFIED_INJECTOR, importPath: SPARTACUS_CORE },
    { className: PAGE_META_CONFIG, importPath: SPARTACUS_CORE },
    { className: PLATFORM_ID, importPath: ANGULAR_CORE },
  ],
};
