import {
  GET_BASE_ENDPOINT,
  GET_END_POINT,
  GET_OCC_ENDPOINT,
  GET_RAW_ENDPOINT,
  GET_URL,
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
    comment: `// ${TODO_SPARTACUS} Method '${OCC_ENDPOINTS_SERVICE}.${GET_OCC_ENDPOINT}' was removed. Please use 'buildUrl' method instead with the proper parameters.`,
  },
  {
    class: OCC_ENDPOINTS_SERVICE,
    importPath: SPARTACUS_CORE,
    deprecatedNode: GET_BASE_ENDPOINT,
    comment: `// ${TODO_SPARTACUS} Method '${OCC_ENDPOINTS_SERVICE}.${GET_BASE_ENDPOINT}' was removed. Please use 'getBaseUrl' method instead with the proper parameters.`,
  },
  {
    class: OCC_ENDPOINTS_SERVICE,
    importPath: SPARTACUS_CORE,
    deprecatedNode: GET_END_POINT,
    comment: `// ${TODO_SPARTACUS} Method '${OCC_ENDPOINTS_SERVICE}.${GET_END_POINT}' was removed. Please use 'buildUrl' method instead with the proper parameters.`,
  },
  {
    class: OCC_ENDPOINTS_SERVICE,
    importPath: SPARTACUS_CORE,
    deprecatedNode: GET_URL,
    comment: `// ${TODO_SPARTACUS} Method '${OCC_ENDPOINTS_SERVICE}.${GET_URL}' was renamed to 'buildUrl' and changed signature. Before 4.0, 'urlParams', 'queryParams' and 'scope' were separate arguments (2nd, 3rd and 4th). Now they are properties of one wrapper object passed in the 2nd argument.`,
  },
  {
    class: OCC_ENDPOINTS_SERVICE,
    importPath: SPARTACUS_CORE,
    deprecatedNode: GET_RAW_ENDPOINT,
    comment: `// ${TODO_SPARTACUS} Method '${OCC_ENDPOINTS_SERVICE}.${GET_RAW_ENDPOINT}' was removed. Please use 'buildUrl' or 'getRawEndpointValue' method instead with the proper parameters.`,
  },
];
