import {
  CONTENT_PAGE_META_RESOLVER,
  PAGE_META_SERVICE,
  SPARTACUS_CORE,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

export const CONTENT_PAGE_META_RESOLVER_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: CONTENT_PAGE_META_RESOLVER,
    importPath: SPARTACUS_CORE,
    deprecatedNode: `homeBreadcrumb$`,
    comment: `// ${TODO_SPARTACUS} 'homeBreadcrumb$' property was removed since the breadcrumb is resolved by the 'BasePageMetaResolver'.`,
  },
  {
    class: CONTENT_PAGE_META_RESOLVER,
    importPath: SPARTACUS_CORE,
    deprecatedNode: `breadcrumbs$`,
    comment: `// ${TODO_SPARTACUS} 'breadcrumbs$' property was removed since the breadcrumb is resolved by the 'BasePageMetaResolver'.`,
  },
  {
    class: CONTENT_PAGE_META_RESOLVER,
    importPath: SPARTACUS_CORE,
    deprecatedNode: `title$`,
    comment: `// ${TODO_SPARTACUS} 'title$' property was removed since the title is resolved by the 'BasePageMetaResolver'.`,
  },
  {
    class: CONTENT_PAGE_META_RESOLVER,
    importPath: SPARTACUS_CORE,
    deprecatedNode: `cms$`,
    comment: `// ${TODO_SPARTACUS} 'cms$' property was removed since the cms content is resolved by the 'BasePageMetaResolver'.`,
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
