import {
  GET_URL,
  GET_OCC_ENDPOINT,
  GET_BASE_ENDPOINT,
  OCC_ENDPOINTS_SERVICE,
  SPARTACUS_CORE,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

// projects/core/src/occ/services/occ-endpoints.service.ts
export const OCC_ENDPOINTS_SERVICE_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: OCC_ENDPOINTS_SERVICE,
    importPath: SPARTACUS_CORE,
    deprecatedNode: GET_OCC_ENDPOINT,
    comment: `// ${TODO_SPARTACUS} Method '${GET_OCC_ENDPOINT}' was removed. Please use 'buildUrl' method instead with the proper parameters.`,
  },
  {
    class: OCC_ENDPOINTS_SERVICE,
    importPath: SPARTACUS_CORE,
    deprecatedNode: GET_BASE_ENDPOINT,
    comment: `// ${TODO_SPARTACUS} Method '${GET_BASE_ENDPOINT}' was removed. Please use 'getBaseUrl' method instead with the proper parameters.`,
  },
];

export const GET_URL_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: OCC_ENDPOINTS_SERVICE,
    importPath: SPARTACUS_CORE,
    deprecatedNode: GET_URL,
    comment: `// ${TODO_SPARTACUS} Method '${GET_URL}' was removed. Please use 'buildUrl' method instead with the proper parameters.`,
  },
];
