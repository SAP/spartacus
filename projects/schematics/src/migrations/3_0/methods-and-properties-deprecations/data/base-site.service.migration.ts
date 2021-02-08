import {
  BASE_SITE_SERVICE,
  GET_ALL,
  GET_BASE_SITE_DATA,
  SET_ACTIVE,
  SPARTACUS_CORE,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

// projects/core/src/site-context/facade/base-site.service.ts
export const BASE_SITE_SERVICE_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: BASE_SITE_SERVICE,
    importPath: SPARTACUS_CORE,
    deprecatedNode: GET_ALL,
    newNode: GET_ALL,
    comment: `// ${TODO_SPARTACUS} Method '${GET_ALL}' changed the return type from 'Observable<string[]>' to 'Observable<BaseSite[]>'`,
  },
  {
    class: BASE_SITE_SERVICE,
    importPath: SPARTACUS_CORE,
    deprecatedNode: GET_BASE_SITE_DATA,
    comment: `// ${TODO_SPARTACUS} Method '${GET_BASE_SITE_DATA}' is replaced by method 'get()'`,
  },
  {
    class: BASE_SITE_SERVICE,
    importPath: SPARTACUS_CORE,
    deprecatedNode: SET_ACTIVE,
    newNode: SET_ACTIVE,
    comment: `// ${TODO_SPARTACUS} Method '${SET_ACTIVE}' changed the return type from 'Subscription' to 'void'`,
  },
];
