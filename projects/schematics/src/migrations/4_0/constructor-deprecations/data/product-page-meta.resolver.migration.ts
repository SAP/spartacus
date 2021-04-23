import {
  ANGULAR_ROUTER,
  BASE_PAGE_META_RESOLVER,
  PAGE_LINK_SERVICE,
  PRODUCT_PAGE_META_RESOLVER,
  PRODUCT_SERVICE,
  ROUTING_SERVICE,
  SPARTACUS_CORE,
  TRANSLATION_SERVICE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const PRODUCT_PAGE_META_RESOLVER_MIGRATION_V1: ConstructorDeprecation = {
  class: PRODUCT_PAGE_META_RESOLVER,
  importPath: SPARTACUS_CORE,
  deprecatedParams: [
    { className: ROUTING_SERVICE, importPath: ANGULAR_ROUTER },
    { className: PRODUCT_SERVICE, importPath: SPARTACUS_CORE },
    { className: TRANSLATION_SERVICE, importPath: SPARTACUS_CORE },
  ],
  addParams: [
    { className: BASE_PAGE_META_RESOLVER, importPath: SPARTACUS_CORE },
    { className: PAGE_LINK_SERVICE, importPath: SPARTACUS_CORE },
  ],
};

export const PRODUCT_PAGE_META_RESOLVER_MIGRATION_V2: ConstructorDeprecation = {
  class: PRODUCT_PAGE_META_RESOLVER,
  importPath: SPARTACUS_CORE,
  deprecatedParams: [
    { className: ROUTING_SERVICE, importPath: ANGULAR_ROUTER },
    { className: PRODUCT_SERVICE, importPath: SPARTACUS_CORE },
    { className: TRANSLATION_SERVICE, importPath: SPARTACUS_CORE },
    { className: BASE_PAGE_META_RESOLVER, importPath: SPARTACUS_CORE },
  ],
  addParams: [{ className: PAGE_LINK_SERVICE, importPath: SPARTACUS_CORE }],
};
