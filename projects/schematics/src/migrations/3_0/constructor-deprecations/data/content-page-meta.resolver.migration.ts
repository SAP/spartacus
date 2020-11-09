import {
  CMS_SERVICE,
  CONTENT_PAGE_META_RESOLVER,
  ROUTING_PAGE_META_RESOLVER,
  SPARTACUS_CORE,
  TRANSLATION_SERVICE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const CONTENT_PAGE_META_RESOLVER_MIGRATION: ConstructorDeprecation = {
  // projects\core\src\cms\page\content-page-meta.resolver.ts
  class: CONTENT_PAGE_META_RESOLVER,
  importPath: SPARTACUS_CORE,
  deprecatedParams: [
    {
      className: CMS_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: TRANSLATION_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
  addParams: [
    {
      className: ROUTING_PAGE_META_RESOLVER,
      importPath: SPARTACUS_CORE,
    },
  ],
};
