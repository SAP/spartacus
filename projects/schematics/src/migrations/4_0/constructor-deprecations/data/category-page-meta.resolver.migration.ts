import {
  BASE_PAGE_META_RESOLVER,
  CATEGORY_PAGE_META_RESOLVER,
  CMS_SERVICE,
  PRODUCT_SEARCH_SERVICE,
  SPARTACUS_CORE,
  TRANSLATION_SERVICE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const CATEGORY_PAGE_META_RESOLVER_MIGRATION: ConstructorDeprecation = {
  class: CATEGORY_PAGE_META_RESOLVER,
  importPath: SPARTACUS_CORE,
  deprecatedParams: [
    { className: PRODUCT_SEARCH_SERVICE, importPath: SPARTACUS_CORE },
    { className: CMS_SERVICE, importPath: SPARTACUS_CORE },
    { className: TRANSLATION_SERVICE, importPath: SPARTACUS_CORE },
  ],
  addParams: [
    { className: BASE_PAGE_META_RESOLVER, importPath: SPARTACUS_CORE },
  ],
};
