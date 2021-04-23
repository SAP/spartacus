import {
  PAGE_META_SERVICE,
  PRODUCT_PAGE_META_RESOLVER,
  SPARTACUS_CORE,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

export const PRODUCT_PAGE_META_RESOLVER_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: PRODUCT_PAGE_META_RESOLVER,
    importPath: SPARTACUS_CORE,
    deprecatedNode: `homeBreadcrumb$`,
    comment: `// ${TODO_SPARTACUS} 'homeBreadcrumb$' property was removed since the breadcrumb is resolved by the 'BasePageMetaResolver'.`,
  },
];

export const PAGE_META_SERVICE_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: PAGE_META_SERVICE,
    importPath: SPARTACUS_CORE,
    deprecatedNode: `resolverMethods`,
    comment: `// ${TODO_SPARTACUS} 'resolverMethods' property was changed to 'resolvers$' since the resolvers are read from the configuration stream.`,
  },
];
