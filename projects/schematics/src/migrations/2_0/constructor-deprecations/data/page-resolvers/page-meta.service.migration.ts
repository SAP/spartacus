import {
  CMS_SERVICE,
  FEATURE_CONFIG_SERVICE,
  PAGE_META_RESOLVER,
  PAGE_META_SERVICE,
  SPARTACUS_CORE,
} from '../../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../../shared/utils/file-utils';

export const PAGE_META_SERVICE_MIGRATION: ConstructorDeprecation = {
  class: PAGE_META_SERVICE,
  importPath: SPARTACUS_CORE,
  deprecatedParams: [
    { className: PAGE_META_RESOLVER, importPath: SPARTACUS_CORE },
    { className: CMS_SERVICE, importPath: SPARTACUS_CORE },
    {
      className: FEATURE_CONFIG_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
  removeParams: [
    {
      className: FEATURE_CONFIG_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
};
