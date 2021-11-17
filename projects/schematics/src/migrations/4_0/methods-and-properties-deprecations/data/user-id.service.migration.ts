import {
  SPARTACUS_CORE,
  TODO_SPARTACUS,
  USER_ID_SERVICE,
} from '../../../../shared/constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

export const USER_ID_SERVICE_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: USER_ID_SERVICE,
    importPath: SPARTACUS_CORE,
    deprecatedNode: `invokeWithUserId`,
    comment: `// ${TODO_SPARTACUS} Method '${USER_ID_SERVICE}.invokeWithUserId' was removed. Use 'takeUserId' method instead`,
  },
];
