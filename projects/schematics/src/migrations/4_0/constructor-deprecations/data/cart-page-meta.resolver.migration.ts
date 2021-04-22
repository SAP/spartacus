import {
  BASE_PAGE_META_RESOLVER,
  CART_PAGE_META_RESOLVER,
  CMS_SERVICE,
  SPARTACUS_CORE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const CART_PAGE_META_RESOLVER_MIGRATION: ConstructorDeprecation = {
  class: CART_PAGE_META_RESOLVER,
  importPath: SPARTACUS_CORE,
  deprecatedParams: [{ className: CMS_SERVICE, importPath: SPARTACUS_CORE }],
  removeParams: [{ className: CMS_SERVICE, importPath: SPARTACUS_CORE }],
  addParams: [
    { className: BASE_PAGE_META_RESOLVER, importPath: SPARTACUS_CORE },
  ],
};
