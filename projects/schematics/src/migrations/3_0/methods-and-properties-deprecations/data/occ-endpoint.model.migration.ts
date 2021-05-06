import {
  SPARTACUS_CORE,
  TODO_SPARTACUS,
  OCC_ENDPOINT,
  BASE_SITES_FOR_CONFIG
} from '../../../../shared/constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

export const OCC_ENDPOINT_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: OCC_ENDPOINT,
    importPath: SPARTACUS_CORE,
    deprecatedNode: BASE_SITES_FOR_CONFIG,
    comment: `// ${TODO_SPARTACUS} Class property ${BASE_SITES_FOR_CONFIG} has been deprecated.'`,
  },
];
