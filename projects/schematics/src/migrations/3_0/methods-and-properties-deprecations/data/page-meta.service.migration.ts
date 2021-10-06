import {
  GET_META,
  GET_META_RESOLVER,
  PAGE_META_SERVICE,
  SPARTACUS_CORE,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

// projects/core/src/cms/facade/page-meta.service.ts
export const PAGE_META_SERVICE_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: PAGE_META_SERVICE,
    importPath: SPARTACUS_CORE,
    deprecatedNode: GET_META,
    newNode: GET_META,
    comment: `// ${TODO_SPARTACUS} Method ${GET_META} return type has been changed from 'Observable<PageMeta>' to 'Observable<PageMeta | null>'.`,
  },
  {
    class: PAGE_META_SERVICE,
    importPath: SPARTACUS_CORE,
    deprecatedNode: GET_META_RESOLVER,
    newNode: GET_META_RESOLVER,
    comment: `// ${TODO_SPARTACUS} Method ${GET_META_RESOLVER} return type has been changed from 'PageMetaResolver' to 'Observable<PageMetaResolver>'.`,
  },
];
