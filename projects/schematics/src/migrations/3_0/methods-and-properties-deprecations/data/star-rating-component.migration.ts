import {
  NG_ON_INIT,
  SET_RATE,
  SET_RATE_ON_EVENT,
  SPARTACUS_STOREFRONTLIB,
  STAR_RATING_COMPONENT,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

// projects\storefrontlib\src\shared\components\star-rating\star-rating.component.ts
export const STAR_RATING_COMPONENT_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: STAR_RATING_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedNode: NG_ON_INIT,
    comment: `// ${TODO_SPARTACUS} Method '${NG_ON_INIT}' is no longer called inside the '${STAR_RATING_COMPONENT}'`,
  },
  {
    class: STAR_RATING_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedNode: SET_RATE_ON_EVENT,
    comment: `// ${TODO_SPARTACUS} Method '${SET_RATE_ON_EVENT}' is no longer used, the '${SET_RATE}' method is used instead`,
  },
];
