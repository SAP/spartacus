import {
  GET_PAGES_ENDPOINT,
  OCC_CMS_PAGE_ADAPTER,
  SPARTACUS_CORE,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

// projects/core/src/occ/adapters/cms/occ-cms-page.adapter.ts
export const OCC_CMS_PAGE_ADAPTER_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: OCC_CMS_PAGE_ADAPTER,
    importPath: SPARTACUS_CORE,
    deprecatedNode: GET_PAGES_ENDPOINT,
    comment: `// ${TODO_SPARTACUS} Method '${GET_PAGES_ENDPOINT}' was removed from '${OCC_CMS_PAGE_ADAPTER}', the logic is part of the 'load' method.`,
  },
];
