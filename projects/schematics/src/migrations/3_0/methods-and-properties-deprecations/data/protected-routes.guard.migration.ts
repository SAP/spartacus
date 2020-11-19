import {
  PROTECTED_ROUTES_GUARD,
  SPARTACUS_CORE,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

export const PROTECTED_ROUTES_GUARD_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: PROTECTED_ROUTES_GUARD,
    importPath: SPARTACUS_CORE,
    deprecatedNode: `canActivate`,
    comment: `// ${TODO_SPARTACUS} The return type of the method 'canActivate' changed from 'Observable<boolean>' to 'Observable<boolean | UrlTree>'`,
  },
];
