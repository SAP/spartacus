import {
  SPARTACUS_STOREFRONTLIB,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

// projects\storefrontlib\src\shared\components\star-rating\star-rating.component.ts
export const STAR_RATING_COMPONENT_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: 'StarRatingComponent',
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedNode: 'ngOnInit',
    comment: `// ${TODO_SPARTACUS} Method ngOnInit is no longer called inside the star rating component`,
  },
  {
    class: 'StarRatingComponent',
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedNode: `setRateOnEvent`,
    comment: `// ${TODO_SPARTACUS} Method setRateOnEvent is no longer used, the setRate method is used instead`,
  },
];
