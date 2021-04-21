import {
  BASE_PAGE_META_RESOLVER,
  PRODUCT_SEARCH_SERVICE,
  ROUTING_SERVICE,
  SEARCH_PAGE_META_RESOLVER,
  SPARTACUS_CORE,
  TRANSLATION_SERVICE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const SEARCH_PAGE_META_RESOLVER_MIGRATION: ConstructorDeprecation = {
  class: SEARCH_PAGE_META_RESOLVER,
  importPath: SPARTACUS_CORE,
  deprecatedParams: [
    { className: ROUTING_SERVICE, importPath: SPARTACUS_CORE },
    { className: PRODUCT_SEARCH_SERVICE, importPath: SPARTACUS_CORE },
    { className: TRANSLATION_SERVICE, importPath: SPARTACUS_CORE },
  ],
  addParams: [
    { className: BASE_PAGE_META_RESOLVER, importPath: SPARTACUS_CORE },
  ],
};
