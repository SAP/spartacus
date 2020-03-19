import {
  ACTIVATED_ROUTE,
  ANGULAR_CORE,
  AUTH_SERVICE,
  FIND_PRODUCT_PAGE_META_RESOLVER,
  PRODUCT_SEARCH_SERVICE,
  ROUTING_SERVICE,
  SEMANTIC_PATH_SERVICE,
  SPARTACUS_CORE,
  TRANSLATION_SERVICE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const FIND_PAGE_META_RESOLVER_MIGRATION: ConstructorDeprecation = {
  class: FIND_PRODUCT_PAGE_META_RESOLVER,
  importPath: SPARTACUS_CORE,
  deprecatedParams: [
    { className: ROUTING_SERVICE, importPath: SPARTACUS_CORE },
    { className: PRODUCT_SEARCH_SERVICE, importPath: SPARTACUS_CORE },
    { className: TRANSLATION_SERVICE, importPath: SPARTACUS_CORE },
    { className: AUTH_SERVICE, importPath: SPARTACUS_CORE },
  ],
  removeParams: [{ className: ROUTING_SERVICE, importPath: SPARTACUS_CORE }],
  addParams: [
    { className: ACTIVATED_ROUTE, importPath: ANGULAR_CORE },
    { className: SEMANTIC_PATH_SERVICE, importPath: ANGULAR_CORE },
  ],
};
