import {
  ANGULAR_ROUTER,
  BASE_PAGE_META_RESOLVER,
  CMS_SERVICE,
  PAGE_LINK_SERVICE,
  ROUTER,
  ROUTING_PAGE_META_RESOLVER,
  SPARTACUS_CORE,
  TRANSLATION_SERVICE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const BASE_PAGE_META_RESOLVER_MIGRATION: ConstructorDeprecation = {
  class: BASE_PAGE_META_RESOLVER,
  importPath: SPARTACUS_CORE,
  deprecatedParams: [
    { className: CMS_SERVICE, importPath: SPARTACUS_CORE },
    { className: TRANSLATION_SERVICE, importPath: SPARTACUS_CORE },
    { className: ROUTING_PAGE_META_RESOLVER, importPath: SPARTACUS_CORE },
  ],
  addParams: [
    { className: ROUTER, importPath: ANGULAR_ROUTER },
    { className: PAGE_LINK_SERVICE, importPath: SPARTACUS_CORE },
  ],
};
