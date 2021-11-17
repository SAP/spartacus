import {
  ACTIVE_CART_SERVICE,
  BASE_PAGE_META_RESOLVER,
  CHECKOUT_PAGE_META_RESOLVER,
  SPARTACUS_CORE,
  TRANSLATION_SERVICE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const CHECKOUT_PAGE_META_RESOLVER_MIGRATION: ConstructorDeprecation = {
  class: CHECKOUT_PAGE_META_RESOLVER,
  importPath: SPARTACUS_CORE,
  deprecatedParams: [
    { className: TRANSLATION_SERVICE, importPath: SPARTACUS_CORE },
    { className: ACTIVE_CART_SERVICE, importPath: SPARTACUS_CORE },
  ],
  addParams: [
    { className: BASE_PAGE_META_RESOLVER, importPath: SPARTACUS_CORE },
  ],
};
